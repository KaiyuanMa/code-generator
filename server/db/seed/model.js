const { Model } = require("../index");

const createAndSeedModel = async (datasets) => {
  try {
    const _MODEL = [
      {
        name: "user",
        dataSetId: datasets[0].id,
      },
      {
        name: "user",
        dataSetId: datasets[1].id,
      },
      {
        name: "user",
        dataSetId: datasets[2].id,
      },
    ];
    const models = await Promise.all(
      _MODEL.map((model) => Model.create(model))
    );
    return models;
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedModel;
