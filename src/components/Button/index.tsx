import React from 'react';

import { Button as AntdButton } from 'antd';

import './index.scss';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  size?: string; // sm, md, lg
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Button = ({
  children,
  onClick,
  className,
  size = 'md',
  disabled = false,
  loading = false,
  style,
  ...rest
}: Props) => {
  return (
    <AntdButton
      className={className}
      htmlType="submit"
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      style={style}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
