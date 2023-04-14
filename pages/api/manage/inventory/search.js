import * as Models from "sql/models";
import { Op } from "sequelize";

const PAGE_SIZE = 10;

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { page = 1, filter = "" } = req.query;
        const offset = parseInt((page - 1) * PAGE_SIZE) || 0;

        const whereClause = {
            [Op.and]: [
                {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${filter}%` } },
                    ],
                },
                { 
                    enabled: true 
                }
            ]
        };

        const orderClause = [
            ['name', 'ASC'],
        ]

        const result = await Models.Ingredients.findAndCountAll({
            where: whereClause, 
            order: orderClause,
            limit: PAGE_SIZE, 
            offset: offset,  
        });

        const pages = Math.ceil(result.count / PAGE_SIZE);

        res.status(200).json({ rows: result.rows, pages: pages });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
