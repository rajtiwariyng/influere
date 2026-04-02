import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import './WelcomeScreen.css';
import cardIcon from '../../assets/card-icon.svg';

const WelcomeScreen = ({ userName = "Sonam" }) => {
  usePageTitle("Welcome");
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleUpdateProfile = () => {
    // Handle update profile action
    console.log('Update Profile clicked');
  };

  const handleGetStarted = (feature) => {
    // Handle get started action
    console.log(`Get Started clicked for ${feature}`);
  };

  return (
    <div className="welcome-screen">
      {/* Header Section */}
      <div className="welcome-header">
        <h1 className="welcome-title">Welcome to your Dashboard, {userName}!</h1>
        <p className="welcome-subtitle">
          Your dashboard is ready — let's get you started on your journey.
        </p>
      </div>

      {/* Setup Card */}
      <div className="welcome-setup-card">
        <div className="setup-card-content">
          <div className="setup-card-text">
            <h2 className="setup-card-title">Let's Get You Set Up!</h2>
            <p className="setup-card-description w-50">
              Add your details to complete your profile and make the most of your journey with us.
            </p>
            <button 
              className="setup-card-button"
              onClick={handleUpdateProfile}
            >
              Update Your Profile
            </button>
          </div>
        </div>
      </div>

      {/* Explore More Features Section */}
      <div className="welcome-features-section">
        <h2 className="features-section-title">Explore More Feature</h2>
        
        <div className="features-cards">
          <div className="feature-card">
            <div className="feature-card-icon">
              <img 
                src={cardIcon} 
                alt="Profile Buy or Sell Icon"
                className="feature-icon-img"
              />
            </div>
            <h3 className="feature-card-title">Profile Buy or Sell</h3>
            <p className="feature-card-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <button 
              className="feature-card-link"
              onClick={() => handleGetStarted('Profile Buy or Sell')}
            >
              Get Started →
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon">
              <img 
                src={cardIcon} 
                alt="Discount & Offer Icon"
                className="feature-icon-img"
              />
            </div>
            <h3 className="feature-card-title">Get Discount & Offer</h3>
            <p className="feature-card-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <button 
              className="feature-card-link"
              onClick={() => handleGetStarted('Get Discount & Offer')}
            >
              Get Started →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
