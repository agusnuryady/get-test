"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.belongsTo(models.users, { foreignKey: "id" });
      transactions.belongsTo(models.ticket_types, { foreignKey: "id" });
    }
  }
  transactions.init(
    {
      user_id: DataTypes.INTEGER,
      ticket_type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transactions;
};
