import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import WelcomeScreen from './pages/WelcomeScreen';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import WithdrawConfirm from './pages/WithdrawConfirm';
import ProfileServices from './pages/ProfileServices';
import ProfileSell from './pages/ProfileSell';
import ProfileBuy from './pages/ProfileBuy';
import ProfileFake from './pages/ProfileFake';
import DiscountOffers from './pages/DiscountOffers';
import TransactionHistory from './pages/TransactionHistory';
import SettingsPage from './pages/SettingsPage';
import ConsultancyCategoryPage from './pages/ConsultancyCategoryPage';
import Insurance from './pages/Insurance';
import CollaborationSetup from './pages/CollaborationSetup';
import CollaborationPage from './pages/CollaborationPage';
import CollaborationShortlisted from './pages/CollaborationShortlisted';
import './design-system/variables.css';
import './design-system/base.css';
import './design-system/components.css';
import './styles/pages.css';
import logo from '../assets/logo.svg';
import ConsultancyCategoryShortlisted from './pages/ConsultancyCategoryShortlisted';

// Default navigation configuration
const defaultNavigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'grid',
    path: '/dashboard',
    exact: true,
  },
  {
    id: 'profile-services',
    label: 'Profile Services',
    icon: 'person',
    path: '/dashboard/profile-services',
    children: [
      {
        id: 'fake-profile',
        label: 'Fake Profile',
        path: '/dashboard/profile-services/fake-profile',
      },
      {
        id: 'profile-buy-sell',
        label: 'Sell Profile',
        path: '/dashboard/profile-services/buy-sell',
      },
      {
        id: 'profile-buy-profile',
        label: 'Buy Profile',
        path: '/dashboard/profile-services/buy-profile',
      },
      {
        id: 'discount-offers',
        label: 'Discount & Offers',
        path: '/dashboard/profile-services/discount-offers',
      },
    ],
  },
  {
    id: 'professional-consultancy',
    label: 'Professional Consultancy',
    icon: 'people',
    path: '/dashboard/professional-consultancy',
    children: [
      {
        id: 'consultancy-legal',
        label: 'Legal',
        path: '/dashboard/professional-consultancy/legal',
        navigateWithChildren: true,
        children: [
          {
            id: 'collaboration-shortlisted',
            label: 'Shortlisted',
            path: '/dashboard/professional-consultancy/legal/shortlisted',
            children: [
              {
                id: 'shortlisted-incoming',
                label: 'Incoming',
                path: '/dashboard/professional-consultancy/legal/shortlisted?tab=incoming',
              },
              {
                id: 'shortlisted-outgoing',
                label: 'Outgoing',
                path: '/dashboard/professional-consultancy/legal/shortlisted?tab=outgoing',
          },
        ],
      },
    ],
      },
      {
        id: 'consultancy-accounting',
        label: 'Accounting',
        path: '/dashboard/professional-consultancy/accounting',
        navigateWithChildren: true,
        children: [
          {
            id: 'collaboration-shortlisted',
            label: 'Shortlisted',
            path: '/dashboard/professional-consultancy/accounting/shortlisted',
            children: [
              {
                id: 'shortlisted-incoming',
                label: 'Incoming',
                path: '/dashboard/professional-consultancy/accounting/shortlisted?tab=incoming',
              },
              {
                id: 'shortlisted-outgoing',
                label: 'Outgoing',
                path: '/dashboard/professional-consultancy/accounting/shortlisted?tab=outgoing',
          },
        ],
      },
    ],
      },
      {
        id: 'consultancy-tax',
        label: 'Tax',
        path: '/dashboard/professional-consultancy/tax',
        navigateWithChildren: true,
        children: [
          {
            id: 'collaboration-shortlisted',
            label: 'Shortlisted',
            path: '/dashboard/professional-consultancy/tax/shortlisted',
            children: [
              {
                id: 'shortlisted-incoming',
                label: 'Incoming',
                path: '/dashboard/professional-consultancy/tax/shortlisted?tab=incoming',
              },
              {
                id: 'shortlisted-outgoing',
                label: 'Outgoing',
                path: '/dashboard/professional-consultancy/tax/shortlisted?tab=outgoing',
          },
        ],
      },
    ],
      },
      {
        id: 'consultancy-multimedia',
        label: 'Multimedia',
        path: '/dashboard/professional-consultancy/multimedia',
        navigateWithChildren: true,
        children: [
          {
            id: 'collaboration-shortlisted',
            label: 'Shortlisted',
            path: '/dashboard/professional-consultancy/multimedia/shortlisted',
            children: [
              {
                id: 'shortlisted-incoming',
                label: 'Incoming',
                path: '/dashboard/professional-consultancy/multimedia/shortlisted?tab=incoming',
              },
              {
                id: 'shortlisted-outgoing',
                label: 'Outgoing',
                path: '/dashboard/professional-consultancy/multimedia/shortlisted?tab=outgoing',
          },
        ],
      },
    ],
      },
      {
        id: 'consultancy-insurance',
        label: 'Insurance',
        path: '/dashboard/professional-consultancy/insurance',
        navigateWithChildren: true,
        children: [
          {
            id: 'collaboration-shortlisted',
            label: 'Shortlisted',
            path: '/dashboard/professional-consultancy/insurance/shortlisted',
            children: [
              {
                id: 'shortlisted-incoming',
                label: 'Incoming',
                path: '/dashboard/professional-consultancy/insurance/shortlisted?tab=incoming',
              },
              {
                id: 'shortlisted-outgoing',
                label: 'Outgoing',
                path: '/dashboard/professional-consultancy/insurance/shortlisted?tab=outgoing',
          },
        ],
      },
    ],
      },
    ],
  },
  {
    id: 'professional-consultancy-premium',
    label: 'Professional Consultancy',
    icon: 'people',
    path: '/dashboard/consultancy',
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    icon: 'file-earmark-text',
    path: '/dashboard/collaboration',
    children: [
      {
        id: 'collaboration-setup',
        label: 'Setup',
        path: '/dashboard/collaboration/setup',
      },
      {
            id: 'collaboration-list-facebook',
            label: 'Facebook',
            path: '/dashboard/collaboration/facebook/list',
        navigateWithChildren: true,
            children: [
              {
                id: 'collaboration-shortlisted',
                label: 'Shortlisted',
                path: '/dashboard/collaboration/facebook/shortlisted',
                children: [
                  {
                    id: 'shortlisted-incoming',
                    label: 'Incoming',
                    path: '/dashboard/collaboration/facebook/shortlisted?tab=incoming',
                  },
                  {
                    id: 'shortlisted-outgoing',
                    label: 'Outgoing',
                    path: '/dashboard/collaboration/facebook/shortlisted?tab=outgoing',
              },
            ],
          },
        ],
      },
      {
            id: 'collaboration-list-twitter',
            label: 'Twitter',
            path: '/dashboard/collaboration/twitter/list',
        navigateWithChildren: true,
            children: [
              {
                id: 'collaboration-shortlisted',
                label: 'Shortlisted',
                path: '/dashboard/collaboration/twitter/shortlisted',
                children: [
                  {
                    id: 'shortlisted-incoming',
                    label: 'Incoming',
                    path: '/dashboard/collaboration/twitter/shortlisted?tab=incoming',
                  },
                  {
                    id: 'shortlisted-outgoing-twitter',
                    label: 'Outgoing',
                    path: '/dashboard/collaboration/twitter/shortlisted?tab=outgoing',
              },
            ],
          },
        ],
      },
      {
            id: 'collaboration-list-linkedin',
            label: 'LinkedIn',
            path: '/dashboard/collaboration/linkedIn/list',
        navigateWithChildren: true,
            children: [
              {
                id: 'collaboration-shortlisted',
                label: 'Shortlisted',
                path: '/dashboard/collaboration/linkedIn/shortlisted',
                children: [
                  {
                    id: 'shortlisted-incoming',
                    label: 'Incoming',
                    path: '/dashboard/collaboration/linkedIn/shortlisted?tab=incoming',
                  },
                  {
                    id: 'shortlisted-outgoing',
                    label: 'Outgoing',
                    path: '/dashboard/collaboration/linkedIn/shortlisted?tab=outgoing',
              },
            ],
          },
        ],
      },
      {
            id: 'collaboration-list-instagram',
            label: 'Instagram',
            path: '/dashboard/collaboration/instagram/list',
        navigateWithChildren: true,
            children: [
              {
                id: 'collaboration-shortlisted',
                label: 'Shortlisted',
                path: '/dashboard/collaboration/instagram/shortlisted',
                children: [
                  {
                    id: 'shortlisted-incoming',
                    label: 'Incoming',
                    path: '/dashboard/collaboration/instagram/shortlisted?tab=incoming',
                  },
                  {
                    id: 'shortlisted-outgoing',
                    label: 'Outgoing',
                    path: '/dashboard/collaboration/instagram/shortlisted?tab=outgoing',
              },
            ],
          },
        ],
      },
      {
        id: 'collaboration-list-youtube',
        label: 'Youtube',
        path: '/dashboard/collaboration/youtube/list',
    navigateWithChildren: true,
        children: [
          {
            id: 'collaboration-shortlisted',
            label: 'Shortlisted',
            path: '/dashboard/collaboration/youtube/shortlisted',
            children: [
              {
                id: 'shortlisted-incoming',
                label: 'Incoming',
                path: '/dashboard/collaboration/youtube/shortlisted?tab=incoming',
              },
              {
                id: 'shortlisted-outgoing',
                label: 'Outgoing',
                path: '/dashboard/collaboration/youtube/shortlisted?tab=outgoing',
          },
        ],
      },
    ],
  },
  {
    id: 'collaboration-list-tiktok',
    label: 'Tiktok',
    path: '/dashboard/collaboration/tiktok/list',
navigateWithChildren: true,
    children: [
      {
        id: 'collaboration-shortlisted',
        label: 'Shortlisted',
        path: '/dashboard/collaboration/shortlisted',
        children: [
          {
            id: 'shortlisted-incoming',
            label: 'Incoming',
            path: '/dashboard/collaboration/shortlisted?tab=incoming',
          },
          {
            id: 'shortlisted-outgoing',
            label: 'Outgoing',
            path: '/dashboard/collaboration/shortlisted?tab=outgoing',
      },
    ],
  },
],
},
    ],
  },
  {
    id: 'collaboration-premium',
    label: 'Collaboration',
    icon: 'file-earmark-text',
    path: '/dashboard/collaboration-premium',
  },
];

const AdminApp = ({ 
  navigationItems = defaultNavigationItems,
  logo: logoProp = logo,
  companyName = "INFLUERE",
  tagline = "Collaborate With Professionals",
  userName = "Sonam",
  userAvatar = null
}) => {
  return (
    <div className="admin-app">
      <Routes>
        {/* Admin Layout Routes */}
        <Route path="/" element={
          <AdminLayout 
            navigationItems={navigationItems}
            logo={logoProp}
            companyName={companyName}
            tagline={tagline}
            userName={userName}
            userAvatar={userAvatar}
          />
        }>
          <Route index element={<Dashboard />} />
          <Route path="profile-services" element={<Navigate to="/dashboard/profile-services/fake-profile" replace />} />
          <Route path="profile-services/fake-profile" element={<ProfileFake />} />
          <Route path="profile-services/buy-sell" element={<ProfileSell />} />
          <Route path="profile-services/buy-profile" element={<ProfileBuy />} />
          <Route path="profile-services/discount-offers" element={<DiscountOffers />} />
          <Route path="my-profile/transaction-history" element={<TransactionHistory />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="professional-consultancy" element={<ConsultancyCategoryPage />} />
          <Route path="professional-consultancy/:categoryId" element={<ConsultancyCategoryPage />} />
          {/* <Route path="professional-consultancy/insurance" element={<Insurance />} /> */}
          <Route path="consultancy" element={<ProfileServices />} />
          <Route path="collaboration" element={<Navigate to="/dashboard/collaboration/setup" replace />} />
          <Route path="collaboration/setup" element={<CollaborationSetup />} />

          <Route path="collaboration/list" element={<CollaborationPage />} />
          <Route path="collaboration/facebook/list" element={<CollaborationPage />} />
          <Route path="collaboration/twitter/list" element={<CollaborationPage />} />
          <Route path="collaboration/youtube/list" element={<CollaborationPage />} />
          <Route path="collaboration/linkedIn/list" element={<CollaborationPage />} />
          <Route path="collaboration/tiktok/list" element={<CollaborationPage />} />
          <Route path="collaboration/instagram/list" element={<CollaborationPage />} />

          <Route path="collaboration/shortlisted" element={<CollaborationShortlisted />} />
          <Route path="collaboration/facebook/shortlisted" element={<CollaborationShortlisted category="facebook"/>} />
          <Route path="collaboration/twitter/shortlisted" element={<CollaborationShortlisted category="twitter"/>} />
          <Route path="collaboration/linkedIn/shortlisted" element={<CollaborationShortlisted category="linkedIn"/>} />
          <Route path="collaboration/instagram/shortlisted" element={<CollaborationShortlisted category="instagram"/>} />
          <Route path="collaboration/youtube/shortlisted" element={<CollaborationShortlisted category="youtube"/>} />
          <Route path="collaboration/tiktok/shortlisted" element={<CollaborationShortlisted category="tiktok"/>} />

          <Route path="professional-consultancy/shortlisted" element={<ConsultancyCategoryShortlisted />} />
          <Route path="professional-consultancy/legal/shortlisted" element={<ConsultancyCategoryShortlisted category={"legal"} />} />
          <Route path="professional-consultancy/accounting/shortlisted" element={<ConsultancyCategoryShortlisted category={"accounting"}/>} />
          <Route path="professional-consultancy/tax/shortlisted" element={<ConsultancyCategoryShortlisted category={"tax"}/>} />
          <Route path="professional-consultancy/multimedia/shortlisted" element={<ConsultancyCategoryShortlisted category={"multimedia"}/>} />
          <Route path="professional-consultancy/insurance/shortlisted" element={<ConsultancyCategoryShortlisted category={"insurance"}/>} />

          <Route path="collaboration-premium" element={<ProfileServices />} />
        </Route>
        
        {/* Wallet Route (separate from dashboard) */}
        <Route path="wallet" element={
          <AdminLayout 
            navigationItems={navigationItems}
            logo={logoProp}
            companyName={companyName}
            tagline={tagline}
            userName={userName}
            userAvatar={userAvatar}
          />
        }>
          <Route index element={<Wallet />} />
          <Route path="withdraw-confirm" element={<WithdrawConfirm />} />
        </Route>

        {/* Welcome Screen Route */}
        <Route path="welcome" element={
          <AdminLayout 
            navigationItems={navigationItems}
            logo={logoProp}
            companyName={companyName}
            tagline={tagline}
            userName={userName}
            userAvatar={userAvatar}
          />
        }>
          <Route index element={<WelcomeScreen userName={userName} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AdminApp;
