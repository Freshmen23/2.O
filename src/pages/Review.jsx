// src/pages/Review.jsx
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../components/AuthContext";

// normalizeName helper (same as before)
const normalizeName = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s]/gi, "");

export default function ReviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [behaviour, setBehaviour] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [internals, setInternals] = useState("");
  const [teaching, setTeaching] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewFacultyOption, setShowNewFacultyOption] = useState(false);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [proposalNotes, setProposalNotes] = useState("");
  const dropdownRef = useRef(null);

  const { user, loading: authLoading, allowedDomain, signInWithGoogle } = useAuth();

  // load faculties once
  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const snapshot = await getDocs(collection(db, "faculties"));
        setFaculties(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Failed to load faculties:", err);
      }
    };
    loadFaculties();
  }, []);

  // click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsDropdownOpen(true);

    const exists = faculties.some((f) => normalizeName(f.name) === normalizeName(value));
    setShowNewFacultyOption(!exists && value.trim() !== "");
  };

  // require sign-in before open proposal modal
  const openProposalModal = async () => {
    if (user) {
      setEvidenceUrl("");
      setProposalNotes("");
      setProposalModalOpen(true);
      return;
    }

    const confirmSignIn = window.confirm(
      `You must sign in with your college Google account (@${allowedDomain}) to propose a new faculty. Would you like to sign in now?`
    );
    if (!confirmSignIn) return;

    const res = await signInWithGoogle();
    if (res.success) {
      setEvidenceUrl("");
      setProposalNotes("");
      setProposalModalOpen(true);
    } else {
      alert(res.error || "Sign in failed. Use your college email to sign in.");
    }
  };

  const submitProposal = async () => {
    const proposedName = searchQuery.trim();
    if (!proposedName) {
      alert("Faculty name cannot be empty.");
      return;
    }
    if (!evidenceUrl || evidenceUrl.trim() === "") {
      alert("Please provide an evidence URL (department page / profile / document).");
      return;
    }

    if (!user) {
      alert("You must be signed in with your college account to submit a proposal.");
      return;
    }

    setIsSubmitting(true);
    try {
      const normalizedName = normalizeName(proposedName);
      const exists = faculties.some((f) => normalizeName(f.name) === normalizedName);
      if (exists) {
        alert("A faculty with a similar name already exists. Please select it from the list.");
        setIsSubmitting(false);
        setProposalModalOpen(false);
        return;
      }

      const data = {
        proposedName,
        normalizedName,
        evidence: { url: evidenceUrl.trim() },
        notes: proposalNotes.trim() || null,
        submittedBy: user ? { uid: user.uid, email: user.email } : null,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "pending_faculties"), data);

      alert("Proposal submitted. An admin will review it soon.");
      setProposalModalOpen(false);
      setShowNewFacultyOption(false);
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Error submitting proposal:", err);
      alert("Failed to submit proposal. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!teaching || !evaluation || !behaviour || !internals) {
      alert("Please fill all rating fields");
      return;
    }
    if (!selectedFacultyId) {
      if (showNewFacultyOption) {
        const wantToPropose = window.confirm(
          "The professor is not in the approved list. Do you want to propose this professor for admin review?"
        );
        if (wantToPropose) {
          await openProposalModal();
        }
        return;
      } else {
        alert("Please select an approved faculty from the list.");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await runTransaction(db, async (transaction) => {
        const facultyRef = doc(db, "faculties", selectedFacultyId);
        const reviewsCol = collection(facultyRef, "reviews");
        const reviewsSnapshot = await getDocs(reviewsCol);
        const allReviews = reviewsSnapshot.docs.map((d) => d.data());

        const newReview = {
          teaching: parseFloat(teaching),
          evaluation: parseFloat(evaluation),
          behaviour: parseFloat(behaviour),
          internals: parseFloat(internals),
          timestamp: serverTimestamp(),
          createdBy: user ? { uid: user.uid, email: user.email } : null,
        };

        const newReviewRef = doc(reviewsCol);
        transaction.set(newReviewRef, newReview);

        const updatedReviews = [...allReviews, newReview];
        const teachingAvg =
          updatedReviews.reduce((acc, r) => acc + (Number(r.teaching) || 0), 0) / updatedReviews.length;
        const evaluationAvg =
          updatedReviews.reduce((acc, r) => acc + (Number(r.evaluation) || 0), 0) / updatedReviews.length;
        const behaviourAvg =
          updatedReviews.reduce((acc, r) => acc + (Number(r.behaviour) || 0), 0) / updatedReviews.length;
        const internalsAvg =
          updatedReviews.reduce((acc, r) => acc + (Number(r.internals) || 0), 0) / updatedReviews.length;

        transaction.update(facultyRef, {
          reviewCount: updatedReviews.length,
          Teaching: teachingAvg,
          Evaluation: evaluationAvg,
          Behaviour: behaviourAvg,
          Internals: internalsAvg,
          lastUpdated: serverTimestamp(),
        });
      });

      alert("Review submitted successfully!");
      setTeaching("");
      setEvaluation("");
      setBehaviour("");
      setInternals("");
      setSelectedFacultyId("");
      setSearchQuery("");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit review. Try again.");
    } finally {
      setIsSubmitting(false);
      setIsDropdownOpen(false);
      setShowNewFacultyOption(false);
    }
  };

  const visibleFaculties = faculties.filter((f) =>
    normalizeName(f.name).includes(normalizeName(searchQuery))
  );

  return (
    <div className="p-[5rem] space-y-4 max-w-4xl mx-auto">
      <h1 className="my-[2rem] text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
        Review Page
      </h1>

      {/* Banner telling users they must sign in to propose */}
      <div className="rounded-md p-3 bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-700 text-sm text-yellow-800 dark:text-yellow-200">
        To propose a new professor you must sign in with your college Google account. Viewing and submitting reviews for
        existing professors does not require sign-in.
      </div>

      <div className="dark:text-white dark:bg-indigo-950 relative" ref={dropdownRef}>
        <Input
          placeholder="Search faculty"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(true)}
          disabled={isSubmitting}
          className="dark:bg-gray-800 dark:text-white"
        />

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-md z-50 mt-1 max-h-60 overflow-y-auto">
            {visibleFaculties.map((faculty) => (
              <div
                key={faculty.id}
                className="p-2 hover:bg-indigo-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                onClick={() => {
                  setSelectedFacultyId(faculty.id);
                  setSearchQuery(faculty.name);
                  setIsDropdownOpen(false);
                }}
              >
                <span className="dark:text-gray-100">{faculty.name}</span>
              </div>
            ))}

            {showNewFacultyOption && (
              <div className="p-2 border-t dark:border-gray-700">
                <div className="p-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer text-blue-600 dark:text-blue-300 font-medium flex items-center justify-between">
                  <div>
                    Add New Professor: "<strong className="text-black dark:text-white">{searchQuery}</strong>"
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        openProposalModal();
                      }}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                    >
                      Propose
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300 mt-2">
                  New professor proposals go to admins for verification. Provide an evidence link when prompted.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {(selectedFacultyId || showNewFacultyOption) && (
        <Card className="dark:bg-gray-900">
          <CardContent className="dark:text-white p-4 space-y-4 ">
            {[
              { label: "Teaching", value: teaching, setter: setTeaching },
              { label: "Evaluation", value: evaluation, setter: setEvaluation },
              { label: "Behaviour", value: behaviour, setter: setBehaviour },
              { label: "Internals", value: internals, setter: setInternals },
            ].map(({ label, value, setter }) => (
              <div key={label} className="space-y-2">
                <label className="block font-medium dark:text-gray-200">{label} (out of 5)</label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  disabled={isSubmitting}
                  className="dark:bg-gray-800 dark:text-white"
                />
              </div>
            ))}

            <Button
              className="w-full bg-gray-800 dark:bg-indigo-600 cursor-pointer"
              onClick={handleSubmitReview}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Proposal modal */}
      {proposalModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-2">Propose New Professor</h3>
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              You are proposing: <strong className="text-black dark:text-white">{searchQuery}</strong>
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium dark:text-gray-200">Evidence URL (required)</label>
              <Input
                placeholder="https://department.example.edu/profiles/..."
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                className="dark:bg-gray-800 dark:text-white"
              />
              <label className="block text-sm font-medium dark:text-gray-200">Notes (optional)</label>
              <Input
                placeholder="Why do you think this is the correct person?"
                value={proposalNotes}
                onChange={(e) => setProposalNotes(e.target.value)}
                className="dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 border rounded bg-white dark:bg-gray-800 dark:text-white"
                onClick={() => setProposalModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                onClick={submitProposal}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
