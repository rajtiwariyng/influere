import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import consultancyData from '../data/consultancyData';
import ConsultancyUserModal from '../components/ConsultancyUserModal';
import ConsultancyBookingModal from '../components/ConsultancyBookingModal';
import SliderDropdown from '../components/SliderDropdown';
import RangeSliderDropdown from '../components/RangeSliderDropdown';
import './ConsultancyCategoryPage.css';

const DEFAULT_CATEGORY = 'legal';

const ConsultancyCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const categoryKey = useMemo(() => {
    if (categoryId && consultancyData[categoryId]) {
      return categoryId;
    }
    return DEFAULT_CATEGORY;
  }, [categoryId]);

  const category = consultancyData[categoryKey];
  usePageTitle(category ? `Professional Consultancy | ${category.title}` : 'Professional Consultancy');

  useEffect(() => {
    if (!categoryId) {
      navigate(`/dashboard/professional-consultancy/${DEFAULT_CATEGORY}`, {
        replace: true,
      });
    }
  }, [categoryId, navigate]);

  const handleCardClick = (professional) => {
    setSelectedProfessional(professional);
    setShowBooking(false);
  };

  const handleCloseModal = () => {
    setSelectedProfessional(null);
    setShowBooking(false);
  };

  const handleBook = () => {
    setShowBooking(true);
  };

  const handleFilterChange = (filterId, value) => {
    setFilterValues(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const handleRangeChange = (filterId, range) => {
    setFilterValues(prev => ({
      ...prev,
      [`${filterId}_min`]: range.min,
      [`${filterId}_max`]: range.max
    }));
  };

  const getFilterValue = (filter) => {
    if (filterValues[filter.id] !== undefined) {
      return filterValues[filter.id];
    }
    if (filter.type === 'slider') {
      return filter.min;
    }
    return '';
  };

  const getRangeValues = (filter) => {
    const minKey = `${filter.id}_min`;
    const maxKey = `${filter.id}_max`;
    return {
      min: filterValues[minKey] !== undefined ? filterValues[minKey] : filter.min,
      max: filterValues[maxKey] !== undefined ? filterValues[maxKey] : filter.max
    };
  };

  const renderFilter = (filter) => {
    // Use RangeSliderDropdown for rate-per-hour filters
    if (filter.id === 'rate-per-hour') {
      const rangeValues = getRangeValues(filter);
      return (
        <RangeSliderDropdown
          key={filter.id}
          label={filter.label}
          placeholder={filter.placeholder}
          min={filter.min}
          max={filter.max}
          step={filter.step || 100}
          prefix={filter.prefix || ''}
          suffix={filter.suffix || ''}
          minValue={rangeValues.min}
          maxValue={rangeValues.max}
          onChange={(range) => handleRangeChange(filter.id, range)}
        />
      );
    }

    if (filter.type === 'slider') {
      return (
        <SliderDropdown
          key={filter.id}
          label={filter.label}
          placeholder={filter.placeholder}
          min={filter.min}
          max={filter.max}
          step={filter.step || 1}
          prefix={filter.prefix || ''}
          suffix={filter.suffix || ''}
          value={getFilterValue(filter)}
          onChange={(value) => handleFilterChange(filter.id, value)}
        />
      );
    }

    return (
      <div key={filter.id} className="consultancy-filter">
        <span className="consultancy-filter-label">{filter.label}</span>
        <div className="consultancy-select">
          <select 
            value={getFilterValue(filter)} 
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
          >
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
    );
  };

  if (!category) {
    return null;
  }

  return (
    <div className="admin-page consultancy-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">{category.title}</h1>
      </div>

      <div className="consultancy-filters">
        {category.filters.map(renderFilter)}
      </div>

      <div className="consultancy-grid">
        {category.professionals.map((professional) => (
          <div
            key={professional.id}
            className="consultancy-card"
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(professional)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleCardClick(professional);
              }
            }}
          >
            <div className="consultancy-card-header">
              <div className="consultancy-avatar">
                <img src={professional.avatar} alt={professional.name} />
              </div>
              <div className="consultancy-card-meta">
                <h3 className="consultancy-card-name">{professional.name}</h3>
                <div className="consultancy-card-stats">
                  <span className="consultancy-reach">{professional.reach}</span>
                  <span className="consultancy-rating">
                    {professional.ratingLabel}
                    <i className="bi bi-star-fill"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="consultancy-card-tags">
              <span className="consultancy-tag">
                <i className="bi bi-briefcase"></i>
                {professional.partner}
              </span>
              <span className="consultancy-tag">
                <i className="bi bi-award"></i>
                {professional.designation}
              </span>
              <span className="consultancy-tag">
                <i className="bi bi-buildings"></i>
                {professional.experience}
              </span>
              <span className="consultancy-tag">
                <i className="bi bi-geo-alt"></i>
                {professional.location}
              </span>
            </div>

            <p className="consultancy-card-summary">{professional.summary}</p>

            <button
              type="button"
              className="consultancy-card-button dark-btn"
              onClick={(event) => {
                event.stopPropagation();
                handleCardClick(professional);
              }}
            >
              View More
            </button>
          </div>
        ))}
      </div>

      <ConsultancyUserModal
        show={Boolean(selectedProfessional) && !showBooking}
        professional={selectedProfessional}
        onClose={handleCloseModal}
        onBook={handleBook}
      />

      <ConsultancyBookingModal
        show={Boolean(selectedProfessional) && showBooking}
        professional={selectedProfessional}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ConsultancyCategoryPage;
