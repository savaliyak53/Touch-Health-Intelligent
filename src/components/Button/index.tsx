import React from 'react';

import {
    Button as AntdButton,
} from 'antd';

import './index.scss';

interface Props {
    children: React.ReactNode;
    onClick: () => void;
    size?: string, // sm, md, lg
    disabled?: boolean;
    loading?: boolean;
}

const Button = ({
    children,
    onClick,
    size = 'md',
    disabled = false,
    loading = false,
    ...rest
}: Props
) => {

    return (
        <>
            <AntdButton
                className={`button-${size}`}
                htmlType="submit"
                onClick={onClick}
                disabled={disabled}
                loading={loading}
                {...rest}
            >
                {children}
            </AntdButton>
        </>
    )
};

export default Button;
