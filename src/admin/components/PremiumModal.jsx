import React from 'react';
import './PremiumModal.css';

const PremiumModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
      ></div>
      
      {/* Bootstrap Modal */}
      <div 
        className="modal fade show premium-modal" 
        style={{ display: 'block' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button 
              type="button" 
              className="premium-modal-close" 
              onClick={onClose}
              aria-label="Close"
            >
              <i className="bi bi-x"></i>
            </button>
            <div className="modal-body premium-modal-body">
              <h2 className="premium-modal-title">Unlock Your Full Potential!</h2>
              <div className="premium-modal-divider"></div>
              <p className="premium-modal-text">
                You've discovered a <strong>premium feature</strong> 🎉 - upgrade now to explore the complete power of your dashboard.
              </p>
              <button className="premium-modal-button" onClick={onClose}>
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumModal;

