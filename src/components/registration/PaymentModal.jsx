import { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ membershipDetails, onClose, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (membershipDetails.price === 0) {
      // Free plan - no payment required
      onSubmit();
    } else if (paymentMethod === 'paypal') {
      // PayPal - no card details needed
      onSubmit();
    } else if (paymentMethod === 'card' && cardNumber && cardName && expiryDate && cvv) {
      // Card payment - all fields required
      onSubmit();
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setCvv(value);
  };

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="payment-modal-content">
          <div className="payment-modal-header">
            <h2 className="payment-modal-title">Payment Details</h2>
            <p className="payment-modal-subtitle">Complete your registration by providing payment information</p>
          </div>

          {/* Plan Details */}
          <div className="payment-plan-details">
            <div className="plan-details-header">
              <h3 className="plan-details-title">Plan Details</h3>
            </div>
            <div className="plan-details-content">
              <div className="plan-details-row">
                <span className="plan-details-label">Plan:</span>
                <span className="plan-details-value">{membershipDetails.name}</span>
              </div>
              <div className="plan-details-row">
                <span className="plan-details-label">Amount:</span>
                <span className="plan-details-value plan-amount">
                  ${membershipDetails.price.toFixed(2)}
                  {membershipDetails.price > 0 && <span className="plan-period">/Yearly</span>}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          {membershipDetails.price > 0 ? (
            <form onSubmit={handleSubmit} className="payment-form">
              {/* Payment Method */}
              <div className="form-group mb-2">
                <label className="form-label">Payment Method</label>
                <div className="payment-method-options">
                  <label className={`payment-method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <span className="payment-method-label">Credit/Debit Card</span>
                  </label>
                  <label className={`payment-method-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    />
                    <span className="payment-method-label">PayPal</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <>
                  {/* Card Number */}
                  <div className="form-group mb-2">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      className="form-control"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>

                  {/* Card Name */}
                  <div className="form-group mb-2">
                    <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      id="cardName"
                      className="form-control"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Expiry and CVV */}
                  <div className="form-row mb-2">
                    <div className="form-group">
                      <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        className="form-control"
                        value={expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv" className="form-label">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        className="form-control"
                        value={cvv}
                        onChange={handleCvvChange}
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="form-group mb-2">
                    <label htmlFor="billingAddress" className="form-label">Billing Address</label>
                    <textarea
                      id="billingAddress"
                      className="form-control"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      placeholder="Enter your billing address"
                      rows="3"
                      required
                    />
                  </div>
                </>
              )}

              {paymentMethod === 'paypal' && (
                <div className="paypal-info">
                  <p>You will be redirected to PayPal to complete your payment.</p>
                </div>
              )}

              <div className="payment-form-actions">
                <button type="button" className="btn btn-back" onClick={onClose}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-next"
                  disabled={!paymentMethod || (paymentMethod === 'card' && (!cardNumber || !cardName || !expiryDate || !cvv))}
                >
                  Submit Payment
                </button>
              </div>
            </form>
          ) : (
            <div className="free-plan-payment">
              <p className="free-plan-message">
                This is a free plan. No payment is required.
              </p>
              <div className="payment-form-actions">
                <button type="button" className="btn btn-back" onClick={onClose}>
                  Cancel
                </button>
                <button type="button" className="btn btn-next" onClick={handleSubmit}>
                  Confirm Registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

