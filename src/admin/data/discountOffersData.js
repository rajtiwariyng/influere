import photopeaIcon from "../../assets/photopea.svg";
import paintshopIcon from "../../assets/paintshop.svg";
import canvaIcon from "../../assets/canva.svg";
import pixlrIcon from "../../assets/pixlr.svg";
import bajajIcon from "../../assets/bajaj.svg";
import suryodayIcon from "../../assets/suryoday.svg";

export const offerCategories = [
  { id: "apps", label: "Apps", count: 4 },
  { id: "software", label: "Software", count: 3 },
  { id: "conference", label: "Conference", count: 4 },
];

export const discountOffers = [
  {
    id: "photopea",
    name: "Photopea",
    description: "Photo Editor, Graphic Designing",
    icon: photopeaIcon,
    cta: "Get Now",
    url: "#",
    category: "apps",
  },
  {
    id: "paintshop",
    name: "PaintShop",
    description: "Raster And Vector Graphics Editor",
    icon: paintshopIcon,
    cta: "Get Now",
    url: "#",
    category: "apps",
  },
  {
    id: "canva",
    name: "Canva",
    description: "Graphic Designing",
    icon: canvaIcon,
    cta: "Get Now",
    url: "#",
    category: "apps",
  },
  {
    id: "pixlr",
    name: "Pixlr",
    description: "Online Photo Editing & Design Tools",
    icon: pixlrIcon,
    cta: "Get Now",
    url: "#",
    category: "apps",
  },
  {
    id: "conference-pass",
    name: "CreatorCon Pass",
    description: "3-Day Creator Conference Access",
    icon: canvaIcon,
    cta: "Book Seat",
    url: "#",
    category: "conference",
  },
  {
    id: "software-suite",
    name: "Design Suite",
    description: "Complete tools for designers",
    icon: paintshopIcon,
    cta: "Get License",
    url: "#",
    category: "software",
  },
];

export const insuranceFilters = [
  {
    id: "deductible",
    label: "Deductible",
    placeholder: "Deductible",
    options: ["₹1 Lakh", "₹1.5 Lakh"],
  },
  {
    id: "coverage",
    label: "Identity Coves",
    placeholder: "Identity Coves",
    options: ["₹1 Crore", "₹2 Crore"],
  },
  {
    id: "netCoverage",
    label: "Net Coverage",
    placeholder: "Net Coverage",
    options: ["1 Lakh", "5 Lakh", "50 Lakh", "1 Cr", "> 1 Cr"],
  },
  {
    id: "coverageTime",
    label: "Coverage Time",
    placeholder: "Coverage Time",
    options: ["1 Year", "2 Years"],
  },
];

export const insuranceOffers = [
  {
    id: "bajaj-finance",
    name: "Bajaj Finance Ltd",
    icon: bajajIcon,
    deductible: "₹1 Lakh",
    coverage: "₹1 Crore",
    premium: "₹24,000 / Year",
    features: [
      "₹10 lakhs per year, increasing every year regardless of claims, with no maximum limit",
      "All day care treatments are valid. Get covered even with just 2 hours of hospitalization—no need to meet the 24-hour minimum requirement.",
      "₹10 lakh unlimited times a year for related and unrelated illness",
    ],
  },
  {
    id: "suryoday-bank",
    name: "Suryoday Bank",
    icon: suryodayIcon,
    deductible: "₹1.5 Lakh",
    coverage: "₹2 Crore",
    premium: "₹48,000 / Year",
    features: [
      "Flexible coverage options with add-on wellness benefits",
      "Covers professional liability for influencers and creators",
    ],
  },
];
