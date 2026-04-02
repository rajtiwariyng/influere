import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import "./WithdrawConfirm.css";
import successTopImg from "../../assets/success-top-img.svg";
import failedTopImg from "../../assets/failed-top-img.svg";

const WithdrawConfirm = () => {
  usePageTitle("Withdraw Confirmation");
  const navigate = useNavigate();
  const location = useLocation();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [transactionTime, setTransactionTime] = useState("");
  
  // Get data from navigation state
  const { withdrawAmount, selectedAccount } = location.state || {
    withdrawAmount: "500",
    selectedAccount: "bank"
  };

  // Timer countdown
  useEffect(() => {
    if (showOTPModal && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showOTPModal, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProceed = () => {
    setShowOTPModal(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleOTPNext = () => {
    // Generate transaction details
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const txnId = `0Xbn${Math.random().toString().slice(2, 14)}`;
    
    setTransactionId(txnId);
    setTransactionTime(`${date} | ${time}`);
    setShowOTPModal(false);
    
    // Simulate success/failure (90% success, 10% failure for demo)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      setShowSuccessModal(true);
    } else {
      setShowFailedModal(true);
    }
  };

  const handleResendCode = () => {
    setTimeLeft(300); // Reset to 5 minutes
    setOtpCode("");
    console.log("Resending code...");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    navigate('/dashboard/wallet');
  };

  const handleCloseFailed = () => {
    setShowFailedModal(false);
  };

  return (
    <div className="withdraw-confirm-page">
      <div className="withdraw-confirm-container">
        <h2 className="withdraw-confirm-title">Withdraw Money</h2>

        {/* Recipient Information */}
        <div className="withdraw-recipient-section">
          <span className="recipient-label">To</span>
          <div className="recipient-info-box">
            <div className="recipient-icon">
              <i className={selectedAccount === 'bank' ? 'bi bi-bank' : 'bi bi-paypal'}></i>
            </div>
            <div className="recipient-details">
              <p className="recipient-name">Jon Thomson</p>
              <p className="recipient-account">
                {selectedAccount === 'bank' ? '7657374xxxxxxxx' : 'jonthomos@gmail.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="withdraw-amount-display">
          <label className="amount-label-text">Amount</label>
          <div className="amount-with-balance">
            <h3 className="amount-value-display">${withdrawAmount}</h3>
            <span className="balance-indicator">Balance: $980</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="withdraw-confirm-buttons">
          <button className="btn-dark" onClick={handleProceed}>
            Proceed
          </button>
          <button className="btn-light" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="modal-overlay" onClick={() => setShowOTPModal(false)}>
          <div className="modal-container otp-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowOTPModal(false)}
            >
              <i className="bi bi-x"></i>
            </button>
            
            <h2 className="modal-title">Enter Verification Code</h2>

            {/* OTP Input */}
            <div className="otp-section">
              <input
                type="text"
                className="form-input otp-input"
                placeholder="6-Digit Code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={6}
              />
            </div>

            {/* Timer and Resend */}
            <div className="otp-footer-info">
              <span className="otp-timer">Code Expires in {formatTime(timeLeft)} min</span>
              <button className="otp-resend" onClick={handleResendCode}>
                Resend Code
              </button>
            </div>

            {/* Action Buttons */}
            <div className="modal-footer">
              <button 
                className="btn-dark"
                onClick={handleOTPNext}
                disabled={otpCode.length !== 6}
              >
                Next
              </button>
              <button 
                className="btn-light"
                onClick={() => setShowOTPModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleCloseSuccess}>
          <div className="modal-container pt-0 w-100 payment-result-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-result-bg">
              <img src={successTopImg} alt="" className="payment-bg-image" />
            </div>
            
            <div className="payment-result-content">
              {/* <div className="payment-result-icon success">
                <i className="bi bi-check-lg"></i>
              </div> */}
              
              <h2 className="payment-result-title success">Withdrawn Successfully</h2>
              
              <div className="payment-amount-section">
                <p className="payment-amount-label">Amount</p>
                <h3 className="payment-amount-value">${withdrawAmount}</h3>
              </div>
              
              <p className="payment-result-message">
                Transfer Should arrived on 18th October
              </p>
              
              <div className="payment-transaction-id">
                <span className="transaction-id-label">Transaction ID: </span>
                <span className="transaction-id-value">{transactionId}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(transactionId)}
                  title="Copy to clipboard"
                >
                  <i className="bi bi-clipboard"></i>
                </button>
              </div>
              
              <p className="payment-timestamp">{transactionTime}</p>
              
              <div className="payment-result-actions">
                <button className="btn-dark">View Receipt</button>
                <button className="btn-light" onClick={handleCloseSuccess}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Failed Modal */}
      {showFailedModal && (
        <div className="modal-overlay" onClick={handleCloseFailed}>
          <div className="modal-container payment-result-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-result-bg">
              <img src={failedTopImg} alt="" className="payment-bg-image" />
            </div>
            
            <div className="payment-result-content">
              <div className="payment-result-icon failed">
                <i className="bi bi-x-lg"></i>
              </div>
              
              <h2 className="payment-result-title failed">Payment Failed</h2>
              
              <div className="payment-amount-section">
                <p className="payment-amount-label">Amount</p>
                <h3 className="payment-amount-value">${withdrawAmount}</h3>
              </div>
              
              <p className="payment-result-message">
                We couldn't process your payment at the moment.<br />
                Please verify your payment details or try again after some time.
              </p>
              
              <div className="payment-transaction-id">
                <span className="transaction-id-label">Transaction ID: </span>
                <span className="transaction-id-value">{transactionId}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(transactionId)}
                  title="Copy to clipboard"
                >
                  <i className="bi bi-clipboard"></i>
                </button>
              </div>
              
              <p className="payment-timestamp">{transactionTime}</p>
              
              <div className="payment-result-actions">
                <button className="btn-dark">View Receipt</button>
                <button className="btn-light" onClick={handleCloseFailed}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawConfirm;

