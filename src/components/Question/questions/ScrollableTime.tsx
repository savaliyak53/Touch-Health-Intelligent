import React, { useState, useEffect, useCallback } from 'react';
import { TimePicker } from 'react-ios-time-picker';

interface ScrollableTimeProps {
  onTimeChange: (timeValue: string) => void;
}

const ScrollableTime: React.FC<ScrollableTimeProps> = ({ onTimeChange }) => {
  const [value, setValue] = useState('12:00 AM');
  const [isPickerOpen, setPickerOpen] = useState(false);

  const handleTouchMove = useCallback((e: Event) => {
    if (isPickerOpen) {
      e.preventDefault();
    }
  }, [isPickerOpen]);

  useEffect(() => {
    document.body.style.overflow = isPickerOpen ? 'hidden' : '';
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPickerOpen, handleTouchMove]);

  const onChange = (timeValue: any) => {
    const { value } = timeValue;
    setValue(value);
  };

  const handleTimePickerOpen = () => {
    setPickerOpen(true);
  };

  const handleTimePickerClose = () => {
    setPickerOpen(false);
  };

  return (
    <div className="scrollable-time-container">
      <TimePicker
        onChange={onChange}
        onSave={onTimeChange}
        value={value}
        use12Hours
        isOpen={isPickerOpen}
        cellHeight={50}
        onOpen={handleTimePickerOpen}
        onClose={handleTimePickerClose}
      />
    </div>
  );
};

export default ScrollableTime;
