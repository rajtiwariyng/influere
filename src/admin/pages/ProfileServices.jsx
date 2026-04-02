import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';

const ProfileServices = () => {
  usePageTitle('Profile Services');
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Profile Services</h1>
        <p className="admin-page-subtitle">Manage profile services and settings</p>
      </div>
      
      <div className="admin-page-content">
        <div className="card admin-card">
          <div className="card-body">
            <h5 className="card-title">Profile Services Management</h5>
            <p className="card-text">This is where you would manage profile services.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileServices;
