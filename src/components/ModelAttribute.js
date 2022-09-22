import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteModelEntry,
  updateModelEntryAC,
} from "../state/actionCreators/modelsAC";

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

  useEffect(() => {
    inputHelper();
  }, []);

  return (
    <div>
      <form id={`${entryId}-form`} onSubmit={handelSubmit}>
        <input
          value={name}
          placeholder="name"
          id={`${entryId}-input`}
          onChange={(e) => setName(e.target.value)}
          disabled={true}
        />
      </form>
      <button>submit</button>
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
      <button onClick={() => dispatch(deleteModelEntry(modelId, entryId))}>
        X
      </button>
    </div>
  );
}

export default ModelAttribute;
