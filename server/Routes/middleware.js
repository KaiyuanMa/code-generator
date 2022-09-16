const { User, DataSet } = require("../db");

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
    const response = await DataSet.findByPk(req.params.dataSetId);
    if (response.userId != req.user.id) throw "Wrong user";
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
  haveAccess,
};
