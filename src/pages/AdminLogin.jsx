import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import AdminPanel from "./AdminPanel";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState(null);

  // watch auth state
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        setAuthUser(null);
        setIsAdmin(false);
        return;
      }
      setAuthUser(u);
      setCheckingAdmin(true);
      try {
        const adminDoc = await getDoc(doc(db, "admins", u.uid));
        if (adminDoc.exists()) {
          setIsAdmin(true);
        } else {
          await firebaseSignOut(auth);
          setIsAdmin(false);
          setAuthUser(null);
          setError("This account is not an admin.");
        }
      } catch (err) {
        console.error("Admin check failed:", err);
        setError("Failed to validate admin. Try again.");
      } finally {
        setCheckingAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCheckingAdmin(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const u = cred.user;
      const adm = await getDoc(doc(db, "admins", u.uid));
      if (!adm.exists()) {
        await firebaseSignOut(auth);
        setError("You are not authorized as an admin.");
        setCheckingAdmin(false);
        return;
      }
      setIsAdmin(true);
      setAuthUser(u);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Sign in failed");
      setCheckingAdmin(false);
    }
  };

  if (checkingAdmin && isAdmin && authUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-4 max-w-6xl mx-auto flex items-center justify-between">
          <div />
          <div>
            <Link to="/" className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Back to site
            </Link>
          </div>
        </div>
        <AdminPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Admin Login</h2>

        {error && <div className="mb-3 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded border px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
              disabled={checkingAdmin}
            >
              {checkingAdmin ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-300">
          Admin accounts are managed by the site owners. If you don't have credentials, contact the site admin.
        </div>
      </div>
    </div>
  );
}
