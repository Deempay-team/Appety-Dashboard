import axios from "axios";
import secrets from "../config/secrets";

export const apiClient = axios.create({
  baseURL: secrets.baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
