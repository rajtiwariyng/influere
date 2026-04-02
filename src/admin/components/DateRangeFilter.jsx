import React, { useMemo, useState } from "react";
import "./DateRangeFilter.css";

const presetOptions = [
  { id: "last7", label: "Last 7 Days", days: 7 },
  { id: "last30", label: "Last 30 Days", days: 30 },
  { id: "last60", label: "Last 60 Days", days: 60 },
  { id: "last90", label: "Last 90 Days", days: 90 },
  { id: "thisMonth", label: "This Month" },
  { id: "lastMonth", label: "Last Month" },
  { id: "thisQuarter", label: "This Quarter" },
  { id: "lastQuarter", label: "Last Quarter" },
  { id: "thisYear", label: "This Year" },
];

const getMonthDays = (year, month) =>
  new Date(year, month + 1, 0).getDate();

const buildCalendar = (referenceDate = new Date()) => {
  const calendars = [];
  for (let i = 0; i < 2; i++) {
    const date = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + i, 1);
    const daysInMonth = getMonthDays(date.getFullYear(), date.getMonth());
    const weeks = [];
    let week = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    for (let i = 0; i < firstDay; i++) week.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      week.push(new Date(date.getFullYear(), date.getMonth(), d));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
    calendars.push({ monthLabel: date.toLocaleString("default", { month: "short", year: "numeric" }), weeks });
  }
  return calendars;
};

const DateRangeFilter = ({
  onApply,
  initialStart,
  initialEnd,
  timezone = "UTC",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(initialStart || "");
  const [endDate, setEndDate] = useState(initialEnd || "");
  const [zone, setZone] = useState(timezone);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const calendars = useMemo(() => buildCalendar(), []);

  const handlePresetClick = (preset) => {
    const now = new Date();
    let start, end = new Date();
    switch (preset.id) {
      case "last7":
      case "last30":
      case "last60":
      case "last90":
        start = new Date();
        start.setDate(now.getDate() - (preset.days - 1));
        break;
      case "thisMonth":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "lastMonth":
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      default:
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    }
    setStartDate(start.toISOString().substr(0, 10));
    setEndDate(end.toISOString().substr(0, 10));
    setSelectedPreset(preset);
  };

  const handleApply = () => {
    onApply?.({ startDate, endDate, timezone: zone });
    setIsOpen(false);
  };

  return (
    <div className="date-range-filter">
      <button
        type="button"
        className="filter-btn date-range-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <i className="bi bi-funnel"></i>
      </button>

      {isOpen && (
        <div className="date-range-dropdown">
          <div className="date-range-calendars">
            {calendars.map((calendar) => (
              <div key={calendar.monthLabel} className="date-calendar">
                <div className="calendar-header">{calendar.monthLabel}</div>
                <div className="calendar-grid">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <span key={day} className="calendar-day-label">
                      {day}
                    </span>
                  ))}
                  {calendar.weeks.flat().map((date, idx) => (
                    <button
                      key={idx}
                      className={`calendar-day ${
                        date && startDate === date.toISOString().substr(0, 10)
                          ? "selected"
                          : ""
                      }`}
                      disabled={!date}
                      onClick={() =>
                        setStartDate(date.toISOString().substr(0, 10))
                      }
                    >
                      {date?.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="date-range-sidebar">
            <div className="dropdown">
            <label style={{fontSize: '12px', color: '#444545', marginBottom: '4px'}}>Select Preset:</label>
              <button
                className="dropdown-toggle preset-dropdown-btn"
                type="button"
                id="presetDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedPreset ? selectedPreset.label : "Select Preset"}
                
              </button>
              <ul className="dropdown-menu" aria-labelledby="presetDropdown">
                {presetOptions.map((preset) => (
                  <li key={preset.id}>
                    <a
                      className={`dropdown-item ${selectedPreset?.id === preset.id ? 'active' : ''}`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePresetClick(preset);
                      }}
                    >
                      {preset.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="timezone-controls">
              <label>Timezone:</label>
              <select value={zone} onChange={(e) => setZone(e.target.value)}>
                <option value="UTC">UTC</option>
                <option value="IST">IST</option>
                <option value="PST">PST</option>
              </select>
            </div>

            <button type="button" className="btn-dark btn-block" onClick={handleApply}>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;

