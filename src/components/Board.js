import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
} from "react-flow-renderer";
import { useSelector } from "react-redux";

import ModelNode from "./ModelNode";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "node-1",
    type: "model",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { model: ModelNode };

function Flow() {
  const { models } = useSelector((state) => state.models);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const defaultEdgeOptions = { animated: true };

  //only for testing
  useEffect(() => {
    setNodes([
      {
        id: "node-1",
        type: "model",
        position: { x: 0, y: 0 },
        data: { value: models[0] },
      },
    ]);
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

  return (
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
  );
}

export default Flow;
