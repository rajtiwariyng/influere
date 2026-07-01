import React, { useState } from "react";
import "./ConsultancyModals.css";

const ConsultancyBookingModal = ({ show, professional, onClose }) => {
  const [formData, setFormData] = useState({
    description: "",
    callType: "",
    callTime: "",
  });
  const [documentInputs, setDocumentInputs] = useState([{ id: 1, file: null }]);

  if (!show || !professional) {
    return null;
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (id, file) => {
    setDocumentInputs((prev) =>
      prev.map((input) => (input.id === id ? { ...input, file } : input))
    );
  };

  const addDocumentInput = () => {
    const newId = Math.max(...documentInputs.map((d) => d.id), 0) + 1;
    setDocumentInputs((prev) => [...prev, { id: newId, file: null }]);
  };

  const removeDocumentInput = (id) => {
    if (documentInputs.length > 1) {
      setDocumentInputs((prev) => prev.filter((input) => input.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form Data:", formData);
    console.log("Documents:", documentInputs);
    onClose();
  };

  return (
    <>
      <div
        className="modal-backdrop fade show consultancy-modal-backdrop"
        onClick={onClose}
      ></div>
      <div
        className="modal fade show consultancy-modal"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content consultancy-modal-content">
            <button
              type="button"
              className="consultancy-modal-close"
              onClick={onClose}
            >
              <i className="bi bi-x"></i>
            </button>
            <div className="consultancy-modal-body consultancy-booking-body">
              <h2 className="consultancy-booking-title">Book An Appointment</h2>
              <p className="consultancy-booking-subtitle">
                Fill the form to schedule a session with {professional.name}.
              </p>
              <form
                className="consultancy-booking-form"
                onSubmit={handleSubmit}
              >
                {/* Description Field */}
                <label className="consultancy-booking-field">
                  <span>Description</span>
                  <textarea
                    className="consultancy-textarea"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe what you need help with"
                    rows="4"
                    required
                  />
                </label>

                {/* Attachments Field - Multiple File Uploads */}
                <div className="consultancy-booking-field">
                  <span>Attachments</span>
                  <div className="consultancy-documents-container">
                    {documentInputs.map((input, index) => (
                      <div
                        key={input.id}
                        className="consultancy-document-input-wrapper"
                      >
                        <div className="consultancy-file-upload">
                          <input
                            type="file"
                            id={`document-${input.id}`}
                            className="consultancy-file-input"
                            onChange={(e) =>
                              handleFileChange(input.id, e.target.files[0])
                            }
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                          <label
                            htmlFor={`document-${input.id}`}
                            className="consultancy-file-label"
                          >
                            <i className="bi bi-cloud-upload"></i>
                            <span>
                              {input.file ? input.file.name : "Choose File"}
                            </span>
                          </label>
                        </div>
                        {documentInputs.length > 1 && (
                          <button
                            type="button"
                            className="consultancy-remove-doc-btn"
                            onClick={() => removeDocumentInput(input.id)}
                            aria-label="Remove document"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="consultancy-add-doc-btn"
                      onClick={addDocumentInput}
                    >
                      <i className="bi bi-plus"></i> Add More
                    </button>
                  </div>
                </div>

                {/* Schedule a voice/video call (optional) */}
                <label className="consultancy-booking-field">
                  <span>Schedule a voice/video call (optional)</span>
                  <div className="consultancy-select">
                    <select
                      value={formData.callType}
                      onChange={(e) =>
                        handleInputChange("callType", e.target.value)
                      }
                    >
                      <option value="">No call needed</option>
                      <option value="voice-call">Voice Call</option>
                      <option value="video-call">Video Call</option>
                    </select>
                    <span className="consultancy-select-caret">
                      <i className="bi bi-chevron-down"></i>
                    </span>
                  </div>
                  {formData.callType && (
                    <input
                      type="datetime-local"
                      className="consultancy-text-input mt-2"
                      value={formData.callTime}
                      onChange={(e) =>
                        handleInputChange("callTime", e.target.value)
                      }
                    />
                  )}
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
                  Submit
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

export default ConsultancyBookingModal;
