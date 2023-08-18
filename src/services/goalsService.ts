import axios from '../utils/axios';

export const deleteAllData = async () => {
  return axios.delete(`/ai/data`);
};
