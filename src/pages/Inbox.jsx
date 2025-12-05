import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMessages = () => {
      setLoading(true);
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          setMessages([]);
          setError("You must be logged in to view the inbox.");
          setLoading(false);
          return;
        }
        if (currentUser.role !== "coach") {
          setMessages([]);
          setError("You must be a coach to view the inbox.");
          setLoading(false);
          return;
        }

        const allMessages = JSON.parse(localStorage.getItem("messages")) || [];

        const coachMessages = allMessages.filter(
          (msg) => msg.to === currentUser.username && !(msg.hiddenFrom || []).includes(currentUser.username)
        );
        setMessages(coachMessages);
        setError("");
      } catch (err) {
        console.error("Failed to load messages:", err);
        setError("Failed to load messages. Please refresh the page.");
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

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

  function sendReply(index) {
    const replyContent = replyTexts[index];

    if (!replyContent || replyContent.trim() === "") {
      alert("Please write a reply before sending.");
      return;
    }

    try {
      const allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const msg = messages[index];

      const realIndex = allMessages.findIndex((m) => m.timestamp === msg.timestamp);

      if (realIndex !== -1) {
        allMessages[realIndex].reply = replyContent;
        localStorage.setItem("messages", JSON.stringify(allMessages));
      }

      const updated = [...messages];
      updated[index].reply = replyContent;
      setMessages(updated);

      setReplyTexts((prev) => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });

      window.dispatchEvent(new Event("messagesUpdated"));

      alert("Reply sent!");
    } catch (err) {
      console.error("Failed to send reply:", err);
      alert("Failed to send reply. Please try again.");
    }
  }

  function handleReplyChange(index, value) {
    setReplyTexts((prev) => ({
      ...prev,
      [index]: value
    }));
  }


  function deleteMessage(index) {
    if (!confirm("Are you sure you want to delete this message from your inbox?")) return;
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) return;

      const msg = messages[index];
      if (!msg) return;

      const allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const realIndex = allMessages.findIndex((m) => m.timestamp === msg.timestamp);

      if (realIndex !== -1) {
        const stored = allMessages[realIndex];
        stored.hiddenFrom = Array.isArray(stored.hiddenFrom) ? stored.hiddenFrom.slice() : [];
        if (!stored.hiddenFrom.includes(currentUser.username)) {
          stored.hiddenFrom.push(currentUser.username);
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
    if (!confirm("Are you sure you want to delete ALL messages in your inbox? This only hides them for you.")) return;
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) return;

      const allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const updatedAll = allMessages.map((m) => {
        if (m.to === currentUser.username) {
          const copy = { ...m };
          copy.hiddenFrom = Array.isArray(copy.hiddenFrom) ? copy.hiddenFrom.slice() : [];
          if (!copy.hiddenFrom.includes(currentUser.username)) {
            copy.hiddenFrom.push(currentUser.username);
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

  if (loading) {
    return (
      <section className="inbox">
        <h2>Coach Inbox</h2>
        <p>Loading messages...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="inbox">
        <h2>Coach Inbox</h2>
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }

  return (
    <section className="inbox">
      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <span>Coach Inbox</span>
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
          <p>No messages yet.</p>
          <p style={{ fontSize: "0.9em", opacity: 0.7 }}>Messages from players will appear here.</p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {messages.map((msg, index) => (
            <li
              key={msg.timestamp || index}
              className="message"
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
                  onClick={() => deleteMessage(index)}
                  title="Hide this message for you"
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
                <strong>From:</strong> {msg.from}
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Game:</strong> {msg.game}
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Character:</strong> {msg.character}
              </div>
              <div style={{ marginTop: "12px", padding: "12px", background: "#1a1a1a", borderRadius: "4px" }}>
                <strong>Message:</strong>
                <p style={{ marginTop: "8px", marginBottom: 0 }}>{msg.message}</p>
              </div>

              {msg.reply ? (
                <div style={{ marginTop: "12px", padding: "12px", background: "#1a3a1a", borderRadius: "4px" }}>
                  <strong>Your Reply:</strong>
                  <p style={{ marginTop: "8px", marginBottom: 0 }}>{msg.reply}</p>
                </div>
              ) : (
                <div style={{ marginTop: "16px" }}>
                  <label htmlFor={`reply-${index}`} style={{ display: "block", marginBottom: "8px" }}>
                    <strong>Write a reply:</strong>
                  </label>
                  <textarea
                    id={`reply-${index}`}
                    placeholder="Write your reply here..."
                    value={replyTexts[index] || ""}
                    onChange={(e) => handleReplyChange(index, e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: "80px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #444",
                      background: "#1a1a1a",
                      color: "#f5f5f5",
                      fontFamily: "inherit",
                      resize: "vertical"
                    }}
                  />

                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={() => sendReply(index)} style={{ marginTop: "0" }}>
                      Send Reply
                    </button>
                    <button
                      onClick={() => deleteMessage(index)}
                      style={{
                        background: "#444",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}