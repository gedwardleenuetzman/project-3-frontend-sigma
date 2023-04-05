import { Sequelize, DataTypes } from "sequelize"
import db from "/sql/db"
  
export const users = db.define('v3_users', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    manager_permissions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    server_permissions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});