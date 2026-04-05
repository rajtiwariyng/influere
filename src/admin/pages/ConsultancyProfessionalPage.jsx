import React, { useState } from "react";
import consultationIcon from "../../assets/consultation.svg";
import taxFilingIcon from "../../assets/tax-filing.svg";
import supportIcon from "../../assets/support.svg";
import "../components/ConsultancyModals.css";
import { useParams } from 'react-router-dom'
import consultancyData from "../data/consultancyData";
import ConsultancyBookingModal from '../components/ConsultancyBookingModal';

const ConsultancyProfessionalPage = () => {

    const {categoryId , professionalId} = useParams();
    const category = consultancyData[categoryId]
    const professional = category?.professionals?.filter((item)=>{return(item?.id==professionalId)})[0];
    console.log("PROFESSIONAL : ", professional?.avatar)

    const serviceIcons = {
      consultation: consultationIcon,
      "tax filing": taxFilingIcon,
      "tax-filing": taxFilingIcon,
      advisory: taxFilingIcon,
      support: supportIcon,
      planning: consultationIcon,
    };

    const [showBooking, setShowBooking] = useState(false);

      const onBook = () => {
    setShowBooking(true);
  };

    const handleCloseModal = () => {
    setShowBooking(false);
  };
  return (
       <>
               <div className="consultancy-modal-body">
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
                   {professional?.summary}
                 </p>
   
                 <div className="consultancy-services">
                   {professional?.services?.map((service) => {
                     const iconKey = service?.icon || service.title.toLowerCase();
                     const iconSrc = serviceIcons[iconKey] || consultationIcon;
   
                     return (
                       <div
                         key={service.title}
                         className="consultancy-service-card"
                       >
                         <div className="consultancy-service-icon">
                           <img src={iconSrc} alt={service.title} />
                         </div>
                         <div className="consultancy-service-details">
                           <h3>{service.title}</h3>
                           <p>{service.description}</p>
                         </div>
                         <button
                           type="button"
                           className="consultancy-service-book "
                           onClick={onBook}
                         >
                           Book
                         </button>
                       </div>
                     );
                   })}
                 </div>
               </div>

               <ConsultancyBookingModal
        show={Boolean(professional) && showBooking}
        professional={professional}
        onClose={handleCloseModal}
      />

        
       </>
  )
}

export default ConsultancyProfessionalPage