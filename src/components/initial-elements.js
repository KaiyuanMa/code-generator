import React from "react";
import { MarkerType } from "react-flow-renderer";

export const nodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <div> 
          Welcome to <strong >RDBG!</strong>
        </div>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: {
      label: (
        <>
          To use our <strong> database you need to login or signup</strong>
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: {
      label: (
        <>
          Step one  <strong>create new datatset </strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
    },
  },
  {
    id: "4",
    position: { x: 250, y: 200 },
    data: {
      label: "Step 2 press the plus button on the hompage",
    },
  },
  {
    id: "5",
    data: {
      label: "Step 3 create relation datasets by connecting the nodes",
    },
    position: { x: 250, y: 325 },
  },
  {
    id: "6",
    type: "output",
    data: {
      label: (
        <>
           <strong>Step four click on export and download your datatset</strong>
        </>
      ),
    },
    position: { x: 100, y: 480 },
  },
  
];

export const edges = [
  { id: "e1-2", source: "1", target: "2", label: "this is relational database generator " },
  { id: "e1-3", source: "1", target: "3" },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    label: "by clicking on sidebar plus button",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    label: "then fill-in your information for your dataset",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    label: "fill-in your information for your  realtional dataset",
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    type: "step",
    style: { stroke: "#f6ab6c" },
    label: "a step edge",
    animated: true,
    labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
  },
];
