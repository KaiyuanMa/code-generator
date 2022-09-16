const reducer = (state = { dataSet: {} }, action) => {
  switch (action.type) {
    case "SET_DATASET":
      return { ...state, dataSet: action.dataSet };
    case "DEL_DATASET":
      return { ...state, dataSet: {} };
    default:
      return state;
  }
};
