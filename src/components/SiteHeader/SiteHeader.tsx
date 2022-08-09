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
        <a href="#">
          <img
            src={`${process.env.PUBLIC_URL}/assets/mobileassets/${
              defaultHeader ? 'logo-black.svg' : 'logo-white.svg'
            }`}
            alt="Touch Logo"
            className="Layout-logo"
          />
        </a>
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
              Insights Guideline
            </Link>
          </li>
          <li>
            <Link to="/post-preferences">Preferences</Link>
          </li>
          <li>
            <Link to="/conditions">Conditions</Link>
          </li>
          <li>
            <Link to="/concerns">Concerns</Link>
          </li>
          <li>
            <Link to="/subscription">Subscription</Link>
          </li>
          <li>
            <Button
              onClick={() => {
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                navigate('/login');
              }}
            >
              Sign out
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SiteHeader;
