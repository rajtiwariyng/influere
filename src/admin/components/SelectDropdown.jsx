import React, { useState, useRef, useEffect } from 'react';
import './SelectDropdown.css';

const SelectDropdown = ({ 
  label, 
  placeholder, 
  options = [], // NEW
  prefix = '',
  suffix = '',
  value: controlledValue,
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(controlledValue !== undefined ? controlledValue : null);
  const dropdownRef = useRef(null);

  const currentValue = controlledValue !== undefined ? controlledValue : value;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    if (controlledValue === undefined) {
      setValue(option);
    }
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  const formatValue = (val) => {
    return `${prefix}${val}${suffix}`;
  };

  return (
    <div className="consultancy-filter">
      <span className="consultancy-filter-label">{label}</span>
      <div className="consultancy-select slider-dropdown-wrapper" ref={dropdownRef}>
        <button
          type="button"
          className="slider-dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {currentValue !== null && currentValue !== undefined 
              ? formatValue(currentValue) 
              : placeholder}
          </span>
          <span className="consultancy-select-caret">
            <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </span>
        </button>
        
        {isOpen && (
          <div className="slider-dropdown-content">
            <div className="slider-dropdown-options">
              {options.length > 0 ? (
                options.map((option, index) => (
                  <div
                    key={index}
                    className={`slider-dropdown-option ${
                      currentValue === option ? 'active' : ''
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {formatValue(option)}
                  </div>
                ))
              ) : (
                <div className="slider-dropdown-option disabled">
                  No options available
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;