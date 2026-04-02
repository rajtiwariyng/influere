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

const consultancyData = {
  legal: {
    title: 'Legal',
    filters: [
      {
        id: 'service-type',
        label: 'Service type',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Inquiring about content',
          'Legal notice received',
          'Legal notice to serve',
          'Contract drafting',
          'Representation',
        ],
      },
      {
        id: 'rate-per-hour',
        label: 'Rate/hr',
        placeholder: 'Select rate',
        type: 'slider',
        min: 0,
        max: 10000,
        step: 100,
        prefix: '$',
        suffix: '/hr',
      },
      {
        id: 'distance',
        label: 'Distance',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Within 50kms of your location',
          'Within your state / province',
          'Nationwide',
          'International',
        ],
      },
      {
        id: 'experience',
        label: 'Experience',
        placeholder: 'Select experience',
        type: 'slider',
        min: 0,
        max: 50,
        step: 1,
        suffix: ' years',
      },
      {
        id: 'availability',
        label: 'Availability',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Immediate',
          'Within a week',
          'Within a month',
        ],
      },
    ],
    professionals: sharedProfessionals,
  },
  accounting: {
    title: 'Accounting',
    filters: [
      {
        id: 'service-type',
        label: 'Service type',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          "Book's",
          'Investments',
          'Others',
        ],
      },
      {
        id: 'rate-per-hour',
        label: 'Rate/hr',
        placeholder: 'Select rate',
        type: 'slider',
        min: 0,
        max: 10000,
        step: 100,
        prefix: '$',
        suffix: '/hr',
      },
      {
        id: 'distance',
        label: 'Distance',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Within 50kms of your location',
          'Within your state / province',
          'Nationwide',
          'International',
        ],
      },
      {
        id: 'experience',
        label: 'Experience',
        placeholder: 'Select experience',
        type: 'slider',
        min: 0,
        max: 50,
        step: 1,
        suffix: ' years',
      },
      {
        id: 'availability',
        label: 'Availability',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Immediate',
          'Within a week',
          'Within a month',
        ],
      },
    ],
    professionals: sharedProfessionals,
  },
  tax: {
    title: 'Tax',
    filters: [
      {
        id: 'service-type',
        label: 'Service type',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'International Income',
          'Filing',
          'Audit',
          'Notice Received',
          'Others',
        ],
      },
      {
        id: 'rate-per-hour',
        label: 'Rate/hr',
        placeholder: 'Select rate',
        type: 'slider',
        min: 0,
        max: 10000,
        step: 100,
        prefix: '$',
        suffix: '/hr',
      },
      {
        id: 'distance',
        label: 'Distance',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Within 50kms of your location',
          'Within your state / province',
          'Nationwide',
          'International',
        ],
      },
      {
        id: 'experience',
        label: 'Experience',
        placeholder: 'Select experience',
        type: 'slider',
        min: 0,
        max: 50,
        step: 1,
        suffix: ' years',
      },
      {
        id: 'availability',
        label: 'Availability',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Immediate',
          'Within a week',
          'Within a month',
        ],
      },
    ],
    professionals: sharedProfessionals,
  },
  multimedia: {
    title: 'Multimedia',
    filters: [
      {
        id: 'service-type',
        label: 'Service type',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Images',
          'Video',
          'Editing',
          'Audio',
          'Other',
        ],
      },
      {
        id: 'rate-per-hour',
        label: 'Rate/hr',
        placeholder: 'Select rate',
        type: 'slider',
        min: 0,
        max: 10000,
        step: 100,
        prefix: '$',
        suffix: '/hr',
      },
      {
        id: 'distance',
        label: 'Distance',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Within 50kms of your location',
          'Within your state / province',
          'Nationwide',
          'International',
        ],
      },
      {
        id: 'experience',
        label: 'Experience',
        placeholder: 'Select experience',
        type: 'slider',
        min: 0,
        max: 50,
        step: 1,
        suffix: ' years',
      },
      {
        id: 'availability',
        label: 'Availability',
        placeholder: 'Select',
        type: 'dropdown',
        options: [
          'Immediate',
          'Within a week',
          'Within a month',
        ],
      },
    ],
    professionals: sharedProfessionals,
  },
};

export default consultancyData;
