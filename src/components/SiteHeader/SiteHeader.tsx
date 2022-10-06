import React, { useState } from 'react';

import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './SiteHeader.scss';
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
      <header className={defaultHeader ? 'Navigation' : 'Navigation bg'}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/mobileassets/${
            defaultHeader ? 'logo-black.svg' : 'logo-white.svg'
          }`}
          alt="Touch Logo"
          className="Layout-logo"
        />
        <div className="Toggler-btn" onClick={() => setBurgerMenu(!BurgerMenu)}>
          <Button className={hamburger ? 'd-block' : 'd-none'}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/mobileassets/hamburger.svg`}
              alt="Touch Logo"
              className="Hamburger-icon"
            />
          </Button>
        </div>
      </header>
      <div
        className={
          BurgerMenu ? 'Burger-menu-wrapper ' : 'Burger-menu-wrapper display'
        }
        onClick={() => setBurgerMenu(!BurgerMenu)}
      ></div>
      {/* Burger/Toggle Menu */}
      <div className={BurgerMenu ? 'Burger-menu display' : 'Burger-menu'}>
        <div className="Cross-btn">
          <Button onClick={() => setBurgerMenu(!BurgerMenu)}>
            <CloseOutlined />
          </Button>
        </div>
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link
              to="/insights"
              onClick={() => localStorage.setItem('selectedInsight', '0-0')}
            >
              Insights
            </Link>
          </li>
          <li>
            <Link
              to="/insights/guideline"
              onClick={() => localStorage.setItem('selectedInsight', '0-0')}
            >
              Guideline
            </Link>
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
          <li>
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
