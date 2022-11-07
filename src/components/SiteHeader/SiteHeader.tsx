import React, { useState } from 'react';

import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './SiteHeader.scss';
import styles from './SiteHeader.module.scss';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
};
const SiteHeader = ({ defaultHeader, hamburger }: Props) => {
  const [BurgerMenu, setBurgerMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* Navigation */}
      <header className={`${defaultHeader ? styles['Navigation'] : styles['Navigation bg']}`}>
      {/* <header className={defaultHeader ? 'Navigation' : 'Navigation bg'}> */}
        <img
          src={`${process.env.PUBLIC_URL}/assets/mobileassets/logo.svg`}
          alt="Touch Logo"
          width={35}
        />
        <div className={styles["Toggler-btn"]} onClick={() => setBurgerMenu(!BurgerMenu)}>
          <Button className={hamburger ? 'd-block' : 'd-none'}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/mobileassets/nav.svg`}
              alt="Touch Logo"
            />
          </Button>
        </div>
      </header>
      <div
        className={
        `  ${BurgerMenu ? styles['Burger-menu-wrapper'] : styles['display']} `
        // BurgerMenu ? 'Burger-menu-wrapper ' : 'display'
        }
        onClick={() => setBurgerMenu(!BurgerMenu)}
      >asdads</div>
      {/* Burger/Toggle Menu */}
      <div className={ ` ${BurgerMenu ? `${styles['Burger-menu']} ${styles['display']}` : styles['display']} `}>
      {/* <div className={BurgerMenu ? 'Burger-menu display' : 'Burger-menu'}> */}
        <div className="Cross-btn">5
          <Button onClick={() => setBurgerMenu(!BurgerMenu)}>
            <CloseOutlined />
          </Button>
        </div>
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/preferences">Preferences</Link>
          </li>
          <li>
            <Link to="/post-conditions">Conditions</Link>
          </li>
          {/* <li>
            <Link to="/post-concerns">Concerns</Link>
          </li> */}
          <li>
            <Link to="/subscription">Subscription</Link>
          </li>
          <li>
            <Link to="/help-and-support">Help and Support</Link>
          </li>
          <li className='Signout'>
            <a
              onClick={() => {
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                (window as any).Intercom('shutdown');
                navigate('/login');
              }}
            >
              {' '}
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SiteHeader;
