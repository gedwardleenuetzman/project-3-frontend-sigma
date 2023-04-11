import * as Models from "sql/models"
import { Op } from 'sequelize';

const PAGE_SIZE = 10

export default async function handler(req, res) {
    const { page = 1, searchQuery = '' } = req.query;
    const offset = (page - 1) * PAGE_SIZE;

    const whereClause = {
        [Op.or]: [
            { name: { [Op.iLike]: `%${searchQuery}%` } },
            { description: { [Op.iLike]: `%${searchQuery}%` } },
        ],
    };
  
    const result = await db.Product.findAndCountAll({
        where: whereClause,
        limit: PAGE_SIZE,
        offset: offset,
    });
  
    res.status(200).json(result);
}