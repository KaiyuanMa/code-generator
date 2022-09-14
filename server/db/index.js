const conn = require("./conn");
const User = require("./User");
const Model = require("./Model");
const Entry = require("./Entry");
const Validation = require("./Validation");
const DataSet = require("./DataSet");

User.hasMany(DataSet);
DataSet.hasMany(Model);
Model.hasMany(Entry);
Entry.hasMany(Validation);

module.exports = {
  conn,
  User,
  Model,
  Entry,
  Validation,
  DataSet,
};
