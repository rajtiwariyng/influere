import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import RangeSliderDropdown from "../components/RangeSliderDropdown";
import "../components/ConsultancyModals.css";
import "./ConsultancyCategoryPage.css";
import "./CollaborationPage.css";
import "./Wallet.css";
import consultancyData from "../data/consultancyData";
import SelectDropdown from "../components/SelectDropdown";

const DEFAULT_CATEGORY = "legal";

const ConsultancyCategoryPage = () => {
  const { categoryId } = useParams();
  const categoryKey = useMemo(() => {
    if (categoryId && consultancyData[categoryId]) {
      return categoryId;
    }
    return DEFAULT_CATEGORY;
  }, [categoryId]);

  const category = consultancyData[categoryKey];
  const serviceTypeOptions = category?.serviceTypes;
  const distanceFilterOptions = category?.distanceOptions;

  usePageTitle(category?.title);
  const navigate = useNavigate();
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [filters, setFilters] = useState({
    services: null,
    rate: { min: 10, max: 100000 },
    distance: null,
    experience: { min: 0, max: 50 },
  });

  const handleProfileSelect = (profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleShowShortlisted = () => {
    if (selectedProfiles.length > 0) {
      const idsParam = selectedProfiles.join(",");
      navigate(`/dashboard/professional-consultancy/shortlisted?ids=${idsParam}`);
    }
  };

  const ViewMoreHandler = (professionalId) => {

    navigate(`/dashboard/professional-consultancy/${categoryId}/${professionalId}`)

  }

  return (
    <div className="admin-page consultancy-page collaboration-page">
      {/* Header with AI Badge */}
      <div className="collaboration-header mb-0 w-100">
        <div className="collaboration-header-content w-100">
          <h1 className="admin-page-title d-flex align-items-center gap-2 w-100">
            {category?.title}
            <span className="ai-powered-badge">
              AI Powered | Let AI find you the right person to work with.
            </span>
          </h1>
        </div>
      </div>

      {/* Category description */}
      {category?.description && (
        <p className="consultancy-category-description">
          {category.description}
        </p>
      )}

      {/* Section Title */}
      <div className="collaboration-section-title m-0 mt-2 mb-1">
        <h2>Look for Consultants</h2>
      </div>

      {/* Filter Bar */}
      <div className="consultancy-filters">
        <SelectDropdown
          label="Type of Service"
          placeholder="Select an option"
          options={serviceTypeOptions}
          onChange={(val) => handleFilterChange("services", val)}
          value={filters?.services}
        />

        <RangeSliderDropdown
          label="Rate"
          placeholder="Select range"
          min={10}
          max={100000}
          step={10}
          prefix="$"
          minValue={filters?.rate?.min}
          maxValue={filters?.rate?.max}
          onChange={(value) => handleFilterChange("rate", value)}
        />

        <SelectDropdown
          label="Distance"
          placeholder="Select an option"
          options={distanceFilterOptions}
          onChange={(val) => handleFilterChange("distance", val)}
          value={filters?.distance}
        />

        <RangeSliderDropdown
          label="Experience"
          placeholder="Select range"
          min={0}
          max={50}
          step={1}
          suffix=" yrs"
          minValue={filters?.experience?.min}
          maxValue={filters?.experience?.max}
          onChange={(value) => handleFilterChange("experience", value)}
        />
      </div>

      {/* Collaborator Cards */}
      <div className="consultancy-grid">
        {category?.professionals?.map((profile) => {
          const isSelected = selectedProfiles.includes(profile.id);
          return (
            <div
              key={profile.id}
              className={`consultancy-card collaboration-card ${
                isSelected ? "selected" : ""
              }`}
            >
              {/* Checkbox */}
              <div className="consultancy-card-header d-flex align-items-center">
                <div className="collaboration-card-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleProfileSelect(profile.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="consultancy-avatar">
                  <img src={profile.avatar} alt={profile.name} />
                </div>
                <div className="consultancy-card-meta">
                  <h3 className="consultancy-card-name">{profile.name}</h3>
                  <div className="consultancy-card-stats">
                    <span className="consultancy-reach">
                      {profile.reach} Reach
                    </span>
                    <span className="consultancy-rating">
                      {profile.ratingLabel}
                      <i className="bi bi-star-fill"></i>
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="consultancy-card-tags">
                {profile.partner && (
                  <span className="consultancy-tag">
                    <i className="bi bi-briefcase"></i>
                    {profile.partner}
                  </span>
                )}
                {profile.designation && (
                  <span className="consultancy-tag">
                    <i className="bi bi-award"></i>
                    {profile.designation}
                  </span>
                )}
                {profile.experience && (
                  <span className="consultancy-tag">
                    <i className="bi bi-buildings"></i>
                    {profile.experience}
                  </span>
                )}
                {profile.location && (
                  <span className="consultancy-tag">
                    <i className="bi bi-geo-alt"></i>
                    {profile.location}
                  </span>
                )}
              </div>

              <p className="consultancy-card-summary">{profile.summary}</p>

              {/* Asking Rates */}
              {/* {profile.askingRates && (
                <div className="collaboration-asking-rates d-flex align-items-center gap-2">
                  <span className="asking-rates-title">Asking Rate:</span>
                  <div className="asking-rates-list d-flex align-items-center gap-2 flex-wrap">
                    {profile.askingRates.post && (
                      <div className="asking-rate-item">
                        <span className="asking-rate-label">Post:</span>
                        <span className="asking-rate-value">
                          {profile.askingRates.post}
                        </span>
                      </div>
                    )}
                    {profile.askingRates.repost && (
                      <div className="asking-rate-item">
                        <span className="asking-rate-label">Repost:</span>
                        <span className="asking-rate-value">
                          {profile.askingRates.repost}
                        </span>
                      </div>
                    )}
                    {profile.askingRates.retweet && (
                      <div className="asking-rate-item">
                        <span className="asking-rate-label">Retweet:</span>
                        <span className="asking-rate-value">
                          {profile.askingRates.retweet}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )} */}

                  <button
                  type="button"
                  className="consultancy-card-button dark-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    ViewMoreHandler(profile?.id);
                  }}
                >
                  View More
                </button>
            </div>
          );
        })}
      </div>

      {/* Send to Shortlisted Button */}
      {selectedProfiles.length > 0 && (
        <div className="collaboration-send-shortlisted">
          <button
            type="button"
            className="btn-dark collaboration-send-btn"
            onClick={handleShowShortlisted}
          >
            Send to shortlisted
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultancyCategoryPage;

// OLD CODE

// import React, { useEffect, useMemo, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import usePageTitle from '../../hooks/usePageTitle';
// import consultancyData from '../data/consultancyData';
// import ConsultancyUserModal from '../components/ConsultancyUserModal';
// import ConsultancyBookingModal from '../components/ConsultancyBookingModal';
// import SliderDropdown from '../components/SliderDropdown';
// import RangeSliderDropdown from '../components/RangeSliderDropdown';
// import './ConsultancyCategoryPage.css';

// const DEFAULT_CATEGORY = 'legal';

// const ConsultancyCategoryPage = () => {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();
//   const [selectedProfessional, setSelectedProfessional] = useState(null);
//   const [showBooking, setShowBooking] = useState(false);
//   const [filterValues, setFilterValues] = useState({});

//   const categoryKey = useMemo(() => {
//     if (categoryId && consultancyData[categoryId]) {
//       return categoryId;
//     }
//     return DEFAULT_CATEGORY;
//   }, [categoryId]);

//   const category = consultancyData[categoryKey];
//   usePageTitle(category ? `Professional Consultancy | ${category.title}` : 'Professional Consultancy');

//   useEffect(() => {
//     if (!categoryId) {
//       navigate(`/dashboard/professional-consultancy/${DEFAULT_CATEGORY}`, {
//         replace: true,
//       });
//     }
//   }, [categoryId, navigate]);

//   const handleCardClick = (professional) => {
//     setSelectedProfessional(professional);
//     setShowBooking(false);
//   };

//   const handleCloseModal = () => {
//     setSelectedProfessional(null);
//     setShowBooking(false);
//   };

//   const handleBook = () => {
//     setShowBooking(true);
//   };

//   const handleFilterChange = (filterId, value) => {
//     setFilterValues(prev => ({
//       ...prev,
//       [filterId]: value
//     }));
//   };

//   const handleRangeChange = (filterId, range) => {
//     setFilterValues(prev => ({
//       ...prev,
//       [`${filterId}_min`]: range.min,
//       [`${filterId}_max`]: range.max
//     }));
//   };

//   const getFilterValue = (filter) => {
//     if (filterValues[filter.id] !== undefined) {
//       return filterValues[filter.id];
//     }
//     if (filter.type === 'slider') {
//       return filter.min;
//     }
//     return '';
//   };

//   const getRangeValues = (filter) => {
//     const minKey = `${filter.id}_min`;
//     const maxKey = `${filter.id}_max`;
//     return {
//       min: filterValues[minKey] !== undefined ? filterValues[minKey] : filter.min,
//       max: filterValues[maxKey] !== undefined ? filterValues[maxKey] : filter.max
//     };
//   };

//   const renderFilter = (filter) => {
//     // Use RangeSliderDropdown for rate-per-hour filters
//     if (filter.id === 'rate-per-hour') {
//       const rangeValues = getRangeValues(filter);
//       return (
//         <RangeSliderDropdown
//           key={filter.id}
//           label={filter.label}
//           placeholder={filter.placeholder}
//           min={filter.min}
//           max={filter.max}
//           step={filter.step || 100}
//           prefix={filter.prefix || ''}
//           suffix={filter.suffix || ''}
//           minValue={rangeValues.min}
//           maxValue={rangeValues.max}
//           onChange={(range) => handleRangeChange(filter.id, range)}
//         />
//       );
//     }

//     if (filter.type === 'slider') {
//       return (
//         <SliderDropdown
//           key={filter.id}
//           label={filter.label}
//           placeholder={filter.placeholder}
//           min={filter.min}
//           max={filter.max}
//           step={filter.step || 1}
//           prefix={filter.prefix || ''}
//           suffix={filter.suffix || ''}
//           value={getFilterValue(filter)}
//           onChange={(value) => handleFilterChange(filter.id, value)}
//         />
//       );
//     }

//     return (
//       <div key={filter.id} className="consultancy-filter">
//         <span className="consultancy-filter-label">{filter.label}</span>
//         <div className="consultancy-select">
//           <select
//             value={getFilterValue(filter)}
//             onChange={(e) => handleFilterChange(filter.id, e.target.value)}
//           >
//             <option value="" disabled>
//               {filter.placeholder}
//             </option>
//             {filter.options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <span className="consultancy-select-caret">
//             <i className="bi bi-chevron-down"></i>
//           </span>
//         </div>
//       </div>
//     );
//   };

//   if (!category) {
//     return null;
//   }

//   return (
//     <div className="admin-page consultancy-page">
//       <div className="admin-page-header">
//         <h1 className="admin-page-title">{category.title}</h1>
//       </div>

//       <div className="consultancy-filters">
//         {category.filters.map(renderFilter)}
//       </div>

//       <div className="consultancy-grid">
//         {category.professionals.map((professional) => (
//           <div
//             key={professional.id}
//             className="consultancy-card"
//             role="button"
//             tabIndex={0}
//             onClick={() => handleCardClick(professional)}
//             onKeyPress={(event) => {
//               if (event.key === 'Enter') {
//                 handleCardClick(professional);
//               }
//             }}
//           >
//             <div className="consultancy-card-header">
//               <div className="consultancy-avatar">
//                 <img src={professional.avatar} alt={professional.name} />
//               </div>
//               <div className="consultancy-card-meta">
//                 <h3 className="consultancy-card-name">{professional.name}</h3>
//                 <div className="consultancy-card-stats">
//                   <span className="consultancy-reach">{professional.reach}</span>
//                   <span className="consultancy-rating">
//                     {professional.ratingLabel}
//                     <i className="bi bi-star-fill"></i>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="consultancy-card-tags">
//               <span className="consultancy-tag">
//                 <i className="bi bi-briefcase"></i>
//                 {professional.partner}
//               </span>
//               <span className="consultancy-tag">
//                 <i className="bi bi-award"></i>
//                 {professional.designation}
//               </span>
//               <span className="consultancy-tag">
//                 <i className="bi bi-buildings"></i>
//                 {professional.experience}
//               </span>
//               <span className="consultancy-tag">
//                 <i className="bi bi-geo-alt"></i>
//                 {professional.location}
//               </span>
//             </div>

//             <p className="consultancy-card-summary">{professional.summary}</p>

//             <button
//               type="button"
//               className="consultancy-card-button dark-btn"
//               onClick={(event) => {
//                 event.stopPropagation();
//                 handleCardClick(professional);
//               }}
//             >
//               View More
//             </button>
//           </div>
//         ))}
//       </div>

//       <ConsultancyUserModal
//         show={Boolean(selectedProfessional) && !showBooking}
//         professional={selectedProfessional}
//         onClose={handleCloseModal}
//         onBook={handleBook}
//       />

//       <ConsultancyBookingModal
//         show={Boolean(selectedProfessional) && showBooking}
//         professional={selectedProfessional}
//         onClose={handleCloseModal}
//       />
//     </div>
//   );
// };

// export default ConsultancyCategoryPage;
