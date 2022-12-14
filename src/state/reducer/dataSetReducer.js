const reducer = (state = { dataSet: {} }, action) => {
  switch (action.type) {
    case "SET_DATASET":
      return { ...state, dataSet: action.dataSet };
    case "DEL_DATASET":
      return { ...state, dataSet: {} };
    case "ADD_DATASET":
      return { ...state, dataSet: action.dataSet };
    case "UPDATE_DATASET":
      return { ...state, dataSet: action.dataSet };
    default:
      return state;
  }
};

export default reducer;
