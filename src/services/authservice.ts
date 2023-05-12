import {
  ISignUp,
  ILogin,
  IPreferencesService,
  InteractionService,
} from '../interfaces';
// import APIClient from '../utils/axiosInstance';
import axiosInstance from '../utils/axiosNew';
// import useAxios from '../utils/useAxios';

const baseURL = process.env.REACT_APP_API_HOST;
// const config = {};
axiosInstance.defaults.baseURL = baseURL;
// const apiClient = axiosInstance.create({
//   baseURL,
// });
export const signUpService = async (data: ISignUp, header: string) => {
  try {
    const config: any = {};
    if (header !== '') {
      config.headers = { 'X-Recaptcha-Token': header };
    }
    const res = await axiosInstance.post('/users/signup', data, config);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const loginService = async (data: ILogin, header: string) => {
  try {
    const config: any = {
      withCredentials: true,
    };
    if (header !== '') {
      config.headers = { 'X-Recaptcha-Token': header };
    }
    const res = await axiosInstance.post('/auth/login', data, config);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};
export const requestPhoneOTP = async (phone: string, token: string) => {
  try {
    const config: any = {};
    if (token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const res = await axiosInstance.post(
      '/auth/phone-verification',
      {
        phone: phone,
      },
      config
    );
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const putSignUp = async (data: any, userId: string) => {
  try {
    const res = await axiosInstance.put(`${baseURL}/users/${userId}`, data);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const validateSignUp = async (id: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${baseURL}/api/THA/PatientSignup/${id}`
    );
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const verifyPhoneOTP = async (
  otp: string | undefined,
  id: string | undefined
) => {
  try {
    const response = await axiosInstance.put(
      `${baseURL}/users/signup/${id}/verify`,
      {
        code: otp,
      }
    );
    if (response) return response;
  } catch (error) {
    return error;
  }
};

export const preferencesService = async (
  data: IPreferencesService | any,
  id: string | null
) => {
  return axiosInstance.put(`${baseURL}/users/${id}`, data);
};
export const updatePreference = async (data: any) => {
  return axiosInstance.put(`${baseURL}/ai/preferences`, data);
};

export const getPreference = async () => {
  const response = await axiosInstance.get(`${baseURL}/ai/preferences`);
  return response.data;
};
export const getInteractionService = async () => {
  const response = await axiosInstance.get(`${baseURL}/ai/interaction`);
  return response.data;
};

export const getInteractionServiceByType = async (flow_id: string) => {
  const response = await axiosInstance.post(`${baseURL}/ai/interaction-flow`, {
    flow_id,
  });
  return response.data;
};

export const postInteractionService = async (data: InteractionService) => {
  const response = await axiosInstance.post(`${baseURL}/ai/interaction`, data);
  return response.data;
};

export const getUser = async (id: string | null | undefined) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const postResetPassword = async (data: any) => {
  const response = await axiosInstance.put('/auth/password-recovery', data);
  return response.data;
};

export const getSecurityQuestions = async (username: string, code: string) => {
  const response = await axiosInstance.get(
    `${baseURL}/auth/password-recovery/security-questions?username=${username}&code=${code}`
  );
  return response.data;
};

export const checkAnswer = async (data: any) => {
  const response = await axiosInstance.put(
    '/auth/password-recovery/security-questions',
    data
  );
  return response.data;
};

export const getGoogleCode = async () => {
  const response = await axiosInstance.get(`${baseURL}/auth/google`);
  return response.data;
};

export const postGoogleToken = async (body: any) => {
  const response = await axiosInstance.post(
    `${baseURL}/auth/google/token`,
    body
  );
  return response.data;
};

export const revokeGoogleFit = async () => {
  const response = await axiosInstance.post(`${baseURL}/auth/google/revoke`);
  return response.data;
};

export const getIntegrationStatus = async () => {
  const response = await axiosInstance.get(
    `${baseURL}/user/integration/status`
  );
  return response.data;
};

export const guidanceStatus = async (id: string, body: any) => {
  const response = await axiosInstance.put(
    `${baseURL}/ai/guidances/${id}`,
    body
  );
  return response.data;
};
