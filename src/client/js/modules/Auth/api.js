// @flow

import axios from "axios";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json"
  }
};

export default {
  registerUser(body) {
    return axios.post("/api/users", body, axiosConfig);
  },
  loginUser(body) {
    return axios.post("/api/users", body, axiosConfig);
  },
  loadUser() {
    return axios.get("/api/auth", axiosConfig);
  },
  loginUser(body) {
    return axios.post("/api/auth", body, axiosConfig);
  }
};
