"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      events.hasMany(models.ticket_types, { foreignKey: "event_id" });
      events.hasMany(models.user_likes, {
        foreignKey: "category",
        sourceKey: "category",
        as: "ul",
      });
    }
  }
  events.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      start_datetime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "events",
    }
  );
  return events;
};
