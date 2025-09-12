import axios from "axios";

const API_BASE = "https://ngererayo-backend.onrender.com";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth endpoints
export const REGISTER_URL = "/accounts/register/";
export const LOGIN_URL = "/accounts/login/";
