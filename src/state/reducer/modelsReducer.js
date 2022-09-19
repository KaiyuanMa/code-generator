const reducer = (state = { models: [] }, action) => {
  switch (action.type) {
    case "SET_MODELS":
      return { ...state, models: action.models };
    case "SET_MODEL":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          model = action.model;
          break;
        }
      }
      return state;
    case "ADD_ENTRY":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          model.entries = [...model.entries, action.entry];
          break;
        }
      }
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
      for (let model of state.models) {
        if (model.id == action.modelId) {
          model = action.model;
        }
      }
      return state;
    default:
      return state;
  }
};

export default reducer;
