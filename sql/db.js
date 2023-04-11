import { Sequelize } from "sequelize"

const db = new Sequelize({
    database: process.env.PG_SQL_DATABASE,
    username: process.env.PG_SQL_USERNAME,
    password: process.env.PG_SQL_PASSWORD,
    host: process.env.PG_SQL_HOST,
    dialect: process.env.PG_SQL_DIALECT,
});

export default db