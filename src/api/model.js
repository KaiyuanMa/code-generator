const axios = require("axios");

const token = {
  headers: {
    authorization: window.localStorage.getItem("token"),
  },
};

//GET

const getModel = (modelId) => {
  return axios.get(`/api/model/${modelId}`, token);
};

const getModelEntries = (modelId) => {
  return axios.get(`/api/model/${modelId}/entry`, token);
};

//DELETE

const apiDeleteModel = (modelId) => {
  return axios.delete(`/api/model/${modelId}`, token);
};

//POST

const apiAddModel = (model) => {
  return axios.post("/api/model", model, token);
};

//PUT

const updateModel = (modelId, params) => {
  return axios.put(`/api/model/${modelId}`, params, token);
};

export { getModel, getModelEntries, apiDeleteModel, apiAddModel, updateModel };
