const { User, DataSet, Model, Entry, Validation } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

const haveAccess = async (req, res, next) => {
  try {
    const dataSet = await DataSet.findByPk(req.params.dataSetId);
    if (dataSet.userId != req.user.id) throw "Wrong user";
    if (req.params.modelId) {
      const model = await Model.findByPk(req.params.modelId);
      if (model.dataSetId != req.params.dataSetId) throw "Wrong user";
      if (req.params.entryId) {
        const entry = await Entry.findByPk(req.params.entryId);
        if (entry.modelId != req.params.modelId) throw "Wrong user";
        if (req.params.validationId) {
          const validation = await Validation.findByPk(req.params.validationId);
          if (validation.entryId != req.params.entryId) throw "Wrong user";
        }
      }
    }
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
  haveAccess,
};
