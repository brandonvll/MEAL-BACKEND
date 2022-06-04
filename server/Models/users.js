const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../Conectdb/dataBase');

const Users = db.define('users', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal',
    enum: ['normal', 'admin'],
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    dafaultValue: true,
  },
});

module.exports = Users;
