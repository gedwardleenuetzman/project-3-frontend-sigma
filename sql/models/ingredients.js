import { Sequelize, DataTypes } from "sequelize"
import db from "/sql/db"

export const Ingredients = db.define('v3_ingredients', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1000,
        validate: {
            min: 0
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },

    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
})

for (let i = 0; i < 100; i++) {
    Ingredients.create({
        name: i,
        description: "test desc " + i,
        threshold: (i % 2 == 0) ? 500 : null,
        quantity: (i * 2),
    })
}

export default Ingredients