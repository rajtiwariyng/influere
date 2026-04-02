import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import StepProgress from '../components/registration/StepProgress';
import CreateProfile from '../components/registration/CreateProfile';
import VerifyIdentity from '../components/registration/VerifyIdentity';
import FinalizeAccount from '../components/registration/FinalizeAccount';
import VideoCall from '../components/registration/VideoCall';
import SelectMembership from '../components/registration/SelectMembership';
import ReviewPage from '../components/registration/ReviewPage';
import RegistrationLayout from '../layouts/RegistrationLayout';

const Registration = () => {
  usePageTitle("Registration");
  const [currentStep, setCurrentStep] = useState(1);
  // Calculate default date (tomorrow)
  const getDefaultDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    // Step 1: Create Profile
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    contactNumber: '+1234567890',
    
    // Step 2: Verify Identityed
    nationality: 'indian',
    countryId: 'aadhaar',
    idType1: 'aadhaar',
    idFile1: null, // File cannot be prefilled
    idType2: '',
    idFile2: null,
    
    // Step 3: Finalize Account
    termsAccepted: true,
    
    // Step 4: Video Call
    videoMode: 'zoom',
    selectedDate: getDefaultDate(),
    selectedTime: '09:00 AM',
    
    // Step 5: Select Membership
    membershipType: 'basic'
  });

  const steps = [
    { id: 1, title: 'Create a Profile', component: CreateProfile },
    { id: 2, title: 'Verify your Identity', component: VerifyIdentity },
    { id: 3, title: 'Finalize your account', component: FinalizeAccount },
    { id: 4, title: 'Video call', component: VideoCall },
    { id: 5, title: 'Select Membership', component: SelectMembership },
    { id: 6, title: 'Review', component: ReviewPage }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
    // Registration completion is handled by SuccessModal auto-redirect
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <RegistrationLayout>
      <div className="registration-container">
        <div className="registration-header">
          <h1 className="registration-title mb-2">Registration</h1>
          <div className="line mb-3"></div>
          <StepProgress 
            steps={steps} 
            currentStep={currentStep} 
          />
        </div>
        
        <div className="registration-content">
          <CurrentStepComponent
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === steps.length}
          />
        </div>
      </div>
    </RegistrationLayout>
  );
};

export default Registration;
