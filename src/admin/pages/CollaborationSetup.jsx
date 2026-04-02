import React, { useState, useMemo } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import "../components/ConsultancyModals.css";
import "./DiscountOffers.css";
import "./CollaborationSetup.css";

const platformTabs = [
  { id: "facebook-instagram-tiktok", label: "Facebook, Instagram & TikTok", count: 12 },
  { id: "youtube", label: "YouTube", count: 3 },
  { id: "twitter", label: "Twitter", count: 8 },
];

const collaborationSettings = [
  {
    id: "mention-in-post",
    title: "Mention in Post",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: "mention-in-description",
    title: "Mention in Description",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: "repost",
    title: "Repost",
    description: "Lorem Ipsum is simply dummy text of the printing",
  },
  {
    id: "mention-in-content",
    title: "Mention in Content",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const SLIDER_MIN = 0;
const SLIDER_MAX = 1000;

const CollaborationSetup = () => {
  usePageTitle("Collaboration Setup");
  const [activePlatform, setActivePlatform] = useState(platformTabs[0].id);
  const [settings, setSettings] = useState(
    collaborationSettings.reduce((acc, setting) => {
      acc[setting.id] = { 
        minValue: 300, 
        maxValue: 700, 
        minAmount: "$300",
        maxAmount: "$700"
      };
      return acc;
    }, {})
  );
  const [auctionBids, setAuctionBids] = useState("");
  const [engagementRule, setEngagementRule] = useState("");
  const [blockedCountries, setBlockedCountries] = useState(["New Delhi", "Rajkot"]);
  const [blockedRegions, setBlockedRegions] = useState(["New Delhi", "Rajkot"]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showCountryFlag, setShowCountryFlag] = useState(false);
  const [onThumbnail, setOnThumbnail] = useState(false);

  const handleMinSliderChange = (settingId, value) => {
    const numValue = Number(value);
    setSettings((prev) => {
      const current = prev[settingId];
      const newMinValue = Math.min(numValue, current.maxValue);
      return {
        ...prev,
        [settingId]: {
          ...current,
          minValue: newMinValue,
          minAmount: `$${newMinValue}`,
        },
      };
    });
  };

  const handleMaxSliderChange = (settingId, value) => {
    const numValue = Number(value);
    setSettings((prev) => {
      const current = prev[settingId];
      const newMaxValue = Math.max(numValue, current.minValue);
      return {
        ...prev,
        [settingId]: {
          ...current,
          maxValue: newMaxValue,
          maxAmount: `$${newMaxValue}`,
        },
      };
    });
  };

  const handleMinAmountChange = (settingId, amount) => {
    const numValue = amount.replace(/[^0-9]/g, "");
    const value = numValue ? Number(numValue) : 0;
    const clampedValue = Math.min(Math.max(value, SLIDER_MIN), SLIDER_MAX);
    setSettings((prev) => {
      const current = prev[settingId];
      const newMinValue = Math.min(clampedValue, current.maxValue);
      return {
        ...prev,
        [settingId]: {
          ...current,
          minValue: newMinValue,
          minAmount: amount.startsWith("$") ? amount : `$${amount}`,
        },
      };
    });
  };

  const handleMaxAmountChange = (settingId, amount) => {
    const numValue = amount.replace(/[^0-9]/g, "");
    const value = numValue ? Number(numValue) : 0;
    const clampedValue = Math.min(Math.max(value, SLIDER_MIN), SLIDER_MAX);
    setSettings((prev) => {
      const current = prev[settingId];
      const newMaxValue = Math.max(clampedValue, current.minValue);
      return {
        ...prev,
        [settingId]: {
          ...current,
          maxValue: newMaxValue,
          maxAmount: amount.startsWith("$") ? amount : `$${amount}`,
        },
      };
    });
  };

  const removeCountry = (country) => {
    setBlockedCountries((prev) => prev.filter((c) => c !== country));
  };

  const removeRegion = (region) => {
    setBlockedRegions((prev) => prev.filter((r) => r !== region));
  };

  const handleCountrySelect = (country) => {
    if (country && !blockedCountries.includes(country)) {
      setBlockedCountries((prev) => [...prev, country]);
    }
    setSelectedCountry("");
  };

  const handleRegionSelect = (region) => {
    if (region && !blockedRegions.includes(region)) {
      setBlockedRegions((prev) => [...prev, region]);
    }
    setSelectedRegion("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      activePlatform,
      settings,
      auctionBids,
      engagementRule,
      blockedCountries,
      blockedRegions,
      showCountryFlag,
      onThumbnail,
    });
  };

  return (
    <div className="admin-page collaboration-setup-page">
      <div className="collaboration-setup-header">
        <h1 className="admin-page-title">Setup your profile to collaborate with others</h1>
      </div>

      <div className="collaboration-setup-content">
        {/* Platform Tabs */}
        <div>
          <div className="table-controls justify-content-between">
            <div className="transaction-tabs">
              {platformTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${
                    activePlatform === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActivePlatform(tab.id)}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <form className="collaboration-setup-form" onSubmit={handleSubmit}>
          {/* Collaboration Settings */}
          <div className="insurance-list">
            {collaborationSettings.map((setting) => {
              const settingData = settings[setting.id];
              const minSliderProgress = useMemo(() => {
                return (
                  ((settingData.minValue - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) *
                  100
                );
              }, [settingData.minValue]);

              const maxSliderProgress = useMemo(() => {
                return (
                  ((settingData.maxValue - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) *
                  100
                );
              }, [settingData.maxValue]);

              return (
                <div
                  key={setting.id}
                  className="setting-card"
                >
                  <div className="setting-card-left">
                    <div className="step-card-title">
                      <p >{setting.title}</p>
                      <p className="step-card-description">{setting.description}</p>
                    </div>
                  </div>

                  <div className="setting-card-right">
                    <div className="w-100">
                      <div className="collaboration-range-wrapper" style={{ position: "relative", paddingTop: "12px", paddingBottom: "12px" }}>
                        <div className="collaboration-range-track" style={{ 
                          position: "absolute",
                          top: "20px",
                          left: 0,
                          right: 0,
                          height: "6px",
                          background: "var(--admin-gray-100)",
                          borderRadius: "3px",
                          zIndex: 0
                        }}></div>
                        <div className="collaboration-range-active" style={{
                          position: "absolute",
                          top: "20px",
                          left: `${minSliderProgress}%`,
                          width: `${maxSliderProgress - minSliderProgress}%`,
                          height: "6px",
                          background: "#066daf",
                          borderRadius: "3px",
                          zIndex: 1
                        }}></div>
                        <input
                          type="range"
                          min={SLIDER_MIN}
                          max={SLIDER_MAX}
                          value={settingData.minValue}
                          onChange={(e) =>
                            handleMinSliderChange(setting.id, e.target.value)
                          }
                          className="collaboration-range-input"
                          style={{ 
                            position: "absolute", 
                            width: "100%", 
                            zIndex: settingData.minValue > settingData.maxValue - 50 ? 3 : 2 
                          }}
                        />
                        <input
                          type="range"
                          min={SLIDER_MIN}
                          max={SLIDER_MAX}
                          value={settingData.maxValue}
                          onChange={(e) =>
                            handleMaxSliderChange(setting.id, e.target.value)
                          }
                          className="collaboration-range-input"
                          style={{ 
                            position: "absolute", 
                            width: "100%", 
                            zIndex: settingData.maxValue < settingData.minValue + 50 ? 3 : 2 
                          }}
                        />
                        <div
                          className="collaboration-range-value"
                          style={{ left: `${minSliderProgress}%`, top: "-16px", zIndex: 4 }}
                        >
                          ${settingData.minValue}
                        </div>
                        <div
                          className="collaboration-range-value"
                          style={{ left: `${maxSliderProgress}%`, top: "-16px", zIndex: 4 }}
                        >
                          ${settingData.maxValue}
                        </div>
                      </div>
                    </div>
                    <div className="collaboration-amount-inputs" style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "12px" }}>
                      <div className="collaboration-amount-input" style={{ flex: 1 }}>
                        <input
                          type="text"
                          value={settingData.minAmount}
                          onChange={(e) =>
                            handleMinAmountChange(setting.id, e.target.value)
                          }
                          className="form-input-group"
                          placeholder="Min Amount"
                        />
                      </div>
                      <span style={{ color: "var(--admin-gray-500)", fontSize: "14px" }}>to</span>
                      <div className="collaboration-amount-input" style={{ flex: 1 }}>
                        <input
                          type="text"
                          value={settingData.maxAmount}
                          onChange={(e) =>
                            handleMaxAmountChange(setting.id, e.target.value)
                          }
                          className="form-input-group"
                          placeholder="Max Amount"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Auction & Bids */}
          <div className="collaboration-setting-section">
            <p className="collaboration-setting-title setting-card-left">
              Are you willing to participate in Auction & Bids:
            </p>
            <div className="collaboration-radio-group setting-card-right">
              <label className="collaboration-radio-label">
                <input
                  type="radio"
                  name="auction-bids"
                  value="yes"
                  checked={auctionBids === "yes"}
                  onChange={(e) => setAuctionBids(e.target.value)}
                />
                <span>Yes</span>
              </label>
              <label className="collaboration-radio-label">
                <input
                  type="radio"
                  name="auction-bids"
                  value="no"
                  checked={auctionBids === "no"}
                  onChange={(e) => setAuctionBids(e.target.value)}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Rule for engagement */}
          <div className="collaboration-setting-section setting-card">
            <label className="collaboration-field-label w-100">
              <p className="collaboration-setting-title setting-card-left">Rule for engagement</p>
              <div className="consultancy-select setting-card-right p-0">
                <select className="px-2"
                  value={engagementRule}
                  onChange={(e) => setEngagementRule(e.target.value)}
                >
                  <option value="" disabled>
                    Select Value
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <span className="consultancy-select-caret">
                  <i className="bi bi-chevron-down"></i>
                </span>
              </div>
            </label>
          </div>

          {/* Block Access to Users in the countries */}
          <div className="collaboration-setting-section setting-card">
            <label className="collaboration-field-label w-100">
              <p className="collaboration-setting-title setting-card-left">Block Access to Users in the countries</p>
              <div className="collaboration-tags-input setting-card-right">
                {blockedCountries.map((country) => (
                  <span key={country} className="collaboration-tag">
                    {country}
                    <button
                      type="button"
                      className="collaboration-tag-remove"
                      onClick={() => removeCountry(country)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </span>
                ))}
                <div className="consultancy-select p-0 px-2 multi-select-dropdown">
                  <select className="px-2"
                    value={selectedCountry}
                    onChange={(e) => handleCountrySelect(e.target.value)}
                  >
                    <option value="" disabled>
                    </option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                  <span className="consultancy-select-caret">
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* Block Access to Users of this region */}
          <div className="collaboration-setting-section setting-card">
            <label className="collaboration-field-label w-100">
              <p className="collaboration-setting-title setting-card-left">Block Access to Users of this region</p>
              <div className="collaboration-tags-input setting-card-right">
                {blockedRegions.map((region) => (
                  <span key={region} className="collaboration-tag">
                    {region}
                    <button
                      type="button"
                      className="collaboration-tag-remove"
                      onClick={() => removeRegion(region)}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </span>
                ))}
                <div className="consultancy-select multi-select-dropdown">
                  <select className="px-2 border-0"
                    value={selectedRegion}
                    onChange={(e) => handleRegionSelect(e.target.value)}
                  >
                    <option value="" disabled>
                      
                    </option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                  <span className="consultancy-select-caret">
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* Checkboxes */}
          <div className="collaboration-setting-section setting-card align-items-center">
            <label className="collaboration-checkbox-label align-items-center m-0">
              <input
                type="checkbox"
                checked={showCountryFlag}
                onChange={(e) => setShowCountryFlag(e.target.checked)}
              />
              <span>Show My Country Flag</span>
            </label>
            <label className="collaboration-checkbox-label align-items-center">
              <input
                type="checkbox"
                checked={onThumbnail}
                onChange={(e) => setOnThumbnail(e.target.checked)}
              />
              <span>On the Thumbnail</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="collaboration-setup-actions">
            <button type="submit" className="btn-dark">
              Submit
            </button>
            <button type="button" className="btn-light">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollaborationSetup;

