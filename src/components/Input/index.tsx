import React, { CSSProperties, FC, forwardRef } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import './index.scss'
interface InputProps {
    id?: string
    name?: string
    placeholder?: string
    type?: string
    maxLength?: number
    className?: string
    style?: CSSProperties
    isEye?: boolean
    value?: string
    togglePassword?: any
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
            isEye,
            togglePassword,
            ...rest
        },
        ref
    ) => {
        return (
            <div className="input-element-wrapper">
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
                {/* {isEye ? (
                    <button
                        className="btn"
                        onClick={togglePassword}
                        type="button"
                    >
                        <AiOutlineEye />
                    </button>
                ) : null} */}
            </div>
        )
    }
)
InputField.displayName = 'InputField'
export default InputField
