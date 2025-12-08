import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

export default function Home() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleExploreStrategies = () => {
    if (currentUser) {
      navigate('/strategies');
    } else {
      // Redirect to login page
      navigate('/signup');
      // Or if you want to show an alert first:
      // alert('Please log in to view strategies');
      // navigate('/login');
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
        <div className="video-placeholder">
          <p>Video Placeholder</p>
        </div>
      </div>

      <div className="coaching-section">
        <h2>Our Personalized Coaching Experience Makes Sure You Choose the Right Option Everytime</h2>
        <div className="video-placeholder">
          <p>Video Placeholder</p>
        </div>
      </div>
    </section>
  );
}