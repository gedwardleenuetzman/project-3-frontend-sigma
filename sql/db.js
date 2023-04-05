import { Sequelize, DataTypes } from "sequelize"

const db = new Sequelize(process.env.PG_SQL_DATABASE, process.env.PG_SQL_USERNAME, process.env.PG_SQL_PASSWORD, {
    host: process.env.PG_SQL_HOST,
    dialect: process.env.PG_SQL_DIALECT,
});

export default db