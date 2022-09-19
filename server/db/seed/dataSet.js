const { DataSet } = require("../index");

const createAndSeedDataSet = async (users) => {
  try {
    const _DataSet = [
      {
        name: "fooDataSet_1",
        userId: users[0].dataValues.id,
      },
      {
        name: "fooDataSet_2",
        userId: users[0].dataValues.id,
      },
      {
        name: "fooDataSet_3",
        userId: users[0].dataValues.id,
      },
      {
        name: "barDataSet",
        userId: users[1].id,
      },
      {
        name: "markDataSet",
        userId: users[2].id,
      },
    ];
    const dataSets = await Promise.all(
      _DataSet.map((dataSet) => DataSet.create(dataSet))
    );
    return dataSets;
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedDataSet;
