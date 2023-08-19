import React from 'react';

type SplashScreenTypes = {
  setVisited: React.Dispatch<React.SetStateAction<boolean>>;
};

const SplashScreen = ({ setVisited }: SplashScreenTypes) => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-cover xs:bg-auth_bg_mobile sm:bg-auth_bg_desktop bg-no-repeat bg-center">
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo/auth/cur8-health-mobile-logo.svg`}
          alt="App Logo"
          className="m-auto"
        />
        <div className="font-['tilt_warp'] text-[32px] py-8 leading-9 text-center text-white">
          Take control of your <br /> health, and its future
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo/auth/touch-powered-logo.svg`}
          alt="Powered by Touch"
          className="m-auto h-7"
        />
        <div className="sm:relative sm:bottom-0 xs:absolute xs:bottom-4 left-1/2 -translate-x-1/2">
          <button
            onClick={() => setVisited(true)}
            className="font-['tilt_warp'] mt-[65px] text-[16px] bg-[#080815] text-white py-[20px] px-[116px] rounded-[100px] w-max"
          >
            Let&apos;s get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
