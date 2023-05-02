import { Sequelize, DataTypes } from "sequelize"
import db from "/sql/db"

export const orderProducts = db.define('v3_order_products', {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    product_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },

    product_total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },

    "createdAt": {
        type: DataTypes.DATE,
        allowNull: false,
    },
})

export default orderProducts