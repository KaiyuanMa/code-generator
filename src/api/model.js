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

const deleteModel = (modelId) => {
  return axios.delete(`/api/model/${modelId}`, token);
};

//POST

const addModel = (model) => {
  return axios.post("/api/model", model, token);
};

//PUT

const updateModel = (modelId, params) => {
  return axios.put(`/api/model/${modelId}`, params, headers);
};

export { getModel, getModelEntries, deleteModel, addModel, updateModel };
