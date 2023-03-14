import axios from "axios";

export const api = axios.create({
  baseURL: "//www.omdbapi.com",
});
