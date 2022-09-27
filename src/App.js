import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { apiSetAuth } from "./api/auth";
import { apiGetRecentDataSet } from "./api/dataSet";

import Home from "./components/Home";
import { setDataSetAC } from "./state/actionCreators/dataSetAC";
function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  //for testing
  const testSignIn = async () => {
    try {
      let response = await apiSetAuth({
        username: "foo",
        password: "foo",
      });
      const token = response.data;
      console.log(token);
      window.localStorage.setItem("token", token);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getRecentDataSet();
  }, [auth]);
  const getRecentDataSet = async () => {
    if (auth.id) {
      const response = await apiGetRecentDataSet();
      dispatch(setDataSetAC(response.data.id));
    }
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
