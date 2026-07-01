import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import { collaborationProfiles } from "../data/collaborationProfilesData";
import SliderDropdown from "../components/SliderDropdown";
import "../components/ConsultancyModals.css";
import "./ConsultancyCategoryPage.css";
import "./CollaborationPage.css";
import "./Wallet.css";

// Per-platform labels, copy and metric naming (#18).
const PLATFORM_CONFIG = {
  facebook: {
    label: "Facebook",
    countLabels: { posts: "Posts", followers: "Followers", following: "Following" },
    repostLabel: "Shares",
    rateUnit: "/ post",
    description:
      "Facebook creators with engaged communities, ideal for page collaborations, sponsored posts and shared campaigns.",
  },
  twitter: {
    label: "Twitter",
    countLabels: { posts: "Tweets", followers: "Followers", following: "Following" },
    repostLabel: "Retweets",
    rateUnit: "/ tweet",
    description:
      "Twitter voices with strong reach and conversation, great for real-time promotion, threads and retweet campaigns.",
  },
  youtube: {
    label: "YouTube",
    countLabels: { posts: "Videos", followers: "Subscribers", following: "Subscriptions" },
    repostLabel: "Shares",
    rateUnit: "/ video",
    description:
      "YouTube creators with loyal subscribers, perfect for product reviews, integrations and long-form sponsorships.",
  },
  linkedin: {
    label: "LinkedIn",
    countLabels: { posts: "Posts", followers: "Followers", following: "Connections" },
    repostLabel: "Reposts",
    rateUnit: "/ post",
    description:
      "LinkedIn professionals with industry influence, ideal for B2B thought-leadership and brand-credibility campaigns.",
  },
  tiktok: {
    label: "TikTok",
    countLabels: { posts: "Videos", followers: "Followers", following: "Following" },
    repostLabel: "Reposts",
    rateUnit: "/ video",
    description:
      "TikTok creators with viral potential, ideal for short-form trends, challenges and product-led storytelling.",
  },
  instagram: {
    label: "Instagram",
    countLabels: { posts: "Posts", followers: "Followers", following: "Following" },
    repostLabel: "Reshares",
    rateUnit: "/ post",
    description:
      "Instagram creators with visual-first audiences, perfect for reels, stories and feed collaborations.",
  },
};

const DEFAULT_PLATFORM = {
  label: "Collaboration",
  countLabels: { posts: "Posts", followers: "Followers", following: "Following" },
  repostLabel: "Reposts",
  rateUnit: "/ post",
  description:
    "Active content creators with a highly engaged audience across their social platform.",
};

const CollaborationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const platformKey = location.pathname.split("/")[3]?.toLowerCase();
  const platform =
    Object.keys(PLATFORM_CONFIG).find((k) => k === platformKey) || null;
  const platformConfig = platform ? PLATFORM_CONFIG[platform] : DEFAULT_PLATFORM;
  usePageTitle(`${platformConfig.label} Collaboration`);
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
              AI Powered | Let AI find you the right person to work with.
            </span>
          </h1>
        </div>
      </div>
      {/* Campaign Brief Form */}
      <div className="work-order-section">
        <p className="work-order-description">
          Create a brief that can be sent to collaborators. Write a short description of the campaign to get started.
        </p>
        <form onSubmit={handleWorkOrderSubmit} className="work-order-form">
          <div className="add-funds-section mb-0">
            <label className="form-label">Campaign Name/Number</label>
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

              {/* Country + platform stats (#18) */}
              <div className="consultancy-card-tags">
                {profile.country && (
                  <span className="consultancy-tag">
                    <i className="bi bi-geo-alt"></i>
                    {profile.country}
                  </span>
                )}
                <span className="consultancy-tag">
                  <i className="bi bi-grid-3x3-gap"></i>
                  {profile.posts} {platformConfig.countLabels.posts}
                </span>
                <span className="consultancy-tag">
                  <i className="bi bi-people"></i>
                  {profile.followers} {platformConfig.countLabels.followers}
                </span>
                <span className="consultancy-tag">
                  <i className="bi bi-person-plus"></i>
                  {profile.following} {platformConfig.countLabels.following}
                </span>
              </div>

              <p className="consultancy-card-summary">{platformConfig.description}</p>

              {/* Activity: avg of last 10 posts (#18) */}
              {profile.activity && (
                <div className="collaboration-activity">
                  <span className="collaboration-activity-title">
                    Activity <small>(avg. last 10 posts)</small>
                  </span>
                  <div className="collaboration-activity-stats">
                    <div className="collaboration-activity-item">
                      <i className="bi bi-hand-thumbs-up"></i>
                      <span>{profile.activity.likes}</span>
                      <small>Likes</small>
                    </div>
                    <div className="collaboration-activity-item">
                      <i className="bi bi-eye"></i>
                      <span>{profile.activity.views}</span>
                      <small>Views</small>
                    </div>
                    <div className="collaboration-activity-item">
                      <i className="bi bi-chat"></i>
                      <span>{profile.activity.comments}</span>
                      <small>Comments</small>
                    </div>
                    <div className="collaboration-activity-item">
                      <i className="bi bi-arrow-repeat"></i>
                      <span>{profile.activity.reposts}</span>
                      <small>{platformConfig.repostLabel}</small>
                    </div>
                  </div>
                </div>
              )}

              {/* Asking Rate (platform-dependent) (#18) */}
              {profile.askingRate && (
                <div className="collaboration-asking-rates d-flex align-items-center gap-2">
                  <span className="asking-rates-title">Asking Rate:</span>
                  <span className="asking-rate-value">
                    {profile.askingRate} {platformConfig.rateUnit}
                  </span>
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
