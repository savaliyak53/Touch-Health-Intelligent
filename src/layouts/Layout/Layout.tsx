import React from 'react';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import './Layout.scss';

type Props = {
  defaultHeader: boolean;
  hamburger: boolean;
  dashboard?: boolean;
  signupLogin?: string;
  children?: React.ReactChild | React.ReactChild[];
};
const Layout = ({ children, defaultHeader, hamburger, dashboard, signupLogin }: Props) => {
  return (
    <div className={`Layout ${signupLogin}`}>
      <div
        className={
          dashboard ? 'Layout-Transparent header-transp' : 'Layout-Transparent'
        }
      >
        <SiteHeader defaultHeader={defaultHeader} hamburger={hamburger} />
        <div className={defaultHeader ? 'MobileScreen' : 'MobileScreen bg'}>
          <div className="Layout-main">{children}</div>
        </div>
      </div>
      <div className="Layout-graphics" />
    </div>
  );
};

export default Layout;
