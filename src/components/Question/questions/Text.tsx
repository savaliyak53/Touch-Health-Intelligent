import React from 'react';
import TextArea from 'antd/lib/input/TextArea';

export default function Text({ setValue, rows, maxLength }: any) {
  return (
    <TextArea
      className="TextArea"
      rows={rows}
      placeholder="Enter answer here…"
      maxLength={maxLength}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
