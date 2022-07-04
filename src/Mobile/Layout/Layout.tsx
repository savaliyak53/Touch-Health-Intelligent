import React from 'react'
import { Button } from 'antd'
import './Layout.scss'

type Props = {
    defaultHeader: boolean
    hamburger: boolean
    children?: React.ReactChild | React.ReactChild[]
}
const Layout = ({ children, defaultHeader, hamburger }: Props) => {
    return (
        <div className='Layout'>
            <div className='Layout-Transparent'>
                    <header className={defaultHeader ? 'Navigation' : 'Navigation bg'}>
                        <a href="#">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/mobileassets/${defaultHeader ? 'logo-black.svg' : 'logo-white.svg'}`}
                                alt='Touch Logo'
                                className='Layout-logo'
                            />
                        </a>
                        <div className='Toggler-btn'>
                            <Button className={hamburger ? 'd-block' : 'd-none'}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/mobileassets/hamburger.svg`}
                                    alt='Touch Logo'
                                    className='Hamburger-icon'
                                />
                            </Button>
                        </div>
                    </header>
                <div className={defaultHeader ? 'MobileScreen' : 'MobileScreen bg'}>
                    <div className="Layout-main">
                        {children}
                    </div>
                </div>
            </div>
            <div className="Layout-graphics" />
        </div>
    )
}

export default Layout