const StepProgress = ({ steps, currentStep }) => {
  return (
    <div className="step-progress">
      <div className="step-progress-bar">
        {steps.map((step, index) => (
          <div key={step.id} className="step-item">
            <div className={`step-circle ${currentStep > step.id ? 'completed' : currentStep === step.id ? 'current' : 'pending'}`}>
              {currentStep > step.id ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" fill="currentColor"/>
                </svg>
              ) : (
                <span className="step-number">{step.id}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`step-line ${currentStep > step.id ? 'completed' : ''}`}></div>
            )}
            <div className={`step-label ${currentStep >= step.id ? 'active' : ''}`}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
