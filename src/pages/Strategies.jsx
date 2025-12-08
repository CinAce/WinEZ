import React, { useState, useEffect, useRef } from "react";
import { allStrategies } from "../data/games";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function Strategies() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get game filter from URL
  const searchParams = new URLSearchParams(location.search);
  const gameFilter = searchParams.get("game");
  
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showCoachInfo, setShowCoachInfo] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [gifTimestamps, setGifTimestamps] = useState({});
  const [sortOrder, setSortOrder] = useState("popular");
  const scrollTimerRef = useRef({});

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

  const handleMouseEnter = (cardId) => {
    setHoverIndex(cardId);
    
    if (scrollTimerRef.current[cardId]) {
      clearInterval(scrollTimerRef.current[cardId]);
    }
    
    scrollTimerRef.current[cardId] = setInterval(() => {
      setShowCoachInfo(prev => ({
        ...prev,
        [cardId]: !prev[cardId]
      }));
    }, 3000);
  };

  const handleMouseLeave = (cardId) => {
    setHoverIndex(null);
    
    if (scrollTimerRef.current[cardId]) {
      clearInterval(scrollTimerRef.current[cardId]);
      delete scrollTimerRef.current[cardId];
    }
    
    setShowCoachInfo(prev => {
      const updated = { ...prev };
      delete updated[cardId];
      return updated;
    });
  };
  
  useEffect(() => {
    return () => {
      Object.values(scrollTimerRef.current).forEach(timer => clearInterval(timer));
    };
  }, []);

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

  // Filter strategies by game if URL param exists
  const displayStrategies = gameFilter 
    ? allStrategies.filter(s => s.game === gameFilter)
    : allStrategies;

  // Get games from filtered strategies
  const games = [...new Set(displayStrategies.map(s => s.game))];
  const gamesCounts = games.map(game => ({
    name: game,
    count: displayStrategies.filter(s => s.game === game).length
  }));

  // Sort games
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
      {gameFilter && (
        <button 
          onClick={() => navigate('/strategies')} 
          style={{ 
            marginBottom: '1em',
            background: '#202020',
            border: '2px solid #00ff0d',
            padding: '0.6em 1.2em',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#fff',
            fontSize: '1rem'
          }}
        >
          ← Back to All Games
        </button>
      )}
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>{gameFilter || 'All Strategies'}</h2>
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
        const gameStrategies = displayStrategies.filter(s => s.game === game);
        return (
          <div key={game} className="game-section">
            <h3 style={{ marginTop: 0 }}>{game}</h3>
            <div className="items-grid">
              {gameStrategies.map((char, index) => {
                const cardId = `${game}-${index}`;
                const isShowingCoachInfo = showCoachInfo[cardId];

                return (
                  <div
                    key={cardId}
                    className="strategy-card"
                    onClick={() => navigate(`/strategy/${encodeURIComponent(char.game)}/${encodeURIComponent(char.name)}`)}
                    onMouseEnter={() => handleMouseEnter(cardId)}
                    onMouseLeave={() => handleMouseLeave(cardId)}
                  >
                    <img
                      src={char.image}
                      alt={char.name}
                      className="card-bg"
                    />
                    <div className={`overlay ${isShowingCoachInfo ? "long-hover" : ""}`}>
                      <div className={`fade-content ${isShowingCoachInfo ? "hidden" : "visible"}`}>
                        <ul>
                          {char.strategies.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={`fade-content ${isShowingCoachInfo ? "visible" : "hidden"}`}>
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