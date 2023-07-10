// import axios from 'axios';
import axios from '../utils/axios';


export const getPlansService = () => {
  return axios.get(`/payments/list-plans`);
};

export const getUserSubscription = () => {
  return axios.get(`/payments/subscription`);
};

export const getStatus = () => {
  return axios.post(`/payments/checkout/status`);
};

export const getUserPlan = () => {
  return axios.get(`/payments/subscription/info`);
};

export const checkoutPlan = () => {
  return axios.post(`/payments/checkout`);
};

export const managePayment = () => {
  return axios.get(`/payments/subscription/update-payment-methods`);
};

export const getSubscriptionStatus = () => {
  return axios.get(`/payments/subscription-status`);
};

export const pauseSubscription = () => {
  return axios.post(`/payments/subscription/pause`);
};

export const cancelSubscription = () => {
  return axios.post(`/payments/subscription/cancel`);
};

export const resumeSubscription = () => {
  return axios.post(`/payments/subscription/unpause`);
};

export const updateSubscription = (planId: string) => {
  return axios.post(`/payments/subscription/update`, {
    planId: planId,
  });
};

export const updateUserSubscription = (planId: string) => {
  return axios.post(`/payments/subscription`, {
    planId: planId,
  });
};

export const calculateSubscriptionProration = (planId: string) => {
  return axios.post(`/payments/subscription/update/estimate`, {
    planId: planId,
  });
};
