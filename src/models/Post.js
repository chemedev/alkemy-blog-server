const { DataTypes } = require('sequelize')
const db = require('../database')

const Category = require('./Category')

const Expense = db.define(
  'posts',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: 'Title length must be between 3 and 50 chrs.'
        }
      }
    },
    content: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: 'Post content length must be between 3 and 255 chrs.'
        }
      }
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        contains: {
          args: ['jpeg', 'jpg', 'png', 'webp'],
          msg: 'Valid extensions for image upload are jpeg, jpg, png and webp.'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    }
  },
  {
    paranoid: true
  }
)

module.exports = Expense
