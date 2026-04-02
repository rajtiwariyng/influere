import React, { useState, useRef, useEffect } from 'react';
import './SliderDropdown.css';

const SliderDropdown = ({ 
  label, 
  placeholder, 
  min = 0, 
  max = 100, 
  step = 1,
  prefix = '',
  suffix = '',
  value: controlledValue,
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(controlledValue !== undefined ? controlledValue : min);
  const dropdownRef = useRef(null);

  const currentValue = controlledValue !== undefined ? controlledValue : (value !== undefined ? value : min);

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

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (controlledValue === undefined) {
      setValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const formatValue = (val) => {
    return `${prefix}${val.toLocaleString()}${suffix}`;
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
          <span>{currentValue !== null && currentValue !== undefined ? formatValue(currentValue) : placeholder}</span>
          <span className="consultancy-select-caret">
            <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </span>
        </button>
        
        {isOpen && (
          <div className="slider-dropdown-content">
            <div className="slider-dropdown-slider-container">
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue}
                onChange={handleSliderChange}
                className="slider-dropdown-range"
              />
              <div className="slider-dropdown-value-display">
                <span className="slider-dropdown-min">{formatValue(min)}</span>
                <span className="slider-dropdown-current">{formatValue(currentValue)}</span>
                <span className="slider-dropdown-max">{formatValue(max)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderDropdown;

