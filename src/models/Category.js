const { DataTypes } = require('sequelize')
const db = require('../database')

const Category = db.define(
  'category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    paranoid: true
  }
)

module.exports = Category
