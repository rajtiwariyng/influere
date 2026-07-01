import React, { useState } from "react";
import "./ConsultancyModals.css";

const SupportContactModal = ({ show, professional, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!show) {
    return null;
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support request:", { professional: professional?.name, ...formData });
    onClose();
  };

  return (
    <>
      <div
        className="modal-backdrop fade show consultancy-modal-backdrop"
        onClick={onClose}
      ></div>
      <div className="modal fade show consultancy-modal" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content consultancy-modal-content">
            <button type="button" className="consultancy-modal-close" onClick={onClose}>
              <i className="bi bi-x"></i>
            </button>
            <div className="consultancy-modal-body consultancy-booking-body">
              <h2 className="consultancy-booking-title">Contact Support</h2>
              <p className="consultancy-booking-subtitle">
                Have a question about {professional?.name || "this professional"}? Send
                our support team a message.
              </p>
              <form className="consultancy-booking-form" onSubmit={handleSubmit}>
                <label className="consultancy-booking-field">
                  <span>Name</span>
                  <input
                    type="text"
                    className="consultancy-text-input"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </label>

                <label className="consultancy-booking-field">
                  <span>Email</span>
                  <input
                    type="email"
                    className="consultancy-text-input"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </label>

                <label className="consultancy-booking-field">
                  <span>Message</span>
                  <textarea
                    className="consultancy-textarea"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="How can we help?"
                    rows="4"
                    required
                  />
                </label>
              </form>
            </div>
            <div className="modal-footer">
              <div className="consultancy-booking-actions">
                <button
                  type="button"
                  className="consultancy-submit primary-btn"
                  onClick={handleSubmit}
                >
                  Send
                </button>
                <button
                  type="button"
                  className="consultancy-cancel secondary-btn"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportContactModal;
