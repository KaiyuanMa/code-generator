import React from "react";
import { Handle, Position } from "react-flow-renderer";
import Flow from "./Board";
import SideBar from "./SideBar";

function Home() {
  return (
    <div className="home">
      <SideBar />
      <Flow />
    </div>
  );
}

export default Home;
