import React, { useMemo, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import ProfileSellModal from "../components/ProfileSellModal";
import "./Wallet.css";
import "./ProfileSell.css";

const activityRows = [
  {
    id: 1,
    profileType: "YouTube",
    date: "23-10-2025",
    userName: "Sam Altman",
    userEmail: "sam@gmail.com",
    amount: "$500k",
    status: "completed",
  },
  {
    id: 2,
    profileType: "Instagram",
    date: "22-10-2025",
    userName: "Sonam Kapoor",
    userEmail: "sonam@gmail.com",
    amount: "$220k",
    minAmount: "$200k",
    maxAmount: "$300k",
    status: "pending",
  },
  {
    id: 3,
    profileType: "YouTube",
    date: "21-10-2025",
    userName: "Sam Altman",
    userEmail: "sam@gmail.com",
    amount: "$500k",
    status: "completed",
  },
  {
    id: 4,
    profileType: "Twitch",
    date: "20-10-2025",
    userName: "Leo Martin",
    userEmail: "leo@gmail.com",
    amount: "$250k",
    status: "cancelled",
  },
];

const tabConfig = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const ProfileSell = () => {
  usePageTitle("Sell Profile");
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [, setSelectedAction] = useState(null);

  const counts = useMemo(() => ({
    all: activityRows.length,
    pending: activityRows.filter((row) => row.status === "pending").length,
    completed: activityRows.filter((row) => row.status === "completed").length,
    cancelled: activityRows.filter((row) => row.status === "cancelled").length,
  }), []);

  const filteredRows = useMemo(() => {
    return activityRows.filter((row) => {
      const matchesTab =
        activeTab === "all" ? true : row.status === activeTab;
      const matchesSearch = `${row.profileType} ${row.userName} ${row.userEmail}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchValue]);

  return (
    <div className="admin-page profile-sell-page">
      <div className="profile-sell-header mb-3">
        <div>
          <h1 className="profile-sell-heading">Profile Sell</h1>
          
        </div>
        <button type="button" className="dark-btn" onClick={() => setShowModal(true)}>
          Sell Profile
        </button>
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

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Profile Type</th>
                  <th>Date</th>
                  <th>User Details</th>
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
                      <div className="profile-sell-user">
                        <span className="table-name">{row.userName}</span>
                        <span className="table-username">{row.userEmail}</span>
                      </div>
                    </td>
                    <td className="table-amount">
                      {activeTab === "pending" && row.status === "pending" && row.minAmount && row.maxAmount
                        ? `${row.minAmount} - ${row.maxAmount}`
                        : row.amount}
                    </td>
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
                                setSelectedAction({ row, action: "view" });
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
                                setSelectedAction({ row, action: "edit" });
                                setShowModal(true);
                              }}
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item text-danger"
                              href="#"
                              onClick={(event) => {
                                event.preventDefault();
                                setSelectedAction({ row, action: "delete" });
                              }}
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
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

export default ProfileSell;
