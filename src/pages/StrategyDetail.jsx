import { useParams, useNavigate } from "react-router-dom";
import { allStrategies } from "../data/games";
import { useState } from "react";

export default function StrategyDetail() {
  const { game, name } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(0);

  // Find the strategy
  const strategy = allStrategies.find(
    s => s.game === decodeURIComponent(game) && s.name === decodeURIComponent(name)
  );

  if (!strategy) {
    return (
      <section>
        <h2>Strategy Not Found</h2>
        <button onClick={() => navigate("/strategies")}>Return to Strategies</button>
      </section>
    );
  }

  // Check if videos are available
  const hasVideos = strategy.videos && strategy.videos.length > 0;

  return (
    <section className="strategy-detail">
      <h2>{strategy.name} - {strategy.game}</h2>
      <p className="coach-name">Coach: {strategy.coach}</p>

      {hasVideos ? (
        <>
          {/* Video Section Selector */}
          <div className="video-sections">
            {strategy.videos.map((video, index) => (
              <button
                key={index}
                className={`section-btn ${selectedVideo === index ? 'active' : ''}`}
                onClick={() => setSelectedVideo(index)}
              >
                {video.section}
              </button>
            ))}
          </div>

          {/* YouTube Video Player */}
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${strategy.videos[selectedVideo].youtubeId}`}
              title={strategy.videos[selectedVideo].section}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </>
      ) : (
        <div className="coming-soon">
          <p>A Coach is Still Working on This Gameplan</p>
          <p className="stay-tuned">Stay Tuned</p>
        </div>
      )}

      <button onClick={() => navigate("/strategies")} style={{ marginTop: "2em" }}>
        Return to Strategies
      </button>
    </section>
  );
}