import React, { useState, useMemo } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import DateRangeFilter from "../components/DateRangeFilter";
import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import followIcon from "../../assets/follow-icon.svg";
import unfollowIcon from "../../assets/unfollow-icon.svg";
import verfiedIcon from "../../assets/verfied-tick.svg";
import facebookIcon from "../../assets/facebook-2.svg";
import instagramIcon from "../../assets/instagram.svg";
import twitterIcon from "../../assets/x.svg";
import linkedinIcon from "../../assets/linkedin-2.svg";
import tiktokIcon from "../../assets/ticktok.svg";
import youtubeIcon from "../../assets/youtube.svg";

const Dashboard = () => {
  usePageTitle("Dashboard");
  const [timeframe, setTimeframe] = useState("days");

  // Chart.js data configuration
  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Android',
        data: [320, 280, 350, 290, 380, 400, 320],
        backgroundColor: '#2e6fb0',
        borderColor: '#2e6fb0',
        borderWidth: 1,
      },
      {
        label: 'IOS',
        data: [180, 220, 190, 250, 210, 280, 240],
        backgroundColor: '#d12e8e',
        borderColor: '#d12e8e',
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
        position: 'top',
        align: 'end',
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
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
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  // --- #17 dashboard sections ---
  const [activityTimeframe, setActivityTimeframe] = useState("24h");
  const [activitySort, setActivitySort] = useState("date");

  const socialPlatforms = [
    { name: "Facebook", icon: facebookIcon, followers: "120k" },
    { name: "Instagram", icon: instagramIcon, followers: "340k" },
    { name: "Twitter", icon: twitterIcon, followers: "95k" },
    { name: "YouTube", icon: youtubeIcon, followers: "210k" },
    { name: "LinkedIn", icon: linkedinIcon, followers: "60k" },
    { name: "TikTok", icon: tiktokIcon, followers: "180k" },
  ];

  // (1) Revenue generated vs paid out
  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue Generated",
        data: [4200, 5100, 4800, 6300, 7200, 6800],
        backgroundColor: "#1aaec4",
        borderWidth: 1,
      },
      {
        label: "Paid Out",
        data: [2100, 2600, 2400, 3200, 3600, 3400],
        backgroundColor: "#d12e8e",
        borderWidth: 1,
      },
    ],
  };

  // (2) Followers from each social platform
  const followersChartData = {
    labels: socialPlatforms.map((p) => p.name),
    datasets: [
      {
        label: "Followers",
        data: [120000, 340000, 95000, 210000, 60000, 180000],
        backgroundColor: "#2e6fb0",
        borderWidth: 1,
      },
    ],
  };

  const collabNotifications = [
    { id: 1, direction: "incoming", name: "Sarah Johnson", platform: "Instagram", detail: "wants to collaborate on a reel campaign", amount: "$1,200", time: "2h ago" },
    { id: 2, direction: "outgoing", name: "David Chen", platform: "YouTube", detail: "you sent a collaboration offer", amount: "$880", time: "5h ago" },
    { id: 3, direction: "incoming", name: "Michael Thompson", platform: "LinkedIn", detail: "wants to co-author a thought-leadership post", amount: "$1,500", time: "1d ago" },
    { id: 4, direction: "outgoing", name: "Kavya Nair", platform: "TikTok", detail: "you sent a collaboration offer", amount: "$1,800", time: "2d ago" },
  ];

  const recentActivities = [
    { id: 1, label: "Received payment from Sarah Johnson", amount: "+$1,200", date: "27-06-2026", window: "24h" },
    { id: 2, label: "Sent collaboration offer to David Chen", amount: "-$880", date: "26-06-2026", window: "1w" },
    { id: 3, label: "Profile verified on Instagram", amount: "", date: "22-06-2026", window: "1w" },
    { id: 4, label: "Withdrawal to bank account", amount: "-$3,000", date: "01-06-2026", window: "1m" },
    { id: 5, label: "Earned from YouTube campaign", amount: "+$6,800", date: "12-12-2025", window: "1y" },
    { id: 6, label: "Account created", amount: "", date: "10-03-2021", window: "5y" },
  ];

  const activityWindowOrder = ["24h", "1w", "1m", "1y", "5y", "10y"];
  const filteredActivities = recentActivities.filter(
    (a) => activityWindowOrder.indexOf(a.window) <= activityWindowOrder.indexOf(activityTimeframe)
  );

  // Chart options for the two stat charts (#17)
  const statChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top", align: "end", labels: { usePointStyle: true, font: { size: 11 } } } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" }, ticks: { font: { size: 11 } } },
    },
  };

  // Sample data for the table
  const tableData = [
    {
      id: 1,
      name: "Ann Culhane",
      username: "@anne_cullane",
      platform: "Facebook",
      date: "23-05-2025",
    },
    {
      id: 2,
      name: "Ahmad Rosser",
      username: "@ahmad_rosser",
      platform: "Facebook",
      date: "23-05-2025",
    },
    {
      id: 3,
      name: "Zain Calzoni",
      username: "@zain_calzoni",
      platform: "Facebook",
      date: "23-05-2025",
    },
    {
      id: 4,
      name: "Leo Stanton",
      username: "@leo_stanton",
      platform: "Facebook",
      date: "23-05-2025",
    },
    {
      id: 5,
      name: "Kaiya Vetrovs",
      username: "@kaiyan_vetrovs",
      platform: "Facebook",
      date: "23-05-2025",
    },
    {
      id: 6,
      name: "Sarah Johnson",
      username: "@sarah_j",
      platform: "Instagram",
      date: "22-05-2025",
    },
    {
      id: 7,
      name: "Mike Chen",
      username: "@mike_chen",
      platform: "Twitter",
      date: "22-05-2025",
    },
    {
      id: 8,
      name: "Emma Wilson",
      username: "@emma_w",
      platform: "LinkedIn",
      date: "21-05-2025",
    },
    {
      id: 9,
      name: "David Brown",
      username: "@david_b",
      platform: "YouTube",
      date: "21-05-2025",
    },
    {
      id: 10,
      name: "Lisa Davis",
      username: "@lisa_d",
      platform: "TikTok",
      date: "20-05-2025",
    },
  ];

  // Table columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "select",
        header: "#",
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "NAME",
        cell: ({ getValue }) => (
          <span className="table-name">{getValue()}</span>
        ),
      },
      {
        accessorKey: "username",
        header: "USERNAME",
        cell: ({ getValue }) => (
          <span className="table-username">{getValue()}</span>
        ),
      },
      {
        accessorKey: "platform",
        header: "PLATFORM",
        cell: ({ getValue }) => (
          <span className="table-platform">{getValue()}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "DATE",
        cell: ({ getValue }) => (
          <span className="table-date">{getValue()}</span>
        ),
      },
    ],
    []
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: tableData,
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
    <div className="dashboard">
      {/* Profile (left) + Metrics & chart (right) — #16 */}
      <div className="row flex-row-reverse">
        <div className="col-md-7">
          <div className="dashboard-metrics">
            <div className="metric-card followers-card">
              <div className="metric-icon">
                <img src={followIcon} alt="Followers" />
              </div>
              <div className="metric-content">
                <h3 className="metric-title d-flex align-items-center gap-2">
                  Total Followers
                  <div className="metric-change positive">
                    <span className="change-icon">↗</span>
                    +15.03%
                  </div>
                </h3>
                <div className="metric-value m-0">1500</div>
              </div>
            </div>

            <div className="metric-card unfollowers-card">
              <div className="metric-icon">
                <img src={unfollowIcon} alt="Unfollowers" />
              </div>
              <div className="metric-content">
                <h3 className="metric-title d-flex align-items-center gap-2">
                  Total Unfollowers
                  <div className="metric-change negative">
                    <span className="change-icon">↘</span>
                    -5.03%
                  </div>
                </h3>
                <div className="metric-value m-0">200</div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="dashboard-chart-section">
            <div className="chart-header">
              <h2 className="chart-title">Download's Statics</h2>
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

            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-5 pe-0 d-flex">
          <div className="user-card w-100">
            <div className="card-header"></div>
            <div className="user-profile-photo">
              <img
                src="https://tinyurl.com/4evuhykf"
                alt="user-profile-photo"
              />
            </div>
            <div className="user-details">
              <div className="top-details d-flex align-items-center justify-content-between mb-1">
                <h4 className="username d-flex align-items-center gap-2">
                  John Doe{" "}
                  <span>
                    <img src={verfiedIcon} alt="" />
                  </span>
                </h4>
                <a
                  href="#"
                  className="edit-profile-btn"
                  style={{ color: "#2e6fb0 !important" }}
                >
                  <i className="bi bi-pencil-square me-1"></i>Edit
                </a>
              </div>
              <div className="user-linktree d-flex align-items-center justify-content-between mb-2">
                <p className="userID d-flex align-items-center fs-6 text-muted">
                  CA00786YTIGTW
                </p>
                <a href="#" className="linktree-btn">
                  <i className="bi bi-link-45deg"></i>john_doe
                </a>
              </div>
              <div className="contact-details mb-2">
                <h6 className="contact-title text-dark mb-2">
                  Contact Details
                </h6>
                <div className="contact-items-container d-flex align-items-center justify-content-between">
                  <div className="contact-items">
                    <div className="lable">
                      <p className="text-muted" style={{ fontSize: "12px" }}>
                        <i class="bi bi-envelope me-1"></i>Email
                      </p>
                    </div>
                    <a
                      href="mailto:johndoe@gmail.com"
                      className="text-dark fw-semibold"
                    >
                      johndoe@gmail.com
                    </a>
                  </div>
                  <div className="contact-items">
                    <div className="lable">
                      <p className="text-muted" style={{ fontSize: "12px" }}>
                        <i class="bi bi-telephone me-1"></i>Phone Number
                      </p>
                    </div>
                    <a href="tel:+1345678900" className="text-dark fw-semibold">
                      +1 345678900
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social media cards — #17 */}
      <div className="dashboard-social-cards">
        {socialPlatforms.map((p) => (
          <div key={p.name} className="dashboard-social-card">
            <img src={p.icon} alt={p.name} className="dashboard-social-card-icon" />
            <div className="dashboard-social-card-meta">
              <span className="dashboard-social-card-platform">{p.name}</span>
              <span className="dashboard-social-card-handle">john_doe</span>
            </div>
            <span className="dashboard-social-card-followers">{p.followers}</span>
          </div>
        ))}
      </div>

      {/* Two statistics graphs — #17 */}
      <div className="row dashboard-stats-row">
        <div className="col-md-6">
          <div className="dashboard-stat-card">
            <h2 className="chart-title">Revenue Generated vs Paid Out</h2>
            <div className="chart-container">
              <Bar data={revenueChartData} options={statChartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-stat-card">
            <h2 className="chart-title">Followers by Platform</h2>
            <div className="chart-container">
              <Bar data={followersChartData} options={statChartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Collaboration offers + Recent Activity — #17 */}
      <div className="row dashboard-activity-row">
        <div className="col-md-6">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2 className="table-title mb-0">Collaboration Offers</h2>
            </div>
            <div className="collab-notifications">
              {collabNotifications.map((n) => (
                <div key={n.id} className={`collab-notification collab-notification-${n.direction}`}>
                  <span className={`collab-notification-badge ${n.direction}`}>
                    {n.direction === "incoming" ? "Incoming" : "Outgoing"}
                  </span>
                  <div className="collab-notification-body">
                    <p className="collab-notification-text">
                      <strong>{n.name}</strong> ({n.platform}) {n.detail}
                    </p>
                    <span className="collab-notification-time">{n.time}</span>
                  </div>
                  <span className="collab-notification-amount">{n.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <h2 className="table-title mb-0">Recent Activity</h2>
              <div className="d-flex align-items-center gap-2">
                <select
                  className="activity-filter-select"
                  value={activityTimeframe}
                  onChange={(e) => setActivityTimeframe(e.target.value)}
                >
                  <option value="24h">Past 24 Hours</option>
                  <option value="1w">Past Week</option>
                  <option value="1m">Past Month</option>
                  <option value="1y">Past Year</option>
                  <option value="5y">Past 5 Years</option>
                  <option value="10y">Past 10 Years</option>
                </select>
                <select
                  className="activity-filter-select"
                  value={activitySort}
                  onChange={(e) => setActivitySort(e.target.value)}
                >
                  <option value="date">Sort: Date</option>
                  <option value="amount">Sort: Amount</option>
                  <option value="time">Sort: Time</option>
                </select>
              </div>
            </div>
            <div className="recent-activity-list">
              {filteredActivities.length === 0 ? (
                <p className="text-muted m-0">No activity in this period.</p>
              ) : (
                filteredActivities.map((a) => (
                  <div key={a.id} className="recent-activity-item">
                    <div className="recent-activity-main">
                      <span className="recent-activity-label">{a.label}</span>
                      <span className="recent-activity-date">{a.date}</span>
                    </div>
                    {a.amount && (
                      <span
                        className={`recent-activity-amount ${
                          a.amount.startsWith("+") ? "positive" : "negative"
                        }`}
                      >
                        {a.amount}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Visit Table */}
      <div className="dashboard-table-section">
        <div className="table-header">
          <h2 className="table-title">Recent Visit</h2>
          <a href="#" className="view-all-btn">
            View All
          </a>
        </div>

        <div className="table-container-wrapper">
          <div className="table-controls">
          <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
            <DateRangeFilter onApply={(range) => console.log(range)} />
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
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>Rows per page</span>
            </div>
            <div className="pagination-controls">
              <button>‹</button>
              <span>1/10</span>
              <button>›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
