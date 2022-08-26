import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { getInsightsService } from '../services/dashboardservice';

export interface InsightContextModel {
  insights?: any;
  selectedInsight?: any;
  selectedInsightIndex?: [];
  showButton?: string | undefined;
  commands: {
    loadInsights: () => Promise<any>;
    loadSelectedInsight: (selectedData: any) => Promise<void>;
    loadSelectedInsightIndex: (selectedIndex: any) => Promise<void>;
    setInsightButton: any;
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
  const [showButton, setShowButton] = useState<string | undefined>();

  const loadInsights = async () => {
    //setIsReady(false)

    const response = await getInsightsService();
    if (response.data) {
      setInsights(response.data);
      return response.data;
    } else {
      toast.error('Unknown error');
    }
  };
  const loadSelectedInsight = async (selectedData: any) => {
    setSelectedInsight(selectedData);
  };
  const loadSelectedInsightIndex = async (selectedData: any) => {
    setSelectedInsightIndex(selectedData);
    localStorage.setItem('selectedInsight', selectedData);
  };
  const setInsightButton = async (index: string) => {
    setShowButton(index);
    //localStorage.setItem('selectedInsight', selectedData);
  };
  return (
    <InsightContext.Provider
      value={{
        insights,
        selectedInsight,
        selectedInsightIndex,
        showButton,
        commands: {
          loadInsights,
          loadSelectedInsight,
          loadSelectedInsightIndex,
          setInsightButton,
        },
      }}
    >
      {children}
    </InsightContext.Provider>
  );
};

export default InsightContextProvider;
