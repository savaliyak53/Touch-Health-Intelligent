import axiosInstance from '../utils/axios';

export const getGoals = async () => {
  return axiosInstance.get(`/ai/goals/active`);
};

export const getGoalsSuggestion = async () => {
  return axiosInstance.get(`/ai/goals/suggested`);
};

export const getGoalsSearch = async (search: string) => {
  return axiosInstance.get(`/ai/goals/search?q=${search}`);
};

export const addGoal = async (data: any) => {
  return axiosInstance.put(`/ai/goals/active`, data);
};

export const deleteGoal = async (id?: string) => {
  return axiosInstance.delete(`/ai/goals/active/${id}`);
};

export const goalDetails = async (goalId: string) => {
  return axiosInstance.get(`/ai/goals/${goalId}/data`);
};

export const deleteAllData = async () => {
  return axiosInstance.delete(`/ai/data`);
};
