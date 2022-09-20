import React from "react";
import { Handle, Position } from "react-flow-renderer";
import Flow from "./Board";
import { ReactFlowProvider } from "react-flow-renderer";
import SideBar from "./SideBar";

function Home() {
  return (
    <div className="home">
      <SideBar />
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default Home;
