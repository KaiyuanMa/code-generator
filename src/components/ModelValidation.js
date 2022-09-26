import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteValidation,
  updateValidation,
} from "../state/actionCreators/modelsAC";

function ModelValidation(prop) {
  const dispatch = useDispatch();
  const validation = prop.validation;
  const modelId = prop.modelId;
  const entryId = validation.entryId;
  const [param, _setParam] = useState(validation.parameter);
  const paramRef = useRef(param);
  const setParam = (data) => {
    paramRef.current = data;
    _setParam(data);
  };

  const inputHelper = () => {
    const validationForm = document.getElementById(`${validation.id}-form`);
    const validationInput = document.getElementById(`${validation.id}-input`);
    validationForm?.addEventListener("dblclick", function () {
      validationInput.disabled = false;
      validationInput.focus();
    });
    validationInput?.addEventListener("blur", function () {
      validationInput.disabled = true;
      updateValidationParams();
    });
    validationInput?.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 13) {
        validationInput.disabled = true;
      }
    });
  };

  const updateValidationParams = async () => {
    dispatch(
      updateValidation(modelId, entryId, validation.id, {
        parameter: paramRef.current,
      })
    );
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    updateValidationParams();
  };

  const handelDelete = () => {};

  useEffect(() => {
    inputHelper();
  }, []);

  return (
    <div className="model-validation-list-item">
      <div>{`${validation.name}: `}</div>
      <form id={`${validation.id}-form`} onSubmit={handelSubmit}>
        <input
          value={param}
          id={`${validation.id}-input`}
          onChange={(e) => setParam(e.target.value)}
          disabled={true}
        />
      </form>
      <button
        onClick={() =>
          dispatch(deleteValidation(modelId, entryId, validation.id))
        }
      >
        X
      </button>
    </div>
  );
}

export default ModelValidation;
