const axios = require("axios");

const token = {
  headers: {
    authorization: window.localStorage.getItem("token"),
  },
};

//GET

const getEdges = (modelId) => {
  return axios.get(`/api/edge/model/${modelId}`, token);
};

const getDataSetEdges = (dataSetId) => {
  return axios.get(`/api/edge/${dataSetId}`, token);
};

//DELETE

const deleteEdge = (edgeId) => {
  return axios.delete(`/api/edge/${edgeId}`, token);
};

//POST

const addEdge = (edge) => {
  return axios.post(`/api/edge`, edge, token);
};

export { getEdges, getDataSetEdges, deleteEdge, addEdge };
