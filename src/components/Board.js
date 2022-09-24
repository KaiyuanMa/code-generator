import React, { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getDataSetEdges } from "../api/edge";
import { getDataSetNode } from "../api/node";
import {
  addModelAC,
  setModelsAC,
  deleteModelAC,
  addModelEntry,
} from "../state/actionCreators/modelsAC";
import { ZipButton } from "./zip";
import { apiAddModel } from "../api/model";
import { apiAddNode, apiDeleteNode, apiUpdateNode } from "../api/node";
import { apiAddEdge, apiDeleteEdgeByNode } from "../api/edge";

import ModelNode from "./ModelNode";
import ModelEdge from "./ModelEdge";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const nodeTypes = { model: ModelNode };
const edgeTypes = { modelEdge: ModelEdge };

function Flow() {
  const { dataSet } = useSelector((state) => state.dataSet);
  const { models } = useSelector((state) => state.models);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [newX, setNewX] = useState(200);
  const [newY, setNewY] = useState(200);
  const defaultEdgeOptions = { animated: true };
  const dispatch = useDispatch();

  //put fooDataSetId in here, only for testing

  const DataSetId = "4931bdff-14b2-4c10-9030-46791f678f38";

  const deleteNode = (node) => {
    onNodesChange([{ id: node.id, type: "remove" }]);
    //TODO: delete edges when deleting node on custom delete function
    // const currEdges = getConnectedEdges(
    //   [nodes.find((currNode) => currNode.id == node.id)],
    //   edges
    // );
    // console.log(currEdges);
    // for (let edge of currEdges) {
    //   setEdges((oldEdges) => {
    //     oldEdges.filter((curEdge) => curEdge.id != edge.id);
    //   });
    // }
  };

  const fetchData = async () => {
    let response = await getDataSetEdges(DataSetId);
    const edgeDummy = [];
    for (let edge of response.data) {
      edge.markerEnd = {
        type: MarkerType.ArrowClosed,
      };
      edgeDummy.push(edge);
    }
    setEdges(edgeDummy);
    response = await getDataSetNode(DataSetId);
    const nodeDummy = [];
    for (let node of response.data) {
      const curr = {};
      curr.id = node.id;
      curr.type = node.type;
      curr.dragHandle = ".model-node-header";
      curr.position = { x: node.positionX, y: node.positionY };
      curr.data = { modelId: node.modelId, deleteNode };
      nodeDummy.push(curr);
    }
    setNodes(nodeDummy);
  };

  useEffect(() => {
    dispatch(setModelsAC(DataSetId));
    fetchData();
  }, [dataSet]);

  useEffect(() => {
    console.log(1);
    fetchData();
  }, [models]);

  //TODO: useCallback ?, check documentation
  const handelClick = () => {
    const helper = async () => {
      const { data } = await apiAddModel({
        name: "test",
        dataSetId: DataSetId,
      });
      dispatch(addModelAC(data));
      console.log(data);
      const response = await apiAddNode({
        modelId: data.id,
        dataSetId: DataSetId,
        positionX: newX,
        positionY: newY,
        type: "model",
      });
      const node = response.data;
      const curr = {};
      curr.id = node.id;
      curr.type = node.type;
      curr.position = { x: newX, y: newY };
      curr.data = { modelId: node.modelId, deleteNode };
      curr.dragHandle = ".model-node-header";
      setNodes((nds) => nds.concat(curr));
      dispatch(
        addModelEntry({
          modelId: data.id,
          name: "id",
          autoIncrement: true,
          type: "Sequelize.INTEGER",
          primaryKey: true,
        })
      );
    };
    helper();
    setNewX(newX + 10);
    setNewY(newY + 10);
  };

  //
  const onNodesChange = useCallback((changes) => {
    setNodes((ns) => applyNodeChanges(changes, ns));
  }, []);
  const onEdgesChange = useCallback((changes) => {
    console.log(changes);
    setEdges((es) => applyEdgeChanges(changes, es));
    const deleteEdge = async (changeId) => {
      const idA = changeId.slice(16, 52);
      const idB = changeId.slice(53, 89);
      await apiDeleteEdgeByNode(idA, idB);
    };
    for (let change of changes) {
      console.log(change);
      if (change.type == "remove") {
        deleteEdge(change.id);
      }
    }
  }, []);
  const onConnect = useCallback(
    (connection) => {
      connection.type = "modelEdge";
      connection.markerEnd = {
        type: MarkerType.ArrowClosed,
      };
      setEdges((eds) => addEdge(connection, eds));
      const addEdgeHelper = async () => {
        connection.dataSetId = DataSetId;
        connection.label = "test";
        await apiAddEdge(connection);
      };
      addEdgeHelper();
    },
    [setEdges]
  );

  //
  const onNodesDelete = (nodes) => {
    const deleteNodeAndModel = async (node) => {
      await apiDeleteNode(node.data.modelId);
      dispatch(deleteModelAC(node.data.modelId));
    };
    for (let node of nodes) {
      deleteNodeAndModel(node);
    }
  };

  const onNodeDragStop = (event, node, nodes) => {
    const updateNode = async () => {
      await apiUpdateNode(node.data.modelId, {
        positionX: Math.round(node.position.x),
        positionY: Math.round(node.position.y),
      });
    };
    updateNode();
  };

  //
  return nodes.length > 1 ? (
    <div className="react-flow-wrapper">
      <ZipButton />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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
    </div>
  ) : null;
}

export default Flow;
