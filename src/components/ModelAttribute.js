import React, { useState } from "react";

function ModelAttribute(prop) {
  const entry = prop.entry;
  const [name, setName] = useState(entry.name);
  return (
    <div>
      <input value={name} placeholder="name" />
    </div>
  );
}

export default ModelAttribute;
