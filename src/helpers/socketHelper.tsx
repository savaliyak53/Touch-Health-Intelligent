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

const messageInfluencerQueue: any = [];
const messageConditionQueue: any = [];

export function lifestyleDimensionsInfluencer(message: Message, dashboardContextData: any) {
  // const maxQueueSize = dashboardContextData.lifestyleInfluencers.length;
  // messageInfluencerQueue.push(message);

  // while (messageInfluencerQueue.length > maxQueueSize) {
  //   messageInfluencerQueue.shift();
  // }

  // const influencerData = [];

  // for (const dashboardInfluencer of dashboardContextData.lifestyleInfluencers) {
  //   const matchingMessage = messageInfluencerQueue.find(
  //     (msg: any) => msg.influencer_id === dashboardInfluencer.influencer_id
  //   );
  //   if (matchingMessage) {
  //     influencerData.push(matchingMessage);
  //   } else {
  //     influencerData.push(dashboardInfluencer);
  //   }
  // }

  // console.log(influencerData, "influencer ++++++++++++");

  // dashboardContextData.lifestyleInfluencers  [1,2,3,4,5]
  // msg  3
  const result = dashboardContextData.lifestyleInfluencers.map((inf: any) => {
    if(inf.influencer_id === message.influencer_id) {
      return message
    }
    return inf
  })

  console.log("result++++++++dashboardContextData.lifestyleInfluencers", dashboardContextData.lifestyleInfluencers)

  console.log("result++++++++", result)


  if (result.length) {
    dashboardContextData.setLifestyleInfluencers(result);
  }
}

export function conditionDimensionsInfluencer(message: Message, dashboardContextData: any) {
  const maxQueueSize = dashboardContextData.conditionInfluencers.length;
  messageConditionQueue.push(message);

  while (messageConditionQueue.length > maxQueueSize) {
    messageConditionQueue.shift();
  }

  const influencerData = [];

  for (const dashboardCondition of dashboardContextData.conditionInfluencers) {
    const matchingMessage = messageConditionQueue.find(
      (msg: any) => msg.influencer_id === dashboardCondition.influencer_id
    );
    if (matchingMessage) {
      influencerData.push(matchingMessage);
    } else {
      influencerData.push(dashboardCondition);
    }
  }

  if (influencerData.length) {
    dashboardContextData.setConditionInfluencers(influencerData);
  }
}
