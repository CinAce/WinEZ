import React, { useState, useEffect } from "react";
import { registerUser, getCurrentUser, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showInviteCode, setShowInviteCode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    const result = registerUser(username.trim(), password, inviteCode.trim());
    if (result.success) {
      navigate("/strategies");
    } else {
      setError(result.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const handleButtonClick = (e) => {
  // Check if (Ctrl+Alt on Windows) OR (Cmd+Option on Mac) are held down
  if ((e.ctrlKey || e.metaKey) && e.altKey) {
    e.preventDefault();
    setShowInviteCode(true);
  } else {

    handleSignup(e);
  }
};

  return (
    <section>
      {!currentUser ? (
        <>
          <h2>Create Account</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showInviteCode && (
              <input
                type="text"
                placeholder="Invite code (optional - for coaches)"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
            )}
            <button type="submit" onClick={handleButtonClick}>Sign Up</button>
          </form>
          
          {error && <p style={{ color: "red", marginTop: "1em" }}>{error}</p>}

          <div style={{ marginTop: "2em" }}>
            <p style={{ marginBottom: "0.5em" }}>Already have an account?</p>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
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