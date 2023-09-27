import { createContext, useEffect, useState } from 'react';
import { DashboardContextData, IOverview } from 'interfaces';

const DashboardContext = createContext<DashboardContextData | undefined>(undefined);
export default DashboardContext;

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  const [overviewData, setOverviewData] = useState<IOverview | null>(null);
  const [lifestyleDimensions, setLifestyleDimensions] = useState<any>([{title: 'Sleep'}, {title: 'Movement'}, {title: 'Mental Wellbeing'}, {title: 'Nutrition'}, {title: 'Productivity'}]);
  const [conditionDimensions, setConditionDimensions] = useState<any>();
  const [conditionInfluencers, setConditionInfluencers] = useState<any>([]);
  const [lifestyleInfluencers, setLifestyleInfluencers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [earnPoints, setEarnPoints] = useState<number>(0);
  const [previousDataPoints, setPreviousDataPoints] = useState<number | null>(null);

  useEffect(() => {
    if (overviewData?.cumulative_datapoints !== undefined) {
      if (previousDataPoints !== null && overviewData?.cumulative_datapoints > previousDataPoints) {
        setEarnPoints(overviewData?.cumulative_datapoints - previousDataPoints);
      }
      setPreviousDataPoints(overviewData?.cumulative_datapoints);
    }
  }, [overviewData])

  const clearData = (): void => {
    setLifestyleDimensions([]);
    setConditionDimensions([]);
    setConditionInfluencers([]);
    setLifestyleInfluencers([])
  }

  const contextData: DashboardContextData = {
    overviewData,
    lifestyleDimensions,
    conditionDimensions,
    conditionInfluencers,
    lifestyleInfluencers,
    earnPoints,
    setLoading,
    setOverviewData,
    setLifestyleDimensions,
    setConditionDimensions,
    setConditionInfluencers,
    setLifestyleInfluencers,
    clearData,
    setEarnPoints
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DashboardContext.Provider value={contextData}>
      {loading ? null : children}
    </DashboardContext.Provider>
  );
};
