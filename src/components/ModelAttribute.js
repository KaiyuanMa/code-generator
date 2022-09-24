import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteModelEntry,
  updateModelEntryAC,
  addValidation,
} from "../state/actionCreators/modelsAC";
import ModelValidation from "./ModelValidation";

function ModelAttribute(prop) {
  const dispatch = useDispatch();
  const entry = prop.entry;
  const modelId = entry.modelId;
  const entryId = entry.id;
  const [name, _setName] = useState(entry.name);
  const nameRef = useRef(name);
  const setName = (data) => {
    nameRef.current = data;
    _setName(data);
  };

  const inputHelper = () => {
    const entryForm = document.getElementById(`${entryId}-form`);
    const entryInput = document.getElementById(`${entryId}-input`);
    entryForm?.addEventListener("dblclick", function () {
      entryInput.disabled = false;
      entryInput.focus();
    });
    entryInput?.addEventListener("blur", function () {
      entryInput.disabled = true;
      updateEntryName();
    });
    entryInput?.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 13) {
        entryInput.disabled = true;
      }
    });
  };

  const updateEntryName = () => {
    dispatch(updateModelEntryAC(modelId, entryId, { name: nameRef.current }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    updateEntryName();
  };

  const showEntryContent = () => {
    const entryBtn = document.getElementById(`${entryId}-btn`);
    const entryContent = document.getElementById(`${entryId}-content`);
    entryBtn?.classList?.toggle("model-attribute-expand-btn-active");
    if (entryBtn?.classList?.contains("model-attribute-expand-btn-active")) {
      entryContent.style.maxHeight = entryContent.scrollHeight + "px";
    } else {
      entryContent.style.maxHeight = "0rem";
    }
  };

  const AddValidation = () => {
    dispatch(
      addValidation(modelId, entryId, { name: "test", entryId: entryId })
    );
  };

  useEffect(() => {
    inputHelper();
  }, []);

  return (
    <div className="model-attribute-wrapper">
      <div className="model-attribute-header">
        <div className="model-attribute-header-content">
          <form
            id={`${entryId}-form`}
            onSubmit={handelSubmit}
            className="model-attribute-header-content-form"
          >
            <input
              value={name}
              placeholder="name"
              id={`${entryId}-input`}
              onChange={(e) => setName(e.target.value)}
              disabled={true}
              className="model-attribute-header-content-input"
            />
          </form>
          <div className="model-attribute-header-btns">
            {name == "id" ? (
              <div>
                <button>autoIncrement</button>
                <button>primaryKey</button>
              </div>
            ) : (
              <div>
                <button>unique</button>
                <button>allowNull</button>
              </div>
            )}
            <button
              onClick={() => dispatch(deleteModelEntry(modelId, entryId))}
            >
              X
            </button>
          </div>
        </div>
        <button
          className="model-attribute-expand-btn"
          id={`${entryId}-btn`}
          onClick={showEntryContent}
        >
          open
        </button>
      </div>
      <div className="model-attribute-content" id={`${entryId}-content`}>
        {entry.validation && entry.validations.map((validation) => (
          <ModelValidation validation={validation} modelId={modelId} />
        ))}
        <button onClick={AddValidation}>+</button>
      </div>
    </div>
  );
}

export default ModelAttribute;
