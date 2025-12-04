// src/components/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Allowed domain config (set VITE_ALLOWED_DOMAIN in your .env; default below)
  const allowedDomain = import.meta.env.VITE_ALLOWED_DOMAIN || "vitbhopal.ac.in";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      const email = firebaseUser.email || "";
      const isCollege = email.toLowerCase().endsWith(`@${allowedDomain.toLowerCase()}`);

      setUser({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email,
        photoURL: firebaseUser.photoURL,
        isCollegeStudent: isCollege,
      });

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const email = (firebaseUser.email || "").toLowerCase();
      const isCollege = email.endsWith(`@${allowedDomain.toLowerCase()}`);

      if (!isCollege) {
        // sign out immediately if not allowed
        await signOut(auth);
        throw new Error(`Please sign in with your college email (@${allowedDomain}).`);
      }

      return { success: true };
    } catch (err) {
      // return friendly error for UI
      return { success: false, error: err.message || String(err) };
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout, allowedDomain }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
