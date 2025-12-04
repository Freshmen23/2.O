// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { useAuth } from "../components/AuthContext";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * AdminPanel: lists pending_faculties (status == "pending"), allows approve/reject.
 *
 * Assumptions:
 * - Admin user UIDs exist as docs under /admins/{uid}
 * - Firestore rules (provided below) enforce admin-only create on faculties and admin-only read/write on pending_faculties
 */

function normalizeName(name = "") {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/gi, "");
}

const generateFacultyId = (name) => {
  const sanitized = name.trim().replace(/\s+/g, "-").toLowerCase();
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `${sanitized}-${rnd}`;
};

export default function AdminPanel() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rejectNotes, setRejectNotes] = useState("");
  const [activeRejectId, setActiveRejectId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    // check /admins/{uid} doc existence
    const checkAdmin = async () => {
      try {
        const adminDocRef = doc(db, "admins", user.uid);
        const snap = await getDoc(adminDocRef);
        setIsAdmin(snap.exists());
      } catch (err) {
        console.error("Failed to check admin status:", err);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    const loadPending = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "pending_faculties"),
          where("status", "==", "pending"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        const snap = await getDocs(q);
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setPending(docs);
      } catch (err) {
        console.error("Failed to load pending proposals:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPending();
  }, [isAdmin, refreshKey]);

  async function handleApprove(proposal) {
    if (!isAdmin || !user) {
      alert("You are not authorized to perform this action.");
      return;
    }

    const confirmed = window.confirm(
      `Approve "${proposal.proposedName}" and add to approved faculties?`
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      await runTransaction(db, async (transaction) => {
        const proposalRef = doc(db, "pending_faculties", proposal.id);

        // re-read inside transaction
        const pSnap = await transaction.get(proposalRef);
        if (!pSnap.exists()) throw new Error("Proposal no longer exists");

        const pData = pSnap.data();
        if (pData.status !== "pending") throw new Error("Proposal already processed");

        // generate a unique faculty id
        const normalized = normalizeName(pData.proposedName || "");
        const newFacultyId = generateFacultyId(normalized);
        const facultyRef = doc(db, "faculties", newFacultyId);

        // create faculty doc (admins are allowed to create via rules)
        transaction.set(facultyRef, {
          name: pData.proposedName,
          normalizedName: normalized,
          reviewCount: 0,
          overall: 0,
          createdFromProposalId: proposal.id,
          createdByProposal: pData.submittedBy || null,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp(),
        });

        // update proposal status to approved
        transaction.update(proposalRef, {
          status: "approved",
          approvedBy: { uid: user.uid, email: user.email || null },
          approvedAt: serverTimestamp(),
        });
      });

      alert("Approved and faculty created.");
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error("Approve failed:", err);
      alert(`Approve failed: ${err.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  async function startReject(proposalId) {
    setActiveRejectId(proposalId);
    setRejectNotes("");
  }

  async function cancelReject() {
    setActiveRejectId(null);
    setRejectNotes("");
  }

  async function confirmReject(proposal) {
    if (!isAdmin || !user) {
      alert("You are not authorized to perform this action.");
      return;
    }
    const notes = rejectNotes.trim();
    try {
      setLoading(true);
      const propRef = doc(db, "pending_faculties", proposal.id);
      await updateDoc(propRef, {
        status: "rejected",
        moderatorNotes: notes || null,
        processedBy: { uid: user.uid, email: user.email || null },
        processedAt: serverTimestamp(),
      });
      alert("Proposal rejected.");
      setActiveRejectId(null);
      setRejectNotes("");
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error("Reject failed:", err);
      alert(`Reject failed: ${err.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) return <div className="p-6">Checking authentication...</div>;

  if (!user) return <div className="p-6">Please sign in as an admin to access this page.</div>;

  if (!isAdmin) return <div className="p-6">You are not an admin.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Admin — Pending Faculty Proposals</h1>

      {loading && <div className="mb-4">Loading...</div>}

      {pending.length === 0 && !loading && (
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-gray-700 dark:text-gray-200">
          No pending proposals right now.
        </div>
      )}

      <div className="space-y-4">
        {pending.map((p) => (
          <div key={p.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold dark:text-white">{p.proposedName}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Submitted: {p.submittedBy ? p.submittedBy.email : "Unknown"} •{" "}
                  {p.createdAt ? new Date(p.createdAt.seconds * 1000).toLocaleString() : "—"}
                </div>
                {p.evidence?.url && (
                  <div className="mt-2">
                    <a
                      href={p.evidence.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-300 underline"
                    >
                      View evidence
                    </a>
                  </div>
                )}
                {p.notes && <div className="mt-2 text-sm dark:text-gray-200">Notes: {p.notes}</div>}
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(p)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                    disabled={loading}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => startReject(p.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    disabled={loading}
                  >
                    Reject
                  </button>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  id: <span className="font-mono">{p.id}</span>
                </div>
              </div>
            </div>

            {/* Reject UI inline */}
            {activeRejectId === p.id && (
              <div className="mt-3 bg-gray-50 dark:bg-gray-900 p-3 rounded">
                <label className="block text-sm mb-1 dark:text-gray-200">Rejection notes (optional)</label>
                <Input
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                  placeholder="Why are you rejecting this proposal?"
                  className="dark:bg-gray-800 dark:text-white"
                />
                <div className="flex gap-2 mt-2 justify-end">
                  <button
                    onClick={cancelReject}
                    className="px-3 py-1 border rounded bg-white dark:bg-gray-800 dark:text-white"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmReject(p)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    disabled={loading}
                  >
                    Confirm Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
