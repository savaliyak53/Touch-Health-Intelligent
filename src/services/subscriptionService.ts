import axiosInstance from '../utils/axiosNew';

const BASE_URL = process.env.REACT_APP_API_HOST;

export const getPlansService = () => {
  return axiosInstance.get(`${BASE_URL}/payments/subscription/plans`);
};

export const getUserSubscription = () => {
  return axiosInstance.get(`${BASE_URL}/payments/subscription`);
};

export const getStatus = () => {
  return axiosInstance.get(`${BASE_URL}/payments/checkout/status`);
};

export const getUserPlan = () => {
  return axiosInstance.get(`${BASE_URL}/payments/subscription/info`);
};

export const checkoutPlan = (planId: string) => {
  return axiosInstance.post(`${BASE_URL}/payments/checkout`, {
    planId: planId,
  });
};

export const managePayment = () => {
  return axiosInstance.get(`${BASE_URL}/payments/update-details`);
};

export const getSubscriptionStatus = () => {
  return axiosInstance.get(`${BASE_URL}/payments/subscription/status`);
};

export const pauseSubscription = () => {
  return axiosInstance.post(`${BASE_URL}/payments/subscription/pause`);
};

export const cancelSubscription = () => {
  return axiosInstance.post(`${BASE_URL}/payments/subscription/cancel`);
};

export const resumeSubscription = () => {
  return axiosInstance.post(`${BASE_URL}/payments/subscription/unpause`);
};

export const updateSubscription = (planId: string) => {
  return axiosInstance.post(`${BASE_URL}/payments/subscription/update`, {
    planId: planId,
  });
};

export const updateUserSubscription = (planId: string) => {
  return axiosInstance.post(`${BASE_URL}/payments/subscription`, {
    planId: planId,
  });
};

export const calculateSubscriptionProration = (planId: string) => {
  return axiosInstance.post(
    `${BASE_URL}/payments/subscription/update/estimate`,
    {
      planId: planId,
    }
  );
};
