const express = require("express");
const router = express.Router();
const { isLoggedIn, haveAccess } = require("./middleware");
const { DataSet, Model } = require("../db");

//deleted route protection for testing

//DataSetRoutes

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await DataSet.findAll({ where: { userId: req.user.id } }));
  } catch (ex) {
    next(ex);
  }
});

router.get("/:dataSetId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    res.send(await DataSet.findByPk(req.params.dataSetId));
  } catch (ex) {
    next(ex);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(
      await DataSet.create({
        name: req.body.name,
        userId: req.user.id,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:dataSetId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const dataSet = await DataSet.findByPk(req.params.dataSetId);
    await dataSet.destroy();
    res.sendStatus(202);
  } catch (ex) {
    next(ex);
  }
});

//Model Routes

router.get(
  "/:dataSetId/model",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(
        await Model.findAll({
          where: { dataSetId: req.params.dataSetId },
        })
      );
    } catch (ex) {
      next(ex);
    }
  }
);

router.get(
  "/:dataSetId/model/:modelId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(await Model.findByPk(req.params.modelId));
    } catch (ex) {
      next(ex);
    }
  }
);

router.delete(
  "/:dataSetId/model/:modelId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      const model = await Model.findByPk(req.params.modelId);
      model.destroy();
      res.sendStatus(202);
    } catch (ex) {
      next(ex);
    }
  }
);

router.post(
  "/:dataSetId/model",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.status(201).send(
        await Model.create({
          name: req.body.name,
          dataSetId: req.params.dataSetId,
        })
      );
    } catch (ex) {
      next(ex);
    }
  }
);

module.exports = router;
