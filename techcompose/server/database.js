
const Sequelize=require("sequelize")
const mysql=require("mysql2")


  const sequelize = new Sequelize('techcompose', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });



  
module.exports =sequelize