const { Entry } = require("../index");

const createAndSeedEntry = async (models) => {
  try {
    const _ENTRY = [
      {
        name: "id",
        type: "SequeLize.UUID",
        defaultValue: "SequeLize.UUIDV4",
        primaryKey: true,
        modelId: models[0].id,
      },
      {
        name: "username",
        type: "SequeLize.STRING",
        allowNull: false,
        unique: true,
        modelId: models[0].id,
      },
      {
        name: "email",
        type: "SequeLize.STRING",
        unique: true,
        modelId: models[0].id,
      },
    ];
    const entries = await Promise.all(
      _ENTRY.map((entry) => Entry.create(entry))
    );
    return entries;
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedEntry;
