const axios = require("axios");

const getDataSets = () => {
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

const addDataSet = (dataSet) => {
  return axios.post("/api/dataSet", dataSet, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const deleteDataSet = (dataSetId) => {
  return axios.post(`/api/dataSet/${dataSetId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const updateDataSet = (dataSetId, dataSet) => {
  return axios.put(`/api/dataSet/${dataSetId}`, dataSetId, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export { getDataSets, getDataSet, addDataSet, deleteDataSet, updateDataSet };
