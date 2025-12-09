import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { useEffect, useRef } from 'react';
import aiExample from '../assets/aiExample.mp4';
import coachingExample from '../assets/coachingExample.mp4';

export default function Home() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const aiVideoRef = useRef(null);
  const coachingVideoRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          // Start playing the video
          video.play().catch(err => console.log('Video play failed:', err));
        } else {
          // Pause and reset when out of view
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (aiVideoRef.current) {
      observer.observe(aiVideoRef.current);
    }
    if (coachingVideoRef.current) {
      observer.observe(coachingVideoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleExploreStrategies = () => {
    if (currentUser) {
      navigate('/strategies');
    } else {
      navigate('/signup');
    }
  };

  return (
    <section className="home-aurora">
      <h2>Welcome to WinEZ</h2>
      <p>
        Take your gaming to the next level. WinEZ offers strategies, tutorials, and 
        advanced tips for your favorite <b>Competitive Games</b>
      </p>
      <button className="cta" onClick={handleExploreStrategies}>Explore Strategies</button>

      <div className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="pros-grid">
          <div className="pro-item">
            <h3>Expert Coaches</h3>
            <p>Learn from top-ranked players with proven tournament experience</p>
          </div>
          <div className="pro-item">
            <h3>Personalized Strategies</h3>
            <p>Get custom game plans tailored to your playstyle and skill level</p>
          </div>
          <div className="pro-item">
            <h3>Real Results</h3>
            <p>Our students see measurable improvement in their gameplay</p>
          </div>
          <div className="pro-item">
            <h3>Community Support</h3>
            <p>Join a network of dedicated gamers improving together</p>
          </div>
        </div>
      </div>

      <div className="ai-section">
        <h2>AI Doesn't Give Reliable Results</h2>
        <div className="example-container">
          <video 
            ref={aiVideoRef}
            src={aiExample}
            className="example-gif"
            muted
            loop
            playsInline
          />
        </div>
      </div>

      <div className="coaching-section">
      <h2>Get Personalized Coaching for the Right Decision <span className="gold-text">Everytime</span></h2>        <div className="example-container">
          <video 
            ref={coachingVideoRef}
            src={coachingExample}
            className="example-gif"
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  );
}