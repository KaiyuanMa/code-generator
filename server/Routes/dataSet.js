const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middleware");
const { DataSet } = require("../db");

//deleted route protection for testing

router.get("/:dataSetId", async (req, res, next) => {
  try {
    const response = await DataSet.findByPk(req.params.dataSetId);
    // if (response.userId != req.user.id) throw "Wrong User";
    res.send(response);
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // if (req.body.userId !== req.user.id) throw "Wrong User";
    res.status(201).send(await DataSet.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:dataSetId", async (req, res, next) => {
  try {
    const response = await DataSet.findByPk(req.params.dataSetId);
    // if (response.userId != req.user.id) throw "Wrong User";
  } catch (ex) {
    next(ex);
  }
});
