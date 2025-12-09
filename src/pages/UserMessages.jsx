import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";

export default function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = () => {
    setLoading(true);
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        setMessages([]);
        setError("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      const allMessages = JSON.parse(localStorage.getItem("messages")) || [];

      const sent = allMessages.filter(
        (m) => m.from === currentUser.username && !(m.hiddenFrom || []).includes(currentUser.username)
      );
      setMessages(sent);
      setError("");
    } catch (err) {
      console.error("Failed to load messages:", err);
      setError("Failed to load messages. Please refresh the page.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();

    const onStorage = () => loadMessages();
    const onMessagesUpdated = () => loadMessages();

    window.addEventListener("storage", onStorage);
    window.addEventListener("messagesUpdated", onMessagesUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("messagesUpdated", onMessagesUpdated);
    };
  }, []);

  const currentUser = getCurrentUser();
  if (!currentUser) {
    return (
      <section>
        <h2>Your Messages</h2>
        <p>You must be logged in to view this page.</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section>
        <h2>Your Messages</h2>
        <p>Loading your messages...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2>Your Messages</h2>
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }


  function deleteMessage(index) {
    if (!confirm("Delete this message from your view?")) return;
    try {
      const current = getCurrentUser();
      if (!current) return;
      const msg = messages[index];
      if (!msg) return;

      const allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const realIndex = allMessages.findIndex((m) => m.timestamp === msg.timestamp);

      if (realIndex !== -1) {
        const stored = allMessages[realIndex];
        stored.hiddenFrom = Array.isArray(stored.hiddenFrom) ? stored.hiddenFrom.slice() : [];
        if (!stored.hiddenFrom.includes(current.username)) {
          stored.hiddenFrom.push(current.username);
        }
        allMessages[realIndex] = stored;
        localStorage.setItem("messages", JSON.stringify(allMessages));
      }

      setMessages((prev) => prev.filter((_, i) => i !== index));
      window.dispatchEvent(new Event("messagesUpdated"));
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert("Failed to delete message. Please try again.");
    }
  }

  function clearAllMessages() {
    if (!confirm("Clear all your sent messages? This will hide them only for you.")) return;
    try {
      const current = getCurrentUser();
      if (!current) return;

      const allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const updatedAll = allMessages.map((m) => {
        if (m.from === current.username) {
          const copy = { ...m };
          copy.hiddenFrom = Array.isArray(copy.hiddenFrom) ? copy.hiddenFrom.slice() : [];
          if (!copy.hiddenFrom.includes(current.username)) {
            copy.hiddenFrom.push(current.username);
          }
          return copy;
        }
        return m;
      });

      localStorage.setItem("messages", JSON.stringify(updatedAll));
      setMessages([]);
      window.dispatchEvent(new Event("messagesUpdated"));
    } catch (err) {
      console.error("Failed to clear messages:", err);
      alert("Failed to clear messages. Please try again.");
    }
  }

  return (
    <section>
      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <span>Your Messages</span>
        {messages.length > 0 && (
          <button
            onClick={clearAllMessages}
            style={{
              background: "#ff4d4d",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Clear All
          </button>
        )}
      </h2>

      {messages.length === 0 ? (
        <div className="empty-state">
          <p>You haven't sent any messages yet.</p>
          <p style={{ fontSize: "0.9em", opacity: 0.7, marginTop: "0.5em" }}>
            Visit the Contact page to send a message to a coach!
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {messages.map((msg, i) => (
            <li
              key={msg.timestamp || i}
              style={{
                padding: "16px",
                marginBottom: "16px",
                background: "#222",
                border: "1px solid #444",
                borderRadius: "8px",
                position: "relative"
              }}
            >
              <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "8px" }}>
                <button
                  onClick={() => deleteMessage(i)}
                  title="Hide for you"
                  style={{
                    background: "transparent",
                    color: "#ffb3b3",
                    border: "1px solid #444",
                    padding: "6px 8px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>

              <div style={{ marginBottom: "8px" }}>
                <strong>To Coach:</strong> {msg.to}
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Game:</strong> {msg.game}
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Character:</strong> {msg.character}
              </div>
              <div style={{ marginTop: "12px", padding: "12px", background: "#1a1a1a", borderRadius: "4px" }}>
                <strong>Your message:</strong>
                <p style={{ marginTop: "8px", marginBottom: 0 }}>{msg.message}</p>
              </div>

              {msg.reply ? (
                <div style={{ marginTop: "12px", padding: "12px", background: "#1a3a1a", borderRadius: "4px" }}>
                  <strong>Coach Reply:</strong>
                  <p style={{ marginTop: "8px", marginBottom: 0 }}>{msg.reply}</p>
                </div>
              ) : (
                <p style={{ opacity: 0.6, marginTop: "12px", fontStyle: "italic" }}>No reply yet</p>
              )}
            </li>
          ))}
        </ul> 
      )}
    </section>
  );
}