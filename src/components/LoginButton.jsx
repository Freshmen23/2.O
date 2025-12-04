// src/components/LoginButton.jsx
import { useEffect, useState } from "react";
import { auth, signInWithGoogle, signOut, onAuthStateChanged } from "@/utils/firebase";

export function LoginButton() {
  const [user, setUser] = useState(null);
  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
        <span>{user.displayName?.split(" ")[0]}</span>
        <button onClick={() => signOut()} className="ml-2 underline">Sign out</button>
      </div>
    );
  }
  return <button onClick={() => signInWithGoogle()} className="underline">Sign in</button>;
}
