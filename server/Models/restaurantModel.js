const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../Conectdb/dataBase");

const Restaurant = db.define("restaurant", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    dafaultValue: true,
  },
});

module.exports = Restaurant;
