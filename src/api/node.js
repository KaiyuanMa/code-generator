const axios = require("axios");

const token = {
  headers: {
    authorization: window.localStorage.getItem("token"),
  },
};

//GET

const getNode = (modelId) => {
  return axios.get(`/api/node/model/${modelId}`, token);
};

const getDataSetNode = (dataSetId) => {
  return axios.get(`/api/node/${dataSetId}`, token);
};

//DELETE
const apiDeleteNode = (modelId) => {
  return axios.delete(`/api/node/model/${modelId}`, token);
};

//POST
const apiAddNode = (node) => {
  return axios.post(`/api/node`, node, token);
};

//PUT
const apiUpdateNode = (modelId, params) => {
  return axios.put(`/api/node/${modelId}`, params, token);
};

export { getNode, getDataSetNode, apiAddNode, apiUpdateNode, apiDeleteNode };
