const axios = require("axios");

const apiGetAuth = (token) => {
  return axios.get("/api/session", {
    headers: {
      authorization: token,
    },
  });
};

const apiSetAuth = (credentials) => {
  return axios.post("/api/session", credentials);
};

export { apiGetAuth, apiSetAuth };
