import {DashboardContextData, IOverview, predictionTypes} from 'interfaces';
import {roundOff} from 'utils/lib';
import {
  getBgForLifestyle,
  getBtnColorForLifestyle,
  getShadowForLifestyle,
  getSubtitleColorForLifestyle,
  getValueColorForLifestyle
} from './lifestyleDimensions';

export function overviewDataHandler(message: IOverview, dashboardContextData: DashboardContextData) {
  dashboardContextData.setOverviewData(message);
}

export function lifestyleDimensionsInfluencer(message: predictionTypes, dashboardContextData: DashboardContextData) {
  dashboardContextData.setLifestyleInfluencers((current: any) => {
    const result = current && current?.map((inf: any) => {
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
    const result = current && current?.map((inf: any) => {
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
    return current && current?.map((inf: any) => {
      if (inf.title === message.name) {

        const value1 = ['Mental Wellbeing']
            .includes(message.name) ? roundOff(message.data_value_list[0].value) : message.data_value_list[0].value;
        const value2 = ['Mental Wellbeing', 'Nutrition']
            .includes(message.name) ? roundOff(message.data_value_list[1].value) : message.data_value_list[1].value;
        const value3 = ['Sleep', 'Mental Wellbeing', 'Nutrition']
            .includes(message.name) ? roundOff(message.data_value_list[2].value) : message.data_value_list[2].value;

        return {
          updatedFromSocket: true,
          ...inf,
          subtitle1: message.data_value_list[0].name,
          value1: value1 || null,
          subtitle2: message.data_value_list[1].name,
          value2: value2 || null,
          subtitle3: message.data_value_list[2].name,
          value3: value3 || null,
          icon: message.dimension_emoji,
          bg: getBgForLifestyle(message.name),
          btnColor: getBtnColorForLifestyle(message.name),
          subtitleColor: getSubtitleColorForLifestyle(message.name),
          valueColor: getValueColorForLifestyle(message.name),
          shadow: getShadowForLifestyle(message.name),
          dimensionId: message.dimension_id
        }
      }
      return inf
    });
  });
}

export function conditionDimensionsDelete(message: any, dashboardContextData: DashboardContextData) {
  dashboardContextData.setConditionInfluencers((current: any) => {
    const updatedConditions = current.filter((condition: any) => {
      return message?.ids?.includes(condition.parent_dimension_id);
    });
    return updatedConditions;
  });
}

export function influencerDimensionsDelete(message: any, dashboardContextData: DashboardContextData) {
  dashboardContextData.setLifestyleInfluencers((current: any) => {
    const updatedInfluencers = current.filter((condition: any) => {
      return message?.ids?.includes(condition.parent_dimension_id);
    });
    return updatedInfluencers;
  });
}
