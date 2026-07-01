import consultantAvatar1 from '../../assets/professional.png';
import consultantAvatar2 from '../../assets/people-img.png';
import consultantAvatar3 from '../../assets/left-img.jpg';
import indianFlag from '../../assets/indian-flag.svg';

const sharedProfessionals = [
  {
    id: 'suryoday-bank',
    name: 'Rajesh Kumar',
    flagIcon: indianFlag,
    avatar: consultantAvatar1,
    reach: '869K Reach',
    rating: 4.5,
    ratingLabel: '4.5',
    partner: 'Partner At Wealth Elite Pvt. Ltd',
    location: 'Mumbai',
    experience: 'Experience',
    designation: 'CA',
    summary:
      'All day care treatments are valid. Get covered even with just 2 hours of hospitalization—no need to meet the 24-hour minimum requirement.',
    services: [
      {
        title: 'Consultation',
        icon: 'consultation',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        title: 'Tax Filing',
        icon: 'tax-filing',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        title: 'Support',
        icon: 'support',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ],
  },
  {
    id: 'wealth-elite',
    name: 'Priya Sharma',
    flagIcon: indianFlag,
    avatar: consultantAvatar2,
    reach: '650K Reach',
    rating: 4.7,
    ratingLabel: '4.7',
    partner: 'Partner At Wealth Elite Pvt. Ltd',
    location: 'Delhi',
    experience: 'Experience',
    designation: 'CA',
    summary:
      'Comprehensive consultancy support that adapts to your business goals with agile experts and proven outcomes.',
    services: [
      {
        title: 'Consultation',
        icon: 'consultation',
        description:
          'Schedule a one-to-one consultation tailored to your business needs.',
      },
      {
        title: 'Planning',
        icon: 'consultation',
        description:
          'Strategic planning services to streamline your operational workflows.',
      },
      {
        title: 'Support',
        icon: 'support',
        description:
          'Ongoing support packages with dedicated account managers.',
      },
    ],
  },
  {
    id: 'jon-thomson',
    name: 'Jon Thomson',
    flagIcon: indianFlag,
    avatar: consultantAvatar3,
    reach: '480K Reach',
    rating: 4.8,
    ratingLabel: '4.8',
    partner: 'Partner At Lorem ipsum',
    location: 'Mumbai',
    experience: 'Experience',
    designation: 'CA',
    summary:
      'Expert guidance with over a decade of industry experience delivering measurable growth.',
    services: [
      {
        title: 'Consultation',
        icon: 'consultation',
        description:
          'Discuss your requirements and receive expert recommendations.',
      },
      {
        title: 'Advisory',
        icon: 'advisory',
        description:
          'Get monthly advisory reports aligned with your KPIs.',
      },
      {
        title: 'Support',
        icon: 'support',
        description:
          '24/7 support for on-demand strategic questions.',
      },
    ],
  },
];

// Distance filter is the same across every category (#5).
const distanceOptions = ['City', 'Provincial', 'National', 'International'];

const consultancyData = {
  legal: {
    title: 'Legal',
    description:
      'Choose an associated legal consultant from our company to help you with all your legal needs. Directly share your case details with them for a fee and make the payment via our system only. By communicating through iCollaborate, you are guaranteed quality and reliable service for the lowest price.',
    serviceTypes: [
      'Received a legal notice',
      'Send a legal notice',
      'Contractual',
      'Representation in court',
      'Hourly consultation',
      'Others',
    ],
    distanceOptions,
    professionals: sharedProfessionals,
  },
  accounting: {
    title: 'Accounting',
    description:
      'Choose an associated accounting professional from our company to handle all your bookkeeping, auditing and financial reporting needs. Share your requirements directly with them for a fee and make the payment via our system only. By communicating through iCollaborate, you are guaranteed quality and reliable service for the lowest price.',
    serviceTypes: [
      'Bookkeeping',
      'Auditing',
      'Financial reporting',
      'Investments',
      'Hourly consultation',
      'Others',
    ],
    distanceOptions,
    professionals: sharedProfessionals,
  },
  tax: {
    title: 'Tax',
    description:
      'Choose an associated tax professional from our company to manage all your taxation needs, from filing to representation. Share your case details directly with them for a fee and make the payment via our system only. By communicating through iCollaborate, you are guaranteed quality and reliable service for the lowest price.',
    serviceTypes: [
      'International income',
      'Tax filing',
      'Audit',
      'Notice received',
      'Hourly consultation',
      'Others',
    ],
    distanceOptions,
    professionals: sharedProfessionals,
  },
  multimedia: {
    title: 'Multimedia',
    description:
      'Choose an associated multimedia specialist from our company for all your creative and media production needs. Share your brief directly with them for a fee and make the payment via our system only. By communicating through iCollaborate, you are guaranteed quality and reliable service for the lowest price.',
    serviceTypes: [
      'Images',
      'Video',
      'Editing',
      'Audio',
      'Hourly consultation',
      'Others',
    ],
    distanceOptions,
    professionals: sharedProfessionals,
  },
  insurance: {
    title: 'Insurance',
    description:
      'Choose an associated insurance advisor from our company to help you with all your insurance needs, from coverage selection to claims. Share your requirements directly with them for a fee and make the payment via our system only. By communicating through iCollaborate, you are guaranteed quality and reliable service for the lowest price.',
    serviceTypes: [
      'Coverage selection',
      'Claims assistance',
      'Policy review',
      'Premium planning',
      'Hourly consultation',
      'Others',
    ],
    distanceOptions,
    professionals: sharedProfessionals,
  },
};

export default consultancyData;
