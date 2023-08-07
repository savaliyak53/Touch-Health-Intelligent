
export interface IUserSubscriptionState {
  TRIAL_ACTIVE: string;
  TRIAL_EXPIRED: string;
  SUBSCRIPTION_ACTIVE: string;
  SUBSCRIPTION_PENDING: string;
  SUBSCRIPTION_CANCELLED: string;
  SUBSCRIPTION_EXPIRED: string;
}

export interface IAccountStanding {
  PAST_DUE: string;
  PAID: string;
}

export interface ISubscriptionStateDataResponse {
  trialData: {
      trialEndDate: Date;
      trialRemaining?: string | undefined;
  },
  subscriptionData: {
      name: string;
      description?: string | undefined;
      price: string;
      renewalDate?: Date | undefined;
      endDate?: Date | undefined;
  }
}
export interface IUserSubscriptionResponse {
  state: IUserSubscriptionState;
  standing: IAccountStanding | null;
  data: ISubscriptionStateDataResponse;
}