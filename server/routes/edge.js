const express = require("express");
const router = express.Router();
const { isLoggedIn, haveAccess } = require("./middleware");
const { Model, DataSet, Edge } = require("../db");

//GET

router.get(
  "/model/:modelId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(await Edge.findAll({ where: { modelId: req.params.modelId } }));
    } catch (ex) {
      next(ex);
    }
  }
);

router.get("/:dataSetId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    res.send(
      await Edge.findAll({ where: { dataSetId: req.params.dataSetId } })
    );
  } catch (ex) {
    next(ex);
  }
});

//DELETE

router.delete("/:edgeId", isLoggedIn, async (req, res, next) => {
  try {
    const edge = await Edge.findByPk(req.params.edgeId);
    edge.destroy();
    res.sendStatus(202);
  } catch (ex) {
    console.log(ex);
  }
});

//POST
router.post("/", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const model = await Model.findByPk(req.body.modelId);
    const dataSet = await DataSet.findByPk(model.dataSetId);
    if (dataSet.userId != req.user.id) throw "Wrong User";
    res.send(await Edge.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

//PUT
router.put("/:edgeId", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await Edge.update(req.body, { where: { id: req.params.edgeId } }));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
