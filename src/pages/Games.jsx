import { useNavigate } from "react-router-dom";
import { gameCovers, allStrategies } from "../data/games";
import { useState } from "react";

export default function Games() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Include all games from gameCovers
  const gamesWithCounts = gameCovers.map(game => ({
    ...game,
    strategyCount: allStrategies.filter(s => s.game === game.name).length
  }));

  // Filter games by search term
  const filteredGames = gamesWithCounts.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (gameName, strategyCount) => {

    if (strategyCount > 0) {
      navigate(`/strategies?game=${encodeURIComponent(gameName)}`);
    }
  };

  return (
    <section className="games-page">
      <h2>Available Games</h2>
      <p className="games-subtitle">Select a game to view strategies</p>
      
      {/* Search Bar */}
      <div className="games-search-container">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="games-search-input"
        />
      </div>

      {filteredGames.length === 0 ? (
        <div className="empty-state">
          <p>No games found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="game-covers-grid">
          {filteredGames.map((game) => (
            <div
              key={game.name}
              className="game-cover-card"
              onClick={() => handleGameClick(game.name, game.strategyCount)}
              style={{ cursor: game.strategyCount > 0 ? 'pointer' : 'default' }}
            >
              <img src={game.cover} alt={game.name} className="game-cover-image" />
              <div className="game-cover-overlay">
                <h3>{game.name}</h3>
                {game.strategyCount > 0 ? (
                  <p>{game.strategyCount} {game.strategyCount === 1 ? 'Strategy' : 'Strategies'} Available</p>
                ) : (
                  <p style={{ color: '#00ff0d', fontWeight: 600, fontSize: '1.2rem' }}>Coming Soon</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}