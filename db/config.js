const Sequelize = require('sequelize')
const db = new Sequelize('postgres://Drisdon@localhost:5432/izzy_db')

module.exports = db;
