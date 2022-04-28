import React, { FC, forwardRef } from 'react'

import './index.scss'

interface InputProps {
    id?: string
    name: string
    placeholder?: string
    type?: string
    maxLength?: number
    className?: string
}

const InputField: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    ({ name, placeholder, type, className, ...rest }, ref) => {
        return (
            <input
                type={type}
                name={name}
                className={className}
                placeholder={placeholder}
                ref={ref}
                {...rest}
            />
        )
    }
)

InputField.displayName = 'InputField'

export default InputField
