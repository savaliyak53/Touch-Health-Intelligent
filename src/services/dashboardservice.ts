import APIClient from '../utils/axios';

export const getConditionsService = async () => {
  return APIClient(`/api/v1/conditions`, 'get');
};
export const addConditionsService = async (data: any) => {
  return APIClient(`/api/v1/conditions`, 'post', data);
};
export const deleteCondition = (id: string) => {
  return APIClient(`api/v1/conditions/${id}`, 'delete');
};
export const getConditionsSearch = async (search: string) => {
  return APIClient(`api/v1/conditions/search?q=${search}`, 'get');
};

export const getConcernsService = async () => {
  return APIClient(`/api/v1/concerns/`, 'get');
};

export const addConcernsService = async (data: any) => {
  return APIClient(`/api/v1/concerns`, 'post', data);
};
export const deleteConcern = (id: string) => {
  return APIClient(`api/v1/concerns/${id}`, 'delete');
};
export const getConcernsSearch = async (search: string) => {
  return APIClient(`api/v1/concerns/search?q=${search}`, 'get');
};

export const getInsightsService = async () => {
  return APIClient(`/api/v1/insights/`, 'get');
};
