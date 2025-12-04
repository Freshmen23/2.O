// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "@/utils/firebase";
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) { setIsAdmin(false); return; }
      // check admins collection for a doc with id === u.uid
      const adminDoc = await getDoc(doc(db, "admins", u.uid));
      setIsAdmin(adminDoc.exists());
    });
    return () => unsub();
  }, []);

  if (!user) {
    return <div>Please sign in with college account to access admin area.</div>;
  }
  if (!isAdmin) {
    return <div>Access denied. You are not an admin.</div>;
  }

  // Render admin controls: a form to create faculty and reviews directly.
  return (
    <div className="p-6">
      <h1 className="text-2xl">Admin Dashboard</h1>
      {/* add UI to add faculty, add review, approve requests, etc */}
    </div>
  );
}
