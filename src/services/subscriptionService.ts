import APIClient from '../utils/axios';

export const getPlansService = () => {
  return APIClient('/payments/subscription/plans', 'GET');
};

export const getUserSubscription = () => {
  return APIClient('/payments/subscription', 'GET');
};

export const checkoutPlan = (planId: string) => {
  return APIClient('/payments/checkout', 'POST', { planId: planId });
};
