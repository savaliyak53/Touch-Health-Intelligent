
export interface ISignUp {
  password: string;
  name: string;
  phone: string;
}
export interface ILogin {
  username: string;
  password: string;
}
export interface IPreferencesService {
  sex: string;
  yob: number;
  preferences: {
    minutes_per_week: number;
    preferred_engagement_slots: string[];
    timezone: string;
  };
}

export interface InteractionService {
  type: string | undefined;
  ref_id: string | undefined;
  question_response: {
    ref_id?: string | undefined;
    type: string | undefined;
    value: any;
  };
  reward_nugget_response?: {
    shared: boolean;
  };
  value?: boolean
}

export interface Interaction {
  type: string;
  ref_id: string;
  question: {
    ref_id: string;
    type: string;
    q_str: string;
    options: Array<string> | null;
    defaults: Array<number> | null;
    lower_value: number | null;
    upper_value: number | null;
    step_value: number | null;
    lower_qualifier: string | null;
    upper_qualifier: string | null;
    show_values: boolean | null;
  };
  reward_nugget: {
    congratulations_str: string;
    statistic_str: string;
  };
}

// export interface Interaction {
//     type: string
//     ref_id: string
//     question: {
//         ref_id: string
//         type: string
//         q_str: string
//     }
//     reward_nugget: {
//         congratulations_str: string
//         statistic_str: string
//     }
// }
export interface IDropDownOptionsItem {
  id: string;
  text: string;
}

/**
 * Lifestyle dimensions day
 */

export interface IDataInteractionServiceByType {
  type: string;
  dimension_id?: string;
}

/**
 * Lifestyle dimensions day
 */

export interface ILifeStyleDay {
  title: string;
  icon: string;
  bg: string;
  btnColor: string;
  subtitle1: string;
  value1: string;
  subtitle2: string;
  value2: string;
  subtitle3: string;
  value3: string;
  subtitleColor: string;
  valueColor: string;
  shadow: string;
  dimensionId: string;
}

/**
 * Prediction graph section
 */

export interface IPredictionGraphList {
  dt: string;
  score?: number | null;
  emoji: string;
  value?: string | number;
}

/**
* Overview section
 */

export interface IOverview {
  cumulative_datapoints: number;
  max_datapoints: number;
  status_text: string;
  status_title: string;
  streak: number;
}

/**
* Emoji section
 */

// export type ConditionKeys =
//   'Daytime alertness' |
//   'Hunger' |
//   'Fatigue' |
//   'Stiffness' |
//   'Body image' |
//   'Anxiety' |
//   'Memory' |
//   'Happiness' |
//   'Paranoia' |
//   'Loneliness' |
//   'Clinical signs ';

export type EmojiLevelTypes = 'veryLow' | 'low' | 'neutral' | 'high' | 'critical';

export interface EmojiLevels {
  veryLow: string;
  low: string;
  neutral: string;
  high: string;
  critical: string;
}

export interface EmojiMapping {
  'Daytime alertness': EmojiLevels;
  Hunger: EmojiLevels;
  Fatigue: EmojiLevels;
  Stiffness: EmojiLevels;
  'Body image': EmojiLevels;
  Anxiety: EmojiLevels;
  Memory: EmojiLevels;
  Happiness: EmojiLevels;
  Paranoia: EmojiLevels;
  Loneliness: EmojiLevels;
  'Clinical signs': EmojiLevels;
  [key: string]: EmojiLevels;
}

export interface socketMessageType {
  type: string,
  payload: {
    path: string,
    params: {
      dimension_id: string,
    },
    body: any,
  },
}

export interface SocketContextData {
  dashboardNotification: any
  setDashboardNotification: React.Dispatch<React.SetStateAction<any>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  socketMessage: socketMessageType,
  setSocketMessage: React.Dispatch<React.SetStateAction<socketMessageType>>,
}

export interface socketNotificationTypes {
  title: string,
  details: string,
}

export interface DashboardContextData {
  lifestyleDimensions: ILifeStyleDay[],
  conditionDimensions: [],
  conditionInfluencers: [],
  lifestyleInfluencers: [],
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setLifestyleDimensions: React.Dispatch<React.SetStateAction<any>>,
  setConditionDimensions: React.Dispatch<React.SetStateAction<any>>,
  setConditionInfluencers: React.Dispatch<React.SetStateAction<any>>,
  setLifestyleInfluencers: React.Dispatch<React.SetStateAction<any>>,
}

export interface predictionTypes {
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