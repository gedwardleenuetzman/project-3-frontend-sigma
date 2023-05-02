import { Sequelize, DataTypes } from "sequelize"
import db from "/sql/db"

export const TextFiles = db.define('v3_text_files', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

export default TextFiles