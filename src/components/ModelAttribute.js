import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteModelEntry } from "../state/actionCreators/modelsAC";

function ModelAttribute(prop) {
  const dispatch = useDispatch();
  const entry = prop.entry;
  const modelId = entry.modelId;
  const entryId = entry.id;
  const [name, setName] = useState(entry.name);
  
  return (
    <div>
      <input
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
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
