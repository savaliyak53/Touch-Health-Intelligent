import React, {useState, useEffect, FC, useContext} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getDimensions, getOverview } from 'services/dashboardservice';
import { Button } from 'antd';
import Drawer from 'components/Modal/Drawer';
import { invokeInteractionServiceByType} from 'services/authservice';
import { useNavigate } from 'react-router-dom';
import {IOverview} from '../../interfaces';
import DashboardContext from 'contexts/DashboardContext';

type Props = {
  direction: string;
  onClick: any;
};

const CustomPrevArrow = ({ direction, onClick }: Props) => {
  return (
    <>
      <button
        className="absolute bottom-0 left-[-12px] top-0 z-[1] flex w-[32px] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-100 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-100 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="prev"
        onClick={onClick}
      >
        <span className="inline-block h-8 w-8 flex items-center justify-center rounded-full bg-[#FFF] shadow-[2px_2px_0px_0px_#F1EEE9]">
          <svg
            width="12px"
            height="12px"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#204ECF"
          >
            <path
              d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5"
              stroke="#204ECF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
    </>
  );
};

const CustomNextArrow = ({ direction, onClick }: Props) => {
  return (
    <>
      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[32px] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-100 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-100 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide="next"
        onClick={onClick}
      >
        <span className="inline-block h-8 w-8 flex items-center justify-center rounded-full bg-[#FFF] shadow-[2px_2px_0_0_#83A5F2]">
          <svg
            width="12px"
            height="12px"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#204ECF"
          >
            <path
              d="M3 12h18m0 0l-8.5-8.5M21 12l-8.5 8.5"
              stroke="#204ECF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </>
  );
};

interface IProps {
  overview: IOverview | undefined;
}

const Status: FC<IProps> = ({overview}) => {
  const [error, setError] = useState<any>();
  const [dimensions, setDimensions] = useState<any>();
  const [days, setDays] = useState<any>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [drawerOpen2, setDrawerOpen2] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const dashboardContext = useContext(DashboardContext);
  const navigate = useNavigate();

  const roundOff = (str: string) => {
    const floatValue = parseFloat(str); 
    if (!isNaN(floatValue)) {
      const roundedValue = floatValue.toFixed(2); 
      const formattedString = roundedValue + "%"; 
      return formattedString;
    } else {
      return ''
    }
  }

  const getUserDimensions = () => {
      const daysArray: any = [];
      let daysObj: any;
      dashboardContext?.lifestyleDimensions?.forEach((element: any) => {
        element.name == 'Sleep'
          ? (daysObj = {
              title: element.name,
              icon: element.dimension_emoji,
              bg: '/assets/images/cur8-sleep.svg',
              btnColor: 'F0ECE7',
              subtitle1: element.data_value_list[0].name,
              value1: element.data_value_list[0].value,
              subtitle2: element.data_value_list[1].name,
              value2: element.data_value_list[1].value,
              subtitle3: element.data_value_list[2].name,
              value3: roundOff(element.data_value_list[2].value),
              subtitleColor: 'FEFBF1',
              valueColor: 'EFB7A8',
              shadow: '0px 4px 0px 0px #8AA4EC',
            })
          : element.name == 'Movement'
          ? (daysObj = {
              title: element.name,
              icon: element.dimension_emoji,
              bg: '/assets/images/cur8-movement.svg',
              btnColor: 'F0ECE7',
              subtitle1: element.data_value_list[0].name,
              value1: element.data_value_list[0].value,
              subtitle2: element.data_value_list[1].name,
              value2: element.data_value_list[1].value,
              subtitle3: element.data_value_list[2].name,
              value3: element.data_value_list[2].value,
              subtitleColor: 'FEFBF1',
              valueColor: '204ECF',
              shadow: '0px 4px 0px 0px #204ECF',
            })
          : element.name == 'Mental Wellbeing'
          ? (daysObj = {
              title: element.name,
              icon: element.dimension_emoji,
              bg: '/assets/images/cur8-mental-wellbeing.svg',
              btnColor: '204ECF',
              subtitle1: element.data_value_list[0].name,
              value1: roundOff(element.data_value_list[0].value),
              subtitle2: element.data_value_list[1].name,
              value2: roundOff(element.data_value_list[1].value),
              subtitle3: element.data_value_list[2].name,
              value3: roundOff(element.data_value_list[2].value),
              subtitleColor: '83A5F2',
              valueColor: '204ECF',
              shadow: '0px 4px 0px 0px #F9A197',
            })
          : element.name == 'Nutrition'
          ? (daysObj = {
              title: element.name,
              icon: element.dimension_emoji,
              bg: '/assets/images/cur8-nutrition.svg',
              btnColor: 'EA9836',
              subtitle1: element.data_value_list[0].name,
              value1: element.data_value_list[0].value,
              subtitle2: element.data_value_list[1].name,
              value2: roundOff(element.data_value_list[1].value),
              subtitle3: element.data_value_list[2].name,
              value3: roundOff(element.data_value_list[2].value),
              subtitleColor: 'F9A197',
              valueColor: 'EA9836',
              shadow: '0px 4px 0px 0px #EA9836',
            })
          : (daysObj = {
              title: element.name,
              icon: element.dimension_emoji,
              bg: '/assets/images/cur8-poductivity.svg',
              btnColor: '204ECF',
              subtitle1: element.data_value_list[0].name,
              value1: element.data_value_list[0].value,
              subtitle2: element.data_value_list[1].name,
              value2: element.data_value_list[1].value,
              subtitle3: element.data_value_list[2].name,
              value3: element.data_value_list[2].value,
              subtitleColor: '204ecfb3',
              valueColor: '204ECF',
              shadow: '0px 4px 0px 0px #9DD7B4',
            });
        daysArray.push(daysObj);
      });
      setDays(daysArray);
  };

  const getInteractionByType = (type: string) => {
    invokeInteractionServiceByType(type)
      .then((response: any) => {
        if (response.data) {
          navigate('/questionnaire');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  useEffect(() => {
    getUserDimensions();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-8 mt-[96px]">
        <div className="flex justify-center items-center">
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/cur8-status-widget.svg`}
            className=""
            alt="image"
          />
        </div>
        <div className="bg-[#EAEDF9] text-[10px] font-normal leading-[14px] py-[5px] px-3 mt-[-36px] rounded-[30px]">
          <span className="text-primary-delft-dark">
            {overview
              ? `${overview?.cumulative_datapoints}/${overview?.max_datapoints}`
              : ''}
          </span>
        </div>
        <div className="text-center max-w-[328px] mx-auto mt-3 mb-4">
          <h2 className="text-primary-delft-dark subtitle7 leading-[18px] font-['tilt_warp']">
            {overview?.status_title}
          </h2>
          <p className="text-xs leading-[14px] font-normal mt-2 text-[#362A2F]">
            {overview?.status_text}
          </p>
        </div>
        <button
          onClick={() => {
            setDrawerOpen2(true);
          }}
          className="bg-primary-delft-dark max-w-[156px] w-full rounded-[30px] text-sm leading-[14px] font-medium text-[#F6F3F0] py-[13px] mx-auto"
        >
          Earn data points
        </button>
      </div>
      <div className="flex overflow-visible px-0 mx-auto no-scrollbar">
        <Carousel
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <CustomPrevArrow direction="prev" onClick={onClickHandler} />
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <CustomNextArrow direction="next" onClick={onClickHandler} />
            )
          }
          className="Dashboard-Carousel dashboard-slider overflow-y-visible mb-4"
          width={370}
          emulateTouch
          showThumbs={false}
        >
          {days.map((day: any, index: number) => (
              <div
                key={index}
                className="pt-[14px] px-[18px] pb-[32px] rounded-[10px] w-[357px] min-w-[357px] mb-1 ml-auto mr-3 sm:mx-auto bg-cover"
                style={{
                  boxShadow: `${day.shadow}`,
                  backgroundImage: `url(${process.env.PUBLIC_URL}${day.bg})`,
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full">
                      <span>{day.icon}</span>
                    </div>
                    <span className="text-[12px] font-medium leading-[14px] text-dentist ml-2">
                      {day.title}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setDrawerTitle(day.title);
                      setDrawerOpen(true);
                    }}
                    className="w-5 h-3 flex items-center"
                  >
                    <span
                      className="w-[4px] h-[4px] block rounded-full"
                      style={{ backgroundColor: `#${day.btnColor}` }}
                    ></span>
                    <span
                      className="w-[4px] h-[4px] block rounded-full mx-0.5"
                      style={{ backgroundColor: `#${day.btnColor}` }}
                    ></span>
                    <span
                      className="w-[4px] h-[4px] block rounded-full"
                      style={{ backgroundColor: `#${day.btnColor}` }}
                    ></span>
                  </button>
                </div>
                <h2 className="subtitle8 leading-9 font-normal font-tilt-warp text-white text-left mt-[2px] mx-1 mb-2">
                  Today
                </h2>
                <div className="flex justify-between ml-1">
                  <div className="flex flex-col mr-4">
                    <span
                      className="text-xs leading-3 font-normal mb-2 text-left"
                      style={{ color: `#${day.subtitleColor}` }}
                    >
                      {day.subtitle1}
                    </span>
                    <span
                      className="text-[22px] leading-[14px] font-normal font-tilt-warp text-left"
                      style={{ color: `#${day.valueColor}` }}
                    >
                      {day.value1}
                    </span>
                  </div>
                  <div className="flex flex-col mr-4">
                    <span
                      className="text-xs leading-3 font-normal mb-2 text-left"
                      style={{ color: `#${day.subtitleColor}` }}
                    >
                      {day.subtitle2}
                    </span>
                    <span
                      className="text-[22px] leading-[14px] font-normal font-tilt-warp text-left"
                      style={{ color: `#${day.valueColor}` }}
                    >
                      {day.value2}
                    </span>
                  </div>
                  <div className="flex flex-col mr-4">
                    <span
                      className="text-xs leading-3 font-normal mb-2 text-left"
                      style={{ color: `#${day.subtitleColor}` }}
                    >
                      {day.subtitle3}
                    </span>
                    <span
                      className="text-[22px] leading-[14px] font-normal font-tilt-warp text-left"
                      style={{ color: `#${day.valueColor}` }}
                    >
                      {day.value3}
                    </span>
                  </div>
                </div>
              </div>
          ))}
        </Carousel>
      </div>
      <Drawer
        title={drawerTitle}
        open={drawerOpen}
        handleCancel={() => setDrawerOpen(false)}
        renderOptions={
          <>
            <Button className={'Button-Drawer'}>
              Add data about {drawerTitle}
            </Button>
          </>
        }
      />
      <Drawer
        title="Earn data points"
        open={drawerOpen2}
        handleCancel={() => setDrawerOpen2(false)}
        renderOptions={
          <>
            <Button
              className={'Button-Drawer'}
              onClick={() => {
                navigate('/c/checkup');
              }}
            >
              Daily Questions
            </Button>
            <Button
              className={'Button-Drawer'}
              onClick={() => getInteractionByType('update_conditions')}
            >
              Update my conditions
            </Button>
            {/* <Button
              className={'Button-Drawer-Secondary'}
              onClick={() => getInteractionByType('explore_data')}
            >
              Explore my data
            </Button> */}
          </>
        }
      />
    </>
  );
};

export default Status;
