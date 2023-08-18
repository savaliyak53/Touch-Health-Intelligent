import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import styles from './SiteHeader.module.scss';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import AuthContext, { AuthContextData } from '../../contexts/AuthContext';
import { FieldTimeOutlined } from '@ant-design/icons';
import { trialExceptionRoutes } from '../../Routes/Constants';
import ArrowIcon from '../Icons/ArrowIcon';

type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  trialRemaining?: string;
  title?: string;
};
const SiteHeader = ({
  defaultHeader,
  hamburger,
  trialRemaining,
  title = '',
}: Props) => {
  const [BurgerMenu, setBurgerMenu] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  if (!authContext) return null;
  const { logoutUser } = authContext;
  const showTrialBanner =
    !Object.values(trialExceptionRoutes).includes(location.pathname) &&
    trialRemaining;

  return (
    <>
      {defaultHeader && (
        <header className="absolute top-0 w-full h-[90px] flex flex-col justify-end">
          <span className="text-xs text-left font-normal leading-none ml-[21px] text-primary-watermelons-dark font-roboto">
            <span className="mr-4">
              <ArrowIcon className="inline mr-2" /> Back
            </span>
            {showTrialBanner && (
              <span className="font-normal text-xs text-primary-watermelons-dark font-roboto">
                <FieldTimeOutlined /> You have <b>{trialRemaining} </b>left in
                your trial
              </span>
            )}
          </span>
          <div className="flex justify-between mt-2 mx-[21px]">
            <div className="font-tilt-warp text-primary-delft-dark font-normal text-[22px] leading-[36px]">
              {title}
            </div>
            <div
              className={styles['Toggler-btn']}
              onClick={() => setBurgerMenu(!BurgerMenu)}
            >
              <Button
                className={`${
                  hamburger ? styles['d-block'] : styles['d-none']
                }`}
              >
                <MenuOutlined className={styles['menu']} />
                {/* <img
                  src={`${process.env.PUBLIC_URL}/assets/mobileassets/nav.svg`}
                  alt='Touch Logo'
                /> */}
              </Button>
            </div>
          </div>
        </header>
      )}
      {defaultHeader && (
        <>
          <div
            className={
              `  ${
                BurgerMenu
                  ? styles['Burger-menu-wrapper']
                  : styles['display-none']
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
              <div className={`text-left ${styles['menu-routes']}`}>
                <li>
                  <Link to="/dashboard">Home</Link>
                </li>
                <li>
                  <Link to="/preferences">Preferences</Link>
                </li>
                <li>
                  <Link to="/integrations">Integrations</Link>
                </li>
                {process.env.REACT_APP_IS_BETA !== 'TRUE' && (
                  <li>
                    <Link to="/subscription">Subscription</Link>
                  </li>
                )}
                <li>
                  <Link to="/help-and-support">Help and Support</Link>
                </li>
              </div>
              <li
                className={styles['Signout']}
                onClick={() => {
                  logoutUser();
                  (window as any).Intercom('shutdown');
                  navigate('/login');
                }}
              >
                <Button className={styles['logout-button']}>Sign out</Button>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default SiteHeader;
