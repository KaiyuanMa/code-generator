import React, { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useSelector } from "react-redux";
import ModelAttribute from "./ModelAttribute";

const handleStyle = { left: 10 };

function ModelNode(prop) {
  const { entries } = useSelector((state) => state.entries);
  const modelId = prop.modelId;

  return (
    <div className="model-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <p>Model Name</p>
        {/* <button onClick={}>+</button> */}
        {entries
          .filter((entry) => entry.modelId == modelId)
          .map((entry) => (
            <ModelAttribute entry={entry} />
          ))}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
      />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default ModelNode;
