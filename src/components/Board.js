import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { getDataSetEdges } from "../api/edge";
import { getDataSetNode } from "../api/node";
import { setModelsAC } from "../state/actionCreators/modelsAC";

import ModelNode from "./ModelNode";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { model: ModelNode };

function Flow() {
  const { dataSet } = useSelector((state) => state.dataSet);
  const { models } = useSelector((state) => state.models);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const defaultEdgeOptions = { animated: true };
  const dispatch = useDispatch();

  //put fooDataSetId in here, only for testing
  const DataSetId = "271e133b-120b-4b39-ac6e-8b68f46356bc";

  const fetchData = async () => {
    let response = await getDataSetEdges(DataSetId);
    setEdges(response.data);
    response = await getDataSetNode(DataSetId);
    const dummy = [];
    for (let node of response.data) {
      const curr = {};
      curr.id = node.id;
      curr.type = node.type;
      curr.position = { x: node.positionX * 1, y: node.positionY * 1 };
      curr.data = { modelId: node.modelId };
      dummy.push(curr);
    }
    setNodes(dummy);
  };

  useEffect(() => {
    dispatch(setModelsAC(DataSetId));
    fetchData();
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return nodes.length > 1 ? (
    <div className="react-flow-wrapper">
      <button>+</button>
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
        <Background variant="dots" gap={20} />
      </ReactFlow>
    </div>
  ) : null;
}

export default Flow;
