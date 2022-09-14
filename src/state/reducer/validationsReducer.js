const reducer = (state = { validations: [] }, action) => {
  switch (action.type) {
    case "SET_VALIDATIONS":
      return { ...state, validations: action.validations };
    case "ADD_VALIDATION":
      return {
        ...state,
        validations: [...state.validations, action.validation],
      };
    case "DEL_MODEL":
      return {
        ...state,
        validations: state.validations.filter((validation) => {
          action.validationId !== validation.id;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
