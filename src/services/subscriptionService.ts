import APIClient from '../utils/axios';

export const getPlansService = () => {
  return APIClient('/payments/subscription/plans', 'GET');
};

export const getUserSubscription = () => {
  return APIClient('/payments/subscription', 'GET');
};
export const getUserPlan = () => {
  return APIClient('/payments/subscription/info', 'GET');
};
export const checkoutPlan = (planId: string) => {
  return APIClient('/payments/checkout', 'POST', {
    planId: planId,
    cancelURL: '/error',
    successURL: '/success',
  });
};

export const getSubscriptionStatus = () => {
  return APIClient('/payments/subscription/status', 'GET');
};

export const pauseSubscription = (endDate: number) => {
  return APIClient('/payments/subscription/pause', 'POST', {
    endDate: endDate,
  });
};

export const cancelSubscription = () => {
  return APIClient('/payments/subscription/cancel', 'POST');
};

export const uncancelSubscription = () => {
  return APIClient('/payments/subscription/uncancel', 'POST');
};

export const resumeSubscription = () => {
  return APIClient('/payments/subscription/unpause', 'POST');
};

export const updateSubscription = (planId: string) => {
  return APIClient('/payments/subscription/update', 'POST', { planId: planId });
};
