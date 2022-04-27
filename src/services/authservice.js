import APIClient from "../utils/axios";

export const signUpService =  async (data) => {
  try {
    const res = await APIClient("api/THA/PatientSignup", "post", data);
    if (res) return res.data;
  } catch (err) {
    return err;
  }
};
