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
    successURL: '/subscription/success',
  });
};

export const getSubscriptionStatus = () => {
  return APIClient('/payments/subscription/status', 'GET');
};

export const pauseSubscription = () => {
  return APIClient('/payments/subscription/pause', 'POST');
};

export const cancelSubscription = () => {
  return APIClient('/payments/subscription/cancel', 'POST');
};
export const resumeSubscription = () => {
  return APIClient('/payments/subscription/unpause', 'POST');
};

export const updateSubscription = (planId: string) => {
  return APIClient('/payments/subscription/update', 'POST', { planId: planId });
};
export const updateUserSubscription = (planId: string) => {
  return APIClient('/payments/subscription', 'POST', { planId: planId });
};
export const calculateSubscriptionProration = (planId: string) => {
  return APIClient('/payments/subscription/update/estimate', 'POST', { planId: planId });
};