import APIClient from '../utils/axios';

export const getConditionsService = async () => {
  return APIClient(`/conditions`, 'get');
};
export const addConditionsService = async (data: any) => {
  return APIClient(`/conditions`, 'post', data);
};
export const deleteCondition = (id: string) => {
  return APIClient(`/conditions/${id}`, 'delete');
};
export const getConditionsSearch = async (search: string) => {
  return APIClient(`/conditions/search?q=${search}`, 'get');
};
export const getDefaultConditions = async () => {
  return APIClient(`/conditions/search`, 'get');
};
export const getConcernsService = async () => {
  return APIClient(`/concerns/`, 'get');
};

export const addConcernsService = async (data: any) => {
  return APIClient(`/concerns`, 'post', data);
};
export const deleteConcern = (id: string) => {
  return APIClient(`/concerns/${id}`, 'delete');
};
export const getConcernsSearch = async (search: string) => {
  return APIClient(`/concerns/search?q=${search}`, 'get');
};

export const getInsightsService = async () => {
  return APIClient(`/insights/`, 'get');
};
