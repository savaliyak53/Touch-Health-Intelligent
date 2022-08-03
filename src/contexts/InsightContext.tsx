import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getInsightsService } from '../services/dashboardservice';
import { hardCodedresponse } from '../utils/lib';

export interface InsightContextModel {
  insights?: any;
  selectedInsight?: any;
  selectedInsightIndex?: [];
  commands: {
    loadInsights: () => Promise<any>;
    loadSelectedInsight: (selectedData: any) => Promise<void>;
    loadSelectedInsightIndex: (selectedIndex: any) => Promise<void>;
  };
}

export const InsightContext = createContext<InsightContextModel | undefined>(
  undefined
);
InsightContext.displayName = 'InsightContext';

interface Props {
  brandId?: string;
  children: ReactElement;
}

const InsightContextProvider = ({ children, brandId }: Props) => {
  const [insights, setInsights] = useState<any>();
  const [selectedInsight, setSelectedInsight] = useState<any>();
  const [selectedInsightIndex, setSelectedInsightIndex] = useState<any>();

  const loadInsights = async () => {
    //setIsReady(false)

    const response = await getInsightsService();
    if (response.data) {
      setInsights(hardCodedresponse);
      //setInsights(response.data);
      return response.data;
    }
  };
  const loadSelectedInsight = async (selectedData: any) => {
    setSelectedInsight(selectedData);
  };
  const loadSelectedInsightIndex = async (selectedData: any) => {
    setSelectedInsightIndex(selectedData);
    localStorage.setItem('selectedInsight', selectedData);
  };
  return (
    <InsightContext.Provider
      value={{
        insights,
        selectedInsight,
        selectedInsightIndex,
        commands: {
          loadInsights,
          loadSelectedInsight,
          loadSelectedInsightIndex,
        },
      }}
    >
      {children}
    </InsightContext.Provider>
  );
};

export default InsightContextProvider;
