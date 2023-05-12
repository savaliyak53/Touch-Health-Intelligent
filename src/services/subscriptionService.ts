import axiosInstance from '../utils/axios';

export const getPlansService = () => {
  return axiosInstance.get(`/payments/subscription/plans`);
};

export const getUserSubscription = () => {
  return axiosInstance.get(`/payments/subscription`);
};

export const getStatus = () => {
  return axiosInstance.get(`/payments/checkout/status`);
};

export const getUserPlan = () => {
  return axiosInstance.get(`/payments/subscription/info`);
};

export const checkoutPlan = (planId: string) => {
  return axiosInstance.post(`/payments/checkout`, {
    planId: planId,
  });
};

export const managePayment = () => {
  return axiosInstance.get(`/payments/update-details`);
};

export const getSubscriptionStatus = () => {
  return axiosInstance.get(`/payments/subscription/status`);
};

export const pauseSubscription = () => {
  return axiosInstance.post(`/payments/subscription/pause`);
};

export const cancelSubscription = () => {
  return axiosInstance.post(`/payments/subscription/cancel`);
};

export const resumeSubscription = () => {
  return axiosInstance.post(`/payments/subscription/unpause`);
};

export const updateSubscription = (planId: string) => {
  return axiosInstance.post(`/payments/subscription/update`, {
    planId: planId,
  });
};

export const updateUserSubscription = (planId: string) => {
  return axiosInstance.post(`/payments/subscription`, {
    planId: planId,
  });
};

export const calculateSubscriptionProration = (planId: string) => {
  return axiosInstance.post(`/payments/subscription/update/estimate`, {
    planId: planId,
  });
};
