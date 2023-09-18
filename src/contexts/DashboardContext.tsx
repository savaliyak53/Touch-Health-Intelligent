import { createContext, useState } from 'react';
import { DashboardContextData, IOverview } from 'interfaces';

const DashboardContext = createContext<DashboardContextData | undefined>(undefined);
export default DashboardContext;

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  const [overviewData, setOverviewData] = useState<IOverview | null>(null);
  const [lifestyleDimensions, setLifestyleDimensions] = useState<any>();
  const [conditionDimensions, setConditionDimensions] = useState<any>();
  const [conditionInfluencers, setConditionInfluencers] = useState<any>([]);
  const [lifestyleInfluencers, setLifestyleInfluencers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const contextData: DashboardContextData = {
    overviewData,
    lifestyleDimensions,
    conditionDimensions,
    conditionInfluencers,
    lifestyleInfluencers,
    setLoading,
    setOverviewData,
    setLifestyleDimensions,
    setConditionDimensions,
    setConditionInfluencers,
    setLifestyleInfluencers,
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DashboardContext.Provider value={contextData}>
      {loading ? null : children}
    </DashboardContext.Provider>
  );
};
