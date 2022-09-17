const axios = require("axios");

const token = {
  headers: {
    authorization: window.localStorage.getItem("token"),
  },
};

//GET

const getEntry = (entryId) => {
  return axios.get(`/api/entry/${entryId}`, token);
};

const getEntryValidations = (entryId) => {
  return axios.get(`/api/entry/${entryId}/validation`, token);
};

//DELETE

const deleteEntry = (entryId) => {
  return axios.delete(`/api/entry/${entryId}`, token);
};

//POST

const addEntry = (entry) => {
  return axios.post("/api/entry", entry, token);
};

//PUT

const updateEntry = (entryId, params) => {
  return axios.put(`/api/entry/${entryId}`, params, token);
};

export { getEntry, getEntryValidations, deleteEntry, addEntry, updateEntry };
