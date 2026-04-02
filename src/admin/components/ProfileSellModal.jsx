import React, { useMemo, useState } from "react";
import "../pages/Wallet.css";

const PLATFORM_OPTIONS = [
  "YouTube",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "TikTok",
];

const SLIDER_MIN = 100;
const SLIDER_MAX = 1000;

const ProfileSellModal = ({ show, onClose }) => {
  const [platform, setPlatform] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [minSliderValue, setMinSliderValue] = useState(300);
  const [maxSliderValue, setMaxSliderValue] = useState(700);
  const [minAmount, setMinAmount] = useState("$300");
  const [maxAmount, setMaxAmount] = useState("$700");

  const minSliderProgress = useMemo(() => {
    return ((minSliderValue - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
  }, [minSliderValue]);

  const maxSliderProgress = useMemo(() => {
    return ((maxSliderValue - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
  }, [maxSliderValue]);

  const formatSliderLabel = (value) => {
    if (value >= 1000) {
      return "1M";
    }
    return `${Math.round(value / 10)}0k`;
  };

  const handleMinSliderChange = (event) => {
    const value = Number(event.target.value);
    if (value <= maxSliderValue) {
      setMinSliderValue(value);
      setMinAmount(`$${value}`);
    }
  };

  const handleMaxSliderChange = (event) => {
    const value = Number(event.target.value);
    if (value >= minSliderValue) {
      setMaxSliderValue(value);
      setMaxAmount(`$${value}`);
    }
  };

  const handleMinAmountChange = (event) => {
    const value = event.target.value;
    setMinAmount(value);
    // Extract numeric value and update slider if valid
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue) && numValue >= SLIDER_MIN && numValue <= SLIDER_MAX && numValue <= maxSliderValue) {
      setMinSliderValue(numValue);
    }
  };

  const handleMaxAmountChange = (event) => {
    const value = event.target.value;
    setMaxAmount(value);
    // Extract numeric value and update slider if valid
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue) && numValue >= SLIDER_MIN && numValue <= SLIDER_MAX && numValue >= minSliderValue) {
      setMaxSliderValue(numValue);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container add-funds-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>

        <h2 className="modal-title">Sell Profile</h2>

        <div className="add-funds-section">
          <label className="form-label">Select Platform</label>
          <div className="">
            <select className=" w-100 form-input-group"
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
            >
              {PLATFORM_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="add-funds-section">
          <label className="form-label">Profile URL</label>
          <div className="form-input-group">
            <input
              type="text"
              value={profileUrl}
              onChange={(event) => setProfileUrl(event.target.value)}
            placeholder="https://www.youtube.com/@username" />
          </div>
        </div>

        <p className="withdraw-label" style={{ marginTop: "-8px" }}>
          Sell:- You may enter a fixed price or select a range
        </p>

        <div className="add-funds-section">
          <label className="form-label">Amount</label>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div className="form-input-group" style={{ flex: 1 }}>
              <input
                type="text"
                value={minAmount}
                onChange={handleMinAmountChange}
                placeholder="Min Amount"
              />
            </div>
            <span style={{ color: "var(--admin-gray-500)", fontSize: "14px" }}>to</span>
            <div className="form-input-group" style={{ flex: 1 }}>
              <input
                type="text"
                value={maxAmount}
                onChange={handleMaxAmountChange}
                placeholder="Max Amount"
              />
            </div>
          </div>
        </div>

        <div className="add-funds-section">
          <label className="form-label">Suggested Range</label>
          <div className="sell-range-wrapper" style={{ position: "relative", paddingTop: "24px", paddingBottom: "12px" }}>
            <input
              type="range"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              value={minSliderValue}
              onChange={handleMinSliderChange}
              className="sell-range-input"
              style={{ position: "absolute", width: "100%", zIndex: minSliderValue > maxSliderValue - 50 ? 3 : 1 }}
            />
            <input
              type="range"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              value={maxSliderValue}
              onChange={handleMaxSliderChange}
              className="sell-range-input"
              style={{ position: "absolute", width: "100%", zIndex: maxSliderValue < minSliderValue + 50 ? 3 : 2 }}
            />
            <div className="sell-range-value" style={{ left: `${minSliderProgress}%`, top: "-16px", zIndex: 4 }}>
              {formatSliderLabel(minSliderValue)}
            </div>
            <div className="sell-range-value" style={{ left: `${maxSliderProgress}%`, top: "-16px", zIndex: 4 }}>
              {formatSliderLabel(maxSliderValue)}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-dark">
            Submit
          </button>
          <button type="button" className="btn-light" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSellModal;
