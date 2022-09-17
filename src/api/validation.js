const axios = require("axios");

const token = {
  headers: {
    authorization: window.localStorage.getItem("token"),
  },
};

//GET

const getValidation = (validationId) => {
  return axios.get(`/api/validation/${validationId}`, token);
};

//DELETE

const deleteValidation = (validationId) => {
  return axios.delete(`/api/validation/${validationId}`, token);
};

//POST

const addValidation = (validation) => {
  return axios.post("/api/validation", validation, token);
};

//PUT

const updateValidation = (validationId, params) => {
  return axios.pu(`/api/validation/${validationId}`, params, token);
};

export { getValidation, deleteValidation, addValidation, updateValidation };
