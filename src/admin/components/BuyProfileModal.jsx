import React, { useState } from "react";
import "../pages/Wallet.css";

const BuyProfileModal = ({ show, profile, onClose }) => {
  const [mode, setMode] = useState(null); // null | 'buy' | 'offer'
  const [offerAmount, setOfferAmount] = useState("");

  if (!show) {
    return null;
  }

  const close = () => {
    setMode(null);
    setOfferAmount("");
    onClose?.();
  };

  return (
    <div className="modal-overlay" onClick={close}>
      <div
        className="modal-container add-funds-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={close}>
          <i className="bi bi-x"></i>
        </button>

        <h2 className="modal-title">Buy Profile</h2>
        <p className="withdraw-label">
          {profile?.name}
          {profile?.askingPrice ? ` — Asking Price: ${profile.askingPrice}` : ""}
        </p>

        {mode === "offer" && (
          <div className="add-funds-section">
            <label className="form-label">Your Offer Amount</label>
            <div className="form-input-group">
              <input
                type="text"
                value={offerAmount}
                onChange={(event) => setOfferAmount(event.target.value)}
                placeholder="$"
              />
            </div>
          </div>
        )}

        <div className="modal-footer">
          {mode === "offer" ? (
            <button type="button" className="btn-dark" onClick={close}>
              Send Offer
            </button>
          ) : (
            <>
              <button type="button" className="btn-dark" onClick={close}>
                Buy
              </button>
              <button
                type="button"
                className="btn-light"
                onClick={() => setMode("offer")}
              >
                Make Offer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyProfileModal;
