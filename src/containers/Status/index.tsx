import React, { useState } from 'react';

const DashboardNew = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mb-8">
        <div className="flex justify-center items-center">
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/cur8-status-widget.svg`}
            className=""
            alt="image"
          />
        </div>
        <div className="bg-[#EAEDF9] text-[10px] font-normal leading-[14px] py-[5px] px-3 mt-[-36px] rounded-[30px]">
          <span className="text-primary-delft-dark">2136/5000</span>
        </div>
        <div className="text-center max-w-[328px] mx-auto mt-3 mb-4">
          <h2 className="text-primary-delft-dark subtitle7 leading-[18px] font-['tilt_warp']">
            We’ve locked onto 1 new prediction
          </h2>
          <p className="text-xs leading-[14px] font-normal mt-2 text-[#362A2F]">
            Keep adding data for at least <b>7 more days</b> to get predictive
            insights about your health and lifestyle.
          </p>
        </div>
        <button className="bg-primary-delft-dark max-w-[156px] w-full rounded-[30px] text-sm leading-[14px] font-medium text-[#F6F3F0] py-[13px] mx-auto">
          Earn data points
        </button>
      </div>
      {/* Days Scroll */}
      <div className="flex overflow-auto px-4 no-scrollbar">
        {/* Day */}
        <div className="bg-primary-delft-dark p-4 rounded-[10px] shadow-[0_4px_0_0_#8AA4EC;] w-[350px] min-w-[350px] mb-1 mr-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-white">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/cur8-day-icon.png`}
                  className="max-w-[16px] max-h-[16px]"
                  alt="image"
                />
              </div>
              <span className="text-[10px] font-medium leading-[14px] text-[#FDFCFB] opacity-50 ml-2">
                Sleep
              </span>
            </div>

            <button className="w-5 h-3 flex items-center">
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full mx-0.5"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
            </button>
          </div>

          <h2 className="subtitle8 leading-9 font-normal font-['tilt_warp'] mb-2 text-white">
            Today
          </h2>

          <div className="flex justify-between">
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Bedtime
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                11:15 pm
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Wake up
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                6:00 am
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Hours of sleep
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                7
              </span>
            </div>
          </div>
        </div>
        {/* Day */}
        <div className="bg-primary-delft-dark p-4 rounded-[10px] shadow-[0_4px_0_0_#8AA4EC;] w-[350px] min-w-[350px] mb-1 mr-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-white">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/cur8-day-icon.png`}
                  className="max-w-[16px] max-h-[16px]"
                  alt="image"
                />
              </div>
              <span className="text-[10px] font-medium leading-[14px] text-[#FDFCFB] opacity-50 ml-2">
                Sleep
              </span>
            </div>

            <button className="w-5 h-3 flex items-center">
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full mx-0.5"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
            </button>
          </div>

          <h2 className="subtitle8 leading-9 font-normal font-['tilt_warp'] mb-2 text-white">
            Today
          </h2>

          <div className="flex justify-between">
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Bedtime
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                11:15 pm
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Wake up
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                6:00 am
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Hours of sleep
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                7
              </span>
            </div>
          </div>
        </div>
        {/* Day */}
        <div className="bg-primary-delft-dark p-4 rounded-[10px] shadow-[0_4px_0_0_#8AA4EC;] w-[350px] min-w-[350px] mb-1 mr-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-white">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/cur8-day-icon.png`}
                  className="max-w-[16px] max-h-[16px]"
                  alt="image"
                />
              </div>
              <span className="text-[10px] font-medium leading-[14px] text-[#FDFCFB] opacity-50 ml-2">
                Sleep
              </span>
            </div>

            <button className="w-5 h-3 flex items-center">
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full mx-0.5"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
            </button>
          </div>

          <h2 className="subtitle8 leading-9 font-normal font-['tilt_warp'] mb-2 text-white">
            Today
          </h2>

          <div className="flex justify-between">
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Bedtime
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                11:15 pm
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Wake up
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                6:00 am
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Hours of sleep
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                7
              </span>
            </div>
          </div>
        </div>
        {/* Day */}
        <div className="bg-primary-delft-dark p-4 rounded-[10px] shadow-[0_4px_0_0_#8AA4EC;] w-[350px] min-w-[350px] mb-1 mr-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-white">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/cur8-day-icon.png`}
                  className="max-w-[16px] max-h-[16px]"
                  alt="image"
                />
              </div>
              <span className="text-[10px] font-medium leading-[14px] text-[#FDFCFB] opacity-50 ml-2">
                Sleep
              </span>
            </div>

            <button className="w-5 h-3 flex items-center">
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full mx-0.5"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
            </button>
          </div>

          <h2 className="subtitle8 leading-9 font-normal font-['tilt_warp'] mb-2 text-white">
            Today
          </h2>

          <div className="flex justify-between">
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Bedtime
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                11:15 pm
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Wake up
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                6:00 am
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Hours of sleep
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                7
              </span>
            </div>
          </div>
        </div>
        {/* Day */}
        <div className="bg-primary-delft-dark p-4 rounded-[10px] shadow-[0_4px_0_0_#8AA4EC;] w-[350px] min-w-[350px] mb-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-white">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/cur8-day-icon.png`}
                  className="max-w-[16px] max-h-[16px]"
                  alt="image"
                />
              </div>
              <span className="text-[10px] font-medium leading-[14px] text-[#FDFCFB] opacity-50 ml-2">
                Sleep
              </span>
            </div>

            <button className="w-5 h-3 flex items-center">
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full mx-0.5"></span>
              <span className="w-[5px] h-[5px] bg-[#fff] block rounded-full"></span>
            </button>
          </div>

          <h2 className="subtitle8 leading-9 font-normal font-['tilt_warp'] mb-2 text-white">
            Today
          </h2>

          <div className="flex justify-between">
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Bedtime
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                11:15 pm
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Wake up
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                6:00 am
              </span>
            </div>
            <div className="flex flex-col mr-4">
              <span className="text-xs leading-3 font-normal text-[#FEFBF1] mb-2">
                Hours of sleep
              </span>
              <span className="text-[22px] leading-[14px] font-normal text-[#EFB7A8] font-['tilt_warp']">
                7
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNew;
