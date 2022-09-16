import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { apiSetAuth } from "./api/auth";

import Home from "./components/Home";

function App() {
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
    testSignIn();
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
