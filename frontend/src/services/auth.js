import { api } from "./api";

export const signupUser = (data) => {
  return api("/auth/signup", "POST", data);
};

export const loginUser = (data) => {
  return api("/auth/login", "POST", data);
};