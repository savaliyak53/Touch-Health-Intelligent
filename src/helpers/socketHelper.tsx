import { DashboardContextData, IOverview, predictionTypes } from "interfaces";
import { roundOff } from "utils/lib";

export function overviewDataHandler(message: IOverview, dashboardContextData: DashboardContextData) {
  dashboardContextData.setOverviewData(message);
}

export function lifestyleDimensionsInfluencer(message: predictionTypes, dashboardContextData: DashboardContextData) {
  dashboardContextData.setLifestyleInfluencers((current: any) => {
    const result = current.map((inf: any) => {
      if(inf.influencer_id === message.influencer_id) {
        return { updatedFromSocket: true, ...message }
      }
      return inf
    });
    const isResultExist = result.some((inf: any) => inf.influencer_id === message.influencer_id);
    if (!isResultExist) {
      result.push(message);
    }
    return result;
  });
}

export function conditionDimensionsInfluencer(message: predictionTypes, dashboardContextData: DashboardContextData) {
  dashboardContextData.setConditionInfluencers((current: any) => {
    const result = current.map((inf: any) => {
      if (inf.influencer_id === message.influencer_id) {
        return { updatedFromSocket: true, ...message };
      }
      return inf;
    });
    const isResultExist = result.some((inf: any) => inf.influencer_id === message.influencer_id);
    if (!isResultExist) {
      result.push(message);
    }
    return result;
  });
}

export function lifestyleDimensions(message: any, dashboardContextData: DashboardContextData) {
  dashboardContextData.setLifestyleDimensions((current: any) => {
    const result = current.map((inf: any) => {
      if(inf.title === message.name) {
        return { 
          updatedFromSocket: true,
          ...inf,
          subtitle1: message.data_value_list[0].name,
          value1: message.data_value_list[0].value || null,
          subtitle2: message.data_value_list[1].name,
          value2: message.data_value_list[1].value || null,
          subtitle3: message.data_value_list[2].name,
          value3: roundOff(message.data_value_list[2].value) || null,
        }
      }
      return inf
    })
    return result;
  });
}
