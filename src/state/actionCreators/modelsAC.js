import { getDataSetModels } from "../../api/dataSet";
import {
  getModel,
  addModel,
  apiDeleteModel,
  updateModel,
} from "../../api/model";
import {
  addEntry,
  deleteEntry,
  apiUpdateEntry,
  apiGetEntry,
} from "../../api/entry";

const setModelsAC = (dataSetId) => {
  return async (dispatch) => {
    try {
      const { data } = await getDataSetModels(dataSetId);
      dispatch({
        type: "SET_MODELS",
        models: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const setModelAC = (modelId) => {
  return async (dispatch) => {
    try {
      const { data } = await getModel(modelId);
      dispatch({
        type: "SET_MODEL",
        model: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const addModelAC = (model) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_MODEL",
      model: model,
    });
  };
};

const deleteModelAC = (modelId) => {
  return async (dispatch) => {
    try {
      await apiDeleteModel(modelId);
      dispatch({
        type: "DEL_MODEL",
        modelId: modelId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const editModelAC = (modelId, params) => {
  return async (dispatch) => {
    try {
      await updateModel(modelId, params);
      const { data } = await getModel(modelId);
      dispatch({
        type: "UPDATE_MODEL",
        modelId: modelId,
        model: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

//ENTRY
const addModelEntry = (modelId) => {
  return async (dispatch) => {
    try {
      const { data } = await addEntry({ modelId: modelId });
      dispatch({
        type: "ADD_ENTRY",
        modelId: modelId,
        entry: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const deleteModelEntry = (modelId, entryId) => {
  return async (dispatch) => {
    try {
      await deleteEntry(entryId);
      dispatch({
        type: "DELETE_ENTRY",
        modelId: modelId,
        entryId: entryId,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const updateModelEntryAC = (modelId, entryId, params) => {
  return async (dispatch) => {
    try {
      await apiUpdateEntry(entryId, params);
      const { data } = await apiGetEntry(entryId);
      await dispatch({
        type: "UPDATE_ENTRY",
        modelId: modelId,
        entryId: entryId,
        entry: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export {
  setModelsAC,
  setModelAC,
  addModelAC,
  deleteModelAC,
  editModelAC,
  addModelEntry,
  deleteModelEntry,
  updateModelEntryAC,
};
