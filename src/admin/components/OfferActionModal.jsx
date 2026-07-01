import React, { useState } from "react";
import "../pages/Wallet.css";

const COPY = {
  accept: {
    title: "Accept Offer",
    message: "Are you sure you want to accept this offer?",
    confirmLabel: "Accept",
    confirmClass: "btn-dark",
  },
  decline: {
    title: "Decline Offer",
    message: "Are you sure you want to decline this offer?",
    confirmLabel: "Decline",
    confirmClass: "btn-dark",
  },
  counter: {
    title: "Counter Offer",
    message: "Enter your counter offer amount for this profile.",
    confirmLabel: "Send Counter Offer",
    confirmClass: "btn-dark",
  },
};

const OfferActionModal = ({ show, action, row, onClose, onConfirm }) => {
  const [counterAmount, setCounterAmount] = useState("");

  if (!show || !action) {
    return null;
  }

  const copy = COPY[action] || COPY.accept;

  const handleConfirm = () => {
    onConfirm?.({ action, row, counterAmount });
    setCounterAmount("");
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

        <h2 className="modal-title">{copy.title}</h2>

        <p className="withdraw-label">
          {copy.message}
          {row?.profileName ? ` (${row.profileName})` : ""}
        </p>

        {action === "counter" && (
          <div className="add-funds-section">
            <label className="form-label">Counter Offer Amount</label>
            <div className="form-input-group">
              <input
                type="text"
                value={counterAmount}
                onChange={(event) => setCounterAmount(event.target.value)}
                placeholder="$"
              />
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button type="button" className={copy.confirmClass} onClick={handleConfirm}>
            {copy.confirmLabel}
          </button>
          <button type="button" className="btn-light" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferActionModal;
