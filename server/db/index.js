const conn = require("./conn");
const User = require("./User");
const Model = require("./Model");
const Entry = require("./Entry");
const Validation = require("./Validation");
const DataSet = require("./DataSet");
const Node = require("./Node");
const Edge = require("./Edge");

User.hasMany(DataSet);
DataSet.hasMany(Model);
DataSet.hasMany(Node);
DataSet.hasMany(Edge);
Model.hasMany(Edge);
Model.hasOne(Node);
Model.hasMany(Entry);
Model.hasMany(Edge, { foreignKey: "sourceModelId" });
Model.hasMany(Edge, { foreignKey: "targetModelId" });

Entry.hasMany(Validation);

module.exports = {
  conn,
  User,
  Model,
  Entry,
  Validation,
  DataSet,
  Node,
  Edge,
};

// DataSet: id, name, userId
// Model: id, name, DataSetId
