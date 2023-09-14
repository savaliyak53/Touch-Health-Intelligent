import { useContext, useEffect, useState } from "react";
import AuthContext, { AuthContextData } from "contexts/AuthContext";
import DashboardContext from "contexts/DashboardContext";
import { getConditionInfluencers, getConditionsDimensions, getLifestyleDimensions, getLifestyleInfluencers } from "services/dashboardservice";
import { roundOff } from "utils/lib";
const useDashboardData = () => {
  const contextData = useContext(DashboardContext) as any;
  const { 
    setLifestyleDimensions,
    setConditionDimensions,
    setConditionInfluencers,
    setLifestyleInfluencers,
    setLoading
  } = contextData;
  const [error, setError] = useState<any>();
  const authContext = useContext<AuthContextData | undefined>(AuthContext);
  const userId = authContext?.user ? authContext?.user: localStorage.getItem('userId');
  const sessionId = authContext?.session ? authContext?.session: localStorage.getItem('sessionId');

  const getAllLifestyleDimensions = () => {
    getLifestyleDimensions()
    .then(res => {
      if(res.data){
        const daysArray: any = [];
        let daysObj: any;
        res.data?.forEach((element: any) => {
          if(element.name == 'Sleep'){
            daysObj = {
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
              dimensionId: element.dimension_id || ''
            }
            daysArray[0] = daysObj;
          } else if(element.name == 'Movement') {
            daysObj = {
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
              dimensionId: element.dimension_id || ''
            }
            daysArray[1] = daysObj;
          } else if(element.name == 'Mental Wellbeing'){
            daysObj = {
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
              dimensionId: element.dimension_id || ''
            }
            daysArray[2] = daysObj;
          } else if(element.name == 'Nutrition') {
            daysObj = {
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
              dimensionId: element.dimension_id || ''
            }
            daysArray[3] = daysObj;
          } else {
            daysObj = {
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
              dimensionId: element.dimension_id || ''
            }
            daysArray[4] = daysObj;
          }
        });
        setLifestyleDimensions(daysArray);
        setLoading(false);
      }
    })
    .catch((error) => {
      setError({ code: error.response.status, message: error.response.data.details });
    })
  };

  const getAllConditionDimensions = () => {
    getConditionsDimensions()
    .then(res => {
      if(res.data){
        setConditionDimensions(res.data);
        setLoading(false);
      }
    })
    .catch((error) => {
      setError({ code: error.response.status, message: error.response.data.details });
    })
  };

  const getAllConditionInfluencers = () => {
    getConditionInfluencers('*')
    .then(res => {
      if(res.data){
        setConditionInfluencers(res.data);
        setLoading(false);
      }
    })
    .catch((error) => {
      setError({ code: error.response.status, message: error.response.data.details });
    })
  };

  const getAllLifestyleInfluencers = () => {
    getLifestyleInfluencers('*')
    .then(res => {
      if(res.data){
        const currentDate: string = new Date().toISOString().split('T')[0];
        
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        const tomorrowDateString: string = tomorrowDate.toISOString().split('T')[0];

        const thirdDate = new Date();
        thirdDate.setDate(thirdDate.getDate() + 2);
        const thirdDateString: string = thirdDate.toISOString().split('T')[0];


        const filteredData = res.data.map((obj: any) => {
          const filtered_predictions: any = []

          const filtered_predictions_today = obj.prediction_ordered_list.filter((item: any) => item.dt === currentDate);
          if(filtered_predictions_today.length < 1) filtered_predictions.push({dt: currentDate, emoji: '❔', value: '—', uncertainy: '—'});
          else filtered_predictions.push(filtered_predictions_today[0]) 

          const filtered_predictions_tom = obj.prediction_ordered_list.filter((item: any) => item.dt === tomorrowDateString);
          if(filtered_predictions_tom.length < 1) filtered_predictions.push({dt: tomorrowDateString, emoji: '❔', value: '—', uncertainy: '—'});
          else filtered_predictions.push(filtered_predictions_tom[0]) 

          const filtered_predictions_third = obj.prediction_ordered_list.filter((item: any) => item.dt === thirdDateString);
          if(filtered_predictions_third.length < 1) filtered_predictions.push({dt: thirdDateString, emoji: '❔', value: '—', uncertainy: '—'});
          else filtered_predictions.push(filtered_predictions_third[0]) 

          return {...obj, prediction_ordered_list: filtered_predictions}
        })

        setLifestyleInfluencers(filteredData);
        
        setLoading(false);
      }
    })
    .catch((error) => {
      setError({ code: error.response.status, message: error.response.data.details });
    })
  };

  useEffect(() => {
    if(userId && sessionId){
      getAllConditionDimensions();
      getAllLifestyleDimensions();
      getAllConditionInfluencers();
      getAllLifestyleInfluencers();
    }
  }, [sessionId, userId]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);
}

export default useDashboardData;