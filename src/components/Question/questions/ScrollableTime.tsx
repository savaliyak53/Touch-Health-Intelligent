import React, { useState } from 'react';
import { TimePicker } from 'react-ios-time-picker';

const ScrollableTime = ({ onTimeChange }: any) => {
  const [value, setValue] = useState('12:00 AM');
  const onChange = (timeValue: any) => {
    setValue(timeValue);
  };

  return (
    <div className="scrollable-time-container">
      <TimePicker
        onChange={onChange}
        onSave={onTimeChange}
        value={value}
        use12Hours
        isOpen={true}
        cellHeight={50}
      />
    </div>
  );
};

export default ScrollableTime;
