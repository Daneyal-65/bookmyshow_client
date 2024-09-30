import axios from "axios";
import { authUrl } from "./config";

const signup = async (formData) => {
  try {
    const res = await axios.post(`${authUrl}/signup`, {
      username: formData.username,
      password: formData.password,
    });

    console.log("Signup successful", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "Signup failed",
      err.response ? err.response.data : err.message
    );
    return null;
  }
};

const login = async (formData) => {
  try {
    const res = await axios.post(`${authUrl}/login`, {
      username: formData.username,
      password: formData.password,
    });

    console.log("Login successful", res.data);
    return res.data; // This should include the token if successful
  } catch (err) {
    console.error(
      "Login failed",
      err.response ? err.response.data : err.message
    );
    return null;
  }
};
export { login, signup };
