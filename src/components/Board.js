import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { getDataSetEdges } from "../api/edge";
import { getDataSetNode } from "../api/node";
import { addModelAC, setModelsAC } from "../state/actionCreators/modelsAC";
import { zipFiles } from "./zip";
import { addModel } from "../api/model";
import { apiAddNode } from "../api/node";

import ModelNode from "./ModelNode";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { model: ModelNode };

function Flow() {
  const { dataSet } = useSelector((state) => state.dataSet);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [newX, setNewX] = useState(200);
  const [newY, setNewY] = useState(200);
  const defaultEdgeOptions = { animated: true };
  const dispatch = useDispatch();

  //put fooDataSetId in here, only for testing

  const DataSetId = "0ec22a80-402a-436a-b074-8b3c2e688517";

  const fetchData = async () => {
    let response = await getDataSetEdges(DataSetId);
    setEdges(response.data);
    response = await getDataSetNode(DataSetId);
    const dummy = [];
    for (let node of response.data) {
      const curr = {};
      curr.id = node.id;
      curr.type = node.type;
      curr.position = { x: node.positionX, y: node.positionY };
      curr.data = { modelId: node.modelId };
      dummy.push(curr);
    }
    setNodes(dummy);
  };

  useEffect(() => {
    dispatch(setModelsAC(DataSetId));
    fetchData();
  }, [dataSet]);

  //TODO: useCallback ?, check documentation
  const handelClick = () => {
    const helper = async () => {
      const { data } = await addModel({
        name: "test",
        dataSetId: DataSetId,
      });
      dispatch(addModelAC(data));
      const response = await apiAddNode({
        modelId: data.id,
        dataSetId: DataSetId,
        positionX: newX,
        positionY: newY,
        type: "model",
      });
      const node = response.data;
      console.log(node);
      const curr = {};
      curr.id = node.id;
      curr.type = node.type;
      curr.position = { x: newX, y: newY };
      curr.data = { modelId: node.modelId };
      setNodes((nds) => nds.concat(curr));
    };
    helper();
    const x = newX + 10;
    console.log(x);
    setNewX(x);
    setNewY(newY + 10);
    console.log(newX);
    console.log(newY);
  };

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
      console.log(connection);
    },
    [setEdges]
  );

  return nodes.length > 1 ? (
    <ReactFlowProvider className="react-flow-wrapper">
      <button onClick={() => zipFiles()}>DOWNLOAD ZIP</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={20} />
        <div className="model_controls">
          <button className="add_model" onClick={handelClick}>
            +
          </button>
        </div>
      </ReactFlow>
    </ReactFlowProvider>
  ) : null;
}

export default Flow;
