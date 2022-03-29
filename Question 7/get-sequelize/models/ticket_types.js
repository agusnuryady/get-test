"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ticket_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ticket_types.belongsTo(models.events, {
        foreignKey: "id",
      });
      ticket_types.hasMany(models.transactions, {
        foreignKey: "ticket_type_id",
        sourceKey: "id",
        as: "tr",
      });
    }
  }
  ticket_types.init(
    {
      event_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      capacity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ticket_types",
    }
  );
  return ticket_types;
};
