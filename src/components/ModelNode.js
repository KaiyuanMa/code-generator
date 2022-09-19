import React, { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import ModelAttribute from "./ModelAttribute";
import { addModelEntry } from "../state/actionCreators/modelsAC";

function ModelNode({ data }) {
  const dispatch = useDispatch();
  const { models } = useSelector((state) => state.models);
  let model = {};
  const modelId = data.modelId;
  if (models.length > 1) {
    model = models.find((model) => model.id == modelId);
  }
  useEffect(() => {
    if (models.length > 1) {
      model = models.find((model) => model.id == modelId);
    }
    console.log(model);
  }, [models]);

  const handelClick = () => {
    dispatch(addModelEntry(modelId));
  };

  return models.length > 0 ? (
    <div className="model-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <p>{model.name}</p>
        {model.entries.map((entry) => (
          <ModelAttribute entry={entry} />
        ))}
        <button
          onClick={() => {
            handelClick();
          }}
        >
          +
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ) : null;
}

export default ModelNode;
