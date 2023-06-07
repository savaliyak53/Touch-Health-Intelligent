import React, { useContext, useState } from 'react';

import { Button } from 'antd';
import { CloseOutlined , MenuOutlined} from '@ant-design/icons';
// import './SiteHeader.scss';
import styles from './SiteHeader.module.scss';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import AuthContext , { AuthContextData }  from '../../contexts/AuthContext';
import {FieldTimeOutlined} from '@ant-design/icons';
import { trialExceptionRoutes } from '../../Routes/Constants';
type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  trialRemaining?: string;
};
const SiteHeader = ({ defaultHeader, hamburger, trialRemaining }: Props) => {
  const [BurgerMenu, setBurgerMenu] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext<AuthContextData | undefined>(AuthContext); 
  if (!authContext) return null;
  const { logoutUser } = authContext;
  const showTrialBanner = !Object.values(trialExceptionRoutes).includes(location.pathname) && trialRemaining;
  return (
    <>
      {/* Navigation */}
      <header
        className={`${
          defaultHeader
            ? styles['Navigation']
            : `${styles['Navigation']} ${styles['bg']}`
        }`}
      >
        {/* <header className={defaultHeader ? 'Navigation' : 'Navigation bg'}> */}
        <img
          src={`${process.env.PUBLIC_URL}/assets/mobileassets/logo.svg`}
          alt="Touch Logo"
          width={35}
        />
        {showTrialBanner && (
          <div className={styles['description']}>
            <FieldTimeOutlined /> You have <b>{trialRemaining} </b>left in your
            trial
          </div>
        )}
        <div
          className={styles['Toggler-btn']}
          onClick={() => setBurgerMenu(!BurgerMenu)}
        >
          <Button
            className={`${hamburger ? styles['d-block'] : styles['d-none']}`}
          >
            <MenuOutlined className={styles["menu"]}/>
            {/* <img
              src={`${process.env.PUBLIC_URL}/assets/mobileassets/nav.svg`}
              alt="Touch Logo"
            /> */}
          </Button>
        </div>
      </header>
      <div
        className={
          `  ${
            BurgerMenu ? styles['Burger-menu-wrapper'] : styles['display-none']
          } `
          // BurgerMenu ? 'Burger-menu-wrapper ' : 'display'
        }
        onClick={() => setBurgerMenu(!BurgerMenu)}
      ></div>
      {/* Burger/Toggle Menu */}
      <div
        className={` ${
          BurgerMenu
            ? `${styles['Burger-menu']} ${styles['menu-display']}`
            : styles['Burger-menu']
        } `}
      >
        {/* <div className={BurgerMenu ? 'Burger-menu display' : 'Burger-menu'}> */}
        <div className={styles['Cross-btn']}>
          <Button
            onClick={() => setBurgerMenu(!BurgerMenu)}
            className={styles['cross-ant-btn']}
          >
            <CloseOutlined />
          </Button>
        </div>
        <ul>
          <div className={styles['menu-routes']}>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/preferences">Preferences</Link>
            </li>
            <li>
              <Link to="/integrations">Integrations</Link>
            </li>
            {process.env.REACT_APP_IS_BETA !== 'TRUE' &&
            <li>
              <Link to="/subscription">Subscription</Link>
            </li>}
            <li>
              <Link to="/help-and-support">Help and Support</Link>
            </li>
          </div>
          <li className={styles['Signout']}
              onClick={() => {
                  logoutUser();
                // localStorage.removeItem('userId');
                // localStorage.removeItem('token');
                // localStorage.clear();
                (window as any).Intercom('shutdown');
                navigate('/login');
              }}
          >
          <Button
            className={styles["logout-button"]}
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
