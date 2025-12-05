import React, { useState, useEffect } from "react";
import { registerUser, getCurrentUser, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    const result = registerUser(username.trim(), password, inviteCode.trim());
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <section style={{ textAlign: "center", marginTop: "50px" }}>
      {!currentUser ? (
        <>
          <h2>Create Account</h2>
          <form onSubmit={handleSignup} style={{ display: "inline-block" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ display: "block", margin: "10px auto", padding: "8px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: "block", margin: "10px auto", padding: "8px" }}
            />
            <input
              type="text"
              placeholder="Invite code (leave blank for regular user)"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              style={{ display: "block", margin: "10px auto", padding: "8px" }}
            />
            <button type="submit" style={{ marginTop: "10px" }}>
              Sign Up
            </button>
          </form>

          <div style={{ marginTop: "15px" }}>
            <p>Already have an account?</p>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          
        </>
      ) : (
        <>
          <h2>Welcome, {currentUser.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </section>
  );
}