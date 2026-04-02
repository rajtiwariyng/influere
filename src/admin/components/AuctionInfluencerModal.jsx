import React, { useState } from "react";
import "../pages/Wallet.css";

const AuctionInfluencerModal = ({ show, onClose }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [endsIn, setEndsIn] = useState("");

  if (!show) {
    return null;
  }

  const handleProceed = (e) => {
    e.preventDefault();
    // Handle proceed logic here
    console.log("Current Value:", currentValue);
    console.log("Ends In:", endsIn);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container add-funds-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>

        <h2 className="modal-title">Auction as Influencer</h2>

        <form onSubmit={handleProceed}>
          <div className="add-funds-section">
            <label className="form-label">Current Value</label>
            <div className="form-input-group">
              <input
                type="text"
                placeholder="Enter Value"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              />
            </div>
          </div>

          <div className="add-funds-section">
            <label className="form-label">Ends In</label>
            <div className="form-input-group">
              <input
                type="text"
                placeholder="Enter Value"
                value={endsIn}
                onChange={(e) => setEndsIn(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-dark">
              Proceed
            </button>
            <button type="button" className="btn-light" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuctionInfluencerModal;

