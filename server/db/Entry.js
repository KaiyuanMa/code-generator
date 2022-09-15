const conn = require("./conn");
const { Sequelize } = conn;

const Entry = conn.define("entry", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  autoIncrement: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  defaultValue: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  unique: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  primaryKey: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  connectionType: {
    type: Sequelize.STRING,
  }
});

module.exports = Entry;
