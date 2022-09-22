import React, { useCallback, useEffect, useState, useRef } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import ModelAttribute from "./ModelAttribute";
import {
  addModelEntry,
  editModelAC,
  deleteModelAC,
} from "../state/actionCreators/modelsAC";
import { apiDeleteModel } from "../api/model";
import { apiDeleteNode } from "../api/node";

function ModelNode(props) {
  const dispatch = useDispatch();
  const { models } = useSelector((state) => state.models);
  const data = props.data;
  let model = {};
  const modelId = data.modelId;

  if (models.length > 1) {
    model = models.find((model) => model.id == modelId);
  }
  const [modelName, _setModelName] = useState(model.name);
  const modelNameRef = useRef(modelName);
  const setModelName = (data) => {
    modelNameRef.current = data;
    _setModelName(data);
  };

  useEffect(() => {
    if (models.length > 1) {
      model = models.find((model) => model.id == modelId);
    }
    inputHelper();
  }, [models]);

  const handelClick = () => {
    dispatch(addModelEntry({ modelId: modelId }));
  };

  const inputHelper = () => {
    const modelForm = document.getElementById(`${modelId}-form`);
    const modelInput = document.getElementById(`${modelId}-input`);
    modelForm?.addEventListener("dblclick", function () {
      modelInput.disabled = false;
      modelInput.focus();
      console.log(1);
    });
    modelInput?.addEventListener("blur", function () {
      modelInput.disabled = true;
      updateModelName();
    });
    modelInput?.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 13) {
        modelInput.disabled = true;
      }
    });
  };

  const updateModelName = () => {
    dispatch(editModelAC(modelId, { name: modelNameRef.current }));
  };

  const handelSubmit = (ev) => {
    ev.preventDefault();
    updateModelName();
  };

  const handelDelete = () => {
    const deleteNodeAndModel = async (data) => {
      await apiDeleteNode(data.modelId);
      dispatch(deleteModelAC(data.modelId));
    };
    deleteNodeAndModel(data);
    data.deleteNode(props);
  };

  return models.length > 0 ? (
    <div className="model-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <div className="model-node-header">
          <button onClick={handelDelete}>x</button>
        </div>
        <form
          className="model-name-form"
          id={`${modelId}-form`}
          onSubmit={handelSubmit}
        >
          <input
            type="text"
            className="model-name-input"
            id={`${modelId}-input`}
            placeholder={model.name}
            value={modelName}
            disabled={true}
            onChange={(ev) => setModelName(ev.target.value)}
          />
        </form>
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
