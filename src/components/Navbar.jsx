import { Link, useLocation } from "react-router-dom";
import logo from "../assets/WinEZLogo.png";
import { getCurrentUser } from "../utils/auth";
import { useEffect, useState, useCallback } from "react";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [inboxCount, setInboxCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const location = useLocation();

  const updateUser = useCallback(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

 const updateCounts = useCallback(() => {
  try {
    const user = getCurrentUser();
    const all = JSON.parse(localStorage.getItem("messages")) || [];
    if (!user) {
      setInboxCount(0);
      setSentCount(0);
      return;
    }
    

    setInboxCount(
      all.filter(m => m.to === user.username && !m.reply && !(m.hiddenFrom || []).includes(user.username)).length
    );
    

    setSentCount(
      all.filter(m => m.from === user.username && m.reply && !(m.hiddenFrom || []).includes(user.username)).length
    );
  } catch (err) {
    console.warn("Navbar: failed to update message counts", err);
    setInboxCount(0);
    setSentCount(0);
  }
}, []);

  useEffect(() => {
    updateUser();
    updateCounts();
  }, [location, updateUser, updateCounts]);

  useEffect(() => {
    const onStorage = () => {
      updateUser();
      updateCounts();
    };
    const onMessagesUpdated = () => updateCounts();

    window.addEventListener("storage", onStorage);
    window.addEventListener("messagesUpdated", onMessagesUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("messagesUpdated", onMessagesUpdated);
    };
  }, [updateCounts, updateUser]);

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="WinEZ Logo" className="logo" />
      </Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/strategies">Strategies</Link></li>
        <li><Link to="/games">Games</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>

        {!currentUser ? (
          <li>
            <Link to="/signup" className="signup-btn">Sign Up / Login</Link>
          </li>
        ) : (
          <>
            {currentUser.role === "coach" && (
              <li>
                <Link to="/inbox">Inbox
{inboxCount > 0 && <span className="nav-badge" style={{ background: "#00ff0d", color: "#000", borderRadius: "50%", width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "bold", marginLeft: "0.4em" }}>{inboxCount}</span>}                </Link>
              </li>
            )}

            {currentUser.role === "user" && (
              <li>
                <Link to="/messages">My Messages
{sentCount > 0 && <span className="nav-badge" style={{ background: "#00ff0d", color: "#000", borderRadius: "50%", width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "bold", marginLeft: "0.4em" }}>{sentCount}</span>}                </Link>
              </li>
            )}

            <li>
              <Link to="/logout" className="logout-btn">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}