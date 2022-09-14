const reducer = (state = { models: [] }, action) => {
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
    default:
      return state;
  }
};

export default reducer;
