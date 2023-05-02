import db from "sql/db"
import Ingredients from "sql/models/ingredients"

const { Op } = require('sequelize');

export default async function handler(req, res) {
    if(req.method === "GET"){
    try {
        // Find all ingredients that need restocking
        const ingredients = await Ingredients.findAll({
        where: {
            quantity: {
            [Op.lt]: db.Sequelize.col('threshold')
            }
        }
        });

        // Send back an array of the ingredients that need restocking
        res.send(ingredients);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
}