const axios = require("axios");

const token = {
  headers: {
    authorization: window.localStorage.getItem("token"),
  },
};

//GET

const getDataSets = () => {
  console.log(token);
  return axios.get("/api/dataSet", {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const getDataSet = (dataSetId) => {
  return axios.get(`/api/dataSet/${dataSetId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const apiGetRecentDataSet = () => {
  console.log(token);
  return axios.get("/api/dataSet/recent/dataset", {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const getDataSetModels = (dataSetId) => {
  return axios.get(`/api/dataSet/${dataSetId}/model`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//DELETE

const deleteDataSet = (dataSetId) => {
  return axios.delete(`/api/dataSet/${dataSetId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//POST

const addDataSet = (dataSet) => {
  return axios.post("/api/dataSet", dataSet, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

//PUT

const updateDataSet = (dataSetId, params) => {
  return axios.put(`/api/dataSet/${dataSetId}`, params, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export {
  getDataSets,
  getDataSetModels,
  apiGetRecentDataSet,
  getDataSet,
  addDataSet,
  deleteDataSet,
  updateDataSet,
};
