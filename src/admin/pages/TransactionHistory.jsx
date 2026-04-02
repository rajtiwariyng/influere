import React, { useMemo, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import transactionHistoryRows from "../data/transactionHistoryData";
import "./Wallet.css";
import "./ProfileSell.css";

const getTabConfig = (rows) => {
  const allCount = rows.length;
  const completedCount = rows.filter((row) => row.status === "completed").length;
  const pendingCount = rows.filter((row) => row.status === "pending").length;
  const failedCount = rows.filter((row) => row.status === "failed").length;

  return [
    { id: "all", label: "All" },
    { id: "completed", label: "Completed" },
    { id: "pending", label: "Pending" },
    { id: "failed", label: "Failed" },
  ];
};

const statusBadgeClass = (status) => {
  switch (status) {
    case "completed":
      return "status-successful";
    case "pending":
      return "status-process";
    case "failed":
      return "status-failed";
    default:
      return "status-process";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "pending":
      return "Pending";
    case "failed":
      return "Failed";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const TransactionHistory = () => {
  usePageTitle("Transaction History");
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const tabConfig = useMemo(() => getTabConfig(transactionHistoryRows), []);

  const counts = useMemo(() => {
    const all = transactionHistoryRows.length;
    const completed = transactionHistoryRows.filter((row) => row.status === "completed").length;
    const pending = transactionHistoryRows.filter((row) => row.status === "pending").length;
    const failed = transactionHistoryRows.filter((row) => row.status === "failed").length;

    return { all, completed, pending, failed };
  }, []);

  const filteredRows = useMemo(() => {
    return transactionHistoryRows.filter((row) => {
      const matchesTab =
        activeTab === "all" ? true : row.status === activeTab;

      const matchesSearch = `${row.invoiceId} ${row.transactionId || ''} ${row.description || ''}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchValue]);

  const handleDownloadInvoice = (row) => {
    // Handle download invoice action
    console.log("Download invoice for:", row.invoiceId);
    // You can implement actual download logic here
  };

  return (
    <div className="admin-page profile-sell-page">
      <div className="profile-sell-header">
        <h1 className="profile-sell-heading">Transaction History</h1>
      </div>

      <div className="dashboard-table-section">
        <div className="table-header">
          <h2 className="table-title mb-0">History</h2>
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
                  <th>S. No</th>
                  <th>Invoice ID</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.invoiceId}</td>
                    <td>{row.transactionId || '-'}</td>
                    <td>{row.date}</td>
                    <td className="table-amount">{row.amount}</td>
                    <td>{row.description || '-'}</td>
                    <td>
                      <span className={`transaction-status ${statusBadgeClass(row.status)}`}>
                        {getStatusLabel(row.status)}
                      </span>
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
                                handleDownloadInvoice(row);
                              }}
                            >
                              Download Invoice
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
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
    </div>
  );
};

export default TransactionHistory;

