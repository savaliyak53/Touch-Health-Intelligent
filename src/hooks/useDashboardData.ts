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
}

export default useDashboardData;