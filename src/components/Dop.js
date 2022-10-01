import React, { useCallback ,useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  getConnectedEdges,
  useReactFlow,
} from "react-flow-renderer";


import { nodes as initialNodes, edges as initialEdges } from './initial-elements';

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const Dop = () => {
  const [nodes, setNodes, onNodesChange] = useState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{height:800}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
    >
      
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
    </div>
  );
};

export default Dop;
