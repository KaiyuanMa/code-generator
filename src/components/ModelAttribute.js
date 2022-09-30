import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteModelEntry,
  updateModelEntryAC,
  addValidationAC,
} from "../state/actionCreators/modelsAC";
import ModelValidation from "./ModelValidation";

function ModelAttribute(prop) {
  const { models } = useSelector((state) => state.models);
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

  const [type, _setType] = useState(entry.type);
  const typeRef = useRef(type);
  const setType = (data) => {
    typeRef.current = data;
    _setType(data);
  };

  const inputHelper = (from, input) => {
    const entryForm = document.getElementById(`${entryId}-${from}`);
    const entryInput = document.getElementById(`${entryId}-${input}`);
    entryForm?.addEventListener("dblclick", function () {
      entryInput.disabled = false;
      entryInput.focus();
    });
    entryInput?.addEventListener("blur", function () {
      entryInput.disabled = true;
      updateEntry(input);
    });
    entryInput?.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 13) {
        entryInput.disabled = true;
      }
    });
  };

  const updateEntry = (property) => {
    if (property == "input")
      dispatch(updateModelEntryAC(modelId, entryId, { name: nameRef.current }));
    else if (property == "type")
      dispatch(updateModelEntryAC(modelId, entryId, { type: typeRef.current }));
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
      addValidationAC(modelId, entryId, { name: "test", entryId: entryId })
    );
    const entryContent = document.getElementById(`${entryId}-content`);
    entryContent.style.maxHeight = entryContent.scrollHeight + "px";
  };

  useEffect(() => {
    inputHelper("input-form", "input");
    inputHelper("type-form", "type");
  }, []);

  useEffect(() => {
    const entryBtn = document.getElementById(`${entryId}-btn`);
    const entryContent = document.getElementById(`${entryId}-content`);
    if (entryBtn?.classList?.contains("model-attribute-expand-btn-active")) {
      entryContent.style.maxHeight = entryContent.scrollHeight + "px";
    }
  }, [prop, models]);

  const buttonUpdate = (property) => {
    const params = {};
    params[property] = !entry[property];
    dispatch(updateModelEntryAC(modelId, entryId, params));
  };

  return (
    <div className="model-attribute-wrapper">
      <div className="model-attribute-header">
        <div className="model-attribute-header-content">
          <form
            id={`${entryId}-input-form`}
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
            <form id={`${entryId}-type-form`} className="model-type-form">
              <input
                value={type}
                placeholder="Enter or select type"
                id={`${entryId}-type`}
                onChange={(e) => setType(e.target.value)}
                disabled={true}
                className="model-type-input"
              ></input>
              <select
                onChange={(e) => {
                  setType(e.target.value);
                  updateEntry("type");
                }}
                className="model-type-select"
              >
                <option defaultChecked></option>
                <option value="Sequelize.STRING">Sequelize.STRING</option>
                <option value="Sequelize.TEXT">Sequelize.TEXT</option>
                <option value="Sequelize.BOOLEAN">Sequelize.BOOLEAN</option>
                <option value="Sequelize.INTEGER">Sequelize.INTEGER</option>
                <option value="Sequelize.UUID">Sequelize.UUID</option>
                <option value="Sequelize.JSON">Sequelize.JSON</option>
                <option value="Sequelize.STRING(100)">
                  Sequelize.STRING(100)
                </option>
                <option value="Sequelize.STRING.BINARY">
                  Sequelize.STRING.BINARY
                </option>
                <option value="Sequelize.CHAR">Sequelize.CHAR</option>
                <option value="Sequelize.CHAR(100)">Sequelize.CHAR(100)</option>
                <option value="Sequelize.CHAR.BINARY">
                  Sequelize.CHAR.BINARY
                </option>
                <option value="Sequelize.CITEXT">Sequelize.CITEXT</option>
                <option value="Sequelize.TSVECTOR">Sequelize.TSVECTOR</option>
                <option value="Sequelize.SMALLINT">Sequelize.SMALLINT</option>
                <option value="Sequelize.BIGINT">Sequelize.BIGINT</option>
                <option value="Sequelize.JSONB">Sequelize.JSONB</option>
              </select>
            </form>
            {name == "id" ? (
              <div className="model-attribute-btn-group">
                <button
                  onClick={() => {
                    buttonUpdate("autoIncrement");
                  }}
                >
                  autoIncrement
                </button>
                <button
                  onClick={() => {
                    buttonUpdate("primaryKey");
                  }}
                >
                  primaryKey
                </button>
              </div>
            ) : (
              <div className="model-attribute-btn-group">
                <button
                  onClick={() => {
                    buttonUpdate("unique");
                  }}
                >
                  unique
                </button>
                <button
                  onClick={() => {
                    buttonUpdate("allowNull");
                  }}
                >
                  allowNull
                </button>
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
        {entry.validations
          ? entry.validations.map((validation) => (
              <ModelValidation
                validation={validation}
                modelId={modelId}
                key={validation.id}
              />
            ))
          : null}
        <button
          onClick={() => {
            AddValidation();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ModelAttribute;
