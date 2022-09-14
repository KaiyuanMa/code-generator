const reducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "DEL_USER":
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default reducer;
