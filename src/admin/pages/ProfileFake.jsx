import React, { useMemo, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import fakeProfileRows from "../data/profileFakeData";
import "./Wallet.css";
import "./ProfileSell.css";

const platforms = ["Instagram", "Twitter", "YouTube", "TikTok"];

const tabConfig = [
  { id: "report", label: "Outgoing" },
  { id: "incoming", label: "Incoming" },
];

const ProfileFake = () => {
  usePageTitle("Fake Profile");
  const [activeTab, setActiveTab] = useState("report");
  const [searchValue, setSearchValue] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    platform: "",
    profileLink: "",
    posts: "",
    explanation: "",
  });
  const [reportModalData, setReportModalData] = useState({
    platform: "",
    profileLink: "",
    explanation: "",
    video: null,
    screenshot: null,
  });

  const counts = useMemo(() => ({
    report: fakeProfileRows.filter((row) => row.status === "report").length,
    incoming: fakeProfileRows.filter((row) => row.status === "incoming").length,
  }), []);

  const filteredRows = useMemo(() => {
    return fakeProfileRows.filter((row) => {
      const matchesTab = activeTab ? row.status === activeTab : true;
      const matchesSearch = `${row.platform} ${row.profileUrl}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchValue]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      platform: "",
      profileLink: "",
      posts: "",
      explanation: "",
    });
  };

  const getStatusBadgeClass = (reviewStatus) => {
    if (reviewStatus === "Success") {
      return "status-successful";
    }
    return "status-process";
  };

  const handleReportClick = (row) => {
    setSelectedRow(row);
    setShowReportModal(true);
    setReportModalData({
      platform: row.platform || "",
      profileLink: row.profileUrl || "",
      explanation: "",
      video: null,
      screenshot: null,
    });
  };

  const handleReportModalChange = (field, value) => {
    setReportModalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReportFileChange = (field, file) => {
    setReportModalData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // Handle report submission here
    console.log("Report submitted:", reportModalData);
    setShowReportModal(false);
    setSelectedRow(null);
    setReportModalData({
      platform: "",
      profileLink: "",
      explanation: "",
      video: null,
      screenshot: null,
    });
  };

  const handleReportModalClose = () => {
    setShowReportModal(false);
    setSelectedRow(null);
    setReportModalData({
      platform: "",
      profileLink: "",
      explanation: "",
      video: null,
      screenshot: null,
    });
  };

  return (
    <div className="admin-page profile-sell-page">
      <div className="profile-sell-header mb-3">
        <h1 className="profile-sell-heading">Fake profile</h1>
      </div>

      <div className="dashboard-table-section" style={{ marginBottom: "24px" }}>
        <div className="table-header">
          <h2 className="table-title mb-0">Request To Report</h2>
        </div>
        <div style={{ marginBottom: "16px", padding: "12px", background: "#E3F2FD", borderRadius: "6px", border: "1px solid #BBDEFB" }}>
          <p style={{ fontSize: "14px", color: "var(--admin-gray-700)", margin: 0 }}>
            Can only be an account owned by you or Your Company. Basic - 3 per month and Advance - 100 per month.
          </p>
        </div>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div>
              <div className="add-funds-section">
                <label className="form-label">Select Platform</label>
                <div>
                  <select 
                    value={formData.platform}
                    onChange={(e) => handleFormChange("platform", e.target.value)}
                    className="w-100 form-input-group"
                  >
                    <option value="" disabled>
                      Facebook
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
                    value={formData.profileLink}
                    onChange={(e) => handleFormChange("profileLink", e.target.value)}
                    placeholder="https://instagram.com/username/postname"
                  />
                </div>
              </div>

              {/* <div className="add-funds-section">
                <label className="form-label">Posts</label>
                <div className="form-input-group">
                  <input 
                    type="number" 
                    placeholder="Number of Posts"
                    value={formData.posts}
                    onChange={(e) => handleFormChange("posts", e.target.value)}
                  />
                </div>
              </div> */}

              <div className="add-funds-section">
                <label className="form-label">Explanation</label>
                <div className="form-input-group" style={{ alignItems: 'flex-start', minHeight: '80px' }}>
                  <textarea 
                    rows={3}
                    value={formData.explanation}
                    onChange={(e) => handleFormChange("explanation", e.target.value)}
                    placeholder="Enter explanation..."
                    style={{ 
                      flex: 1,
                      border: 'none', 
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      padding: '0',
                      background: 'transparent',
                      minHeight: '60px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button type="submit" className="btn-dark">
                  Proceed
                </button>
                <button 
                  type="button" 
                  className="btn-light" 
                  onClick={() => setFormData({
                    platform: "",
                    profileLink: "",
                    posts: "",
                    explanation: "",
                  })}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="dashboard-table-section">
        <div className="table-header">
          <h2 className="table-title mb-0">Activity</h2>
          <div className="dropdown">
            <button className="view-all-btn" type="button" data-bs-toggle="dropdown">
              Export <i className="bi bi-chevron-down ms-2"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">CSV</a></li>
              <li><a className="dropdown-item" href="#">XLS</a></li>
              <li><a className="dropdown-item" href="#">PDF</a></li>
            </ul>
          </div>
        </div>

        <div className="table-container-wrapper">
          <div className="table-controls justify-content-between">
            <div className="transaction-tabs">
              {tabConfig.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label} ({counts[tab.id] ?? 0})
                </button>
              ))}
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="filter-btn">
                <i className="bi bi-funnel"></i>
              </button>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </div>
            </div>
          </div>
          {activeTab === "incoming" && (
            <div style={{ marginTop: "16px", marginBottom: "16px", padding: "12px", background: "#E3F2FD", borderRadius: "6px", border: "1px solid #BBDEFB" }}>
              <p style={{ fontSize: "14px", color: "var(--admin-gray-700)", margin: 0 }}>
                Complete as many incoming request to gain credits. Credits will be issued proof is uploaded and verified by our team.
              </p>
            </div>
          )}

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Platform</th>
                  <th>Profile URL</th>
                  <th>Reported By Users</th>
                  <th>Date</th>
                  {activeTab === "incoming" && <th>Status</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.platform}</td>
                    <td>
                      <a href={row.profileUrl} className="profile-buy-handle" target="_blank" rel="noreferrer">
                        {row.profileUrl}
                        <i className="bi bi-box-arrow-up-right ms-1"></i>
                      </a>
                    </td>
                    <td>{row.reportedCount}</td>
                    <td>{row.date}</td>
                    {activeTab === "incoming" && (
                      <td>
                        <span className={`transaction-status ${getStatusBadgeClass(row.reviewStatus || "Under Review")}`}>
                          {row.reviewStatus || "Under Review"}
                        </span>
                      </td>
                    )}
                    <td>
                      <div className="dropdown">
                        <button
                          className="transaction-menu-btn"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <a className="dropdown-item" href="#">
                              View
                            </a>
                          </li>
                          <li>
                            <a 
                              className="dropdown-item" 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleReportClick(row);
                              }}
                            >
                              Report
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={activeTab === "incoming" ? 7 : 6} className="text-center py-4">
                      No records found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-pagination mt-3">
            <div className="pagination-info">
              <span>{filteredRows.length} results</span>
            </div>
            <div className="pagination-controls">
              <button type="button" disabled>
                ‹
              </button>
              <span>1/1</span>
              <button type="button" disabled>
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={handleReportModalClose}>
          <div
            className="modal-container add-funds-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={handleReportModalClose}>
              <i className="bi bi-x"></i>
            </button>

            <h2 className="modal-title">Report Profile</h2>

            <form onSubmit={handleReportSubmit}>
              <div className="add-funds-section">
                <label className="form-label">Select Platform</label>
                <div>
                  <select 
                    value={reportModalData.platform}
                    onChange={(e) => handleReportModalChange("platform", e.target.value)}
                    className="w-100 form-input-group"
                    required
                  >
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
                    value={reportModalData.profileLink}
                    onChange={(e) => handleReportModalChange("profileLink", e.target.value)}
                    placeholder="https://instagram.com/username/postname"
                    required
                  />
                </div>
              </div>

              {/* <div className="add-funds-section">
                <label className="form-label">Posts</label>
                <div className="form-input-group">
                  <input 
                    type="number" 
                    placeholder="Number of Posts"
                    value={reportModalData.posts}
                    onChange={(e) => handleReportModalChange("posts", e.target.value)}
                  />
                </div>
              </div> */}

              <div className="add-funds-section">
                <label className="form-label">Explanation</label>
                <div className="form-input-group" style={{ alignItems: 'flex-start', minHeight: '80px' }}>
                  <textarea 
                    rows={3}
                    value={reportModalData.explanation}
                    onChange={(e) => handleReportModalChange("explanation", e.target.value)}
                    placeholder="Enter explanation..."
                    required
                    style={{ 
                      flex: 1,
                      border: 'none', 
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      padding: '0',
                      background: 'transparent',
                      minHeight: '60px'
                    }}
                  />
                </div>
              </div>

              <div className="add-funds-section">
                <label className="form-label">Upload Video</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="reportVideo"
                    className="file-input"
                    onChange={(e) => handleReportFileChange("video", e.target.files[0])}
                    accept="video/*"
                  />
                  <label htmlFor="reportVideo" className="file-upload-label">
                    <i className="bi bi-cloud-arrow-up"></i>
                    <span>{reportModalData.video ? reportModalData.video.name : 'Choose File'}</span>
                  </label>
                </div>
              </div>

              <div className="add-funds-section">
                <label className="form-label">Upload Screenshot</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="reportScreenshot"
                    className="file-input"
                    onChange={(e) => handleReportFileChange("screenshot", e.target.files[0])}
                    accept="image/*"
                  />
                  <label htmlFor="reportScreenshot" className="file-upload-label">
                    <i className="bi bi-cloud-arrow-up"></i>
                    <span>{reportModalData.screenshot ? reportModalData.screenshot.name : 'Choose File'}</span>
                  </label>
                </div>
              </div>

              {/* <div style={{ marginTop: "-8px", marginBottom: "16px" }}>
                <p style={{ fontSize: "14px", color: "var(--admin-gray-600)", margin: 0 }}>
                  5 credit
                </p>
              </div> */}

              <div className="modal-footer">
                <button type="submit" className="btn-dark">
                  Proceed
                </button>
                <button type="button" className="btn-light" onClick={handleReportModalClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileFake;
