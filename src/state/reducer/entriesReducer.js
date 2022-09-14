const reducer = (state = { entries: [] }, action) => {
  switch (action.type) {
    case "SET_ENTRIES":
      return { ...state, entries: action.entries };
    case "ADD_ENTRY":
      return { ...state, entries: [...state.entries, action.entry] };
    case "DEL_ENTRY":
      return {
        ...state,
        entries: state.entries.filter((entry) => {
          action.entryId !== entry.id;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
