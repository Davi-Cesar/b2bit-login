import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json;version=v1_web",
  },
});
