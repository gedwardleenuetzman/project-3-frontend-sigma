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
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "https://d1fd34dzzl09j.cloudfront.net/Images/CFACOM/Home%20Page%20Refresh/Home%20Page%20Refresh%20V2/Waffle_Fry_Lifestyle_317x322.png?h=322&w=317&la=en",
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

// for (let i = 0; i < 100; i++) {
//     Ingredients.create({
//         name: i,
//         description: "test desc " + i,
//         threshold: (i % 2 == 0) ? 500 : 100,
//         quantity: (i * 2),
//     })
// }

export default Ingredients