import React from 'react'
import { Divider } from 'antd'
import './AuthenticationLayout.scss'

type Props = {
    caption: string
    children?: React.ReactChild | React.ReactChild[]
}
//TODO(<HamzaIjaz>): Rename this component to authorised user layout
const AuthenticationLayout = ({ children, caption }: Props) => {
    return (
        <div className="AuthenticationLayout">
            <img
                src={`${process.env.PUBLIC_URL}/assets/logo/logo.png`}
                alt="Touch Logo"
                className="AuthenticationLayout-logo"
            />
            <div className="AuthenticationLayout-form">
                <div className="AuthenticationLayout-caption">{caption}</div>
                <div className="AuthenticationLayout-dividerSection">
                    <Divider className="AuthenticationLayout-divider" />
                    <div />
                    <Divider className="AuthenticationLayout-divider" />
                </div>
                {children}
            </div>
            <div className="AuthenticationLayout-graphics" />
        </div>
    )
}

export default AuthenticationLayout
