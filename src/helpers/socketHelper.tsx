import { roundOff } from "utils/lib";
interface Message {
    emoji_scale:string[];
    guidances_list:{
        guidance_id:string;
        health_dimension:string;
        name:string;
    }[];
    header_text:string;
    influencer_id:string;
    name:string;
    parent_dimension_id:string;
    prediction_ordered_list:{
        dt:string;
        emoji:string;
        uncertainy:string;
        value:string;
    }[]
    prediction_text:string;
}

export function lifestyleDimensionsInfluencer(message: Message, dashboardContextData: any) {
  dashboardContextData.setLifestyleInfluencers((current: any) => {
    const result = current.map((inf: any) => {
      if(inf.influencer_id === message.influencer_id) {
        return { updatedFromSocket: true, ...message }
      }
      return inf
    })
    return result;
  });
}

export function conditionDimensionsInfluencer(message: Message, dashboardContextData: any) {
  dashboardContextData.setConditionInfluencers((current: any) => {
    const result = current.map((inf: any) => {
      if(inf.influencer_id === message.influencer_id) {
        return { updatedFromSocket: true, ...message }
      }
      return inf
    })
    return result;
  });
}

export function lifestyleDimensions(message: any, dashboardContextData: any) {
  dashboardContextData.setLifestyleDimensions((current: any) => {
    const result = current.map((inf: any) => {
      if(inf.title === message.name) {
        return { 
          updatedFromSocket: true,
          ...inf,
          subtitle1: message.data_value_list[0].name,
          value1: message.data_value_list[0].value,
          subtitle2: message.data_value_list[1].name,
          value2: message.data_value_list[1].value,
          subtitle3: message.data_value_list[2].name,
          value3: roundOff(message.data_value_list[2].value),
        }
      }
      return inf
    })
    return result;
  });
}
