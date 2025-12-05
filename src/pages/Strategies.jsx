import React, { useState, useEffect, useRef } from "react";
import { allStrategies } from "../data/games";
import { Link } from "react-router-dom";

export default function Strategies() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverLongIndex, setHoverLongIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [gifTimestamps, setGifTimestamps] = useState({});
  const [sortOrder, setSortOrder] = useState("popular");
  const hoverTimerRef = useRef(null);

  const LONG_HOVER_MS = 1000;

  const difficultyColors = {
    Beginner: "green",
    Intermediate: "yellow",
    Challenging: "Orange",
    Specialist: "Red",
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);

    const timestamps = {};
    allStrategies.forEach((char, index) => {
      timestamps[index] = Date.now();
    });
    setGifTimestamps(timestamps);
  }, []);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    hoverTimerRef.current = setTimeout(() => {
      setHoverLongIndex(index);
      hoverTimerRef.current = null;
    }, LONG_HOVER_MS);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    setHoverLongIndex(null);

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const toggleFavorite = (charName) => {
    let updated;
    if (favorites.includes(charName)) {
      updated = favorites.filter((f) => f !== charName);
    } else {
      updated = [...favorites, charName];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorited = (charName) => favorites.includes(charName);


  const games = [...new Set(allStrategies.map(s => s.game))];
  const gamesCounts = games.map(game => ({
    name: game,
    count: allStrategies.filter(s => s.game === game).length
  }));


  let sortedGames;
  if (sortOrder === "popular") {
    sortedGames = gamesCounts.sort((a, b) => b.count - a.count).map(g => g.name);
  } else if (sortOrder === "a-z") {
    sortedGames = gamesCounts.sort((a, b) => a.name.localeCompare(b.name)).map(g => g.name);
  } else {
    sortedGames = gamesCounts.sort((a, b) => b.name.localeCompare(a.name)).map(g => g.name);
  }

  return (
    <section className="strategies-page">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>Strategies</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label htmlFor="sort-select" style={{ fontWeight: "bold" }}>Sort by Game:</label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: "0.5em 0.8em",
              borderRadius: "6px",
              border: "1px solid #444",
              background: "#1a1a1a",
              color: "#f5f5f5",
              cursor: "pointer"
            }}
          >
            <option value="popular">Most Popular</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      {sortedGames.map(game => {
        const gameStrategies = allStrategies.filter(s => s.game === game);
        return (
          <div key={game} className="game-section">
            <h3 style={{ marginTop: 0 }}>{game}</h3>
            <div className="items-grid">
              {gameStrategies.map((char, index) => {
                const isLongHovered = hoverLongIndex === `${game}-${index}`;

                return (
                  <div
                    key={`${game}-${index}`}
                    className="strategy-card"
                    onMouseEnter={() => handleMouseEnter(`${game}-${index}`)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={char.image}
                      alt={char.name}
                      className="card-bg"
                    />
                    <div className={`overlay ${isLongHovered ? "long-hover" : ""}`}>
                      <div className={`fade-content ${isLongHovered ? "hidden" : "visible"}`}>
                        <ul>
                          {char.strategies.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={`fade-content ${isLongHovered ? "visible" : "hidden"}`}>
                        <div className="coach-info">
                          <Link to="/team" className="coach-link">
                            <p style={{ display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
                              <strong>Coach:</strong> {char.coach}
                            </p>
                          </Link>

                          <p style={{ margin: "6px 0 0 0" }}>
                            <strong>Difficulty:</strong>{" "}
                            <span style={{ color: difficultyColors[char.difficulty] || "#fff", fontWeight: "bold" }}>
                              {char.difficulty}
                            </span>
                          </p>

                          {char.rankImage && (
                            <p className="rank-row">
                              <img
                                src={char.rankImage}
                                alt={char.rank ? `${char.rank} icon` : "Rank icon"}
                                className="rank-image"
                              />
                              {char.rank && <span className="rank-text">{char.rank}</span>}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <span className="card-label">{char.name}</span>

                      <i
                        className={`favorite-icon fa-heart ${isFavorited(char.name) ? "fa-solid filled" : "fa-regular"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(char.name);
                        }}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}