import React, { CSSProperties, FC, forwardRef } from 'react'

import './index.scss'

interface InputProps {
    id?: string
    name: string
    placeholder?: string
    type?: string
    maxLength?: number
    className?: string
    style?: CSSProperties
    value?: string
    defaultValue?: any
}

const InputField: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            name,
            placeholder,
            type,
            className,
            style,
            defaultValue,
            value,
            ...rest
        },
        ref
    ) => {
        return (
            <input
                type={type}
                name={name}
                className={className}
                placeholder={placeholder}
                ref={ref}
                value={value}
                style={style}
                {...rest}
                defaultValue={defaultValue}
            />
        )
    }
)

InputField.displayName = 'InputField'

export default InputField
