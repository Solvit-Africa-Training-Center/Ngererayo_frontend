import axios from "axios";

const API_BASE = "https://degreat1.pythonanywhere.com";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoints
export const REGISTER_URL = "/accounts/register/";
export const LOGIN_URL = "/accounts/login/";
