import {
  ISignUp,
  ILogin,
  IPreferencesService,
  InteractionService,
} from '../interfaces';
import APIClient from '../utils/axios';

export const signUpService = async (data: ISignUp, header: string) => {
  try {
    const res = await APIClient('/users/signup', 'post', data, header);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};
export const putSignUp = async (data: any,userId:string) => {
  try {
    const res = await APIClient(`/users/signup/${userId}`, 'put', data);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const loginService = async (data: ILogin, header: string) => {
  try {
    const res = await APIClient('/auth/login', 'post', data, header);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const validateSignUp = async (id: string | undefined) => {
  try {
    const res = await APIClient(`api/THA/PatientSignup/${id}`, 'get');
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const requestPhoneOTP = async (phone: string , token:string) => {
  try {
    const response = await APIClient(`/auth/phone-verification`, 'post', {
      phone:phone,
    },token);
    if (response) return response.data;
  } catch (error) {
    return error;
  }
};

export const verifyPhoneOTP = async (
  otp: string | undefined,
  id: string | undefined
) => {
  try {
    const response = await APIClient(`/auth/verify-phone`, 'put', {
      user_id:id,
      code: otp,
    });
    if (response) return response.data;
  } catch (error) {
    return error;
  }
};

export const preferencesService = async (
  data: IPreferencesService | any,
  id: string | null
) => {
  return APIClient(`/users/${id}`, 'put', data);
};

export const getInteractionService = async () => {
  //only return the service like this and resolve the promise where you are calling this actual API
  //TODO(<HamzaIjaz>): Refactor all the API calls like this
  //TODO(<HamzaIjaz>): Create a new service file for interaction services and move this APi there
  return APIClient(`/ai/interaction`, 'get');
};
export const getInteractionServiceByType = async (flow_id:string) => {
  //interacion service by flow_id
  return APIClient(`/ai/interaction-flow`, 'POST', {flow_id:flow_id});
};

export const postInteractionService = async (data: InteractionService) => {
  //TODO(<HamzaIjaz>): Create a new service file for interaction services and move this APi there
  return APIClient(`/interaction/`, 'post', data);
};

export const getUser = (id: string | null | undefined) => {
  return APIClient(`/users/${id}`, 'GET');
};

// export const resetPassword = async (username: string) => {
//   try {
//     const res = await APIClient('/auth/password-recovery', 'post', {
//       username: username,
//     });
//     if (res) return res.data;
//   } catch (err) {
//     return err;
//   }
// };
export const postResetPassword = async (data: any) => {
  try {
    const res = await APIClient('/auth/password-recovery', 'put', data);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const getSecurityQuestions = async (username: string, code: string) => {
  try {
    const res = await APIClient(
      `/auth/password-recovery/security-questions?username=${username}&code=${code}`
    );
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const checkAnswer = async (data: any) => {
  try {
    const res = await APIClient(
      '/auth/password-recovery/security-questions',
      'put',
      data
    );
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};
