const conn = require("./conn");
const { Sequelize } = conn;

const Model = conn.define("model", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  connectionType: {
    type: Sequelize.ENUM(),
    values: ['hasMany', 'belongsTo']
  }
});

module.exports = Model;
