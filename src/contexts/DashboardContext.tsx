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
        setLifestyleInfluencers(res.data);
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
