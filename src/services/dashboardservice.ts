import axiosInstance from '../utils/axios';

export const getConditionsService = async () => {
  return axiosInstance.get(`/conditions`);
};

export const addConditionsService = async (data: any) => {
  return axiosInstance.post(`/conditions`, data);
};

export const deleteCondition = (id: string) => {
  return axiosInstance.delete(`/conditions/${id}`);
};

export const getConditionsSearch = async (search: string) => {
  return axiosInstance.get(`/conditions/search?q=${search}`);
};

export const getDefaultConditions = async () => {
  return axiosInstance.get(`/conditions/search`);
};

export const getConcernsService = async () => {
  return axiosInstance.get(`/concerns/`);
};

export const addConcernsService = async (data: any) => {
  return axiosInstance.post(`/concerns`, data);
};

export const deleteConcern = (id: string) => {
  return axiosInstance.delete(`/concerns/${id}`);
};

export const getConcernsSearch = async (search: string) => {
  return axiosInstance.get(`/concerns/search?q=${search}`);
};

export const getInsightsService = async () => {
  return axiosInstance.get(`/insights/`);
};

export const getDashboard = async () => {
  return await axiosInstance.get(`/ai/dashboard`);
};
