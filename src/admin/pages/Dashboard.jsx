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
import pinterestIcon from "../../assets/pinterest.svg";
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
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
      {
        label: 'IOS',
        data: [180, 220, 190, 250, 210, 280, 240],
        backgroundColor: '#F97316',
        borderColor: '#F97316',
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
      {/* Metrics Cards */}
      <div className="row">
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
        <div className="col-md-5 ps-0">
          <div className="user-card">
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
                  Sonam Kumari{" "}
                  <span>
                    <img src={verfiedIcon} alt="" />
                  </span>
                </h4>
                <a
                  href="#"
                  className="edit-profile-btn"
                  style={{ color: "#0088FF !important" }}
                >
                  <i className="bi bi-pencil-square me-1"></i>Edit
                </a>
              </div>
              <div className="user-linktree d-flex align-items-center justify-content-between mb-2">
                <p className="userID d-flex align-items-center fs-6 text-muted">
                  CA00786YTIGTW
                </p>
                <a href="#" className="linktree-btn">
                  <i className="bi bi-link-45deg"></i>sonam_kumari
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
                      href="mailto:sonam@gmail.com"
                      className="text-dark fw-semibold"
                    >
                      sonam@gmail.com
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
              <div className="social-media-links mb-2">
                <h6 className="social-media-title text-dark mb-2">
                  Social Media Links
                </h6>
                <div className="social-media-items-container d-flex align-items-center gap-2">
                  <a href="#" className="social-media-item">
                    <img src={facebookIcon} alt="Facebook" />
                  </a>
                  <a href="#" className="social-media-item">
                    <img src={instagramIcon} alt="Instagram" />
                  </a>
                  <a href="#" className="social-media-item">
                    <img src={twitterIcon} alt="Twitter" />
                  </a>
                  <a href="#" className="social-media-item">
                    <img src={youtubeIcon} alt="YouTube" />
                  </a>
                  <a href="#" className="social-media-item">
                    <img src={linkedinIcon} alt="LinkedIn" />
                  </a>
                  <a href="#" className="social-media-item">
                    <img src={tiktokIcon} alt="TikTok" />
                  </a>
                  <a href="#" className="social-media-item">
                    <img src={pinterestIcon} alt="Pinterest" />
                  </a>
                </div>
              </div>
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
