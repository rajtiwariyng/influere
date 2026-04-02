import React, { useState } from "react";
import "../pages/Wallet.css";

const AuctionCollaboratorModal = ({ show, onClose }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [daysChecked, setDaysChecked] = useState(false);
  const [hoursChecked, setHoursChecked] = useState(false);

  if (!show) {
    return null;
  }

  const handleProceed = (e) => {
    e.preventDefault();
    // Handle proceed logic here
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);
    console.log("Days:", daysChecked);
    console.log("Hours:", hoursChecked);
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

        <h2 className="modal-title">Auction as Collaborator</h2>

        <form onSubmit={handleProceed}>
          <div className="add-funds-section">
            <label className="form-label">Price bid</label>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div className="form-input-group" style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <span style={{ color: "var(--admin-gray-500)", fontSize: "14px" }}>to</span>
              <div className="form-input-group" style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="add-funds-section">
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "var(--admin-gray-900)", margin: 0 }}>
                <input
                  type="checkbox"
                  checked={daysChecked}
                  onChange={(e) => setDaysChecked(e.target.checked)}
                  style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "var(--admin-primary-600)" }}
                />
                <span>Days</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "var(--admin-gray-900)", margin: 0 }}>
                <input
                  type="checkbox"
                  checked={hoursChecked}
                  onChange={(e) => setHoursChecked(e.target.checked)}
                  style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "var(--admin-primary-600)" }}
                />
                <span>Hours</span>
              </label>
            </div>
            <p style={{ fontSize: "12px", color: "var(--admin-gray-500)", margin: "8px 0 0 0" }}>
              ( If no one bid, auction gets cancelled. )
            </p>
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

export default AuctionCollaboratorModal;

