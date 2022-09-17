const axios = require("axios");

const token = {
  headers: {
    authorization: window.localStorage.getItem("token"),
  },
};

//GET

const getDataSets = () => {
  return axios.get("/api/dataSet", token);
};

const getDataSet = (dataSetId) => {
  return axios.get(`/api/dataSet/${dataSetId}`, token);
};

const getDataSetModels = (dataSetId) => {
  return axios.get(`/api/dataSet/${dataSetId}/model`, token);
};

//DELETE

const deleteDataSet = (dataSetId) => {
  return axios.post(`/api/dataSet/${dataSetId}`, token);
};

//POST

const addDataSet = (dataSet) => {
  return axios.post("/api/dataSet", dataSet, token);
};

//PUT

const updateDataSet = (dataSetId, params) => {
  return axios.put(`/api/dataSet/${dataSetId}`, params, token);
};

export {
  getDataSets,
  getDataSetModels,
  getDataSet,
  addDataSet,
  deleteDataSet,
  updateDataSet,
};
