// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { signInWithGoogle, auth, onAuthStateChanged } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) navigate("/review"); // or wherever makes sense
    });
    return () => unsub();
  }, []);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      // successful -> onAuthStateChanged will navigate
    } catch (err) {
      alert(err.message || "Sign-in failed");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Sign in with your college Google account</h2>
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white"
        onClick={handleGoogle}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in with Google (@vitbhopal.ac.in)"}
      </button>
    </div>
  );
}
