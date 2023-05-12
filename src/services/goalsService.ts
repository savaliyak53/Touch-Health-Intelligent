import axiosInstance from '../utils/axiosNew';

const baseUrl = process.env.REACT_APP_API_HOST;

export const getGoals = async () => {
  const response = await axiosInstance.get(`${baseUrl}/ai/goals/active`);
  return response.data;
};

export const getGoalsSuggestion = async () => {
  const response = await axiosInstance.get(`${baseUrl}/ai/goals/suggested`);
  return response.data;
};

export const getGoalsSearch = async (search: string) => {
  const response = await axiosInstance.get(`${baseUrl}/ai/goals/search?q=${search}`);
  return response.data;
};

export const addGoal = async (data: any) => {
  const response = await axiosInstance.put(`${baseUrl}/ai/goals/active`, data);
  return response.data;
};

export const deleteGoal = async (id?: string) => {
  const response = await axiosInstance.delete(`${baseUrl}/ai/goals/active/${id}`);
  return response.data;
};

export const goalDetails = async (goalId: string) => {
  const response = await axiosInstance.get(`${baseUrl}/ai/goals/${goalId}/data`);
  return response.data;
};

export const deleteAllData = async () => {
  const response = await axiosInstance.delete(`${baseUrl}/ai/data`);
  return response.data;
};
