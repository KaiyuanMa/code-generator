const axios = require("axios");

const token = {
  headers: {
    authorization: window.localStorage.getItem("token"),
  },
};

//GET

const apiGetValidation = (validationId) => {
  return axios.get(`/api/validation/${validationId}`, token);
};

//DELETE

const apiDeleteValidation = (validationId) => {
  return axios.delete(`/api/validation/${validationId}`, token);
};

//POST

const apiAddValidation = (validation) => {
  return axios.post("/api/validation", validation, token);
};

//PUT

const apiUpdateValidation = (validationId, params) => {
  return axios.put(`/api/validation/${validationId}`, params, token);
};

export {
  apiGetValidation,
  apiDeleteValidation,
  apiAddValidation,
  apiUpdateValidation,
};
