import { useState } from "react";
import { tekken8Characters } from "../data/games"; 
import { getCurrentUser } from "../utils/auth";

export default function Contact() {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedChar, setSelectedChar] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const currentUser = getCurrentUser();

  const games = [
    {id: "tekken8", name: "Tekken 8", characters: tekken8Characters}
  ];

  const characters = selectedGame
    ? games.find(g => g.id === selectedGame).characters
    : [];

  const safeParseMessages = () => {
    const raw = localStorage.getItem("messages");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("Contact: corrupted 'messages' in localStorage; resetting. Error:", err);
      return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentUser || !currentUser.username) {
      setError("You must be logged in to send a message.");
      return;
    }

    if (!selectedGame) {
      setError("Please select a game.");
      return;
    }

    if (!selectedChar) {
      setError("Please select a character.");
      return;
    }

    if (!message.trim()) {
      setError("Please write a message.");
      return;
    }

    const charData = characters.find(c => c.name === selectedChar);
    if (!charData) {
      setError("Please select a valid character.");
      return;
    }

    try {
      const coachUsername = charData.coachUsername || charData.coach || "coach";

      const allMessages = safeParseMessages();

      allMessages.push({
        from: currentUser.username,
        to: coachUsername,
        game: games.find(g => g.id === selectedGame)?.name || "",
        character: selectedChar,
        message: message.trim(),
        reply: null,
        timestamp: Date.now()
      });

      localStorage.setItem("messages", JSON.stringify(allMessages));



      window.dispatchEvent(new Event("messagesUpdated"));

      setSuccess("Message sent successfully!");
      setSelectedChar("");
      setSelectedGame("");
      setMessage("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again (check console).");
    }
  };
  
  return (
    <section className="contact">
      <h2>Contact a Coach</h2>
      {error && (
        <div style={{
          background: '#ff4d4d22',
          border: '1px solid #ff4d4d',
          padding: '1em',
          borderRadius: '8px',
          marginBottom: '1em',
          color: '#ff4d4d'
        }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{
          background: '#00ff0d22',
          border: '1px solid #00ff0d',
          padding: '1em',
          borderRadius: '8px',
          marginBottom: '1em',
          color: '#00ff0d'
        }}>
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <select
          value={selectedGame}
          onChange={(e) => {
            setSelectedGame(e.target.value);
            setSelectedChar(""); 
            setError("");
          }}
          required
        >
          <option value="">Select Game</option>
          {games.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          value={selectedChar}
          onChange={(e) => {
            setSelectedChar(e.target.value);
            setError("");
          }}
          required
          disabled={!selectedGame}
        >
          <option value="">Select Character</option>
          {characters.map((c, i) => (
            <option key={i} value={c.name}>
              {c.name} — Coach: {c.coach}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setError("");
          }}
          required
          minLength={10}
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}