import axios from '../utils/axios';

export const getInfluencers = async () => {
  return axios.get('/ai/influencers');
};

export const getConditions = async () => {
  return axios.get('/ai/conditions');
};