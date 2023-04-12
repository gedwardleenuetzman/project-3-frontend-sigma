import * as Models from "sql/models";
import { Op } from "sequelize";

const PAGE_SIZE = 10;

export default async function handler(req, res) {
    console.log("Received Ingredient search req")

    if (req.method === "GET") {
        console.log("Making Ingredient search req")

        const { page = 1, filter = "" } = req.query;
        const offset = (page - 1) * PAGE_SIZE;

        const whereClause = {
            [Op.or]: [
                { name: { [Op.iLike]: `%${filter}%` } },
                { description: { [Op.iLike]: `%${filter}%` } },
            ],
        };

        const result = await Models.Ingredients.findAndCountAll({
            where: whereClause,
            limit: PAGE_SIZE,
            offset: offset,
        });
        
        console.log("Received Ingredient search count: ", result.count)

        const pages = Math.ceil(result.count / PAGE_SIZE);

        res.status(200).json({ ...result, pages });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
