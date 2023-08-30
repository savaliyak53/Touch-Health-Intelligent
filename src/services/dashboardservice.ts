import axios from '../utils/axios';


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

export const getDimensions = async () => {
  return await axios.get(`/ai/dimensions`);
};

export const getDashboard = async () => {
  return await axios.get(`/ai/dashboard`);
};

export const getInfluencer = async (influencer_id: string) => {
  return await axios.get(`/ai/influencer/${influencer_id}`);
};

export const getConditionById = async (influencer_id: string) => {
  return await axios.get(`/ai/condition/${influencer_id}`);
};

export const getGuidance = async (guidance_id: string) => {
  return await axios.get(`/ai/guidance/${guidance_id}`);
};

export const getOverview = async () => {
  return await axios.get(`/ai/overview`);
};
