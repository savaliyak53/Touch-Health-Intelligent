import axios from 'axios';

const baseURL = process.env.REACT_APP_API_HOST;
axios.defaults.baseURL = baseURL;

export const getConditionsService = async () => {
  return axios.get(`/conditions`);
};

export const addConditionsService = async (data: any) => {
  return axios.post(`/conditions`, data);
};

export const deleteCondition = (id: string) => {
  return axios.delete(`/conditions/${id}`);
};

export const getConditionsSearch = async (search: string) => {
  return axios.get(`/conditions/search?q=${search}`);
};

export const getDefaultConditions = async () => {
  return axios.get(`/conditions/search`);
};

export const getConcernsService = async () => {
  return axios.get(`/concerns/`);
};

export const addConcernsService = async (data: any) => {
  return axios.post(`/concerns`, data);
};

export const deleteConcern = (id: string) => {
  return axios.delete(`/concerns/${id}`);
};

export const getConcernsSearch = async (search: string) => {
  return axios.get(`/concerns/search?q=${search}`);
};

export const getInsightsService = async () => {
  return axios.get(`/insights/`);
};

export const getDashboard = async () => {
  return axios.get(`/ai/dashboard`);
};
