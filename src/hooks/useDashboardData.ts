import { useContext, useEffect, useState } from "react";
import AuthContext, { AuthContextData } from "contexts/AuthContext";
import DashboardContext from "contexts/DashboardContext";
import { getConditionInfluencers, getConditionsDimensions, getLifestyleDimensions, getLifestyleInfluencers, getOverview } from "services/dashboardservice";
import { roundOff } from "utils/lib";
import {
  getBgForLifestyle,
  getBtnColorForLifestyle, getIndexLifestyle, getShadowForLifestyle,
  getSubtitleColorForLifestyle,
  getValueColorForLifestyle
} from "../helpers/lifestyleDimensions";
const useDashboardData = () => {
  const contextData = useContext(DashboardContext) as any;
  const { 
    setOverviewData,
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

  const getOverviewData = () => {
    getOverview()
    .then(res => {
      if(res.data){
        setOverviewData(res.data);
        setLoading(false);
      }
    })
    .catch((error) => {
      setError({ code: error.response.status, message: error.response.data.details });
    })
  };

  const getAllLifestyleDimensions = () => {
    getLifestyleDimensions()
    .then(res => {
      if(res.data){
        const daysArray: any = [];
        let daysObj: any;
        res.data?.forEach((element: any) => {
          daysObj = {
            title: element.name,
            icon: element.dimension_emoji,
            subtitle1: element.data_value_list[0].name,
            value1: ['Mental Wellbeing']
                .includes(element.name) ? roundOff(element.data_value_list[0].value) : element.data_value_list[0].value,
            subtitle2: element.data_value_list[1].name,
            value2: ['Mental Wellbeing', 'Nutrition']
                .includes(element.name) ? roundOff(element.data_value_list[1].value) : element.data_value_list[1].value,
            subtitle3: element.data_value_list[2].name,
            value3: ['Sleep', 'Mental Wellbeing', 'Nutrition']
                .includes(element.name) ? roundOff(element.data_value_list[2].value) : element.data_value_list[2].value,
            bg: getBgForLifestyle(element.name),
            btnColor: getBtnColorForLifestyle(element.name),
            subtitleColor: getSubtitleColorForLifestyle(element.name),
            valueColor: getValueColorForLifestyle(element.name),
            shadow: getShadowForLifestyle(element.name),
            dimensionId: element.dimension_id || ''
          }
          daysArray[getIndexLifestyle(element.name)] = daysObj;
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
          if(filtered_predictions_today.length < 1) filtered_predictions.push({dt: currentDate, emoji: '—', value: '—', uncertainy: '—'});
          else filtered_predictions.push(filtered_predictions_today[0]) 

          const filtered_predictions_tom = obj.prediction_ordered_list.filter((item: any) => item.dt === tomorrowDateString);
          if(filtered_predictions_tom.length < 1) filtered_predictions.push({dt: tomorrowDateString, emoji: '—', value: '—', uncertainy: '—'});
          else filtered_predictions.push(filtered_predictions_tom[0]) 

          const filtered_predictions_third = obj.prediction_ordered_list.filter((item: any) => item.dt === thirdDateString);
          if(filtered_predictions_third.length < 1) filtered_predictions.push({dt: thirdDateString, emoji: '—', value: '—', uncertainy: '—'});
          else filtered_predictions.push(filtered_predictions_third[0]) 

          return {...obj, prediction_ordered_list: filtered_predictions}
        })

        setConditionInfluencers(filteredData);
        
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
          if(filtered_predictions_today.length < 1) filtered_predictions.push({dt: currentDate, emoji: '—', value: '—', uncertainy: '—'});
          else filtered_predictions.push(filtered_predictions_today[0]) 

          const filtered_predictions_tom = obj.prediction_ordered_list.filter((item: any) => item.dt === tomorrowDateString);
          if(filtered_predictions_tom.length < 1) filtered_predictions.push({dt: tomorrowDateString, emoji: '—', value: '—', uncertainy: '—'});
          else filtered_predictions.push(filtered_predictions_tom[0]) 

          const filtered_predictions_third = obj.prediction_ordered_list.filter((item: any) => item.dt === thirdDateString);
          if(filtered_predictions_third.length < 1) filtered_predictions.push({dt: thirdDateString, emoji: '—', value: '—', uncertainy: '—'});
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
      getOverviewData();
      getAllConditionDimensions();
      getAllLifestyleDimensions();
      getAllConditionInfluencers();
      getAllLifestyleInfluencers();
    }
  }, [sessionId, userId]);
}

export default useDashboardData;