import React, { useState } from "react";
import "./ConsultancyModals.css";

const ConsultancyBookingModal = ({ show, professional, onClose }) => {
  const [formData, setFormData] = useState({
    requirement: "",
    time: "",
    subject: "",
    comments: "",
    reference: "",
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
                {/* Requirement Field */}
                <label className="consultancy-booking-field">
                  <span>Requirement</span>
                  <select
                    className="consultancy-select"
                    value={formData.requirement}
                    onChange={(e) =>
                      handleInputChange("requirement", e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="consultation">Consultation</option>
                    <option value="filling-litigation-advice">
                      Filling/Litigation/Advice
                    </option>
                    <option value="others">Others</option>
                  </select>
                  <span className="consultancy-select-caret">
                  </span>
                </label>

                {/* Time Field */}
                <label className="consultancy-booking-field">
                  <span>Time</span>
                    <select className="consultancy-select"
                      value={formData.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        Select Value
                      </option>
                      <option value="15">15 min</option>
                      <option value="30">30 min</option>
                      <option value="60">60 min</option>
                    </select>
                    <span className="consultancy-select-caret">
                    </span>
                </label>

                {/* Subject Field - Text Input */}
                <label className="consultancy-booking-field">
                  <span>Subject</span>
                  <input
                    type="text"
                    className="consultancy-text-input"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    placeholder="Enter subject"
                    required
                  />
                </label>

                {/* Comments Field - Text Input */}
                <label className="consultancy-booking-field">
                  <span>Comments</span>
                  <textarea
                    className="consultancy-textarea"
                    value={formData.comments}
                    onChange={(e) =>
                      handleInputChange("comments", e.target.value)
                    }
                    placeholder="Enter comments"
                    rows="4"
                    required
                  />
                </label>

                {/* Documents Field - Multiple File Uploads */}
                <div className="consultancy-booking-field">
                  <span>Documents</span>
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

                {/* Reference For Communication Field */}
                <label className="consultancy-booking-field">
                  <span>Reference For Communication</span>
                  <div className="consultancy-select">
                    <select
                      value={formData.reference}
                      onChange={(e) =>
                        handleInputChange("reference", e.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        Select Value
                      </option>
                      <option value="chat">Chat</option>
                      <option value="video-call">Video Call</option>
                      <option value="normal-call">Normal Call</option>
                      <option value="email">Email</option>
                    </select>
                    <span className="consultancy-select-caret">
                      <i className="bi bi-chevron-down"></i>
                    </span>
                  </div>
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
