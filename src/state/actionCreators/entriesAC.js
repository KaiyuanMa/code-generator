const setEntries = async () => {};

const addEntry = async (entry) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_ENTRY",
      entry: entry,
    });
  };
};

const deleteEntry = async (entryId) => {
  return (dispatch) => {
    dispatch({
      type: "DEL_ENTRY",
      entryId: entryId,
    });
  };
};
