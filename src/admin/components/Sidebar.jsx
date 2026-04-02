import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/logo.svg';
import PremiumModal from './PremiumModal';

const Sidebar = ({ 
  collapsed = false, 
  onToggle, 
  navigationItems = [],
  logo: logoProp = logo,
  companyName = "INFLUERE",
  tagline = "Collaborate With Professionals"
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const recentlyToggledRef = useRef(new Set());
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const location = useLocation();

  // Define premium feature IDs
  const premiumFeatures = ['professional-consultancy-premium', 'collaboration-premium'];

  const toggleExpanded = (itemId) => {
    // Mark this item as recently toggled to prevent useEffect from overriding it
    recentlyToggledRef.current.add(itemId);
    
    // Clear the flag after a delay to allow manual toggle to take effect
    setTimeout(() => {
      recentlyToggledRef.current.delete(itemId);
    }, 500);
    
    setExpandedItems(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        newExpanded.add(itemId);
      }
      return newExpanded;
    });
  };

  const isItemActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    
    // Check if path matches (including query params)
    const itemPath = item.path.split('?')[0];
    const currentPath = location.pathname;
    
    // If item path has query params, check them too
    if (item.path.includes('?')) {
      const itemQuery = item.path.split('?')[1];
      const currentQuery = location.search;
      return currentPath === itemPath && currentQuery.includes(itemQuery);
    }
    
    return currentPath.startsWith(itemPath);
  };

  const hasActiveChild = (item) => {
    if (!item.children) return false;
    
    // Recursively check all children and nested children
    const checkChildren = (children) => {
      return children.some(child => {
        const isChildActive = isItemActive(child);
        if (isChildActive) return true;
        
        // Recursively check nested children
        if (child.children && child.children.length > 0) {
          return checkChildren(child.children);
        }
        
        return false;
      });
    };
    
    return checkChildren(item.children);
  };

  const renderNavItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = isItemActive(item);
    const hasActiveChildItem = hasActiveChild(item);
    const isPremium = premiumFeatures.includes(item.id);
    // Use 'end' prop for items with exact match or items with children
    const shouldUseEnd = item.exact || hasChildren;

    const handleClick = (e) => {
      if (isPremium) {
        e.preventDefault();
        e.stopPropagation();
        setShowPremiumModal(true);
        return;
      }
      // If item has children and doesn't allow navigation with children, toggle expand/collapse
      if (hasChildren && !item.navigateWithChildren) {
        e.preventDefault(); // Prevent navigation to allow toggle
        e.stopPropagation(); // Stop event bubbling
        toggleExpanded(item.id); // Always toggle the expanded state
      }
      // If item allows navigation with children, close dropdown first, then navigate
      // The useEffect will handle auto-expanding based on active route
      if (hasChildren && item.navigateWithChildren) {
        // Close the dropdown by removing it from expanded items
        setExpandedItems(prev => {
          const newExpanded = new Set(prev);
          newExpanded.delete(item.id);
          return newExpanded;
        });
        // The useEffect will re-expand it if the route is active
      }
    };

    // For premium items, render as a button instead of NavLink
    if (isPremium) {
      return (
        <div key={item.id} className="admin-nav-item">
          <button
            className="admin-nav-link admin-nav-link-premium"
            onClick={handleClick}
          >
            <div className="admin-nav-link-content">
              <span className="admin-nav-icon">
                <i className={`bi bi-${item.icon}`}></i>
              </span>
              {!collapsed && (
                <>
                  <span className="admin-nav-label">{item.label}</span>
                  <span className="premium-badge">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                </>
              )}
            </div>
          </button>
        </div>
      );
    }

    return (
      <div key={item.id} className="admin-nav-item">
        <NavLink
          to={item.path}
          end={shouldUseEnd}
          className={({ isActive: navIsActive }) => {
            // For items with query params, use our custom isActive check
            const customIsActive = item.path.includes('?') ? isActive : navIsActive;
            return `admin-nav-link ${(customIsActive || isActive) && !hasActiveChildItem ? 'active' : ''} ${
              hasActiveChildItem ? 'has-active-child' : ''
            }`;
          }}
          onClick={handleClick}
        >
          <div className="admin-nav-link-content">
            <span className="admin-nav-icon">
              <i className={`bi bi-${item.icon}`}></i>
            </span>
            {!collapsed && (
              <>
                <span className="admin-nav-label">{item.label}</span>
                {hasChildren && (
                  <span className={`admin-nav-arrow ${isExpanded ? 'expanded' : ''}`}>
                    <i className="bi bi-chevron-up"></i>
                  </span>
                )}
              </>
            )}
          </div>
        </NavLink>

        {hasChildren && !collapsed && isExpanded && (
          <div className="admin-nav-children">
            {item.children.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    // Helper function to check if an item is active (used within useEffect)
    const checkItemActive = (item) => {
      if (item.exact) {
        return location.pathname === item.path;
      }
      
      const itemPath = item.path.split('?')[0];
      const currentPath = location.pathname;
      
      if (item.path.includes('?')) {
        const itemQuery = item.path.split('?')[1];
        const currentQuery = location.search;
        return currentPath === itemPath && currentQuery.includes(itemQuery);
      }
      
      return currentPath.startsWith(itemPath);
    };
    
    // Helper to check if item or any of its descendants is active
    const hasActiveDescendant = (item) => {
      // Check if item itself is active
      if (checkItemActive(item)) return true;
      
      // Check if any child or nested descendant is active
      if (item.children && item.children.length > 0) {
        return item.children.some(child => hasActiveDescendant(child));
      }
      
      return false;
    };
    
    // Recursively check and expand items that have active children
    const checkAndExpand = (items, expanded) => {
      items.forEach(item => {
        if (item.children && item.children.length > 0) {
          // Check if any descendant is active
          const hasActive = hasActiveDescendant(item);
          
          // Auto-expand items with active children (unless recently manually toggled)
          // Don't override items that were just manually toggled
          if (hasActive && !recentlyToggledRef.current.has(item.id)) {
            expanded.add(item.id);
          }
          
          // Recursively check nested children
          checkAndExpand(item.children, expanded);
        }
      });
    };
    
    setExpandedItems(prev => {
      const next = new Set(prev);
      
      // Auto-expand items with active children (to show current route)
      checkAndExpand(navigationItems, next);

      // If nothing changed, return previous state to avoid re-renders
      if (next.size === prev.size && [...next].every(id => prev.has(id))) {
        return prev;
      }
      return next;
    });
  }, [location.pathname, location.search, navigationItems]);

  return (
    <>
      <aside 
        className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}
        style={{ 
          width: collapsed ? 'var(--admin-sidebar-collapsed)' : 'var(--admin-sidebar-width)' 
        }}
      >
        {/* Sidebar Header */}
        <div className="admin-sidebar-header">
          {!collapsed && (
            <div className="admin-logo">
              <img 
                src={logoProp} 
                alt={companyName}
                className="admin-logo-img"
              />
            </div>
          )}
          {collapsed && (
            <div className="admin-logo-collapsed">
              <img 
                src={logoProp} 
                alt={companyName}
                className="admin-logo-img"
              />
            </div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="admin-sidebar-nav">
          {navigationItems.map(item => renderNavItem(item))}
        </nav>

      </aside>

      {/* Premium Modal */}
      <PremiumModal 
        show={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)} 
      />
    </>
  );
};

export default Sidebar;
