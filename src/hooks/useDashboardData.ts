import { useContext, useEffect, useState } from "react";
import AuthContext, { AuthContextData } from "contexts/AuthContext";
import DashboardContext from "contexts/DashboardContext";
import { getConditionInfluencers, getConditionsDimensions, getLifestyleDimensions, getLifestyleInfluencers } from "services/dashboardservice";

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
        setLifestyleDimensions(res.data);
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