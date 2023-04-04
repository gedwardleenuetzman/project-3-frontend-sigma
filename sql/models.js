const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});
  
const User = sequelize.define('User', {
    firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    },
});

const Ingredient = sequelize.define('Ingredient', {

})

const Product = sequelize.define('Ingredient', {

})

module.exports = { User, sequelize }