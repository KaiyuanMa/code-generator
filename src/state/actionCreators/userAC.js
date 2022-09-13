const deleteUserAC = () => {
  return (dispatch) => {
    dispatch({
      type: "DEL_USER",
    });
  };
};
