import React, { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import ModelAttribute from "./ModelAttribute";
import { addModelEntry, editModelAC } from "../state/actionCreators/modelsAC";

function ModelNode({ data }) {
  const [editModelName, setEditModelName] = useState(false);
  const dispatch = useDispatch();
  const { models } = useSelector((state) => state.models);
  let model = {};
  const modelId = data.modelId;
  if (models.length > 1) {
    model = models.find((model) => model.id == modelId);
  }
  const [modelName, setModelName] = useState(model.name);

  useEffect(() => {
    if (models.length > 1) {
      model = models.find((model) => model.id == modelId);
    }
    console.log(model);
  }, [models]);

  const handelClick = () => {
    dispatch(addModelEntry(modelId));
  };

  const changeModelName = (ev) => {
    ev.preventDefault();
    setEditModelName(false);
    dispatch(editModelAC(modelId, { name: modelName }));
  };

  return models.length > 0 ? (
    <div className="model-node">
      <Handle type="target" position={Position.Top} />
      <div>
        {!editModelName ? (
          <p onClick={() => setEditModelName((prev) => !prev)}>{modelName}</p>
        ) : (
          <form action="" onSubmit={changeModelName}>
            <input
              type="text"
              placeholder={model.name}
              value={modelName}
              onChange={(ev) => setModelName(ev.target.value)}
            />
          </form>
        )}
        {model.entries
          ? model.entries.map((entry) => <ModelAttribute entry={entry} />)
          : null}
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
