import React from 'react';
import { Timepicker } from 'react-timepicker';
import 'react-timepicker/timepicker.css';

export default function Time({ onTimeChange, militaryTime, radius }: any) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Timepicker
        onChange={onTimeChange}
        militaryTime={militaryTime}
        radius={radius}
      />
    </div>
  );
}
