const { Model } = require("../index");

const createAndSeedModel = async (datasets) => {
  try {
    const _MODEL = [
      {
        name: "parent",
        dataSetId: datasets[0].id,
      },
      {
        name: "childrenA",
        dataSetId: datasets[0].id,
      },
      {
        name: "childrenB",
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
    const [banana, monkey] = await Promise.all([
      Model.create({
        name: 'banana',
        dataSetId: datasets[0].id,
      }),
      Model.create({
        name: 'Monkey',
        connectionType: 'hasMany',
        dataSetId: datasets[0].id,
      })
    ])
    await monkey.update({modelId: banana.id})
    
    const models = await Promise.all(
      _MODEL.map((model) => Model.create(model))
    );
    return models;
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedModel;
