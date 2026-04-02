import React, { useMemo, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import buyProfileRows from "../data/profileBuyData";
import ProfileSellModal from "../components/ProfileSellModal";
import SliderDropdown from "../components/SliderDropdown";
import { collaborationProfiles } from "../data/collaborationProfilesData";
import "../components/ConsultancyModals.css";
import "./ConsultancyCategoryPage.css";
import "./CollaborationPage.css";
import "./CollaborationShortlisted.css";
import "./Wallet.css";
import "./ProfileSell.css";

const tabConfig = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "accepted", label: "Accepted" },
  { id: "rejected", label: "Rejected" },
];

const statusBadgeClass = (status) => {
  switch (status) {
    case "purchased":
    case "accepted":
      return "status-successful";
    case "process":
    case "pending":
      return "status-process";
    case "rejected":
      return "status-failed";
    default:
      return "status-process";
  }
};

const ProfileBuy = () => {
  usePageTitle("Buy Profile");
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedActionRow, setSelectedActionRow] = useState(null);
  const [filterValues, setFilterValues] = useState({
    socialMediaPlatform: '',
    areaOfInterest: '',
    followers: '',
    posts: '',
    revenueRange: 100,
  });
  const [sortBy, setSortBy] = useState("price-low-to-high");

  const counts = useMemo(() => ({
    all: buyProfileRows.length,
    pending: buyProfileRows.filter((row) => row.status === "pending" || row.status === "process").length,
    accepted: buyProfileRows.filter((row) => row.status === "accepted" || row.status === "purchased").length,
    rejected: buyProfileRows.filter((row) => row.status === "rejected").length,
  }), []);

  const filteredRows = useMemo(() => {
    return buyProfileRows.filter((row) => {
      const matchesTab =
        activeTab === "all"
          ? true
          : activeTab === "pending"
          ? row.status === "pending" || row.status === "process"
          : activeTab === "accepted"
          ? row.status === "accepted" || row.status === "purchased"
          : row.status === "rejected";

      const matchesSearch = `${row.profileType} ${row.userName} ${row.userHandle}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchValue]);

  const handleAction = (row, action) => {
    setSelectedActionRow({ ...row, action });
    setShowModal(true);
  };

  const handleFilterChange = (filterId, value) => {
    setFilterValues(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const getFilterValue = (filter) => {
    if (filterValues[filter.id] !== undefined) {
      return filterValues[filter.id];
    }
    if (filter.type === 'slider') {
      return filter.min;
    }
    return '';
  };

  const filters = [
    {
      id: 'socialMediaPlatform',
      label: 'Social Media Platform',
      placeholder: 'Select',
      type: 'dropdown',
      options: ['Facebook', 'Instagram', 'YouTube', 'Twitter', 'Tiktok'],
    },
    {
      id: 'areaOfInterest',
      label: 'Area of Interest',
      placeholder: 'Select',
      type: 'dropdown',
      options: [
        'Technology & Software',
        'Fashion & Beauty',
        'Health & Fitness',
        'Food & Travel',
        'Business & Entrepreneurship',
        'Gaming & Esports',
        'Lifestyle & Home',
        'Education & Learning',
        'Entertainment & Comedy',
        'Sports & Athletics',
        'Music & Arts',
        'Finance & Investment',
      ],
    },
    {
      id: 'followers',
      label: 'Followers',
      placeholder: 'Select',
      type: 'dropdown',
      options: ['Nano : 1k-10k', 'Micro : 10k-100k', 'Macro : 100k-1M', 'Mega : >1M'],
    },
    {
      id: 'posts',
      label: 'Posts',
      placeholder: 'Select',
      type: 'dropdown',
      options: ['10-100', '100-1000', '1k-10k', '10k-1M'],
    },
    {
      id: 'revenueRange',
      label: 'Revenue Range',
      placeholder: 'Select revenue',
      type: 'slider',
      min: 100,
      max: 1000000,
      step: 1000,
      prefix: '$',
    },
  ];

  const renderFilter = (filter) => {
    if (filter.type === 'slider') {
      return (
        <SliderDropdown
          key={filter.id}
          label={filter.label}
          placeholder={filter.placeholder}
          min={filter.min}
          max={filter.max}
          step={filter.step || 1}
          prefix={filter.prefix || ''}
          suffix={filter.suffix || ''}
          value={getFilterValue(filter)}
          onChange={(value) => handleFilterChange(filter.id, value)}
        />
      );
    }

    return (
      <div key={filter.id} className="consultancy-filter">
        <span className="consultancy-filter-label">{filter.label}</span>
        <div className="consultancy-select">
          <select 
            value={getFilterValue(filter)} 
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
          >
            <option value="" disabled>
              {filter.placeholder}
            </option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="consultancy-select-caret">
            <i className="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-page profile-sell-page">
      <div className="profile-sell-header">
        <h1 className="profile-sell-heading">Buy Profile</h1>
      </div>

      <div className="consultancy-filters my-3">
        {filters.map(renderFilter)}
      </div>

      <div className="outgoing-actions-bar border-0 justify-content-end" style={{ marginTop: '4px', marginBottom: '4px' }}>
        <div className="sort-by-filter">
          <label className="sort-by-label">Sort By:</label>
          <select
            className="sort-by-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price-low-to-high">Price Low to High</option>
            <option value="price-high-to-low">Price High to Low</option>
            <option value="name-a-z">Name A-Z</option>
            <option value="name-z-a">Name Z-A</option>
            <option value="reach-high-to-low">Reach High to Low</option>
            <option value="reach-low-to-high">Reach Low to High</option>
          </select>
        </div>
      </div>

      <div className="consultancy-grid">
        {collaborationProfiles.map((profile) => (
          <div
            key={profile.id}
            className="consultancy-card collaboration-card"
            role="button"
            tabIndex={0}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                // Handle card click if needed
              }
            }}
          >
            <div className="consultancy-card-header">
              <div className="consultancy-avatar">
                <img src={profile.avatar} alt={profile.name} />
              </div>
              <div className="consultancy-card-meta">
                <h3 className="consultancy-card-name">{profile.name}</h3>
                <div className="consultancy-card-stats">
                  <span className="consultancy-reach">{profile.reach} Reach</span>
                  <span className="consultancy-rating">
                    {profile.ratingLabel}
                    <i className="bi bi-star-fill"></i>
                  </span>
                </div>
              </div>
            </div>

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

            <button
              type="button"
              className="consultancy-card-button dark-btn"
              onClick={(event) => {
                event.stopPropagation();
                // Handle buy profile action
              }}
            >
              Buy Profile
            </button>
          </div>
        ))}
      </div>

      <div className="dashboard-table-section mt-4">
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

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Profile Type</th>
                  <th>Date</th>
                  <th>User Name Link</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.profileType}</td>
                    <td>{row.date}</td>
                    <td>
                      <a href="#" className="profile-buy-handle">
                        {row.userHandle}
                        <i className="bi bi-link-45deg ms-1"></i>
                      </a>
                    </td>
                    <td>
                      <span className={`transaction-status ${statusBadgeClass(row.status)}`}>
                        {row.status === "process"
                          ? "Process"
                          : row.status === "purchased"
                          ? "Purchased"
                          : row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-amount">{row.amount}</td>
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
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();
                                handleAction(row, "view");
                              }}
                            >
                              View
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();
                                handleAction(row, "accept");
                              }}
                            >
                              Accept
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();
                                handleAction(row, "reject");
                              }}
                            >
                              Reject
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
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

      <ProfileSellModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default ProfileBuy;
