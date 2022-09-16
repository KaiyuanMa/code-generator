import React, { useState } from "react";

function ModelAttribute(prop) {
  const entry = prop.entry;
  const [name, setName] = useState(entry.name);
  return (
    <div>
      <input value={name} placeholder="name" />
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
    </div>
  );
}

export default ModelAttribute;
