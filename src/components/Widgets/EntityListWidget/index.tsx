import React, {FC, useEffect, useState, useContext} from 'react';
// import { getEmoji, getNextDays } from '../../../helpers/entityWidgetHelper';
import {Spin} from 'antd';
import {getDayOfWeekByDate, checkDateDifference, getDayOfWeekFromToday} from 'helpers/time';
import {useNavigate} from 'react-router';
import { invokeInteractionServiceByType } from 'services/authservice';
import DashboardContext from 'contexts/DashboardContext';
interface IProps {
  type: 'conditions' | 'influencers';
}

interface IPrediction {
  date: string,
  score: number,
  emoji: string
}

interface ITest {
  name: string;
  id: string;
  influencer_id: string;
  parent_dimension_id: string;
  prediction_ordered_list: IPrediction[];
}

// const days = getNextDays();

const EntityListWidget: FC<IProps> = ({type}) => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dashboardContext = useContext(DashboardContext);
  const navigate = useNavigate();

  const getInteractionByType = (type: string) => {
    invokeInteractionServiceByType({type})
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
    setLoading(true);
    if (type === 'conditions') {
      if(!dashboardContext?.conditionInfluencers){
        setData([])
      } else {
        setData(dashboardContext?.conditionInfluencers)
      }
      setLoading(false);
    } else {
      if(!dashboardContext?.lifestyleInfluencers){
        setData([])
      } else {
        setData(dashboardContext?.lifestyleInfluencers)
      }
      setLoading(false);
    }
  }, [dashboardContext]);


  const handlerOnClick = (item: ITest) => {
    navigate(`/prediction?type=${type}&influencer_id=${item.influencer_id}&dimension_id=${item.parent_dimension_id}`);
  }

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <div
      className={`bg-dentist w-full border border-solid border-nimbus rounded-lg mt-4 ${type === 'conditions' ? 'mb-5' : 'mb-10'} pt-3 flex-col shadow-primary`}>
      {/*Header*/}
      <div
        className="mb-2 px-4 text-roboto text-left text-primary-delft-light text-[10px] opacity-90 font-medium leading-[14px] uppercase">
        {type}
      </div>
      {loading &&
		  <div className="mt-5 mb-5 pb-8 pt-8 px-12 text-center">
			  <Spin spinning={loading}/>
		  </div>
      }
      {/*content*/}
      {data && data.length > 0 && !loading && (
        <ul role="list">
          {data.map((item :any, index) => (
            <li onClick={() => handlerOnClick(item)} key={item.id} className="cursor-pointer hover:bg-rae">
              <hr className="border-rae mx-4"/>
              <div className="flex px-4 justify-between gap-x-6 py-2">
                <div className="flex w-full items-center">
                  <div className={`${index === 0 && "relative top-[12px]"} flex-1 text-left font-roboto font-medium leading-[14px] text-[14px] w-[90px]`}>
                    {item.name}
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    {item['prediction_ordered_list'] &&
                      item['prediction_ordered_list'].slice(0, 3).map((prediction: any, i: any) => (
                        <div
                          key={prediction.date}
                          className="flex flex-col items-center"
                        >
                          {index === 0 && (
                            <p className="text-[12px] text-center font-medium w-8 leading-[14px] mb-2">
                              {i === 0 ? 'Today' : getDayOfWeekFromToday(prediction.dt, i)}
                            </p>
                          )}
                          {checkDateDifference(prediction.dt, i) ? (
                            <>
                            <p className="mb-1 w-8 items-center text-center flex justify-center">
                            <span
                              className={`${
                                prediction.score ? '' : 'text-primary-delft-dark'
                              } w-6 h-6 rounded-[50%] bg-rae flex items-center justify-center text-[14px]`}
                            >

                              {prediction.emoji ? prediction.emoji : '❔'}
                            </span>
                            </p>
                            <p
                              className="font-medium text-[12px] w-8 text-center text-piano-light leading-[14px] text-gray-500">
                                { prediction.value ? prediction.value : '-'}
                            </p>
                          </>
                          ) : <span>--</span>}

                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {data?.length === 0 && !loading &&
		  <div className="h-12 text-center font-medium leading-[14px] pt-4 text-piano-light">
			  No data to show</div>}
      {/*Footer*/}
      {!loading && (
        <>
          {type === 'conditions' && (
            <>
              <hr className="border-rae mx-4"/>
              <div className="py-3 text-center">
                <span
                  onClick={() => getInteractionByType('update_conditions')}
                  className="cursor-pointer text-primary-delft-dark text-[10px] font-medium leading-[14px]">
                  ADD A CONDITION
                </span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EntityListWidget;
