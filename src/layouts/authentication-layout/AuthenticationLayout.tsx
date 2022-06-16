import React from 'react'
import { Divider } from 'antd'

// import MobileDetector from '../../../utils/mobileDetector';

import './AuthenticationLayout.scss'

type Props = {
    caption: string
    children?: React.ReactChild | React.ReactChild[]
}

const AuthenticationLayout = ({ children, caption }: Props) => {
    // const isMobile = MobileDetector.mobile();
    // if (isMobile) {
    //   return <div className="AuthenticationMobileLayout">
    //     <img
    //       src={`${process.env.PUBLIC_URL}/assets/logo/touch-insights-logo.png`}
    //       alt="Touch Logo"
    //       className="AuthenticationMobileLayout-logo"
    //     />
    //     <div className="AuthenticationMobileLayout-form">
    //       <div className="AuthenticationMobileLayout-caption">{caption}</div>
    //       <div className="AuthenticationMobileLayout-dividerSection">
    //         <Divider className="AuthenticationMobileLayout-divider"/>
    //         <div/>
    //         <Divider className="AuthenticationMobileLayout-divider"/>
    //       </div>
    //       {children}
    //     </div>
    //   </div>;
    // }
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
