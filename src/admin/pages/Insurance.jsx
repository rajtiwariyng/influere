import React, { useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import {
  insuranceOffers,
  insuranceFilters,
} from "../data/discountOffersData";
import SliderDropdown from "../components/SliderDropdown";
import "./Wallet.css";
import "./DiscountOffers.css";

const Insurance = () => {
  usePageTitle("Professional Indemnity Insurance");
  const [expandedInsurance, setExpandedInsurance] = useState(
    insuranceOffers[0]?.id || null
  );
  const [deductibleValue, setDeductibleValue] = useState(0);

  return (
    <div className="admin-page discount-offers-page">
      <section className="discount-section">
        <div className="discount-section-header">
          <h1 className="discount-title">Professional Indemnity Insurance</h1>
        </div>

        <div className="dashboard-table-section discount-insurance-panel">
          <div className="consultancy-filters">
            {/* Deductible Slider Dropdown */}
            <SliderDropdown
              label="Deductible"
              placeholder="Select Deductible"
              min={0}
              max={1000000}
              step={1000}
              prefix="$"
              value={deductibleValue}
              onChange={(value) => setDeductibleValue(value)}
            />
            
            {/* Other filters as regular dropdowns */}
            {insuranceFilters.filter(filter => filter.id !== 'deductible').map((filter) => (
              <div key={filter.id} className="consultancy-filter">
                <span className="consultancy-filter-label">{filter.label}</span>
                <div className="consultancy-select">
                  <select defaultValue="">
                    <option value="" disabled>
                      {filter.placeholder}
                    </option>
                    {filter.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="consultancy-select-caret">
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="insurance-list">
            {insuranceOffers.map((offer) => {
              const isExpanded = expandedInsurance === offer.id;
              return (
                <div
                  key={offer.id}
                  className={`insurance-card ${isExpanded ? "expanded" : ""}`}
                >
                  <div className="insurance-card-header">
                    <div className="insurance-brand">
                      <img src={offer.icon} alt={offer.name} />
                      <span>{offer.name}</span>
                    </div>
                    <div className="insurance-details">
                      <div>
                        <span className="insurance-label">Deductible</span>
                        <p>{offer.deductible}</p>
                      </div>
                      <div>
                        <span className="insurance-label">Net Coverage</span>
                        <p>{offer.coverage}</p>
                      </div>
                      <div>
                        <span className="insurance-label">Premium</span>
                        <p>{offer.premium}</p>
                      </div>
                    </div>
                    <div className="insurance-actions">
                      <button type="button" className="dark-btn">
                        Add to compare
                      </button>
                      <button
                        type="button"
                        className="light-btn"
                        onClick={() =>
                          setExpandedInsurance(
                            isExpanded ? null : offer.id
                          )
                        }
                      >
                        {isExpanded ? "Hide" : "Know More"}
                        <i
                          className={`bi ${
                            isExpanded ? "bi-chevron-up" : "bi-chevron-down"
                          } ms-1`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="insurance-features">
                      <span className="insurance-feature-title">Feature</span>
                      <ul>
                        {offer.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insurance;

