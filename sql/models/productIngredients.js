import { Sequelize, DataTypes } from "sequelize"
import db from "/sql/db"

export const ProductIngredients = db.define('v3_product_ingredients', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    ingredient_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default ProductIngredients