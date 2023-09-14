import { createContext, useState } from 'react';
import { DashboardContextData } from 'interfaces';

const DashboardContext = createContext<DashboardContextData | undefined>(undefined);
export default DashboardContext;

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  const [lifestyleDimensions, setLifestyleDimensions] = useState<any>();
  const [conditionDimensions, setConditionDimensions] = useState<any>();
  const [conditionInfluencers, setConditionInfluencers] = useState<any>([]);
  const [lifestyleInfluencers, setLifestyleInfluencers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const contextData: DashboardContextData = {
    lifestyleDimensions,
    conditionDimensions,
    conditionInfluencers,
    lifestyleInfluencers,
    setLoading,
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
