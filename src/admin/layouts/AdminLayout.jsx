import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './AdminLayout.css';
import logo from '../../assets/logo.svg';

const AdminLayout = ({ 
  navigationItems = [],
  logo: logoProp = logo,
  companyName = "INFLUERE",
  tagline = "Collaborate With Professionals",
  userName = "Sonam",
  userAvatar = null
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarWidth = sidebarCollapsed 
    ? 'var(--admin-sidebar-collapsed)' 
    : 'var(--admin-sidebar-width)';

  return (
    <div className="admin-app">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        navigationItems={navigationItems}
        logo={logoProp}
        companyName={companyName}
        tagline={tagline}
      />
      
      <div 
        className="admin-main-content"
        style={{
          marginLeft: isMobile ? '0' : sidebarWidth,
          transition: 'margin-left var(--admin-transition-base)',
        }}
      >
        <Header 
          userName={userName}
          userAvatar={userAvatar}
        />
        
        <main className="admin-content">
          <div 
            className="admin-content-body"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
