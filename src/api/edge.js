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

const apiDeleteEdge = (edgeId) => {
  return axios.delete(`/api/edge/${edgeId}`, token);
};

const apiDeleteEdgeByNode = (idA, idB) => {
  return axios.delete(`/api/edge/node/${idA}/${idB}`, token);
};

//POST

const apiAddEdge = (edge) => {
  return axios.post(`/api/edge`, edge, token);
};

//PUT

const apiUpdateEdge = (edgeId, params) => {
  return axios.put(`/api/edge/${edgeId}`, params, token);
};

export {
  getEdges,
  getDataSetEdges,
  apiDeleteEdge,
  apiAddEdge,
  apiDeleteEdgeByNode,
  apiUpdateEdge,
};
