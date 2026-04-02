import React from "react";
import "./ProfileSellModal.css";

const platforms = ["Instagram", "Facebook", "Twitter", "YouTube", "TikTok"];

const FakeProfileReportModal = ({ show, onClose }) => {
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

        <h2 className="modal-title">Report Profile</h2>

        <div className="add-funds-section">
          <label className="form-label">Select Platform</label>
          <div>
            <select defaultValue="" className="w-100 form-input-group">
              <option value="" disabled>
                Value
              </option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="add-funds-section">
          <label className="form-label">Link of Profile / Post</label>
          <div className="form-input-group">
            <input
              type="text"
              defaultValue="https://instagram.com/username/postname"
            />
          </div>
        </div>

        <div className="add-funds-section">
          <label className="form-label">Posts</label>
          <div className="form-input-group">
            <input type="number" placeholder="Number of Posts" />
          </div>
        </div>

        <div className="add-funds-section">
          <label className="form-label">Explanation</label>
          <div>
            <textarea  className="w-100 form-input-group"
              rows={3}
              defaultValue="Lorem Ipsum is simply dummy text of the printing and typeset.."
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-dark">
            Proceed
          </button>
          <button type="button" className="btn-light" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FakeProfileReportModal;
