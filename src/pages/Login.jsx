import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  };

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/");
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Sign Up</button>

      {/* 👤 GUEST LOGIN */}
      <button onClick={() => navigate("/")}>
        Continue as Guest
      </button>
    </div>
  );
}