var express = require("express");
var router = express.Router();
var model = require("../models");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await model.users.findAll({});
    if (users.length !== 0) {
      res.json({
        status: "OK",
        messages: "",
        data: users,
      });
    } else {
      res.json({
        status: "ERROR",
        messages: "EMPTY",
        data: {},
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

/* POST users listing. */
router.post("/", async function (req, res, next) {
  try {
    const { name, email } = req.body;
    const users = await model.users.create({
      name,
      email,
    });
    if (users) {
      res.status(201).json({
        status: "OK",
        messages: "User create successfully",
        data: users,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

/* UPDATE users listing. */
router.patch("/:id", async function (req, res, next) {
  try {
    const usersId = req.params.id;
    const { name, email } = req.body;
    const users = await model.users.update(
      {
        name,
        email,
      },
      {
        where: {
          id: usersId,
        },
      }
    );
    if (users) {
      res.json({
        status: "OK",
        messages: "User updated successfully",
        data: users,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

/* DELETE users listing. */
router.delete("/:id", async function (req, res, next) {
  try {
    const usersId = req.params.id;
    const users = await model.users.destroy({
      where: {
        id: usersId,
      },
    });
    if (users) {
      res.json({
        status: "OK",
        messages: "User has ben deleted",
        data: users,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

module.exports = router;
