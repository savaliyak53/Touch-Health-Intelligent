import React from 'react';
import { DatePicker } from 'antd';

const Date = ({ setValue, setDisableDate }: any) => {
  return (
    <DatePicker
      onChange={(date: any, dateString: any) => setValue(dateString)}
      className="Date-Select"
      disabledDate={(current) => setDisableDate(current)}
    />
  );
};

export default Date;
