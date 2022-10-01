import React from "react";
import { Handle, Position } from "react-flow-renderer";
import Flow from "./Board";
import { ReactFlowProvider } from "react-flow-renderer";
import SideBar from "./SideBar";

function Home() {
  return (
    <div className="home">
      <img src="../public/images/RDBG logo.png" className='logo' />
      <SideBar />
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default Home;
