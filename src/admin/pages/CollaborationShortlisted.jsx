import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import { collaborationProfiles } from "../data/collaborationProfilesData";
import {
  incomingWorkOrders,
  outgoingWorkOrders,
  createWorkOrdersFromProfileIds,
} from "../data/workOrderData";
import ProfileSellModal from "../components/ProfileSellModal";
import AuctionInfluencerModal from "../components/AuctionInfluencerModal";
import AuctionCollaboratorModal from "../components/AuctionCollaboratorModal";
import "../components/ConsultancyModals.css";
import "./ConsultancyCategoryPage.css";
import "./CollaborationPage.css";
import "./Wallet.css";
import "./CollaborationShortlisted.css";
import "./CollaborationSetup.css";

const CollaborationShortlisted = () => {
  usePageTitle("Shortlisted");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "incoming");
  const [expandedAccordions, setExpandedAccordions] = useState(new Set());
  const [selectedCards, setSelectedCards] = useState(new Set());
  const isProgrammaticUpdate = useRef(false);
  const [showAuctionInfluencerModal, setShowAuctionInfluencerModal] = useState(false);
  const [showAuctionCollaboratorModal, setShowAuctionCollaboratorModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState("$500");
  const [offerDateTime, setOfferDateTime] = useState("24-10-2025 | 03:45 PM");
  const [selectedOutgoingOrder, setSelectedOutgoingOrder] = useState("");
  const [setupBidBetween, setSetupBidBetween] = useState(false);
  const [sortBy, setSortBy] = useState("price-low-to-high");
  const [chatMessages] = useState([
    {
      id: 1,
      sender: "you",
      text: "Work Order Name/Number: #1233\nBrief description of work: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      time: "12:44 PM",
    },
    {
      id: 2,
      sender: "other",
      senderName: "Sender User Name",
      text: "I've processed your request and generated a comprehensive analysis. The results include key insights and actionable recommendations based on current financial data.",
      time: "12:44 PM",
    },
  ]);

  // Get selected profile IDs from URL params for backward compatibility
  const selectedIdsParam = searchParams.get("ids");
  const selectedProfileIds = selectedIdsParam
    ? selectedIdsParam.split(",")
    : [];

  // Sync active tab with URL param
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && (tabParam === "incoming" || tabParam === "outgoing")) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // For now, use work orders data or fallback to selected profiles
  const incomingWorkOrdersData =
    incomingWorkOrders.length > 0
      ? incomingWorkOrders
      : createWorkOrdersFromProfileIds(selectedProfileIds);

  // Outgoing work orders data
  const outgoingWorkOrdersData = outgoingWorkOrders.length > 0
    ? outgoingWorkOrders
    : [];

  // Get unique work order numbers for the dropdown
  const outgoingOrderNumbers = [...new Set(outgoingWorkOrdersData.map(wo => wo.orderNumber))];
  
  // Filter outgoing work orders by selected order number
  const filteredOutgoingWorkOrders = selectedOutgoingOrder
    ? outgoingWorkOrdersData.filter(wo => wo.orderNumber === selectedOutgoingOrder)
    : outgoingWorkOrdersData;

  // Set default selected order if not set
  useEffect(() => {
    if (activeTab === "outgoing" && !selectedOutgoingOrder && outgoingOrderNumbers.length > 0) {
      setSelectedOutgoingOrder(outgoingOrderNumbers[0]);
    }
  }, [activeTab, selectedOutgoingOrder, outgoingOrderNumbers.length]);

  // Sync setupBidBetween checkbox state with selected cards for current work order
  useEffect(() => {
    if (activeTab === "outgoing" && selectedOutgoingOrder && !isProgrammaticUpdate.current) {
      const currentWorkOrder = filteredOutgoingWorkOrders.find(
        wo => wo.orderNumber === selectedOutgoingOrder
      );
      if (currentWorkOrder) {
        const profiles = currentWorkOrder.profiles || (currentWorkOrder.profile ? [currentWorkOrder.profile] : []);
        const cardIds = profiles.map((_, index) => `${currentWorkOrder.id}-${index}`);
        const allSelected = cardIds.length > 0 && cardIds.every(id => selectedCards.has(id));
        setSetupBidBetween(allSelected);
      }
    }
  }, [selectedCards, selectedOutgoingOrder, filteredOutgoingWorkOrders, activeTab]);

  const toggleAccordion = (workOrderId) => {
    const newExpanded = new Set(expandedAccordions);
    if (newExpanded.has(workOrderId)) {
      newExpanded.delete(workOrderId);
    } else {
      newExpanded.add(workOrderId);
    }
    setExpandedAccordions(newExpanded);
  };

  const handleBackClick = () => {
    navigate("/dashboard/collaboration/list");
  };

  return (
    <div className="admin-page consultancy-page collaboration-page shortlisted-page">
      <div className="profile-edit-header">
        <h1 className="admin-page-title">Shortlisted</h1>
      </div>

      {/* Tabs - Using same structure as Profile Sell Page */}
      <div className="transaction-tabs">
        <button
          className={`tab-btn ${activeTab === "incoming" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("incoming");
            navigate("/dashboard/collaboration/shortlisted?tab=incoming", {
              replace: true,
            });
          }}
        >
          Incoming ({incomingWorkOrdersData.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "outgoing" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("outgoing");
            navigate("/dashboard/collaboration/shortlisted?tab=outgoing", {
              replace: true,
            });
          }}
        >
          Outgoing ({outgoingWorkOrdersData.length})
        </button>
      </div>
      {/* Tab Content */}
      {activeTab === "incoming" && (
        <div className="shortlisted-content">
          {incomingWorkOrdersData.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No incoming work orders yet.</p>
            </div>
          ) : (
            <div className="shortlisted-cards-list">
              {incomingWorkOrdersData.map((workOrder) => {
                const profile = workOrder.profile;
                if (!profile) return null;

                const isAccordionExpanded = expandedAccordions.has(
                  workOrder.id
                );

                return (
                  <div
                    key={workOrder.id}
                    className="shortlisted-work-order-group"
                  >
                    {/* Work Order Title */}
                    <h2 className="work-order-title">
                      Shortlisted for Work Order #{workOrder.orderNumber}
                    </h2>

                    {/* Card */}
                    <div className={`shortlisted-card-full ${isAccordionExpanded ? "accordion-expanded" : ""}`}>
                      <div className="shortlisted-card-header w-100 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <div className="shortlisted-card-checkbox">
                            <input type="checkbox" />
                          </div>
                          <div className="consultancy-avatar">
                            <img src={profile.avatar} alt={profile.name} />
                          </div>
                          <div className="consultancy-card-meta">
                            <h3 className="consultancy-card-name">
                              {profile.name}
                            </h3>
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
                        {/* Tags */}
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
                      </div>

                      <p className="consultancy-card-summary">
                        {profile.summary}
                      </p>
                      <div className="w-100 border-0 d-flex align-items-center justify-content-between">                        {/* Asking Rates */}
                        {profile.askingRates && (
                          <div className="collaboration-asking-rates d-flex align-items-center gap-2 border-0">
                            <span className="asking-rates-title">
                              Asking Rate:
                            </span>
                            <div className="asking-rates-list d-flex align-items-center gap-2 flex-wrap">
                              {profile.askingRates.post && (
                                <div className="asking-rate-item">
                                  <span className="asking-rate-label">
                                    Post:
                                  </span>
                                  <span className="asking-rate-value">
                                    {profile.askingRates.post}
                                  </span>
                                </div>
                              )}
                              {profile.askingRates.repost && (
                                <div className="asking-rate-item">
                                  <span className="asking-rate-label">
                                    Repost:
                                  </span>
                                  <span className="asking-rate-value">
                                    {profile.askingRates.repost}
                                  </span>
                                </div>
                              )}
                              {profile.askingRates.retweet && (
                                <div className="asking-rate-item">
                                  <span className="asking-rate-label">
                                    Retweet:
                                  </span>
                                  <span className="asking-rate-value">
                                    {profile.askingRates.retweet}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* More Actions Button and Accordion */}
                        <div className="shortlisted-card-actions border-0 d-flex align-items-center justify-content-end">
                          <button
                            type="button"
                            className="more-actions-btn btn-light"
                            onClick={() => toggleAccordion(workOrder.id)}
                          >
                            More Actions
                            <i
                              className={`bi bi-chevron-${
                                isAccordionExpanded ? "up" : "down"
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>
                      {/* Accordion Body */}
                      {isAccordionExpanded && (
                        <div className="more-actions-accordion">
                          <div className="accordion-content">
                            {/* Two sections in a row */}
                            <div className="accordion-two-sections">
                              {/* Section 1: Chat Window */}
                              <div className="accordion-chat-section">
                                <div className="chat-messages-container">
                                  {chatMessages.map((message) => (
                                    <div
                                      key={message.id}
                                      className={`chat-message ${
                                        message.sender === "you"
                                          ? "chat-message-outgoing"
                                          : "chat-message-incoming"
                                      }`}
                                    >
                                      <div className="chat-message-bubble">
                                        <p className="chat-message-text">
                                          {message.text.split("\n").map((line, idx) => (
                                            <React.Fragment key={idx}>
                                              {line}
                                              {idx < message.text.split("\n").length - 1 && (
                                                <br />
                                              )}
                                            </React.Fragment>
                                          ))}
                                        </p>
                                        <div className="chat-message-footer">
                                          <span className="chat-message-time">
                                            {message.time}
                                          </span>
                                          <span className="chat-message-sender">
                                            {message.sender === "you"
                                              ? "You"
                                              : message.senderName}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="chat-input-container">
                                  <button
                                    type="button"
                                    className="chat-input-icon-btn"
                                    title="Emoji"
                                  >
                                    <i className="bi bi-emoji-smile"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="chat-input-icon-btn"
                                    title="Attach"
                                  >
                                    <i className="bi bi-paperclip"></i>
                                  </button>
                                  <input
                                    type="text"
                                    className="chat-input-field"
                                    placeholder="Type your message"
                                  />
                                  <button
                                    type="button"
                                    className="chat-input-icon-btn"
                                    title="Voice"
                                  >
                                    <i className="bi bi-mic"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="chat-send-btn"
                                    title="Send"
                                  >
                                    <i className="bi bi-send"></i>
                                  </button>
                                </div>
                              </div>

                              {/* Section 2: Price/Offer Form */}
                              <div className="accordion-price-form-section">
                                {/* Quoted Price Range */}
                                <div className="price-form-item">
                                  <h3 className="price-form-title">
                                    Quoted Price Range
                                  </h3>
                                  <p className="price-form-description">
                                    Lorem Ipsum is simply dummy text of the printing
                                    and typesetting industry.
                                  </p>
                                  <div className="collaboration-range-wrapper" style={{ pointerEvents: "none" }}>
                                    <div
                                      className="collaboration-range-track"
                                      style={{
                                        position: "absolute",
                                        top: "20px",
                                        left: "0%",
                                        width: "100%",
                                        height: "6px",
                                        background: "var(--admin-gray-100)",
                                        borderRadius: "3px",
                                        zIndex: 1,
                                      }}
                                    ></div>
                                    <div
                                      className="collaboration-range-active"
                                      style={{
                                        position: "absolute",
                                        top: "20px",
                                        left: "30%",
                                        width: "40%",
                                        height: "6px",
                                        background: "#066daf",
                                        borderRadius: "3px",
                                        zIndex: 1,
                                      }}
                                    ></div>
                                    <input
                                      type="range"
                                      min={0}
                                      max={1000}
                                      value={300}
                                      disabled
                                      className="collaboration-range-input m-0"
                                      style={{
                                        position: "absolute",
                                        width: "100%",
                                        zIndex: 2,
                                        opacity: 1,
                                      }}
                                    />
                                    <input
                                      type="range"
                                      min={0}
                                      max={1000}
                                      value={700}
                                      disabled
                                      className="collaboration-range-input m-0"
                                      style={{
                                        position: "absolute",
                                        width: "100%",
                                        zIndex: 3,
                                        opacity: 1,
                                      }}
                                    />
                                    <div
                                      className="collaboration-range-value"
                                      style={{
                                        left: "30%",
                                        top: "-16px",
                                        zIndex: 4,
                                      }}
                                    >
                                      $300
                                    </div>
                                    <div
                                      className="collaboration-range-value"
                                      style={{
                                        left: "70%",
                                        top: "-16px",
                                        zIndex: 4,
                                      }}
                                    >
                                      $700
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-input-group"
                                    value="$300 - $700"
                                    disabled
                                  />
                                </div>

                                {/* Offer Price */}
                                <div className="price-form-item">
                                  <h3 className="price-form-title">Offer Price</h3>
                                  <div className="offer-price-input-wrapper">
                                    {/* <input
                                      type="text"
                                      className="form-input-group offer-price-input"
                                      value={`${offerPrice} | ${offerDateTime}`}
                                      readOnly
                                      onClick={() => {
                                        // This will be a clickable selector
                                        // For now, just a placeholder
                                      }}
                                      style={{ cursor: "pointer" }}
                                    />
                                    <i className="bi bi-chevron-down offer-price-arrow"></i> */}

                                    <select name="" id="" className="form-input-group offer-price-input">
                                      <option value="$500">$500 (24-10-2025 | 03:45 PM)</option>
                                      <option value="$1000">$1000 (24-10-2025 | 03:45 PM)</option>
                                      <option value="$1500">$1500 (24-10-2025 | 03:45 PM)</option>
                                      <option value="$2000">$2000 (24-10-2025 | 03:45 PM)</option>
                                      <option value="$2500">$2500 (24-10-2025 | 03:45 PM)</option>
                                      <option value="$3000">$3000 (24-10-2025 | 03:45 PM)</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div
                                  className="price-form-actions"
                                  style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginTop: "8px",
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="dark-btn price-form-btn"
                                    onClick={() => setShowAuctionInfluencerModal(true)}
                                  >
                                    Offer
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-success price-form-btn"
                                    onClick={() => setShowAuctionCollaboratorModal(true)}
                                  >
                                    Accept
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "outgoing" && (
        <div className="shortlisted-content">
          {outgoingWorkOrdersData.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No outgoing work orders yet.</p>
            </div>
          ) : (
            <>
              {/* Work Order Selector */}
              <div className="outgoing-work-order-selector">
                <label className="work-order-select-label">
                  Shortlisted for Work Order:
                </label>
                <select
                  className="work-order-select"
                  value={selectedOutgoingOrder}
                  onChange={(e) => setSelectedOutgoingOrder(e.target.value)}
                >
                  {outgoingOrderNumbers.map((orderNum) => (
                    <option key={orderNum} value={orderNum}>
                      #{orderNum}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkbox and Sort By Filter */}
              <div className="outgoing-actions-bar">
                <label className="setup-bid-checkbox">
                  <input
                    type="checkbox"
                    checked={setupBidBetween}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      isProgrammaticUpdate.current = true;
                      setSetupBidBetween(isChecked);
                      
                      // Select/deselect all cards for the current work order
                      if (isChecked) {
                        // Get all card IDs for the current work order
                        const currentWorkOrder = filteredOutgoingWorkOrders.find(
                          wo => wo.orderNumber === selectedOutgoingOrder
                        );
                        if (currentWorkOrder) {
                          const profiles = currentWorkOrder.profiles || (currentWorkOrder.profile ? [currentWorkOrder.profile] : []);
                          const cardIds = profiles.map((_, index) => `${currentWorkOrder.id}-${index}`);
                          setSelectedCards(prev => {
                            const newSet = new Set(prev);
                            cardIds.forEach(id => newSet.add(id));
                            return newSet;
                          });
                        }
                      } else {
                        // Deselect all cards for the current work order
                        const currentWorkOrder = filteredOutgoingWorkOrders.find(
                          wo => wo.orderNumber === selectedOutgoingOrder
                        );
                        if (currentWorkOrder) {
                          const profiles = currentWorkOrder.profiles || (currentWorkOrder.profile ? [currentWorkOrder.profile] : []);
                          const cardIds = profiles.map((_, index) => `${currentWorkOrder.id}-${index}`);
                          setSelectedCards(prev => {
                            const newSet = new Set(prev);
                            cardIds.forEach(id => newSet.delete(id));
                            return newSet;
                          });
                        }
                      }
                      setTimeout(() => {
                        isProgrammaticUpdate.current = false;
                      }, 0);
                    }}
                  />
                  <span>Setup bid between shortlisted results</span>
                </label>
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

              {/* Cards List - Same as Incoming */}
              <div className="shortlisted-cards-list">
                {filteredOutgoingWorkOrders.map((workOrder) => {
                  const profiles = workOrder.profiles || (workOrder.profile ? [workOrder.profile] : []);
                  if (!profiles || profiles.length === 0) return null;

                  return (
                    <div
                      key={workOrder.id}
                      className="shortlisted-work-order-group"
                    >
                      {profiles.map((profile, profileIndex) => {
                        const cardId = `${workOrder.id}-${profileIndex}`;
                        const isAccordionExpanded = expandedAccordions.has(cardId);

                        return (
                          <div
                            key={cardId}
                            className={`shortlisted-card-full ${isAccordionExpanded ? "accordion-expanded" : ""}`}
                          >
                        <div className="shortlisted-card-header w-100 d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <div className="shortlisted-card-checkbox">
                              <input 
                                type="checkbox" 
                                checked={selectedCards.has(cardId)}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  setSelectedCards(prev => {
                                    const newSet = new Set(prev);
                                    if (isChecked) {
                                      newSet.add(cardId);
                                    } else {
                                      newSet.delete(cardId);
                                    }
                                    return newSet;
                                  });
                                }}
                              />
                            </div>
                            <div className="consultancy-avatar">
                              <img src={profile.avatar} alt={profile.name} />
                            </div>
                            <div className="consultancy-card-meta">
                              <h3 className="consultancy-card-name">
                                {profile.name}
                              </h3>
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
                          {/* Tags */}
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
                        </div>

                        <p className="consultancy-card-summary">
                          {profile.summary}
                        </p>
                        <div className="w-100 border-0 d-flex align-items-center justify-content-between">
                          {/* Asking Rates */}
                          {profile.askingRates && (
                            <div className="collaboration-asking-rates d-flex align-items-center gap-2 border-0">
                              <span className="asking-rates-title">
                                Asking Rate:
                              </span>
                              <div className="asking-rates-list d-flex align-items-center gap-2 flex-wrap">
                                {profile.askingRates.post && (
                                  <div className="asking-rate-item">
                                    <span className="asking-rate-label">
                                      Post:
                                    </span>
                                    <span className="asking-rate-value">
                                      {profile.askingRates.post}
                                    </span>
                                  </div>
                                )}
                                {profile.askingRates.repost && (
                                  <div className="asking-rate-item">
                                    <span className="asking-rate-label">
                                      Repost:
                                    </span>
                                    <span className="asking-rate-value">
                                      {profile.askingRates.repost}
                                    </span>
                                  </div>
                                )}
                                {profile.askingRates.retweet && (
                                  <div className="asking-rate-item">
                                    <span className="asking-rate-label">
                                      Retweet:
                                    </span>
                                    <span className="asking-rate-value">
                                      {profile.askingRates.retweet}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* More Actions Button */}
                          <div className="shortlisted-card-actions border-0 d-flex align-items-center justify-content-end">
                            <button
                              type="button"
                              className="more-actions-btn btn-light"
                              onClick={() => toggleAccordion(cardId)}
                            >
                              More Actions
                              <i
                                className={`bi bi-chevron-${
                                  isAccordionExpanded ? "up" : "down"
                                }`}
                              ></i>
                            </button>
                          </div>
                        </div>
                        {/* Accordion Body - Same as Incoming */}
                        {isAccordionExpanded && (
                          <div className="more-actions-accordion">
                            <div className="accordion-content">
                              {/* Two sections in a row */}
                              <div className="accordion-two-sections">
                                {/* Section 1: Chat Window */}
                                <div className="accordion-chat-section">
                                  <div className="chat-messages-container">
                                    {chatMessages.map((message) => (
                                      <div
                                        key={message.id}
                                        className={`chat-message ${
                                          message.sender === "you"
                                            ? "chat-message-outgoing"
                                            : "chat-message-incoming"
                                        }`}
                                      >
                                        <div className="chat-message-bubble">
                                          <p className="chat-message-text">
                                            {message.text.split("\n").map((line, idx) => (
                                              <React.Fragment key={idx}>
                                                {line}
                                                {idx < message.text.split("\n").length - 1 && (
                                                  <br />
                                                )}
                                              </React.Fragment>
                                            ))}
                                          </p>
                                          <div className="chat-message-footer">
                                            <span className="chat-message-time">
                                              {message.time}
                                            </span>
                                            <span className="chat-message-sender">
                                              {message.sender === "you"
                                                ? "You"
                                                : message.senderName}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="chat-input-container">
                                    <button
                                      type="button"
                                      className="chat-input-icon-btn"
                                      title="Emoji"
                                    >
                                      <i className="bi bi-emoji-smile"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="chat-input-icon-btn"
                                      title="Attach"
                                    >
                                      <i className="bi bi-paperclip"></i>
                                    </button>
                                    <input
                                      type="text"
                                      className="chat-input-field"
                                      placeholder="Type your message"
                                    />
                                    <button
                                      type="button"
                                      className="chat-input-icon-btn"
                                      title="Voice"
                                    >
                                      <i className="bi bi-mic"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="chat-send-btn"
                                      title="Send"
                                    >
                                      <i className="bi bi-send"></i>
                                    </button>
                                  </div>
                                </div>

                                {/* Section 2: Price/Offer Form */}
                                <div className="accordion-price-form-section">
                                  {/* Quoted Price Range */}
                                  <div className="price-form-item">
                                    <h3 className="price-form-title">
                                      Quoted Price Range
                                    </h3>
                                    <p className="price-form-description">
                                      Lorem Ipsum is simply dummy text of the printing
                                      and typesetting industry.
                                    </p>
                                    <div className="collaboration-range-wrapper" style={{ pointerEvents: "none" }}>
                                      <div
                                        className="collaboration-range-track"
                                        style={{
                                          position: "absolute",
                                          top: "20px",
                                          left: "0%",
                                          width: "100%",
                                          height: "6px",
                                          background: "var(--admin-gray-100)",
                                          borderRadius: "3px",
                                          zIndex: 1,
                                        }}
                                      ></div>
                                      <div
                                        className="collaboration-range-active"
                                        style={{
                                          position: "absolute",
                                          top: "20px",
                                          left: "30%",
                                          width: "40%",
                                          height: "6px",
                                          background: "#066daf",
                                          borderRadius: "3px",
                                          zIndex: 1,
                                        }}
                                      ></div>
                                      <input
                                        type="range"
                                        min={0}
                                        max={1000}
                                        value={300}
                                        disabled
                                        className="collaboration-range-input m-0"
                                        style={{
                                          position: "absolute",
                                          width: "100%",
                                          zIndex: 2,
                                          opacity: 1,
                                        }}
                                      />
                                      <input
                                        type="range"
                                        min={0}
                                        max={1000}
                                        value={700}
                                        disabled
                                        className="collaboration-range-input m-0"
                                        style={{
                                          position: "absolute",
                                          width: "100%",
                                          zIndex: 3,
                                          opacity: 1,
                                        }}
                                      />
                                      <div
                                        className="collaboration-range-value"
                                        style={{
                                          left: "30%",
                                          top: "-16px",
                                          zIndex: 4,
                                        }}
                                      >
                                        $300
                                      </div>
                                      <div
                                        className="collaboration-range-value"
                                        style={{
                                          left: "70%",
                                          top: "-16px",
                                          zIndex: 4,
                                        }}
                                      >
                                        $700
                                      </div>
                                    </div>
                                    <input
                                      type="text"
                                      className="form-input-group"
                                      value="$300 - $700"
                                      disabled
                                    />
                                  </div>

                                  {/* Offer Price */}
                                  <div className="price-form-item">
                                    <h3 className="price-form-title">Offer Price</h3>
                                    <div className="offer-price-input-wrapper">
                                      <select name="" id="" className="form-input-group offer-price-input">
                                        <option value="$500">$500 (24-10-2025 | 03:45 PM)</option>
                                        <option value="$1000">$1000 (24-10-2025 | 03:45 PM)</option>
                                        <option value="$1500">$1500 (24-10-2025 | 03:45 PM)</option>
                                        <option value="$2000">$2000 (24-10-2025 | 03:45 PM)</option>
                                        <option value="$2500">$2500 (24-10-2025 | 03:45 PM)</option>
                                        <option value="$3000">$3000 (24-10-2025 | 03:45 PM)</option>
                                      </select>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div
                                    className="price-form-actions"
                                    style={{
                                      display: "flex",
                                      gap: "12px",
                                      marginTop: "8px",
                                    }}
                                  >
                                    <button
                                      type="button"
                                      className="dark-btn price-form-btn"
                                      onClick={() => setShowAuctionInfluencerModal(true)}
                                    >
                                      Offer
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-success price-form-btn"
                                      onClick={() => setShowAuctionCollaboratorModal(true)}
                                    >
                                      Accept
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      );
                    })}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Auction as Influencer Modal */}
      <AuctionInfluencerModal
        show={showAuctionInfluencerModal}
        onClose={() => setShowAuctionInfluencerModal(false)}
      />

      {/* Auction as Collaborator Modal */}
      <AuctionCollaboratorModal
        show={showAuctionCollaboratorModal}
        onClose={() => setShowAuctionCollaboratorModal(false)}
      />
    </div>
  );
};

export default CollaborationShortlisted;
