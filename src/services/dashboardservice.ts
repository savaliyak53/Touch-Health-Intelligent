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

export const getGuidanceById = async ({guidance_id, dimension_id, dimension_type}: {guidance_id: string; dimension_id: string; dimension_type: string}) => {
  return await axios.get(`/ai/${dimension_type}/${dimension_id}/guidances/${guidance_id}`);
};

export const getOverview = async () => {
  return await axios.get(`/ai/overview`);
};

export const getLifestyleDimensions = async () => {
  return await axios.get(`/ai/lifestyle-dimensions`);
};

export const getConditionsDimensions = async () => {
  return await axios.get(`/ai/condition-dimensions`);
};

export const getLifestyleInfluencers = async (id: string) => {
  return await axios.get(`/ai/lifestyle-dimensions/${id}/influencers`);
};

export const getConditionInfluencers = async (id: string) => {
  return await axios.get(`/ai/lifestyle-dimensions/${id}/influencers`);
};

export const getLifestylenInfluencerDetails = async (dimensionId: string, influencerId: string) => {
  return await axios.get(`/ai/lifestyle-dimensions/${dimensionId}/influencers/${influencerId}`);
};

export const getConditionInfluencerDetails = async (dimensionId: string, influencerId: string) => {
  return await axios.get(`/ai/condition-dimensions/${dimensionId}/influencers/${influencerId}`);
};
