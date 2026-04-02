import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessModal.css';

const SuccessModal = ({ membershipDetails, onClose }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-modal-overlay">
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-modal-content">
          <div className="success-icon-large">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--success-500)" strokeWidth="2" fill="var(--success-50)"/>
              <path d="M9 12l2 2 4-4" stroke="var(--success-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 className="success-modal-title">Thank You!</h2>
          <p className="success-modal-message">
            Your registration has been completed successfully. 
            {membershipDetails.price === 0 
              ? ' You can now start using our basic features.' 
              : ` Your payment of $${membershipDetails.price.toFixed(2)} has been processed successfully. You now have access to all premium features.`
            }
          </p>

          <div className="success-plan-summary">
            <div className="success-plan-card">
              <h4 className="success-plan-name m-0">{membershipDetails.name}</h4>
              <p className="success-plan-price">
                {membershipDetails.price === 0 ? (
                  'Free'
                ) : (
                  <>${membershipDetails.price.toFixed(2)}<span className="price-period">/Yearly</span></>
                )}
              </p>
            </div>
          </div>

          <div className="success-modal-actions">
            <p className="success-redirect-message">
              Redirecting to home page in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
            <button type="button" className="btn btn-primary" onClick={handleGoToHome}>
              Go to Home Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

