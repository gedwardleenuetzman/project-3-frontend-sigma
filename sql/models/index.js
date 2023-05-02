import db from "sql/db"

export * from "./users";
export * from "./ingredients";
export * from "./products";
export * from "./productIngredients";
export * from "./orders";
export * from "./orderProducts";
export * from "./textFiles";

// console.log("syncing sequelize database")

// db.sync({ force: true })
//     .then(() => {
//         console.log('Database schema force updated successfully');
//     })
//     .catch((err) => {
//         console.error('Error updating database schema:', err);
//     }); 
 
// console.log("sequelize database synced")