import { Link } from 'react-router-dom';

const RegistrationComplete = ({ formData }) => {
  return (
    <div className="step-content">
      <div className="step-header text-center">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="var(--success-500)" strokeWidth="2"/>
            <path d="M9 12l2 2 4-4" stroke="var(--success-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="step-title">Registration Complete!</h2>
        <p className="step-description">
          Welcome to INFLUERE! Your account has been successfully created. 
          {formData.membershipType === 'basic' 
            ? ' You can now start using our basic features.' 
            : ' You now have access to all our premium features.'
          }
        </p>
      </div>

      <div className="registration-summary">
        <h3>Registration Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Name:</span>
            <span className="summary-value">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Email:</span>
            <span className="summary-value">{formData.email}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Contact:</span>
            <span className="summary-value">{formData.contactNumber}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Membership:</span>
            <span className="summary-value">
              {formData.membershipType === 'basic' ? 'Basic Free' : 'Paid/Advanced'}
            </span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <Link to="/" className="btn btn-primary">
          Go to Dashboard
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RegistrationComplete;
