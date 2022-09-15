const { conn } = require("../index");
const seedUser = require("./user");
const createAndSeedDataSet = require("./dataSet");
const createAndSeedModel = require("./model");
const createAndSeedEntry = require("./entry");
const createAndSeedValidations = require("./validation");

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });
    const users = await seedUser();
    const dataSets = await createAndSeedDataSet(users);
    const models = await createAndSeedModel(dataSets);
    const entries = await createAndSeedEntry(models);
    const validations = await createAndSeedValidations(entries);
  } catch (ex) {
    console.log(ex);
  }
};

syncAndSeed();
