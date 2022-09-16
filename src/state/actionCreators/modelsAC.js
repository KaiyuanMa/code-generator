const setModels = async () => {};

const addModel = async (model) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_MODEL",
      model: model,
    });
  };
};

const deleteModel = async (modelId) => {
  return (dispatch) => {
    dispatch({
      type: "DEL_MODEL",
      modelId: modelId,
    });
  };
};

const editModel = async (modelId, model) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_MODEL",
      modelId: modelId,
      model: model,
    });
  };
};

export { setModels, addModel, deleteModel, editModel };
