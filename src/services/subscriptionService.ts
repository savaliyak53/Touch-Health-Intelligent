import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_HOST;

export const getPlansService = () => {
  return axios.get(`${BASE_URL}/payments/subscription/plans`);
};

export const getUserSubscription = () => {
  return axios.get(`${BASE_URL}/payments/subscription`);
};

export const getStatus = () => {
  return axios.get(`${BASE_URL}/payments/checkout/status`);
};

export const getUserPlan = () => {
  return axios.get(`${BASE_URL}/payments/subscription/info`);
};

export const checkoutPlan = (planId: string) => {
  return axios.post(`${BASE_URL}/payments/checkout`, {
    planId: planId,
  });
};

export const managePayment = () => {
  return axios.get(`${BASE_URL}/payments/update-details`);
};

export const getSubscriptionStatus = () => {
  return axios.get(`${BASE_URL}/payments/subscription/status`);
};

export const pauseSubscription = () => {
  return axios.post(`${BASE_URL}/payments/subscription/pause`);
};

export const cancelSubscription = () => {
  return axios.post(`${BASE_URL}/payments/subscription/cancel`);
};

export const resumeSubscription = () => {
  return axios.post(`${BASE_URL}/payments/subscription/unpause`);
};

export const updateSubscription = (planId: string) => {
  return axios.post(`${BASE_URL}/payments/subscription/update`, {
    planId: planId,
  });
};

export const updateUserSubscription = (planId: string) => {
  return axios.post(`${BASE_URL}/payments/subscription`, { planId: planId });
};

export const calculateSubscriptionProration = (planId: string) => {
  return axios.post(`${BASE_URL}/payments/subscription/update/estimate`, {
    planId: planId,
  });
};
