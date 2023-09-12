import { createContext, useState, useEffect, useContext } from 'react';
import {
  getLifestyleDimensions,
  getConditionsDimensions,
  getLifestyleInfluencers,
  getConditionInfluencers
} from 'services/dashboardservice';
import AuthContext, { AuthContextData } from './AuthContext';

export interface DashboardContextData {
  lifestyleDimensions: [],
  conditionDimensions: [],
  conditionInfluencers: [],
  lifestyleInfluencers: []
}

const DashboardContext = createContext<DashboardContextData | undefined>(undefined);
export default DashboardContext;

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  const [lifestyleDimensions, setLifestyleDimensions] = useState<any>();
  const [conditionDimensions, setConditionDimensions] = useState<any>();
  const [conditionInfluencers, setConditionInfluencers] = useState<any>();
  const [lifestyleInfluencers, setLifestyleInfluencers] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
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
          console.log(filtered_predictions_tom, filtered_predictions_tom.length);
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

  const contextData: DashboardContextData = {
    lifestyleDimensions,
    conditionDimensions,
    conditionInfluencers,
    lifestyleInfluencers
  };
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DashboardContext.Provider value={contextData}>
      {loading ? null : children}
    </DashboardContext.Provider>
  );
};
