import React, {useContext, useState} from 'react';
import {Button} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import styles from './SiteHeader.module.scss';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import AuthContext, {AuthContextData} from 'contexts/AuthContext';
import {FieldTimeOutlined} from '@ant-design/icons';
import {trialExceptionRoutes} from 'Routes/Constants';
import ArrowIcon from '../Icons/ArrowIcon';
import BurgerIcon from '../Icons/BurgerIcon';

type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  trialRemaining?: string;
  title?: string;
  whitBackArrow?: boolean;
  steps?: string;
  streak?: number;
  onBack?: () => void;
};
const SiteHeader = ({
    defaultHeader,
    hamburger,
    trialRemaining,
    title = '',
    whitBackArrow = false,
    steps = '',
    streak = 0,
    onBack
  }: Props) => {
  const isShowSubscription = process.env.REACT_APP_IS_SHOW_SUBSCRIPTION === 'TRUE';
  const [BurgerMenu, setBurgerMenu] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  if (!authContext) return null;
  const {logoutUser} = authContext;
  const showTrialBanner =
    !Object.values(trialExceptionRoutes).includes(location.pathname) &&
    trialRemaining && isShowSubscription;

  const isShowStreak = ():boolean => {
    return !!(streak && streak > 0);

  }

  return (
    <>
      {defaultHeader && (
        <header className="absolute top-0 w-full h-[90px] flex flex-col justify-end">
          <span className="text-xs text-left flex flex-row items-end font-normal leading-none text-primary-watermelons-dark font-roboto">
            {whitBackArrow && onBack && (
              <span onClick={onBack} className="mr-4 cursor-pointer flex items-end justify-start">
                <ArrowIcon className="inline mr-2"/><span className='text-[14px]'>Back</span>
              </span>
            )}
            {showTrialBanner && (
              <span className="font-normal text-xs text-primary-watermelons-dark font-roboto">
                <FieldTimeOutlined/> You have <b>{trialRemaining} </b>left in
                your trial
              </span>
            )}
          </span>
          <div className="flex justify-between mt-2">
            <div
              className="flex items-center font-tilt-warp text-primary-delft-dark font-normal text-[22px] leading-[36px]">
              {title}{' '}
              {steps && <span className={'ml-2 text-primary-watermelons-dark font-roboto text-xs font-normal leading-none'}>
                {steps}
              </span>}
              {isShowStreak() && <span className={'ml-2 text-primary-delft-dark w-14 opacity-90 h-8 bg-white rounded-[100px] font-roboto text-xs font-medium leading-none flex justify-center items-center'}>
                  <span className='mr-1 text-lg'>🚀</span>{streak}
                </span>}
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
                <BurgerIcon/>
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
            <div className={styles['Cross-btn']}>
              <Button
                onClick={() => setBurgerMenu(!BurgerMenu)}
                className={styles['cross-ant-btn']}
              >
                <CloseOutlined/>
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
                {process.env.REACT_APP_IS_BETA !== 'TRUE' && isShowSubscription && (
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
