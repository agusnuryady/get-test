var express = require("express");
var router = express.Router();
var model = require("../models");
var { Op, col, fn, where, literal } = require("sequelize");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const events = await model.events.findAll({
      include: [{ model: model.ticket_types }],
    });
    if (events.length !== 0) {
      res.json({
        status: "OK",
        messages: "",
        data: events,
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

router.get("/favourite/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const events = await model.events.findAll({
      where: {
        [Op.and]: [
          {
            "$ul.user_id$": userId,
          },
          where(fn("datediff", col("start_datetime"), fn("NOW")), {
            [Op.lte]: 60,
            [Op.gte]: 0,
          }),
        ],
      },
      include: [
        {
          model: model.ticket_types,
          attributes: [
            "id",
            "event_id",
            "name",
            "price",
            "capacity",
            // [fn("COUNT", col("tr")), "remainingCapacity"],
            // [
            //   literal(
            //     `(SELECT COUNT(*) FROM "transactions" WHERE "transactions"."user_id" != ${userId})`,
            //     "remainingCapacity"
            //   ),
            // ],
          ],
          include: [
            {
              model: model.transactions,
              as: "tr",
              require: true,
              where: { user_id: { [Op.ne]: userId } },
              attributes: [],
            },
          ],
        },
        {
          model: model.user_likes,
          as: "ul",
          required: false,
          attributes: [],
        },
      ],
    });
    if (events.length !== 0) {
      res.json({
        status: "OK",
        messages: "",
        data: events,
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

module.exports = router;
