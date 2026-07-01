import React, { useState } from "react";
import "../components/ConsultancyModals.css";
import { useNavigate, useParams } from 'react-router-dom'
import consultancyData from "../data/consultancyData";
import ConsultancyBookingModal from '../components/ConsultancyBookingModal';
import SupportContactModal from '../components/SupportContactModal';

const CA_DESCRIPTION =
  "Qualified Chartered Accountant with expertise in accounting, taxation, auditing, financial reporting, and compliance. Experienced in providing strategic financial guidance, regulatory compliance, and business advisory services.";

const ConsultancyProfessionalPage = () => {

    const navigate = useNavigate()

    const {categoryId , professionalId} = useParams();
    const category = consultancyData[categoryId]
    const professional = category?.professionals?.filter((item)=>{return(item?.id==professionalId)})[0];

    const [showBooking, setShowBooking] = useState(false);
    const [showSupport, setShowSupport] = useState(false);

      const onBook = () => {
    setShowBooking(true);
  };

    const handleCloseModal = () => {
    setShowBooking(false);
  };

  const GoBackHandler = () => {
    navigate(`/dashboard/professional-consultancy/${categoryId}`);
  }

  return (
       <>
               <div className="consultancy-modal-body">
                    <div className="mb-3">
                   <button onClick={GoBackHandler}><i className="bi bi-chevron-left admin-header-dropdown-arrow "></i> <small>Go Back</small></button>
                    </div>
                 <div className="consultancy-modal-header">
                   <div className="consultancy-modal-avatar">
                     <img src={professional?.avatar} alt={professional?.name} />
                   </div>
                   <div className="consultancy-modal-title">
                     <div className="d-flex align-items-center gap-2 mb-2">
                       <h2>{professional?.name}</h2>
                       {professional?.flagIcon && (
                         <img
                           src={professional?.flagIcon}
                           alt={`${professional?.name} country flag`}
                           className="consultancy-modal-flag-icon"
                         />
                       )}
                       <button
                         type="button"
                         className="consultancy-support-icon"
                         title="Contact support about this professional"
                         aria-label="Contact support about this professional"
                         onClick={() => setShowSupport(true)}
                       >
                         <i className="bi bi-headset"></i>
                       </button>
                     </div>
                     <div className="consultancy-modal-tags">
                       <span className="consultancy-tag">
                         <i className="bi bi-briefcase"></i>
                         {professional?.partner}
                       </span>
                       <span className="consultancy-tag">
                         <i className="bi bi-award"></i>
                         {professional?.designation}
                       </span>
                       <span className="consultancy-tag">
                         <i className="bi bi-buildings"></i>
                         {professional?.experience}
                       </span>
                       <span className="consultancy-tag">
                         <i className="bi bi-geo-alt"></i>
                         {professional?.location}
                       </span>
                     </div>
                   </div>
                 </div>
   
                 <p className="consultancy-modal-summary">
                   {CA_DESCRIPTION}
                 </p>

                 <button
                   type="button"
                   className="consultancy-card-button dark-btn consultancy-book-appointment-btn"
                   onClick={onBook}
                 >
                   Book an Appointment
                 </button>
               </div>

               <ConsultancyBookingModal
        show={Boolean(professional) && showBooking}
        professional={professional}
        onClose={handleCloseModal}
      />

      <SupportContactModal
        show={showSupport}
        professional={professional}
        onClose={() => setShowSupport(false)}
      />
       </>
  )
}

export default ConsultancyProfessionalPage