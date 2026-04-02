const SelectMembership = ({
  formData,
  onFormDataChange,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}) => {
  const handleMembershipSelect = (membershipType) => {
    onFormDataChange("membershipType", membershipType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.membershipType) {
      onNext();
    }
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Select Membership</h2>
        <p className="step-description">
          (we have already designed the membership page). A registration number
          and a badge will be provided which can be added to all your social
          media accounts.
        </p>
        <div className="line mt-2 mb-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="membership-options">
          {/* Basic Free Plan */}
          <div
            className={`membership-card basic-plan ${
              formData.membershipType === "basic" ? "selected" : ""
            }`}
          >
            <div className="membership-card-header">
              <h3 className="membership-title">Basic Free</h3>
              <p className="membership-description">
                Lorem ipsum dolor sit amet, consec.
              </p>
              <div
                className="d-flex align-items-center justify-content-between pb-3"
                style={{ borderBottom: "1px dashed var(--warning-200)" }}
              >
                <div className="membership-price">Free</div>
                <button
                  type="button"
                  className="membership-btn basic-btn"
                  onClick={() => {
                    handleMembershipSelect("basic");
                    onNext();
                  }}
                >
                  Start Free Trial
                </button>
              </div>
            </div>

            <div className="membership-features">
              <div className="feature-section">
                <div className="feature-header">
                  <span>Repository Access To</span>
                  <svg
                    className="feature-toggle"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <polyline
                      points="6,9 12,15 18,9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="feature-list">
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Marketing Tips & Tricks</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Fundamentals Of Accounting</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Legal Jargons</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Multimedia Tools</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paid/Advanced Plan */}
          <div
            className={`membership-card advanced-plan ${
              formData.membershipType === "advanced" ? "selected" : ""
            }`}
          >
            <div className="membership-card-header">
              <h3 className="membership-title">Paid /Advanced</h3>
              <p className="membership-description">
                We'll get your name and contact details.
              </p>
              <div
                className="d-flex align-items-center justify-content-between pb-3"
                style={{ borderBottom: "1px dashed var(--violet-400)" }}
              >
                <div className="membership-price">
                  $49.99/<span className="fw-light fs-6">Yearly</span>
                </div>
                <button
                  type="button"
                  className="membership-btn advanced-btn"
                  onClick={() => {
                    handleMembershipSelect("advanced");
                    onNext();
                  }}
                >
                  Start Free Trial
                </button>
              </div>
            </div>

            <div className="membership-features">
              <div className="feature-list">
                <div className="feature-item">
                  <svg
                    className="feature-check"
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
                  <span>Registration & Verification</span>
                </div>
                <div className="feature-item">
                  <svg
                    className="feature-check"
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
                  <span>Id Badge & Unique Number</span>
                </div>
                <div className="feature-item">
                  <svg
                    className="feature-check"
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
                  <span>All Of Basic</span>
                </div>

                <div className="feature-category">
                  <h4>Profile Services:</h4>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Fake Profile</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Buy / Sell / Loan</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Discounts & Offer</span>
                  </div>
                </div>

                <div className="feature-category">
                  <h4>Professional Consultancy:</h4>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Legal</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Accounting</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Tax</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Multimedia</span>
                  </div>
                  <div className="feature-item">
                    <svg
                      className="feature-check"
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
                    <span>Collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="form-actions">
          <button type="button" className="btn btn-back" onClick={onBack}>
            Back
          </button>
          <button
            type="submit"
            className="btn btn-next"
            disabled={!formData.membershipType}
          >
            Complete Registration
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default SelectMembership;
