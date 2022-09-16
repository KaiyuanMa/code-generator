const reducer = (
  state = {
    entries: [
      {
        id: 1,
        name: "id",
        type: "Sequelize.UUID",
        defaultValue: "Sequelize.UUIDV4",
        primaryKey: "true",
        modelId: 1,
      },
      {
        id: 2,
        name: "username",
        type: "Sequelize.STRING",
        allNull: false,
        unique: true,
        modelId: 1,
      },
      {
        id: 3,
        name: "email",
        type: "Sequelize.STRING",
        unique: true,
        modelId: 1,
      },
    ],
  },
  action
) => {
  switch (action.type) {
    case "SET_ENTRIES":
      return { ...state, entries: action.entries };
    case "ADD_ENTRY":
      return { ...state, entries: [...state.entries, action.entry] };
    case "UPDATE_ENTRY":
      const dummy = state.entries;
      for (let entry of dummy) {
        if (entry.id == action.entryId) {
          entry = action.entry;
        }
      }
      return { ...state, entries: dummy };
    case "DEL_ENTRY":
      return {
        ...state,
        entries: state.entries.filter((entry) => {
          action.entryId !== entry.id;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
