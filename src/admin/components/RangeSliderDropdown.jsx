import React, { useState, useRef, useEffect, useMemo } from 'react';
import './SliderDropdown.css';
import '../pages/ProfileSell.css';

const RangeSliderDropdown = ({ 
  label, 
  placeholder, 
  min = 0, 
  max = 10000, 
  step = 100,
  prefix = '',
  suffix = '',
  minValue: controlledMinValue,
  maxValue: controlledMaxValue,
  onMinChange,
  onMaxChange,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minValue, setMinValue] = useState(controlledMinValue !== undefined ? controlledMinValue : min);
  const [maxValue, setMaxValue] = useState(controlledMaxValue !== undefined ? controlledMaxValue : max);
  const dropdownRef = useRef(null);

  const currentMinValue = controlledMinValue !== undefined ? controlledMinValue : minValue;
  const currentMaxValue = controlledMaxValue !== undefined ? controlledMaxValue : maxValue;

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

  const minSliderProgress = useMemo(() => {
    return ((currentMinValue - min) / (max - min)) * 100;
  }, [currentMinValue, min, max]);

  const maxSliderProgress = useMemo(() => {
    return ((currentMaxValue - min) / (max - min)) * 100;
  }, [currentMaxValue, min, max]);

  const handleMinSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue <= currentMaxValue) {
      if (controlledMinValue === undefined) {
        setMinValue(newValue);
      }
      if (onMinChange) {
        onMinChange(newValue);
      }
      if (onChange) {
        onChange({ min: newValue, max: currentMaxValue });
      }
    }
  };

  const handleMaxSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue >= currentMinValue) {
      if (controlledMaxValue === undefined) {
        setMaxValue(newValue);
      }
      if (onMaxChange) {
        onMaxChange(newValue);
      }
      if (onChange) {
        onChange({ min: currentMinValue, max: newValue });
      }
    }
  };

  const formatValue = (val) => {
    return `${prefix}${val.toLocaleString()}${suffix}`;
  };

  const displayText = currentMinValue === min && currentMaxValue === max 
    ? placeholder 
    : `${formatValue(currentMinValue)} - ${formatValue(currentMaxValue)}`;

  return (
    <div className="consultancy-filter">
      <span className="consultancy-filter-label">{label}</span>
      <div className="consultancy-select slider-dropdown-wrapper" ref={dropdownRef}>
        <button
          type="button"
          className="slider-dropdown-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{displayText}</span>
          <span className="consultancy-select-caret">
            <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </span>
        </button>
        
        {isOpen && (
          <div className="slider-dropdown-content">
            <div className="slider-dropdown-slider-container" style={{ position: 'relative', paddingTop: '24px', paddingBottom: '12px' }}>
              {/* Track background */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '4px',
                background: '#e5e7eb',
                borderRadius: '2px',
                transform: 'translateY(-50%)',
                zIndex: 1
              }}></div>
              
              {/* Active range */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: `${minSliderProgress}%`,
                width: `${maxSliderProgress - minSliderProgress}%`,
                height: '4px',
                background: 'var(--admin-primary-500)',
                borderRadius: '2px',
                transform: 'translateY(-50%)',
                zIndex: 2
              }}></div>

              {/* Min slider */}
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentMinValue}
                onChange={handleMinSliderChange}
                className="sell-range-input"
                style={{
                  position: 'absolute',
                  width: '100%',
                  zIndex: currentMinValue > currentMaxValue - (max - min) * 0.05 ? 4 : 3,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'auto'
                }}
              />

              {/* Max slider */}
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentMaxValue}
                onChange={handleMaxSliderChange}
                className="sell-range-input"
                style={{
                  position: 'absolute',
                  width: '100%',
                  zIndex: currentMaxValue < currentMinValue + (max - min) * 0.05 ? 4 : 3,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'auto'
                }}
              />

              {/* Value labels */}
              <div className="sell-range-value" style={{ left: `${minSliderProgress}%`, top: '-16px', zIndex: 5 }}>
                {formatValue(currentMinValue)}
              </div>
              <div className="sell-range-value" style={{ left: `${maxSliderProgress}%`, top: '-16px', zIndex: 5 }}>
                {formatValue(currentMaxValue)}
              </div>

              {/* Min/Max labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', fontSize: '12px', color: '#666' }}>
                <span>{formatValue(min)}</span>
                <span>{formatValue(max)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RangeSliderDropdown;

