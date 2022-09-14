import React, { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import ModelAttribute from "./ModelAttribute";

const handleStyle = { left: 10 };

function ModelNode(prop) {
  // const { entries } = useSelector((state) => state.entries);
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="model-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <p>Model Name</p>
        <button>+</button>
        <ModelAttribute />
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
