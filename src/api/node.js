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

//POST
const apiAddNode = (node) => {
  return axios.post(`/api/node`, node, token);
};

//PUT
const updateNode = (modelId, param) => {
  return axios.put(`/api/node/${modelId}`, param, token);
};

export { getNode, getDataSetNode, apiAddNode, updateNode };
