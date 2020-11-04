const { Sequelize } = require('sequelize')
module.exports = new Sequelize(process.env.MYSQL, { logging: false })
