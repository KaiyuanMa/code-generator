import React from "react";
import { getBezierPath, getEdgeCenter } from "react-flow-renderer";

function ModelEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) {
  const foreignObjectSize = 100;
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="model-edge-foreign-object"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="model-edge-wrapper">
          <select>
            <option value="hasMany">hasMany</option>
            <option value="hasOne">hasOne</option>
            <option value="belongsTo">belongsTo</option>
            <option value="belongsToMany">belongsToMany</option>
          </select>
        </div>
      </foreignObject>
    </>
  );
}

export default ModelEdge;
