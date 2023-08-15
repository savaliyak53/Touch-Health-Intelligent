import React from 'react';

const SVGERROR = ({handleMouseEnter , handleMouseLeave , style}:any) => {
  return (
    <svg
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.3"
        cx="9"
        cy="9"
        r="9"
        transform="rotate(180 9 9)"
        fill="#F26749"
      />
      <path
        d="M8.38867 11.3965L8.38867 4L10.043 4L10.043 11.3965L8.38867 11.3965ZM10.1523 13.3379C10.1523 13.5885 10.0703 13.7959 9.90625 13.96C9.73763 14.1286 9.50521 14.2129 9.20898 14.2129C8.91732 14.2129 8.68717 14.1286 8.51855 13.96C8.34993 13.7959 8.26562 13.5885 8.26562 13.3379C8.26562 13.0918 8.34993 12.8867 8.51855 12.7227C8.68717 12.5586 8.91732 12.4766 9.20898 12.4766C9.50521 12.4766 9.73763 12.5586 9.90625 12.7227C10.0703 12.8867 10.1523 13.0918 10.1523 13.3379Z"
        fill="#F26749"
      />
    </svg>
  );
};

export default SVGERROR;
