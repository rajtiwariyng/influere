import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import { collaborationProfiles } from "../data/collaborationProfilesData";
import SliderDropdown from "../components/SliderDropdown";
import "../components/ConsultancyModals.css";
import "./ConsultancyCategoryPage.css";
import "./CollaborationPage.css";
import "./Wallet.css";

const CollaborationPage = () => {
  usePageTitle("Collaboration");
  const navigate = useNavigate();
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [workOrderName, setWorkOrderName] = useState("");
  const [workOrderDescription, setWorkOrderDescription] = useState("");
  const [workOrderFile, setWorkOrderFile] = useState(null);
  const [filters, setFilters] = useState({
    mentionInPost: 0,
    mentionInDescription: 0,
    repost: 0,
    mentionInContent: 0,
  });

  const handleProfileSelect = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWorkOrderFile(file);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleShowShortlisted = () => {
    if (selectedProfiles.length > 0) {
      const idsParam = selectedProfiles.join(",");
      navigate(`/dashboard/collaboration/shortlisted?ids=${idsParam}`);
    }
  };

  const handleWorkOrderSubmit = (e) => {
    e.preventDefault();
    // Handle work order submission
    console.log("Work Order:", {
      name: workOrderName,
      description: workOrderDescription,
      file: workOrderFile,
    });
  };

  return (
    <div className="admin-page consultancy-page collaboration-page">
      {/* Header with AI Badge */}
      <div className="collaboration-header mb-0 w-100">
        <div className="collaboration-header-content w-100">
          <h1 className="admin-page-title d-flex align-items-center gap-2 w-100">
            Collaborate{" "}
            <span className="ai-powered-badge">
              AI Powered | Create a work order and let AI find you the right
              person to work with.
            </span>
          </h1>
        </div>
      </div>
      {/* Work Order Form */}
      <div className="work-order-section">
        <p className="work-order-description">
          Create a work order that can be sent to collaborator's. Write a brief
          description of the work to get started.
        </p>
        <form onSubmit={handleWorkOrderSubmit} className="work-order-form">
          <div className="add-funds-section mb-0">
            <label className="form-label">Work Order Name/Number</label>
            <div className="form-input-group">
              <input
                type="text"
                placeholder="Enter"
                value={workOrderName}
                onChange={(e) => setWorkOrderName(e.target.value)}
              />
            </div>
          </div>

          <div className="add-funds-section mb-0">
            <label className="form-label">Brief description of the work</label>
            <div
              className="form-input-group"
              style={{ alignItems: "flex-start", minHeight: "100px" }}
            >
              <textarea
                placeholder="Enter"
                value={workOrderDescription}
                onChange={(e) => setWorkOrderDescription(e.target.value)}
                rows="4"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  padding: "0",
                  background: "transparent",
                  minHeight: "80px",
                }}
              />
            </div>
          </div>

          <div className="add-funds-section mb-0">
            <label className="form-label">Attachments</label>
            <div className="file-upload">
              <input
                type="file"
                id="workOrderFile"
                className="file-input"
                onChange={handleFileChange}
                multiple
              />
              <label htmlFor="workOrderFile" className="file-upload-label">
                <i className="bi bi-cloud-arrow-up"></i>
                <span>Upload</span>
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Section Title */}
      <div className="collaboration-section-title m-0 mt-2 mb-1">
        <h2>Look for collaborators in your price range.</h2>
      </div>

      {/* Filter Bar */}
      <div className="consultancy-filters">
        <SliderDropdown
          label="Mention in Post"
          placeholder="Select Value"
          min={0}
          max={1000000}
          step={1000}
          value={filters.mentionInPost}
          onChange={(value) => handleFilterChange("mentionInPost", value)}
        />

        <SliderDropdown
          label="Mention in description"
          placeholder="Select Value"
          min={0}
          max={1000000}
          step={1000}
          value={filters.mentionInDescription}
          onChange={(value) => handleFilterChange("mentionInDescription", value)}
        />

        <SliderDropdown
          label="Repost"
          placeholder="Select Value"
          min={0}
          max={1000000}
          step={1000}
          value={filters.repost}
          onChange={(value) => handleFilterChange("repost", value)}
        />

        <SliderDropdown
          label="Mention in Content"
          placeholder="Select Value"
          min={0}
          max={1000000}
          step={1000}
          value={filters.mentionInContent}
          onChange={(value) => handleFilterChange("mentionInContent", value)}
        />
      </div>

      {/* Collaborator Cards */}
      <div className="consultancy-grid">
        {collaborationProfiles.map((profile) => {
          const isSelected = selectedProfiles.includes(profile.id);
          return (
            <div
              key={profile.id}
              className={`consultancy-card collaboration-card ${
                isSelected ? "selected" : ""
              }`}
            >
              {/* Checkbox */}
              <div className="consultancy-card-header d-flex align-items-center">
                <div className="collaboration-card-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleProfileSelect(profile.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="consultancy-avatar">
                  <img src={profile.avatar} alt={profile.name} />
                </div>
                <div className="consultancy-card-meta">
                  <h3 className="consultancy-card-name">{profile.name}</h3>
                  <div className="consultancy-card-stats">
                    <span className="consultancy-reach">
                      {profile.reach} Reach
                    </span>
                    <span className="consultancy-rating">
                      {profile.ratingLabel}
                      <i className="bi bi-star-fill"></i>
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="consultancy-card-tags">
                {profile.partner && (
                  <span className="consultancy-tag">
                    <i className="bi bi-briefcase"></i>
                    {profile.partner}
                  </span>
                )}
                {profile.designation && (
                  <span className="consultancy-tag">
                    <i className="bi bi-award"></i>
                    {profile.designation}
                  </span>
                )}
                {profile.experience && (
                  <span className="consultancy-tag">
                    <i className="bi bi-buildings"></i>
                    {profile.experience}
                  </span>
                )}
                {profile.location && (
                  <span className="consultancy-tag">
                    <i className="bi bi-geo-alt"></i>
                    {profile.location}
                  </span>
                )}
              </div>

              <p className="consultancy-card-summary">{profile.summary}</p>

              {/* Asking Rates */}
              {profile.askingRates && (
                <div className="collaboration-asking-rates d-flex align-items-center gap-2">
                  <span className="asking-rates-title">Asking Rate:</span>
                  <div className="asking-rates-list d-flex align-items-center gap-2 flex-wrap">
                    {profile.askingRates.post && (
                      <div className="asking-rate-item">
                        <span className="asking-rate-label">Post:</span>
                        <span className="asking-rate-value">
                          {profile.askingRates.post}
                        </span>
                      </div>
                    )}
                    {profile.askingRates.repost && (
                      <div className="asking-rate-item">
                        <span className="asking-rate-label">Repost:</span>
                        <span className="asking-rate-value">
                          {profile.askingRates.repost}
                        </span>
                      </div>
                    )}
                    {profile.askingRates.retweet && (
                      <div className="asking-rate-item">
                        <span className="asking-rate-label">Retweet:</span>
                        <span className="asking-rate-value">
                          {profile.askingRates.retweet}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Send to Shortlisted Button */}
      {selectedProfiles.length > 0 && (
        <div className="collaboration-send-shortlisted">
          <button
            type="button"
            className="btn-dark collaboration-send-btn"
            onClick={handleShowShortlisted}
          >
            Send to shortlisted
          </button>
        </div>
      )}
    </div>
  );
};

export default CollaborationPage;
