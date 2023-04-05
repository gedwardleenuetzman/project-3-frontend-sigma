import { Sequelize, DataTypes } from "sequelize"
import db from "/sql/db"

export const orders = db.define('v3_orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    server_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
})