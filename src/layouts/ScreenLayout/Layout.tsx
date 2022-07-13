import React from 'react'
import SiteHeader from '../../components/SiteHeader/SiteHeader'
import './Layout.scss'

type Props = {
    defaultHeader: boolean
    hamburger: boolean
    children?: React.ReactChild | React.ReactChild[]
}
const Layout = ({ children, defaultHeader, hamburger }: Props) => {
    return (
        <div className="Layout">
            <div className="Layout-Transparent">
                <SiteHeader
                    defaultHeader={defaultHeader}
                    hamburger={hamburger}
                />
                <div
                    className={
                        defaultHeader ? 'MobileScreen' : 'MobileScreen bg'
                    }
                >
                    <div className="Layout-main">{children}</div>
                </div>
            </div>
            <div className="Layout-graphics" />
        </div>
    )
}

export default Layout
