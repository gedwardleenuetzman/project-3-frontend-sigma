import * as Models from "sql/models";
import { Op } from "sequelize";

const PAGE_SIZE = 10;

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { page = 1, filter = "" } = req.query;
        const offset = parseInt((page - 1) * PAGE_SIZE) || 0; 

        let {count, rows} = (await Models.Products.findAndCountAll({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { name: { [Op.iLike]: `%${filter}%` } },
                            { description: { [Op.iLike]: `%${filter}%` } },
                        ],
                    },
                    { 
                        enabled: true 
                    }
                ]
            }, 
            order: [
                ['name', 'ASC'],
                ['description', 'ASC']
            ],
            limit: PAGE_SIZE, 
            offset: offset,  
        }))

        rows = rows.map(product => product.toJSON())

        for (let product of rows) {
            product.ingredients = []

            const productIngredients = (await Models.ProductIngredients.findAll({
                where: {
                    product_id: product.id
                }
            })).map(productIngredient => productIngredient.toJSON())

            for (const productIngredient of productIngredients) {
                product.ingredients.push({
                    quantity: productIngredient.ingredient_quantity,
                    ingredient: (await Models.Ingredients.findOne({
                        where: {
                            id: productIngredient.ingredient_id,
                        },
                    })).toJSON()
                })
            }
        }

        res.status(200).json({count: count, pages: Math.ceil(count / PAGE_SIZE), rows: rows});
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
