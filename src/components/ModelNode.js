import React, { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useSelector } from "react-redux";
import ModelAttribute from "./ModelAttribute";

function ModelNode({ data }) {
  const { entries } = useSelector((state) => state.entries);
  const currModel = data.value;

  return (
    <div className="model-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <p>{currModel.name}</p>
        {/* <button onClick={}>+</button> */}
        {entries
          .filter((entry) => entry.modelId == currModel.id)
          .map((entry) => (
            <ModelAttribute entry={entry} />
          ))}
        <button>+</button>
      </div>

      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default ModelNode;
