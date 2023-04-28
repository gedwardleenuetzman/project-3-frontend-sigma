import { Sequelize, DataTypes } from "sequelize"
import db from "/sql/db"

export const Orders = db.define('v3_daily_orders', {
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
})

export default Orders