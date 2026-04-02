const VerifyIdentity = ({ formData, onFormDataChange, onNext, onBack, isFirstStep, isLastStep }) => {
  // Define ID types for different regions
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

  const handleInputChange = (field, value) => {
    // Reset dependent fields when nationality changes
    if (field === 'nationality') {
      onFormDataChange('countryId', '');
      onFormDataChange('idType1', '');
      onFormDataChange('idType2', '');
    }
    onFormDataChange(field, value);
  };

  const handleFileChange = (field, file) => {
    onFormDataChange(field, file);
  };

  // Get current ID types based on selected nationality
  const getCurrentIdTypes = () => {
    return idTypesByRegion[formData.nationality] || idTypesByRegion['other'];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.nationality && formData.countryId && formData.idType1 && formData.idFile1) {
      onNext();
    }
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Verify your Identity</h2>
        <div className="step-description">
          <p><strong>You'll provide your address, date of birth, nationality. You may also be asked for photo ID. What ID will I need?</strong></p>
          <p>Any government issued ID that proves one or more of the above together or separately. Eg; if your drivers license proves all of the above then that alone is enough. If the drivers license does not mention the address, then you will need to provide another document for that. If you have multiple social media accounts, we can verify them all together at the same time.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nationality" className="form-label">Nationality</label>
            <select
              id="nationality"
              className="form-control"
              value={formData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              required
            >
              <option value="">Select Nationality</option>
              <option value="indian">Indian</option>
              <option value="european">European Countries</option>
              <option value="usa-north-america">USA (North American countries)</option>
              <option value="british">British</option>
              <option value="canadian">Canadian</option>
              <option value="australian">Australian</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="countryId" className="form-label">Country Id</label>
            <select
              id="countryId"
              className="form-control"
              value={formData.countryId}
              onChange={(e) => handleInputChange('countryId', e.target.value)}
              required
            >
              <option value="">Select Country ID</option>
              {getCurrentIdTypes().map((idType) => (
                <option key={idType.value} value={idType.value}>
                  {idType.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="idType1" className="form-label">Type Of Id</label>
            <select
              id="idType1"
              className="form-control"
              value={formData.idType1}
              onChange={(e) => handleInputChange('idType1', e.target.value)}
              required
            >
              <option value="">Select ID Type</option>
              {getCurrentIdTypes().map((idType) => (
                <option key={idType.value} value={idType.value}>
                  {idType.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="idFile1" className="form-label">Upload File</label>
            <div className="file-upload">
              <input
                type="file"
                id="idFile1"
                className="file-input"
                onChange={(e) => handleFileChange('idFile1', e.target.files[0])}
                accept="image/*,.pdf"
                required
              />
              <label htmlFor="idFile1" className="file-upload-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{formData.idFile1 ? formData.idFile1.name : 'Choose File'}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="idType2" className="form-label">Type Of Id</label>
            <select
              id="idType2"
              className="form-control"
              value={formData.idType2}
              onChange={(e) => handleInputChange('idType2', e.target.value)}
            >
              <option value="">Select ID Type (Optional)</option>
              {getCurrentIdTypes().map((idType) => (
                <option key={idType.value} value={idType.value}>
                  {idType.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="idFile2" className="form-label">Upload File</label>
            <div className="file-upload">
              <input
                type="file"
                id="idFile2"
                className="file-input"
                onChange={(e) => handleFileChange('idFile2', e.target.files[0])}
                accept="image/*,.pdf"
              />
              <label htmlFor="idFile2" className="file-upload-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{formData.idFile2 ? formData.idFile2.name : 'Choose File'}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-back" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-next">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyIdentity;
