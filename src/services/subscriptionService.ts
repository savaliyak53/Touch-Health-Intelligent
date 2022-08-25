import APIClient from '../utils/axios';

export const getPlansService = async () => {
  return APIClient('/plans/list', 'GET');
};
