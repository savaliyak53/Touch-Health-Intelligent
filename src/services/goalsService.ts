import axios from '../utils/axios';

export const getGoalsSearch = async (search: string) => {
  return axios.get(`/ai/goals/search?q=${search}`);
};

export const addGoal = async (data: any) => {
  return axios.put(`/ai/goals/active`, data);
};

export const deleteGoal = async (id?: string) => {
  return axios.delete(`/ai/goals/active/${id}`);
};

export const goalDetails = async (goalId: string) => {
  return axios.get(`/ai/goals/${goalId}/data`);
};

export const deleteAllData = async () => {
  return axios.delete(`/ai/data`);
};
