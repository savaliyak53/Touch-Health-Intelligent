import React, { useState } from 'react'

import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './SiteHeader.scss'
type Props = {
    defaultHeader: boolean
    hamburger: boolean
}
const SiteHeader = ({ defaultHeader, hamburger }: Props) => {
    const [BurgerMenu, setBurgerMenu] = useState(false)
    return (
        <>
            {/* Navigation */}
            <header className={defaultHeader ? 'Navigation' : 'Navigation bg'}>
                <a href="#">
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/mobileassets/${
                            defaultHeader ? 'logo-black.svg' : 'logo-white.svg'
                        }`}
                        alt="Touch Logo"
                        className="Layout-logo"
                    />
                </a>
                <div
                    className="Toggler-btn"
                    onClick={() => setBurgerMenu(!BurgerMenu)}
                >
                    <Button className={hamburger ? 'd-block' : 'd-none'}>
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/mobileassets/hamburger.svg`}
                            alt="Touch Logo"
                            className="Hamburger-icon"
                        />
                    </Button>
                </div>
            </header>
            {/* Burger/Toggle Menu */}
            <div className={BurgerMenu ? 'Burger-menu display' : 'Burger-menu'}>
                <div className="Cross-btn">
                    <Button onClick={() => setBurgerMenu(!BurgerMenu)}>
                        <CloseOutlined />
                    </Button>
                </div>
                <ul>
                    <li>
                        <a href="/dashboard">Home</a>
                    </li>
                    <li>
                        <a href="#">Insights</a>
                    </li>
                    <li>
                        <a href="/preferences">Preferences</a>
                    </li>
                    <li>
                        <a href="#">Conditions</a>
                    </li>
                    <li>
                        <a href="#">Concerns</a>
                    </li>
                    <li>
                        <a>–</a>
                    </li>
                    <li>
                        <Button>Sign out</Button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SiteHeader
