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
  isLoading?:boolean;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<string | undefined>();

  const loadInsights = async () => {
    //setIsReady(false)
     setLoading(true);
     getInsightsService().then(response => {
      setInsights(response.data);
      setLoading(false);
      return response.data;
      }).catch(e => {
      setLoading(false);
      console.log('error',e);
      });
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
        isLoading:loading,
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
