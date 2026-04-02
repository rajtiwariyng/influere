const CreateProfile = ({ formData, onFormDataChange, onNext, onBack, isFirstStep, isLastStep }) => {
  const handleInputChange = (field, value) => {
    onFormDataChange(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.firstName && formData.lastName && formData.email && formData.contactNumber) {
      onNext();
    }
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Create a Profile</h2>
        <p className="step-description">We'll get your name and contact details.</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Id</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              className="form-control"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              placeholder="Enter your contact number"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          {!isFirstStep && (
            <button type="button" className="btn btn-back" onClick={onBack}>
              Back
            </button>
          )}
          <button type="submit" className="btn btn-next">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
