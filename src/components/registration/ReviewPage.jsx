import { useState } from 'react';
import PaymentModal from './PaymentModal';
import SuccessModal from './SuccessModal';
import './ReviewPage.css';

const ReviewPage = ({ formData, onBack, onNext }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleProceed = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // Success modal will auto-redirect, no need to call onNext
  };

  const getMembershipDetails = () => {
    if (formData.membershipType === 'basic') {
      return {
        name: 'Basic Free',
        price: 0,
        features: [
          'Marketing Tips & Tricks',
          'Fundamentals Of Accounting',
          'Legal Jargons',
          'Multimedia Tools'
        ]
      };
    } else {
      return {
        name: 'Paid /Advanced',
        price: 49.99,
        features: [
          'Registration & Verification',
          'Id Badge & Unique Number',
          'All Of Basic',
          'Profile Services (Fake Profile, Buy/Sell/Loan, Discounts & Offer)',
          'Professional Consultancy (Legal, Accounting, Tax, Multimedia, Collaboration)'
        ]
      };
    }
  };

  const membershipDetails = getMembershipDetails();

  return (
    <>
      <div className="step-content">
        <div className="step-header">
          <h2 className="step-title">Review Your Information</h2>
          <p className="step-description">
            Please review all the information you've provided before proceeding to payment.
          </p>
          <div className="line mt-2 mb-2"></div>
        </div>

        <div className="review-content">
          {/* Personal Information */}
          <div className="review-section">
            <h3 className="review-section-title">Personal Information</h3>
            <div className="review-grid">
              <div className="review-item">
                <span className="review-label">First Name:</span>
                <span className="review-value">{formData.firstName || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Last Name:</span>
                <span className="review-value">{formData.lastName || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Email:</span>
                <span className="review-value">{formData.email || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Contact Number:</span>
                <span className="review-value">{formData.contactNumber || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Identity Verification */}
          <div className="review-section">
            <h3 className="review-section-title">Identity Verification</h3>
            <div className="review-grid">
              <div className="review-item">
                <span className="review-label">Nationality:</span>
                <span className="review-value">
                  {formData.nationality ? formData.nationality.charAt(0).toUpperCase() + formData.nationality.slice(1).replace(/-/g, ' ') : 'N/A'}
                </span>
              </div>
              <div className="review-item">
                <span className="review-label">Country ID:</span>
                <span className="review-value">
                  {formData.countryId ? formData.countryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'}
                </span>
              </div>
              <div className="review-item">
                <span className="review-label">ID Type 1:</span>
                <span className="review-value">
                  {formData.idType1 ? formData.idType1.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'}
                </span>
              </div>
              {formData.idType2 && (
                <div className="review-item">
                  <span className="review-label">ID Type 2:</span>
                  <span className="review-value">
                    {formData.idType2.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Video Call */}
          {formData.videoMode && (
            <div className="review-section">
              <h3 className="review-section-title">Video Call Details</h3>
              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Video Platform:</span>
                  <span className="review-value">
                    {formData.videoMode.charAt(0).toUpperCase() + formData.videoMode.slice(1)}
                  </span>
                </div>
                {formData.selectedDate && (
                  <div className="review-item">
                    <span className="review-label">Selected Date:</span>
                    <span className="review-value">
                      {new Date(formData.selectedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {formData.selectedTime && (
                  <div className="review-item">
                    <span className="review-label">Selected Time:</span>
                    <span className="review-value">{formData.selectedTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Membership Plan */}
          <div className="review-section">
            <h3 className="review-section-title">Selected Membership Plan</h3>
            <div className="membership-review-card">
              <div className="membership-review-header">
                <h4 className="membership-review-name">{membershipDetails.name}</h4>
                <div className="membership-review-price">
                  {membershipDetails.price === 0 ? (
                    'Free'
                  ) : (
                    <>${membershipDetails.price.toFixed(2)}<span className="price-period">/Yearly</span></>
                  )}
                </div>
              </div>
              <div className="membership-review-features">
                <h5 className="features-title">Plan Features:</h5>
                <ul className="features-list">
                  {membershipDetails.features.map((feature, index) => (
                    <li key={index} className="feature-list-item">
                      <svg
                        className="feature-check-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-back" onClick={onBack}>
            Back
          </button>
          <button type="button" className="btn btn-next" onClick={handleProceed}>
            Proceed
          </button>
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          membershipDetails={membershipDetails}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePaymentSubmit}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          membershipDetails={membershipDetails}
          onClose={handleSuccessClose}
        />
      )}
    </>
  );
};

export default ReviewPage;

