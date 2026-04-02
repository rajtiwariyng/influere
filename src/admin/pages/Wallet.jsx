import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import walletIcon from "../../assets/wallet.svg";
import successTopImg from "../../assets/success-top-img.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./Wallet.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Wallet = () => {
  usePageTitle("Wallet");
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("days");
  const [activeTab, setActiveTab] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [exportTime, setExportTime] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("500");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [addFundsAmount, setAddFundsAmount] = useState("");
  const [showAddFundsSuccess, setShowAddFundsSuccess] = useState(false);
  const [addFundsTransactionId, setAddFundsTransactionId] = useState("");
  const [addFundsTime, setAddFundsTime] = useState("");

  // Handle view transaction details
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  // Handle withdraw next step
  const handleWithdrawNext = () => {
    setShowWithdrawModal(false);
    navigate('/dashboard/wallet/withdraw-confirm', {
      state: { withdrawAmount, selectedAccount }
    });
  };

  // Handle add funds
  const handleAddFundsNext = () => {
    // Generate transaction details
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const txnId = `0Xbn${Math.random().toString().slice(2, 14)}`;
    
    setAddFundsTransactionId(txnId);
    setAddFundsTime(`${date} | ${time}`);
    setShowAddFundsModal(false);
    setShowAddFundsSuccess(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Export function
  const handleExport = (format) => {
    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    setExportTime(`${date} | ${time}`);

    // Create export data
    const headers = ['#', 'Type', 'Date', 'Transaction ID', 'Status', 'Amount'];
    const data = filteredData.map(row => [
      row.id,
      row.type,
      row.date,
      row.transactionId,
      row.status,
      row.amount
    ]);

    // Export based on format
    if (format === 'CSV') {
      exportToCSV(headers, data);
    } else if (format === 'XLS') {
      exportToXLS(headers, data);
    } else if (format === 'PDF') {
      exportToPDF(headers, data);
    }

    // Show success modal
    setShowSuccessModal(true);
  };

  // Export to CSV
  const exportToCSV = (headers, data) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Export to XLS (simple tab-separated format that Excel can open)
  const exportToXLS = (headers, data) => {
    const xlsContent = [
      headers.join('\t'),
      ...data.map(row => row.join('\t'))
    ].join('\n');

    const blob = new Blob([xlsContent], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${Date.now()}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Export to PDF (simple text-based approach)
  const exportToPDF = (headers, data) => {
    // Create a simple HTML table for PDF
    const htmlContent = `
      <html>
        <head>
          <title>Transactions Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4CAF50; color: white; }
          </style>
        </head>
        <body>
          <h1>Transactions Report</h1>
          <table>
            <thead>
              <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${data.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${Date.now()}.html`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Chart.js data configuration
  const chartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Deposits",
        data: [350, 280, 320, 290, 380, 400, 320],
        backgroundColor: "#3B82F6",
        borderColor: "#3B82F6",
        borderWidth: 1,
      },
      {
        label: "Withdrawals",
        data: [150, 180, 160, 200, 170, 220, 190],
        backgroundColor: "#F97316",
        borderColor: "#F97316",
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 400,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          stepSize: 50,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  // Sample transaction data
  const transactionData = [
    {
      id: 1,
      type: "Withdraw",
      date: "23-10-2025",
      transactionId: "TXN-20251022-7A3F9B4C",
      status: "Process",
      amount: "$450",
      category: "withdraw",
    },
    {
      id: 2,
      type: "Withdraw",
      date: "23-10-2025",
      transactionId: "TRX_6F3B2A9C1D",
      status: "Process",
      amount: "$450",
      category: "withdraw",
    },
    {
      id: 3,
      type: "Refund",
      date: "23-10-2025",
      transactionId: "PAY-8D4F-AC21-93",
      status: "Successful",
      amount: "$450",
      category: "refund",
    },
    {
      id: 4,
      type: "Deposits",
      date: "23-10-2025",
      transactionId: "INV#9A2B-4C6D-7E8F",
      status: "Successful",
      amount: "$450",
      category: "deposits",
    },
    {
      id: 5,
      type: "Deposits",
      date: "23-10-2025",
      transactionId: "ZP-78KJ-4M2Q",
      status: "Successful",
      amount: "$450",
      category: "deposits",
    },
    {
      id: 6,
      type: "Deposits",
      date: "22-10-2025",
      transactionId: "PAY-123-456-789",
      status: "Successful",
      amount: "$320",
      category: "deposits",
    },
    {
      id: 7,
      type: "Withdraw",
      date: "22-10-2025",
      transactionId: "TRX-ABC-DEF-GHI",
      status: "Failed",
      amount: "$200",
      category: "withdraw",
    },
    {
      id: 8,
      type: "Deposits",
      date: "21-10-2025",
      transactionId: "INV-XYZ-123",
      status: "Successful",
      amount: "$550",
      category: "deposits",
    },
  ];

  // Filter data based on active tab
  const filteredData = useMemo(() => {
    if (activeTab === "all") return transactionData;
    return transactionData.filter((item) => item.category === activeTab);
  }, [activeTab]);

  // Count transactions by category
  const counts = {
    all: transactionData.length,
    withdraw: transactionData.filter((t) => t.category === "withdraw").length,
    deposits: transactionData.filter((t) => t.category === "deposits").length,
    refund: transactionData.filter((t) => t.category === "refund").length,
  };

  // Table columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "select",
        header: () => <input type="checkbox" />,
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        accessorKey: "id",
        header: "#",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "type",
        header: "TYPE OF TRANSACTION",
        cell: ({ getValue }) => (
          <span className="transaction-type">{getValue()}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "DATE",
        cell: ({ getValue }) => (
          <span className="transaction-date">{getValue()}</span>
        ),
      },
      {
        accessorKey: "transactionId",
        header: "TRANSACTION ID",
        cell: ({ getValue }) => (
          <span className="transaction-id">{getValue()}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ getValue }) => {
          const status = getValue();
          return (
            <span
              className={`transaction-status status-${status.toLowerCase()}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "AMOUNT",
        cell: ({ getValue }) => (
          <span className="transaction-amount">{getValue()}</span>
        ),
      },
      {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
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
                  onClick={(e) => { e.preventDefault(); handleViewTransaction(row.original); }}
                >
                  View
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Download
                </a>
              </li>
            </ul>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="wallet-page">
      {/* Top Cards Section */}
      <div className="row mb-3">
        {/* Balance Card */}
        <div className="col-md-6">
          <div className="balance-card">
            <div>
              <div className="balance-header">
                <span
                  className="balance-label"
                  style={{ color: "#000", fontWeight: "300", fontSize: "18px" }}
                >
                  <img src={walletIcon} alt="wallet" className="me-2" />
                  Balance
                </span>
              </div>
              <div
                className="balance-amount"
                style={{ color: "#000", fontWeight: "bold", fontSize: "42px" }}
              >
                $ 3521.74
              </div>
            </div>
            <div className="balance-actions">
              <button 
                className="btn-add-funds"
                onClick={() => setShowAddFundsModal(true)}
              >
                Add Funds
              </button>
              <button 
                className="btn-withdraw-funds"
                onClick={() => setShowWithdrawModal(true)}
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Statistics Chart */}
        <div className="col-md-6">
          <div className="dashboard-chart-section mb-0">
            <div className="chart-header">
              <h2 className="chart-title">Transactions Statics</h2>
              <div className="timeframe-selector">
                <button
                  className={`timeframe-btn ${
                    timeframe === "days" ? "active" : ""
                  }`}
                  onClick={() => setTimeframe("days")}
                >
                  Days
                </button>
                <button
                  className={`timeframe-btn ${
                    timeframe === "weekly" ? "active" : ""
                  }`}
                  onClick={() => setTimeframe("weekly")}
                >
                  Weekly
                </button>
                <button
                  className={`timeframe-btn ${
                    timeframe === "monthly" ? "active" : ""
                  }`}
                  onClick={() => setTimeframe("monthly")}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="chart-container wallet-chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="dashboard-table-section">
        <div className="table-header">
          <h2 className="table-title">Transactions</h2>
          <div className="dropdown">
            <button
              className="view-all-btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Export <i className="bi bi-chevron-down ms-2"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a 
                  className="dropdown-item" 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleExport('CSV'); }}
                >
                  CSV
                </a>
              </li>
              <li>
                <a 
                  className="dropdown-item" 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleExport('XLS'); }}
                >
                  XLS
                </a>
              </li>
              <li>
                <a 
                  className="dropdown-item" 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleExport('PDF'); }}
                >
                  PDF
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="table-container-wrapper">
          <div className="table-controls justify-content-between">
            {/* Transaction Filter Tabs */}
            <div className="transaction-tabs">
              <button
                className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All ({counts.all})
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "withdraw" ? "active" : ""
                }`}
                onClick={() => setActiveTab("withdraw")}
              >
                Withdraw ({counts.withdraw})
              </button>
              <button
                className={`tab-btn ${
                  activeTab === "deposits" ? "active" : ""
                }`}
                onClick={() => setActiveTab("deposits")}
              >
                Deposits ({counts.deposits})
              </button>
              <button
                className={`tab-btn ${activeTab === "refund" ? "active" : ""}`}
                onClick={() => setActiveTab("refund")}
              >
                Refund ({counts.refund})
              </button>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="filter-btn">
                <i className="bi bi-funnel"></i>
              </button>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc"
                          ? " ↑"
                          : header.column.getIsSorted() === "desc"
                          ? " ↓"
                          : ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-pagination">
            <div className="pagination-info">
              <span>1-10 of 97</span>
              <span className="mx-2">Rows per page:</span>
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="pagination-controls">
              <button>‹</button>
              <span>1/10</span>
              <button>›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay export-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-container export-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close export-modal-close"
              onClick={() => setShowSuccessModal(false)}
            >
              <i className="bi bi-x"></i>
            </button>
            <div className="export-modal-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h3 className="export-modal-title">Export Successfully</h3>
            <p className="export-modal-time">{exportTime}</p>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="modal-overlay transaction-details-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-container transaction-details-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close transaction-details-close"
              onClick={() => setShowDetailsModal(false)}
            >
              <i className="bi bi-x"></i>
            </button>
            
            <h2 className="modal-title transaction-details-title">Transaction Details</h2>

            {/* Transaction Summary */}
            <div className="transaction-summary">
              <div className="transaction-summary-left">
                <div className="transaction-icon">
                  <i className="bi bi-bank"></i>
                </div>
                <div className="transaction-user-info">
                  <p className="transaction-user-name">Jon Thomson</p>
                  <p className="transaction-account">7657374xxxxxxxx</p>
                </div>
              </div>
              <div className="transaction-summary-right">
                <p className="transaction-datetime">
                  <span className="text-muted">Date & Time: </span>
                  {selectedTransaction.date} 20:30
                </p>
                <p className="transaction-id-text">
                  <span className="text-muted">Transaction ID: </span>
                  {selectedTransaction.transactionId}
                </p>
              </div>
            </div>

            {/* Amount and Status */}
            <div className="transaction-amount-section">
              <div>
                <p className="amount-label">Amount</p>
                <h3 className={`amount-value ${selectedTransaction.status.toLowerCase()}`}>
                  {selectedTransaction.amount}
                </h3>
              </div>
              <div className={`transaction-status-badge status-${selectedTransaction.status.toLowerCase()}`}>
                {selectedTransaction.status.toLowerCase() === 'failed' ? (
                  <>
                    <i className="bi bi-x-circle-fill me-2"></i>
                    Failed
                  </>
                ) : selectedTransaction.status.toLowerCase() === 'process' ? (
                  <>
                    <i className="bi bi-clock-fill me-2"></i>
                    In Process
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {selectedTransaction.type} Successfully
                  </>
                )}
              </div>
            </div>

            {/* Account Details - Hide only for failed transactions */}
            {selectedTransaction.status.toLowerCase() !== 'failed' && (
              <div className="account-details-section">
                <h4 className="account-details-title">Account Details</h4>
                <div className="account-details-grid">
                  <div className="account-detail-item">
                    <span className="detail-label">Bank</span>
                    <span className="detail-value">City Bank</span>
                  </div>
                  <div className="account-detail-item">
                    <span className="detail-label">Account Holder</span>
                    <span className="detail-value">Jon Thomas</span>
                  </div>
                  <div className="account-detail-item">
                    <span className="detail-label">IBAN</span>
                    <span className="detail-value">hdug77475835663487l</span>
                  </div>
                  <div className="account-detail-item">
                    <span className="detail-label">BIC</span>
                    <span className="detail-value">67583752365</span>
                  </div>
                </div>
              </div>
            )}

            {/* Process Status Note */}
            {selectedTransaction.status.toLowerCase() === 'process' && (
              <div className="process-note">
                <i className="bi bi-info-circle me-2"></i>
                This transaction is currently being processed. You will be notified once it's completed.
              </div>
            )}

            {/* Action Buttons */}
            <div className="transaction-actions">
              <button className="dark-btn">
                Print Details
              </button>
              <button className="light-btn">
                Need Help?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Amount Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-container withdraw-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowWithdrawModal(false)}
            >
              <i className="bi bi-x"></i>
            </button>
            
            <h2 className="modal-title">Add Withdraw Amount</h2>

            {/* Enter Amount */}
            <div className="withdraw-section">
              <label className="form-label withdraw-label">Enter Amount</label>
              <div className="form-input-group withdraw-amount-input">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="500"
                />
              </div>
            </div>

            {/* Select Account */}
            <div className="withdraw-section">
              <label className="form-label withdraw-label">Select Account</label>
              <div className="account-options">
                {/* Bank Account Option */}
                <div 
                  className={`selection-card ${selectedAccount === 'bank' ? 'selected' : ''}`}
                  onClick={() => setSelectedAccount('bank')}
                >
                  <div className="selection-card-left">
                    <div className="selection-card-icon">
                      <i className="bi bi-bank"></i>
                    </div>
                    <div className="selection-card-info">
                      <p className="selection-card-title">Jon Thomson</p>
                      <p className="selection-card-subtitle">7657374xxxxxxxx</p>
                    </div>
                  </div>
                  <div className="selection-card-radio">
                    <input
                      type="radio"
                      name="account"
                      checked={selectedAccount === 'bank'}
                      onChange={() => setSelectedAccount('bank')}
                    />
                  </div>
                </div>

                {/* PayPal Account Option */}
                <div 
                  className={`selection-card ${selectedAccount === 'paypal' ? 'selected' : ''}`}
                  onClick={() => setSelectedAccount('paypal')}
                >
                  <div className="selection-card-left">
                    <div className="selection-card-icon">
                      <i className="bi bi-paypal"></i>
                    </div>
                    <div className="selection-card-info">
                      <p className="selection-card-title">Jon Thomson</p>
                      <p className="selection-card-subtitle">jonthomos@gmail.com</p>
                    </div>
                  </div>
                  <div className="selection-card-radio">
                    <input
                      type="radio"
                      name="account"
                      checked={selectedAccount === 'paypal'}
                      onChange={() => setSelectedAccount('paypal')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="withdraw-actions">
              <button 
                className="dark-btn"
                onClick={handleWithdrawNext}
                disabled={!selectedAccount || !withdrawAmount}
              >
                Next
              </button>
              <button 
                className="light-btn"
                onClick={() => setShowWithdrawModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Funds Modal */}
      {showAddFundsModal && (
        <div className="modal-overlay" onClick={() => setShowAddFundsModal(false)}>
          <div className="modal-container add-funds-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowAddFundsModal(false)}
            >
              <i className="bi bi-x"></i>
            </button>
            
            <h2 className="modal-title">Add Funds</h2>

            {/* Enter Amount */}
            <div className="add-funds-section">
              <label className="form-label">Enter Amount</label>
              <div className="form-input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={addFundsAmount}
                  onChange={(e) => setAddFundsAmount(e.target.value)}
                  placeholder="500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-footer">
              <button 
                className="btn-dark"
                onClick={handleAddFundsNext}
                disabled={!addFundsAmount || addFundsAmount <= 0}
              >
                Add Funds
              </button>
              <button 
                className="btn-light"
                onClick={() => setShowAddFundsModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Funds Success Modal */}
      {showAddFundsSuccess && (
        <div className="modal-overlay" onClick={() => setShowAddFundsSuccess(false)}>
          <div className="modal-container pt-0 w-100 payment-result-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-result-bg">
              <img src={successTopImg} alt="" className="payment-bg-image" />
            </div>
            
            <div className="payment-result-content">
              <h2 className="payment-result-title success">Deposited Successfully</h2>
              
              <div className="payment-amount-section">
                <p className="payment-amount-label">Amount</p>
                <h3 className="payment-amount-value">${addFundsAmount}</h3>
              </div>
              
              <p className="payment-result-message">
                Funds have been added to your wallet successfully
              </p>
              
              <div className="payment-transaction-id">
                <span className="transaction-id-label">Transaction ID: </span>
                <span className="transaction-id-value">{addFundsTransactionId}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(addFundsTransactionId)}
                  title="Copy to clipboard"
                >
                  <i className="bi bi-clipboard"></i>
                </button>
              </div>
              
              <p className="payment-timestamp">{addFundsTime}</p>
              
              <div className="payment-result-actions">
                <button className="btn-dark">View Receipt</button>
                <button className="btn-light" onClick={() => setShowAddFundsSuccess(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
