import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteValidation,
  updateValidation,
} from "../state/actionCreators/modelsAC";

import { AiOutlineClose } from 'react-icons/ai'

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

  const [name, _setName] = useState(validation.name);
  const nameRef = useRef(param);
  const setName = (data) => {
    nameRef.current = data;
    _setName(data);
  };

  const inputHelper = (param) => {
    const validationForm = document.getElementById(
      `${validation.id}-${param}-form`
    );
    const validationInput = document.getElementById(
      `${validation.id}-${param}`
    );
    validationForm?.addEventListener("dblclick", function () {
      validationInput.disabled = false;
      validationInput.focus();
    });
    validationInput?.addEventListener("blur", function () {
      validationInput.disabled = true;
      updateValidationParams(param);
    });
    validationInput?.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === 13) {
        validationInput.disabled = true;
      }
    });
  };

  const updateValidationParams = async (param) => {
    if (param == "input")
      dispatch(
        updateValidation(modelId, entryId, validation.id, {
          parameter: paramRef.current,
        })
      );
    else if (param == "name")
      dispatch(
        updateValidation(modelId, entryId, validation.id, {
          name: nameRef.current,
        })
      );
  };

  useEffect(() => {
    inputHelper("name");
    inputHelper("input");
  }, []);

  return (
    <div className="model-validation-list-item">
      <form id={`${validation.id}-name-form`}>
        <input
          value={name}
          id={`${validation.id}-name`}
          onChange={(e) => setName(e.target.value)}
          disabled={true}
        />
      </form>
      <form id={`${validation.id}-input-form`}>
        <input
          value={param}
          id={`${validation.id}-input`}
          onChange={(e) => setParam(e.target.value)}
          disabled={true}
        />
      </form>
      <AiOutlineClose 
        onClick={() =>
          dispatch(deleteValidation(modelId, entryId, validation.id))
        }
      />
    </div>
  );
}

export default ModelValidation;
