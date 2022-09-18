import { getDataSetModels } from "../../api/dataSet";
import { getModel, addModel, deleteModel, updateModel } from "../../api/model";
import { addEntry } from "../../api/entry";

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

const addModelAC = (model) => {
  return async (dispatch) => {
    try {
      const { data } = await addModel(model);
      dispatch({
        type: "ADD_MODEL",
        model: data,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const deleteModelAC = async (modelId) => {
  return async (dispatch) => {
    try {
      await deleteModel(modelId);
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
      const { data } = await updateModel(modelId, params);
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

export {
  setModelsAC,
  setModelAC,
  addModelAC,
  deleteModelAC,
  editModelAC,
  addModelEntry,
};
