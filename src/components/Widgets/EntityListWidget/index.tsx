import React, {FC, useEffect, useState} from 'react';
// import { getEmoji, getNextDays } from '../../../helpers/entityWidgetHelper';
import {getConditions, getInfluencers} from 'services/widgets';
import {Spin} from 'antd';
import {getDayOfWeekByDate} from 'helpers/time';
import {useNavigate} from 'react-router';
import { invokeInteractionServiceByType } from 'services/authservice';

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
  prediction_ordered_list: IPrediction[];
}

// const days = getNextDays();

const EntityListWidget: FC<IProps> = ({type}) => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<ITest[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
    setLoading(true);
    if (type === 'conditions') {
      getConditions()
        .then((resp) => {
          if (resp && resp?.status === 200 && resp.data && resp.data.conditions_list) {
            setData(resp.data.conditions_list);
          }
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => setLoading(false));
    } else {
      getInfluencers()
        .then((resp) => {
          if (resp && resp.status === 200 && resp.data && resp.data.influencer_list) {
            setData(resp.data.influencer_list);
          }
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const handlerOnClick = (item: ITest) => {
    navigate(`/prediction/${item.id}`);
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
          {data.map((item, index) => (
            <li onClick={() => handlerOnClick(item)} key={item.id} className="cursor-pointer hover:bg-rae">
              <hr className="border-rae mx-4"/>
              <div className="flex px-4 justify-between gap-x-6 py-2">
                <div className="flex w-full items-center">
                  <div className="flex-1 text-left font-roboto font-medium leading-[14px] text-base">
                    {item.name}
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    {item['prediction_ordered_list'] &&
                      item['prediction_ordered_list'].map((prediction, i) => (
                        <div
                          key={prediction.date}
                          className="flex flex-col items-center"
                        >
                          {index === 0 && (
                            <p className="text-[12px] text-center font-medium w-8 leading-[14px] mb-2">
                              {i === 0 ? 'Today' : getDayOfWeekByDate(prediction.date)}
                            </p>
                          )}
                          <p className="mb-1 w-8 items-center text-center flex justify-center">
                          <span
                            className={`${
                              prediction.score ? '' : 'text-primary-delft-dark'
                            } w-6 h-6 rounded-[50%] bg-rae flex items-center justify-center text-[14px]`}
                          >

                            {prediction.emoji}
                          </span>
                          </p>
                          <p
                            className="font-medium text-[12px] w-8 text-center text-piano-light leading-[14px] text-gray-500">
                            {prediction.score ? prediction.score : '-'}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {data.length === 0 && !loading &&
		  <div className="h-12 text-center font-medium leading-[14px] pt-4 text-piano-light">
			  Nothing not found...</div>}
      {/*Footer*/}
      {data && data.length > 0 && !loading && (
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
