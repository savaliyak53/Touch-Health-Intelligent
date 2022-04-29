import APIClient from "../utils/axios";

export const signUpService =  async (data) => {
  try {
    const res = await APIClient("api/THA/PatientSignup", "post", data);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};

export const loginService =  async (data) => {
  try {
    const res = await APIClient("api/THA/PatientLogin", "post", data);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};
