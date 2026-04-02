const FinalizeAccount = ({ formData, onFormDataChange, onNext, onBack, isFirstStep, isLastStep }) => {
  const handleCheckboxChange = (field, checked) => {
    onFormDataChange(field, checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.termsAccepted) {
      onNext();
    }
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Finalize your account</h2>
        <p className="step-description">You'll add purpose and usage info, then review and agree to a few legal documents.</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="terms-section">
          <h3 className="terms-title">Terms and Conditions</h3>
          <div className="terms-content">
            <p>If you cancel it 48 hours & will less the 10 services you will entitled for 100% refund.</p>
          </div>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={formData.termsAccepted}
                onChange={(e) => handleCheckboxChange('termsAccepted', e.target.checked)}
                required
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">I accept & Agree</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-back" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-next" disabled={!formData.termsAccepted}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinalizeAccount;
