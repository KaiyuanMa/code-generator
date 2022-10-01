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

import {AiOutlineClose} from 'react-icons/ai'
import {GrAdd} from 'react-icons/gr'

function ModelNode(props) {
  const dispatch = useDispatch();
  const { models } = useSelector((state) => state.models);
  const [model, setModel] = useState({});
  const [modelName, _setModelName] = useState("");
  const modelNameRef = useRef(modelName);
  const setModelName = (data) => {
    modelNameRef.current = data;
    _setModelName(data);
  };
  const data = props.data;
  const modelId = data.modelId;

  useEffect(() => {
    const currModel = models.find((model) => model.id == modelId);
    setModel(currModel);
    setModelName(currModel.name);
    inputHelper();
  }, [props]);

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

  const handelDelete = (ev) => {
    ev.preventDefault()
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
        <form
          className="model-name-form"
          id={`${modelId}-form`}
          onSubmit={handelSubmit}
        >
        <div className="model-node-header" style={{height:'3rem', display:'flex', alignItems:'center', color:'black', width:'100%', justifyContent:'space-between'}}> 
          <input
            type="text"
            className="model-name-input"
            id={`${modelId}-input`}
            placeholder={model.name}
            value={modelName}
            disabled={true}
            onChange={(ev) => setModelName(ev.target.value)}
            style={{fontSize:'2rem', background: 'rgba(0,0,0,0)', color:'black', textAlign:'center', border:'none'}}
          />
          <AiOutlineClose onClick={handelDelete} style={{backgroundColor:'black', color:'black', padding:'1rem', alignSelf:'flex-end'}}/>
        </div>
        </form>
        {model.entries
          ? model.entries.map((entry) => (
              <ModelAttribute entry={entry} key={entry.id} />
            ))
          : null}
          <GrAdd 
            onClick={() => {
              handelClick();
            }}
          />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ) : null;
}

export default ModelNode;
