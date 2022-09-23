const reducer = (state = { models: [] }, action) => {
  switch (action.type) {
    case "SET_MODELS":
      return { ...state, models: action.models };
    case "SET_MODEL":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          model = action.model;
          break;
        }
      }
      return state;
    case "ADD_MODEL":
      return { ...state, models: [...state.models, action.model] };
    case "DEL_MODEL":
      const dummy = state.models.filter((model) => action.modelId != model.id);
      return {
        ...state,
        models: dummy,
      };
    case "UPDATE_MODEL":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          model = action.model;
        }
      }
      return state;
    //Entry
    case "ADD_ENTRY":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          if (!model.entries) {
            model.entries = [action.entry];
          } else model.entries = [...model.entries, action.entry];
          break;
        }
      }
      return { ...state };
    case "DELETE_ENTRY":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          model.entries = model.entries.filter(
            (entry) => entry.id != action.entryId
          );
          break;
        }
      }
      return { ...state };
    case "UPDATE_ENTRY":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          for (let entry of model.entries) {
            if (entry.id == action.entryId) {
              entry = action.entry;
              break;
            }
          }
        }
      }
      return { ...state };
    //Validation
    case "ADD_VALIDATION":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          for (let entry of model.entries) {
            if (entry.id == action.entryId) {
              entry.validations = [...entry.validations, action.validation];
              break;
            }
          }
        }
      }
      return { ...state };
    case "DELETE_VALIDATION":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          for (let entry of model.entries) {
            if (entry.id == action.entryId) {
              entry.validations = entry.validations.filter(
                (validation) => validation.id != action.validationId
              );
              break;
            }
          }
        }
      }
      return { ...state };
    case "UPDATE_VALIDATION":
      for (let model of state.models) {
        if (model.id == action.modelId) {
          for (let entry of model.entries) {
            if (entry.id == action.entryId) {
              for (let validation of entry.validations) {
                if (validation.id == action.validationId) {
                  validation = action.validation;
                  break;
                }
              }
            }
          }
        }
      }
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
