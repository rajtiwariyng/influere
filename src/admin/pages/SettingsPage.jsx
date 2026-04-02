import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import profilePlatforms from "../data/profilePlatforms";
import transactionHistoryRows from "../data/transactionHistoryData";
import photoPlaceholder from "../../assets/photo-placeholder.png";
import "../components/ConsultancyModals.css";
import "./DiscountOffers.css";
import "./CollaborationSetup.css";
import "./Wallet.css";
import "./ProfileSell.css";
import "./SettingsPage.css";

const settingsTabs = [
  { id: "profile", label: "Profile" },
  { id: "social-media", label: "Social Media Accounts" },
  { id: "account-details", label: "Account Details" },
  { id: "notifications", label: "Notifications" },
  { id: "subscription", label: "Subscription" },
];

const SettingsPage = () => {
  usePageTitle("Settings");
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");
  const [subscriptionTableTab, setSubscriptionTableTab] = useState("all");
  const [subscriptionSearchValue, setSubscriptionSearchValue] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  // Update active tab when URL param changes
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // ID types by region (from VerifyIdentity)
  const idTypesByRegion = {
    'indian': [
      { value: 'aadhaar', label: 'Aadhaar Card' },
      { value: 'pan', label: 'PAN Card' },
      { value: 'voter-id', label: 'Voter ID' },
      { value: 'drivers-license', label: 'Driver\'s License' },
      { value: 'passport', label: 'Passport' }
    ],
    'european': [
      { value: 'passport', label: 'Passport' },
      { value: 'national-id', label: 'National ID Card' },
      { value: 'drivers-license', label: 'Driver\'s License' },
      { value: 'eu-id', label: 'EU Identity Card' }
    ],
    'usa-north-america': [
      { value: 'passport', label: 'Passport' },
      { value: 'drivers-license', label: 'Driver\'s License' },
      { value: 'state-id', label: 'State ID Card' },
      { value: 'military-id', label: 'Military ID' },
      { value: 'social-security', label: 'Social Security Card' }
    ],
    'british': [
      { value: 'passport', label: 'Passport' },
      { value: 'drivers-license', label: 'Driver\'s License' },
      { value: 'national-insurance', label: 'National Insurance Card' },
      { value: 'biometric-residence', label: 'Biometric Residence Permit' }
    ],
    'canadian': [
      { value: 'passport', label: 'Passport' },
      { value: 'drivers-license', label: 'Driver\'s License' },
      { value: 'health-card', label: 'Health Card' },
      { value: 'sin-card', label: 'SIN Card' }
    ],
    'australian': [
      { value: 'passport', label: 'Passport' },
      { value: 'drivers-license', label: 'Driver\'s License' },
      { value: 'medicare-card', label: 'Medicare Card' },
      { value: 'birth-certificate', label: 'Birth Certificate' }
    ],
    'other': [
      { value: 'passport', label: 'Passport' },
      { value: 'drivers-license', label: 'Driver\'s License' },
      { value: 'national-id', label: 'National ID' },
      { value: 'other-id', label: 'Other Government ID' }
    ]
  };

  // Profile state (from registration flow)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    contactNumber: "+1234567890",
    nationality: "indian",
    countryId: "aadhaar",
    idType1: "aadhaar",
    idFile1: null,
    idType2: "",
    idFile2: null,
    videoMode: "zoom",
    selectedDate: "2025-01-15",
    selectedTime: "10:00 AM",
    membershipType: "paid",
  });

  // Get current ID types based on selected nationality
  const getCurrentIdTypes = () => {
    return idTypesByRegion[profileData.nationality] || idTypesByRegion['other'];
  };

  // Social Media Accounts state
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "Instagram", url: "https://instagram.com/johndoe" },
    { id: 2, platform: "YouTube", url: "https://youtube.com/@johndoe" },
  ]);

  // Account Details state
  const [accountDetails, setAccountDetails] = useState([
    {
      id: 1,
      accountType: "Bank Account",
      accountName: "John Doe",
      accountNumber: "****1234",
      bankName: "Chase Bank",
    },
    {
      id: 2,
      accountType: "PayPal",
      accountName: "John Doe",
      accountNumber: "john.doe@paypal.com",
      bankName: "PayPal",
    },
  ]);

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    planRenewalReminders: true,
    paymentFailureAlerts: true,
    profileCompletionReminders: false,
    activityAlerts: true,
  });

  // Subscription state
  const [subscription] = useState({
    planName: "Paid /Advanced",
    renewalDate: "2025-12-31",
    price: "$49.99",
    features: [
      "Registration & Verification",
      "Id Badge & Unique Number",
      "All Of Basic",
      "Profile Services",
      "Professional Consultancy",
    ],
  });

  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const handleProfileChange = (field, value) => {
    // Reset dependent fields when nationality changes
    if (field === 'nationality') {
      setProfileData((prev) => ({
        ...prev,
        [field]: value,
        countryId: '',
        idType1: '',
        idType2: '',
      }));
    } else {
      setProfileData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (field, file) => {
    setProfileData((prev) => ({ ...prev, [field]: file }));
  };

  const handleAddLink = () => {
    setSocialLinks((prev) => [
      ...prev,
      { id: Date.now(), platform: "", url: "" },
    ]);
  };

  const handleRemoveLink = (id) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleLinkChange = (id, field, value) => {
    setSocialLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddAccount = () => {
    setEditingAccount(null);
    setShowAddAccountModal(true);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowAddAccountModal(true);
  };

  const handleDeleteAccount = (id) => {
    setAccountDetails((prev) => prev.filter((acc) => acc.id !== id));
  };

  const handleSaveAccount = (accountData) => {
    if (editingAccount) {
      setAccountDetails((prev) =>
        prev.map((acc) => (acc.id === editingAccount.id ? accountData : acc))
      );
    } else {
      setAccountDetails((prev) => [
        ...prev,
        { ...accountData, id: Date.now() },
      ]);
    }
    setShowAddAccountModal(false);
    setEditingAccount(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", {
      profileData,
      socialLinks,
      accountDetails,
      notifications,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const renderProfileTab = () => (
    <form className="collaboration-setup-form" onSubmit={handleSubmit}>
      {/* Profile Picture Section */}
      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Profile Picture</p>
          <p className="step-card-description">
            Upload your profile picture to personalize your account
          </p>
        </div>
        <div className="setting-card-right">
          <div className="profile-picture-row">
            <div className="profile-picture-placeholder">
              <img 
                src={profilePicture ? URL.createObjectURL(profilePicture) : photoPlaceholder} 
                alt="Profile placeholder" 
              />
            </div>
            <div className="profile-picture-upload">
              <p>No Profile Picture Uploaded</p>
              <label className="form-input-group profile-upload-field">
                <input 
                  type="file" 
                  hidden 
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
                <span>Upload</span>
                <i className="bi bi-paperclip"></i>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">First Name</p>
          <p className="step-card-description">
            Enter your first name as it appears on your identification documents
          </p>
        </div>
        <div className="setting-card-right">
          <input
            type="text"
            className="form-input-group"
            value={profileData.firstName}
            onChange={(e) => handleProfileChange("firstName", e.target.value)}
          />
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Last Name</p>
          <p className="step-card-description">
            Enter your last name as it appears on your identification documents
          </p>
        </div>
        <div className="setting-card-right">
          <input
            type="text"
            className="form-input-group"
            value={profileData.lastName}
            onChange={(e) => handleProfileChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Email ID</p>
          <p className="step-card-description">
            Your primary email address for account notifications and communications
          </p>
        </div>
        <div className="setting-card-right">
          <input
            type="email"
            className="form-input-group"
            value={profileData.email}
            onChange={(e) => handleProfileChange("email", e.target.value)}
          />
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Contact Number</p>
          <p className="step-card-description">
            Your primary phone number including country code
          </p>
        </div>
        <div className="setting-card-right">
          <input
            type="tel"
            className="form-input-group"
            value={profileData.contactNumber}
            onChange={(e) =>
              handleProfileChange("contactNumber", e.target.value)
            }
          />
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Nationality</p>
          <p className="step-card-description">
            Select your country of nationality for identity verification
          </p>
        </div>
        <div className="setting-card-right">
          <div className="consultancy-select p-0">
            <select
              className="form-input-group px-2"
              value={profileData.nationality}
              onChange={(e) =>
                handleProfileChange("nationality", e.target.value)
              }
            >
              <option value="indian">Indian</option>
              <option value="european">European Countries</option>
              <option value="usa-north-america">USA (North American countries)</option>
              <option value="british">British</option>
              <option value="canadian">Canadian</option>
              <option value="australian">Australian</option>
              <option value="other">Other</option>
            </select>
            <span className="consultancy-select-caret">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Country ID</p>
          <p className="step-card-description">
            Select the type of identification document you will use for verification
          </p>
        </div>
        <div className="setting-card-right">
          <div className="consultancy-select p-0">
            <select
              className="form-input-group px-2"
              value={profileData.countryId}
              onChange={(e) => handleProfileChange("countryId", e.target.value)}
            >
              <option value="">Select Country ID</option>
              {getCurrentIdTypes().map((idType) => (
                <option key={idType.value} value={idType.value}>
                  {idType.label}
                </option>
              ))}
            </select>
            <span className="consultancy-select-caret">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Type Of ID</p>
          <p className="step-card-description">
            Select the specific type of identification document and upload a clear image or PDF
          </p>
        </div>
        <div className="setting-card-right">
          <div className="consultancy-select mb-2 p-0">
            <select
              className="form-input-group px-2"
              value={profileData.idType1}
              onChange={(e) => handleProfileChange("idType1", e.target.value)}
            >
              <option value="">Select ID Type</option>
              {getCurrentIdTypes().map((idType) => (
                <option key={idType.value} value={idType.value}>
                  {idType.label}
                </option>
              ))}
            </select>
            <span className="consultancy-select-caret">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>

          <div className="file-upload">
            <input
              type="file"
              id="idFile1"
              className="file-input"
              onChange={(e) => handleFileChange("idFile1", e.target.files[0])}
              accept="image/*,.pdf"
            />
            <label htmlFor="idFile1" className="file-upload-label">
            <i className="bi bi-cloud-arrow-up"></i>
              <span>{profileData.idFile1 ? profileData.idFile1.name : 'Choose File'}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Type Of ID (Optional)</p>
          <p className="step-card-description">
            Upload an additional identification document if required for verification
          </p>
        </div>
        <div className="setting-card-right">
          <div className="consultancy-select mb-2 p-0">
            <select
              className="form-input-group px-2"
              value={profileData.idType2}
              onChange={(e) => handleProfileChange("idType2", e.target.value)}
            >
              <option value="">Select ID Type (Optional)</option>
              {getCurrentIdTypes().map((idType) => (
                <option key={idType.value} value={idType.value}>
                  {idType.label}
                </option>
              ))}
            </select>
            <span className="consultancy-select-caret">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>

          <div className="file-upload">
            <input
              type="file"
              id="idFile2"
              className="file-input"
              onChange={(e) => handleFileChange("idFile2", e.target.files[0])}
              accept="image/*,.pdf" style={{borderColor: '#ededed !important'}}
            />
            <label htmlFor="idFile2" className="file-upload-label">
            <i className="bi bi-cloud-arrow-up"></i>
              <span>{profileData.idFile2 ? profileData.idFile2.name : 'Choose File'}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Video Call Platform</p>
          <p className="step-card-description">
            Select your preferred platform for video call verification
          </p>
        </div>
        <div className="setting-card-right">
          <div className="consultancy-select p-0">
            <select
              className="form-input-group px-2"
              value={profileData.videoMode}
              onChange={(e) => handleProfileChange("videoMode", e.target.value)}
            >
              <option value="zoom">Zoom</option>
            </select>
            <span className="consultancy-select-caret">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Selected Date</p>
          <p className="step-card-description">
            Choose your preferred date for the video call verification
          </p>
        </div>
        <div className="setting-card-right">
          <input
            type="date"
            className="form-input-group"
            value={profileData.selectedDate}
            onChange={(e) =>
              handleProfileChange("selectedDate", e.target.value)
            }
          />
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Selected Time</p>
          <p className="step-card-description">
            Choose your preferred time slot for the video call verification
          </p>
        </div>
        <div className="setting-card-right">
          <input
            type="text"
            className="form-input-group"
            value={profileData.selectedTime}
            onChange={(e) =>
              handleProfileChange("selectedTime", e.target.value)
            }
          />
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Membership Type</p>
          <p className="step-card-description">
            Your current subscription plan. This cannot be changed from settings
          </p>
        </div>
        <div className="setting-card-right">
          <div className="consultancy-select p-0">
            <select
              className="form-input-group px-2"
              value={profileData.membershipType}
              disabled
            >
              <option value="basic">Basic Free</option>
              <option value="paid">Paid /Advanced</option>
            </select>
            <span className="consultancy-select-caret">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="collaboration-setup-actions">
        <button type="submit" className="btn-dark">
          Save Changes
        </button>
        <button type="button" className="btn-light">
          Cancel
        </button>
      </div>
    </form>
  );

  const renderSocialMediaTab = () => (
    <form className="collaboration-setup-form" onSubmit={handleSubmit}>
      <div className="settings-social-links">
        {socialLinks.map((link) => (
          <div key={link.id} className="settings-social-link-card">
            <div className="settings-social-link-row">
              <div className="settings-social-link-field">
                <label className="form-label">Select Platform</label>
                <div className="consultancy-select p-0">
                  <select
                    className="w-100 form-input-group px-2"
                    value={link.platform}
                    onChange={(e) =>
                      handleLinkChange(link.id, "platform", e.target.value)
                    }
                  >
                    <option value="">Select Platform</option>
                    {profilePlatforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                  <span className="consultancy-select-caret">
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>
              <div className="settings-social-link-field">
                <label className="form-label">Add URL</label>
                <div className="form-input-group">
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleLinkChange(link.id, "url", e.target.value)}
                    placeholder="Enter URL"
                  />
                </div>
              </div>
              <div className="settings-social-actions">
                {socialLinks.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveLink(link.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
                {link === socialLinks[socialLinks.length - 1] && (
                  <button
                    type="button"
                    className="add-btn"
                    onClick={handleAddLink}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );

  const renderAccountDetailsTab = () => (
    <div className="collaboration-setup-form">
      <div className="settings-account-list">
        {accountDetails.map((account) => (
          <div key={account.id} className="setting-card">
            <div className="setting-card-left">
              <p className="step-card-title">{account.accountType}</p>
              <p className="step-card-description">
                {account.bankName} - {account.accountNumber}
              </p>
            </div>
            <div className="setting-card-right">
              <div className="settings-account-actions">
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => handleEditAccount(account)}
                  aria-label="Edit account"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleDeleteAccount(account.id)}
                  aria-label="Delete account"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="collaboration-setup-actions">
        <button
          type="button"
          className="btn-dark"
          onClick={handleAddAccount}
        >
          Add New Account
        </button>
      </div>

      {showAddAccountModal && (
        <AddAccountModal
          show={showAddAccountModal}
          account={editingAccount}
          onClose={() => {
            setShowAddAccountModal(false);
            setEditingAccount(null);
          }}
          onSave={handleSaveAccount}
        />
      )}
    </div>
  );

  const renderNotificationsTab = () => (
    <form className="collaboration-setup-form" onSubmit={handleSubmit}>
      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Email Alerts</p>
          <p className="step-card-description">
            Receive important updates and notifications via email
          </p>
        </div>
        <div className="setting-card-right">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={() => handleNotificationToggle("emailAlerts")}
            />
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">SMS Alerts</p>
          <p className="step-card-description">
            Get instant notifications via text message
          </p>
        </div>
        <div className="setting-card-right">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={notifications.smsAlerts}
              onChange={() => handleNotificationToggle("smsAlerts")}
            />
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Push Notifications</p>
          <p className="step-card-description">
            Receive real-time notifications on your device
          </p>
        </div>
        <div className="setting-card-right">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={notifications.pushNotifications}
              onChange={() => handleNotificationToggle("pushNotifications")}
            />
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Plan Renewal Reminders</p>
          <p className="step-card-description">
            Get notified before your subscription plan expires
          </p>
        </div>
        <div className="setting-card-right">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={notifications.planRenewalReminders}
              onChange={() =>
                handleNotificationToggle("planRenewalReminders")
              }
            />
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Payment Failure Alerts</p>
          <p className="step-card-description">
            Be notified when a payment transaction fails
          </p>
        </div>
        <div className="setting-card-right">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={notifications.paymentFailureAlerts}
              onChange={() =>
                handleNotificationToggle("paymentFailureAlerts")
              }
            />
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Profile Completion Reminders</p>
          <p className="step-card-description">
            Reminders to complete your profile information
          </p>
        </div>
        <div className="setting-card-right">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={notifications.profileCompletionReminders}
              onChange={() =>
                handleNotificationToggle("profileCompletionReminders")
              }
            />
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="setting-card">
        <div className="setting-card-left">
          <p className="step-card-title">Activity Alerts</p>
          <p className="step-card-description">
            Login, password update, new device access
          </p>
        </div>
        <div className="setting-card-right">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={notifications.activityAlerts}
              onChange={() => handleNotificationToggle("activityAlerts")}
            />
            <span className="settings-toggle-slider"></span>
          </label>
        </div>
      </div>
    </form>
  );

  const getSubscriptionTabConfig = (rows) => {
    return [
      { id: "all", label: "All" },
      { id: "renewed", label: "Renewed" },
      { id: "upgraded", label: "Upgraded" },
    ];
  };

  const subscriptionStatusBadgeClass = (status) => {
    switch (status) {
      case "renewed":
        return "status-renewed";
      case "upgraded":
        return "status-upgraded";
      default:
        return "status-process";
    }
  };

  const getSubscriptionStatusLabel = (status) => {
    switch (status) {
      case "renewed":
        return "Renewed";
      case "upgraded":
        return "Upgraded";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const subscriptionTabConfig = useMemo(() => getSubscriptionTabConfig(transactionHistoryRows), []);

  const subscriptionCounts = useMemo(() => {
    const all = transactionHistoryRows.length;
    const renewed = transactionHistoryRows.filter((row) => row.status === "renewed").length;
    const upgraded = transactionHistoryRows.filter((row) => row.status === "upgraded").length;

    return { all, renewed, upgraded };
  }, []);

  const subscriptionFilteredRows = useMemo(() => {
    return transactionHistoryRows.filter((row) => {
      const matchesTab =
        subscriptionTableTab === "all" ? true : row.status === subscriptionTableTab;

      const matchesSearch = `${row.description || row.packageName || ''} ${row.date || ''} ${row.renewalDate || ''} ${row.amount || ''}`
        .toLowerCase()
        .includes(subscriptionSearchValue.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [subscriptionTableTab, subscriptionSearchValue]);

  const renderSubscriptionTab = () => {

    const handleDownloadInvoice = (row) => {
      console.log("Download invoice for:", row.invoiceId);
    };

    return (
      <div className="collaboration-setup-form">
        <div className="settings-subscription-card">
          <div className="setting-card">
            <div className="setting-card-left">
              <p className="step-card-description">Current Plan</p>
              <p className="step-card-title">{subscription.planName}</p>
            </div>
            <div className="setting-card-right">
              <p className="step-card-description">Price</p>
              <p className="step-card-title">{subscription.price}</p>
            </div>
            <div className="setting-card-right">
              <p className="step-card-description">Renewal Date</p>
              <p className="step-card-title">{subscription.renewalDate}</p>
            </div>
            <div className="setting-card-right">
              <div className="collaboration-setup-actions" style={{ marginTop: 0, gap: '8px' }}>
                <button type="button" className="btn-dark">
                  Renew Plan
                </button>
                <button type="button" className="btn-light">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-table-section" style={{ marginTop: '24px' }}>
          <div className="table-header">
            <h2 className="table-title mb-0">Subscription History</h2>
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
                {subscriptionTabConfig.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${subscriptionTableTab === tab.id ? "active" : ""}`}
                    onClick={() => setSubscriptionTableTab(tab.id)}
                  >
                    {tab.label} ({subscriptionCounts[tab.id] ?? 0})
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
                    value={subscriptionSearchValue}
                    onChange={(event) => setSubscriptionSearchValue(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>S. No</th>
                    <th>Plan Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionFilteredRows.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.description || row.packageName || '-'}</td>
                      <td>{row.date || '-'}</td>
                      <td>{row.renewalDate || '-'}</td>
                      <td className="table-amount">{row.amount}</td>
                      <td>
                        <span className={`transaction-status ${subscriptionStatusBadgeClass(row.status)}`}>
                          {getSubscriptionStatusLabel(row.status)}
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
                  {subscriptionFilteredRows.length === 0 && (
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
                <span>{subscriptionFilteredRows.length} results</span>
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "social-media":
        return renderSocialMediaTab();
      case "account-details":
        return renderAccountDetailsTab();
      case "notifications":
        return renderNotificationsTab();
      case "subscription":
        return renderSubscriptionTab();
      default:
        return null;
    }
  };

  return (
    <div className="admin-page collaboration-setup-page settings-page">
      <div className="collaboration-setup-header">
        <h1 className="admin-page-title">Settings</h1>
      </div>

      <div className="collaboration-setup-content">
        {/* Settings Tabs */}
        <div>
          <div className="table-controls justify-content-between">
            <div className="transaction-tabs">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchParams({ tab: tab.id });
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

// Add Account Modal Component
const AddAccountModal = ({ show, account, onClose, onSave }) => {
  const [accountData, setAccountData] = useState(
    account || {
      accountType: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
    }
  );

  const handleChange = (field, value) => {
    setAccountData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(accountData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container add-funds-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          <i className="bi bi-x"></i>
        </button>
        
        <h2 className="modal-title">{account ? "Edit Account" : "Add New Account"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="add-funds-section">
            <label className="form-label">Account Type</label>
            <div className="consultancy-select p-0">
              <select
                value={accountData.accountType}
                onChange={(e) => handleChange("accountType", e.target.value)}
                className="w-100 form-input-group px-2"
                required
              >
                <option value="">Select Account Type</option>
                <option value="Bank Account">Bank Account</option>
                <option value="PayPal">PayPal</option>
                <option value="Stripe">Stripe</option>
                <option value="Other">Other</option>
              </select>
              <span className="consultancy-select-caret">
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>

          <div className="add-funds-section">
            <label className="form-label">Account Name</label>
            <div className="form-input-group">
              <input
                type="text"
                value={accountData.accountName}
                onChange={(e) => handleChange("accountName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="add-funds-section">
            <label className="form-label">Account Number / Email</label>
            <div className="form-input-group">
              <input
                type="text"
                value={accountData.accountNumber}
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="add-funds-section">
            <label className="form-label">Bank Name / Service Provider</label>
            <div className="form-input-group">
              <input
                type="text"
                value={accountData.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-light" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-dark">
              {account ? "Update" : "Add"} Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

