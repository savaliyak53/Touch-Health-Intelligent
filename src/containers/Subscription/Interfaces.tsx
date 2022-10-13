export type ITrialPeriod = {
    interval: string;
    repetitions: number;
  };
  
export type ISubscriptionPlan = {
price: ISubscriptionPrice;
id: string;
currency: string;
interval: string;
periods: number;
iterations: number;
trialPeriod: ITrialPeriod | null;
amount: string;
description: string | null;
name: string;
priceAveraged: string | undefined;
};
export type ISubscriptionPrice= {
amount: number | undefined;
amountFormatted: string | undefined;
currency:string | undefined;
interval: string | undefined;
intervalCount: number;
};
export type ISubscriptionPeriod= {
ends: string | undefined;
starts: string | undefined;
};
export type IUserSubscription= {
plan:ISubscriptionPlan | undefined;
id:string | undefined;
renewalDate:string|undefined;
currentPeriod:ISubscriptionPeriod | undefined;
trialing?: boolean | undefined;
nextPhase?:IUserSubscription | undefined;
};