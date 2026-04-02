import React, { useMemo, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import {
  offerCategories,
  discountOffers,
} from "../data/discountOffersData";
import "./Wallet.css";
import "./DiscountOffers.css";

const DiscountOffers = () => {
  usePageTitle("Discount & Offers");
  const [activeCategory, setActiveCategory] = useState("apps");

  const filteredOffers = useMemo(
    () => discountOffers.filter((offer) => offer.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="admin-page discount-offers-page">
      <section className="discount-section">
        <div className="discount-section-header">
          <h1 className="discount-title">Discount & Offers</h1>
        </div>

        <div className="dashboard-table-section discount-offers-panel">
          <div className="table-controls justify-content-between">
            <div className="transaction-tabs">
              {offerCategories.map((category) => (
                <button
                  key={category.id}
                  className={`tab-btn ${
                    activeCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label} ({category.count.toString().padStart(2, "0")})
                </button>
              ))}
            </div>
          </div>

          <div className="discount-app-grid">
            {filteredOffers.map((offer) => (
              <div key={offer.id} className="discount-app-card">
                <div className="discount-app-main">
                  <img src={offer.icon} alt={offer.name} />
                  <div>
                    <h3>{offer.name}</h3>
                    <p>{offer.description}</p>
                  </div>
                </div>
                <a href={offer.url} className="discount-app-link">
                  {offer.cta}
                  <i className="bi bi-box-arrow-up-right ms-1"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscountOffers;
