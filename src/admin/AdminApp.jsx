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
      },
      {
        id: 'consultancy-accounting',
        label: 'Accounting',
        path: '/dashboard/professional-consultancy/accounting',
      },
      {
        id: 'consultancy-tax',
        label: 'Tax',
        path: '/dashboard/professional-consultancy/tax',
      },
      {
        id: 'consultancy-multimedia',
        label: 'Multimedia',
        path: '/dashboard/professional-consultancy/multimedia',
      },
      {
        id: 'consultancy-insurance',
        label: 'Insurance',
        path: '/dashboard/professional-consultancy/insurance',
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
            id: 'collaboration-list',
            label: 'Facebook',
            path: '/dashboard/collaboration/list',
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
          <Route path="professional-consultancy/insurance" element={<Insurance />} />
          <Route path="consultancy" element={<ProfileServices />} />
          <Route path="collaboration" element={<Navigate to="/dashboard/collaboration/setup" replace />} />
          <Route path="collaboration/setup" element={<CollaborationSetup />} />
          <Route path="collaboration/list" element={<CollaborationPage />} />
          <Route path="collaboration/shortlisted" element={<CollaborationShortlisted />} />
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
