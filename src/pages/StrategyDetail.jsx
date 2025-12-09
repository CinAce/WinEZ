import { useParams, useNavigate } from "react-router-dom";
import { allStrategies } from "../data/games";
import { useState, useRef, useEffect } from "react";
import { getCurrentUser } from "../utils/auth";

export default function StrategyDetail() {
  const { game, name } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(0);
  const videoRef = useRef(null);
  const currentUser = getCurrentUser();

  // Find the strategy
  const strategy = allStrategies.find(
    s => s.game === decodeURIComponent(game) && s.name === decodeURIComponent(name)
  );

  // Jump to timestamp when video section changes
  useEffect(() => {
    if (videoRef.current && strategy?.videos?.[selectedVideo]?.timestamp !== undefined) {
      videoRef.current.currentTime = strategy.videos[selectedVideo].timestamp;
    }
  }, [selectedVideo, strategy]);

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

  const handleMessageCoach = () => {
    if (!currentUser) {
      alert("Please log in to message coaches");
      navigate('/login');
      return;
    }

    // Navigate to contact page with pre-filled data
    navigate('/contact', {
      state: {
        game: strategy.game,
        character: strategy.name
      }
    });
  };

  return (
    <section className="strategy-detail">
      <h2>{strategy.name} - {strategy.game}</h2>
      <p className="coach-name">Coach: {strategy.coach}</p>

      <button
        onClick={handleMessageCoach}
        style={{
          background: 'linear-gradient(135deg, #00ff0d, #00cc0a)',
          color: '#0d0d0d',
          border: 'none',
          padding: '0.8em 1.5em',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '1rem',
          boxShadow: '0 0 10px rgba(0, 255, 13, 0.3)',
          transition: 'all 0.3s ease',
          marginBottom: '1.5em',
          display: 'block',
          margin: '0 auto 1.5em auto'
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 0 20px rgba(0, 255, 13, 0.6)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 0 10px rgba(0, 255, 13, 0.3)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
         Message This Coach
      </button>

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

          {/* Video Player */}
          <div className="video-container">
            {strategy.videos[selectedVideo].youtubeId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${strategy.videos[selectedVideo].youtubeId}${
                  strategy.videos[selectedVideo].timestamp 
                    ? `?start=${strategy.videos[selectedVideo].timestamp}` 
                    : ''
                }`}
                title={strategy.videos[selectedVideo].section}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                ref={videoRef}
                width="100%"
                height="100%"
                controls
                src={strategy.videos[selectedVideo].videoFile}
              >
                Your browser does not support the video tag.
              </video>
            )}
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