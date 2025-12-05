import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function GoogleLogin() {
  const { user, loading, signInWithGoogle, logout, allowedDomain } = useAuth();
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    setError(null);
    setBusy(true);
    const res = await signInWithGoogle();
    setBusy(false);
    if (!res.success) setError(res.error || "Sign in failed");
  }

  if (loading) return <div>Checking auth...</div>;

  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {user.photoURL && (
          <img src={user.photoURL} alt="avatar" style={{ width: 32, height: 32, borderRadius: 16 }} />
        )}
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontSize: 14 }}>{user.displayName || user.email}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{user.email}</div>
        </div>
        <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <button className="cursor-pointer hover:text-indigo-600" onClick={handleLogin} disabled={busy}>
        {busy ? "Signing in..." : `SignIn (@${allowedDomain})`}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </div>
  );
}
