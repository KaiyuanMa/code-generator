const express = require("express");
const router = express.Router();
const { isLoggedIn, haveAccess } = require("./middleware");
const { DataSet, Model, Entry, Validation } = require("../db");

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

router.post("/:dataSetId", isLoggedIn, async (req, res, next) => {
  try {
    await DataSet.update(req.body, {
      where: { id: req.params.dataSetId },
    });
    res.sendStatus(201);
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

//Entry Routes
router.get(
  "/:dataSetId/model/:modelId/entry",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(await Entry.findAll({ where: { modelId: req.params.modelId } }));
    } catch (ex) {
      next(ex);
    }
  }
);

router.get(
  "/:dataSetId/model/:modelId/entry/:entryId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(await Entry.findByPk(req.params.entryId));
    } catch (ex) {
      next(ex);
    }
  }
);

router.post(
  "/:dataSetId/model/:modelId/entry",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.status(201).send(
        await Entry.create({
          name: req.body.name,
          type: req.body.type,
          autoIncrement: req.body.autoIncrement,
          defaultValue: req.body.defaultValue,
          unique: req.body.unique,
          allowNull: req.body.allowNull,
          primaryKey: req.body.primaryKey,
          entryId: req.params.dataSetId,
        })
      );
    } catch (ex) {
      next(ex);
    }
  }
);

router.delete(
  "/:dataSetId/model/:modelId/entry/:entryId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      const entry = await Entry.findByPk(req.params.entryId);
      await entry.destroy();
      res.sendStatus(202);
    } catch (ex) {
      next(ex);
    }
  }
);

router.put(
  "/:dataSetId/model/:modelId/entry/:entryId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      await Entry.update(req.body, { where: { id: req.params.entryId } });
      res.sendStatus(201);
    } catch (ex) {
      next(ex);
    }
  }
);

//Validation Routes
router.get(
  "/:dataSetId/model/:modelId/entry/:entryId/validation",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(
        await Validation.findAll({ where: { entryId: req.params.entryId } })
      );
    } catch (ex) {
      next(ex);
    }
  }
);

router.get(
  "/:dataSetId/model/:modelId/entry/:entryId/validation/:validationId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(await Validation.findByPk(req.params.validationId));
    } catch (ex) {
      next(ex);
    }
  }
);

router.post(
  "/:dataSetId/model/:modelId/entry/:entryId/validation",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.status(201).send(
        await Validation.create({
          name: req.body.name,
          parameter: req.body.parameter,
          entryId: req.params.entryId,
        })
      );
    } catch (ex) {
      next(ex);
    }
  }
);

router.delete(
  "/:dataSetId/model/:modelId/entry/:entryId/validation/:validationId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      const validation = await Validation.findByPk(req.params.validationId);
      await validation.destroy();
      res.sendStatus(202);
    } catch (ex) {
      next(ex);
    }
  }
);

router.put(
  "/:dataSetId/model/:modelId/entry/:entryId/validation/:validationId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      await Validation.update(req.body, {
        where: { id: req.params.validationId },
      });
      res.sendStatus(201);
    } catch (ex) {
      next(ex);
    }
  }
);

module.exports = router;
