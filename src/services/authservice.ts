import {
  ISignUp,
  ILogin,
  IPreferencesService,
  InteractionService,
} from '../interfaces';

import axios from '../utils/axios';
// import axios from 'axios';

const baseURL = process.env.REACT_APP_API_HOST;

axios.defaults.baseURL = baseURL;

export const signUpService = async (data: ISignUp, header: string) => {
  try {
    const config: any = {};
    if (header !== '') {
      config.headers = { 'X-Recaptcha-Token': header };
    }
    const res = await axios.post('/users/signup', data, config);
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
    const res = await axios.post('/auth/login', data, config);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};
export const sessionsService = async () => {
  try {
    const res = await axios.get(`/auth/sessions`);
    if (res) return res;
  } catch (err) {
    return err;
  }
};
export const deleteSessionService = async (sessionId: string) => {
  try {
    const res = await axios.delete(`/auth/sessions/${sessionId}`);
    if (res) return res;
  } catch (err) {
    return err;
  }
};
export const logoutService = async (sessionId: string) => {
  try {
    const res = await axios.delete(`/auth/logout`);
    if (res) return res;
  } catch (err) {
    return err;
  }
};
export const tokenService = async () => {
  try {
    const config: any = {
      withCredentials: true,
    };
    const res = await axios.get(`/auth/token`, config);

    if (res) return res.data;
  } catch (err) {
    return err;
  }
};
export const requestPhoneOTP = async (phone: string, token: string) => {
  try {
    const config: any = {};
    if (token !== '') {
      config.headers = { 'X-Recaptcha-Token': token };
    }
    const res = await axios.post(
      '/auth/phone-verification',
      {
        phone: phone,
      },
      config
    );
    if (res) return res;
  } catch (err) {
    return err;
  }
};

export const putSignUp = async (data: any, userId: string) => {
  try {
    const res = await axios.put(`${baseURL}/users/${userId}`, data);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const validateSignUp = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${baseURL}/api/THA/PatientSignup/${id}`);
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
    const response = await axios.put(`${baseURL}/users/signup/${id}/verify`, {
      code: otp,
    });
    if (response) return response;
  } catch (error) {
    return error;
  }
};

export const preferencesService = async (
  data: IPreferencesService | any,
  id: string | null
) => {
  return axios.put(`${baseURL}/users/${id}`, data);
};
export const updatePreference = async (data: any) => {
  return axios.put(`${baseURL}/ai/preferences`, data);
};

export const getPreference = async () => {
  return axios.get(`${baseURL}/ai/preferences`);
};
export const getInteractionService = async () => {
  return await axios.get(`${baseURL}/ai/interaction`);
};

export const getInteractionServiceByType = async (flow_id: string) => {
  return await axios.post(`${baseURL}/ai/interaction-flow`, {
    flow_id,
  });
};

export const postInteractionService = async (data: InteractionService) => {
  return await axios.post(`${baseURL}/ai/interaction`, data);
};

export const getUser = async (id: string | null | undefined) => {
  return await axios.get(`/users/${id}`);
};

export const postResetPassword = async (data: any) => {
  const response = await axios.put('/auth/password-recovery', data);
  return response.data;
};

export const getSecurityQuestions = async (
  username: string | null,
  code: string
) => {
  const response = await axios.get(
    `${baseURL}/auth/password-recovery/security-questions?username=${username}&code=${code}`
  );
  return response.data;
};

export const checkAnswer = async (data: any) => {
  const response = await axios.put(
    '/auth/password-recovery/security-questions',
    data
  );
  return response.data;
};

export const getGoogleCode = async () => {
  return await axios.get(`${baseURL}/auth/google`);
};

export const postGoogleToken = async (body: any) => {
  return await axios.post(`${baseURL}/auth/google/token`, body);
};

export const revokeGoogleFit = async () => {
  return await axios.post(`${baseURL}/auth/google/revoke`);
};

export const getIntegrationStatus = async () => {
  return await axios.get(`${baseURL}/user/integration/status`);
};

export const guidanceStatus = async (id: string, body: any) => {
  return await axios.put(`${baseURL}/ai/guidances/${id}`, body);
};
