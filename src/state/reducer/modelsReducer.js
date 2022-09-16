const reducer = (state = { models: [{ id: 1, name: "user" }] }, action) => {
  switch (action.type) {
    case "SET_MODELS":
      return { ...state, models: action.models };
    case "ADD_MODEL":
      return { ...state, models: [...state.models, action.model] };
    case "DEL_MODEL":
      return {
        ...state,
        models: state.models.filter((model) => {
          action.modelId !== model.id;
        }),
      };
    case "UPDATE_MODEL":
      const dummy = state.models;
      for (let model of dummy) {
        if (model.id == action.modelId) {
          model = action.model;
        }
      }
      return { ...state, models: dummy };
    default:
      return state;
  }
};

export default reducer;
