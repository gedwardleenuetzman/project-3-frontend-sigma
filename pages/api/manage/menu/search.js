import * as Models from "sql/models";
import { Op } from "sequelize";

const PAGE_SIZE = 10;

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { page = 1, filter = "" } = req.query;
        const offset = parseInt((page - 1) * PAGE_SIZE) || 0; 

        const productIngredients = await Models.ProductIngredients.findAll()
        console.log(productIngredients)

        let result = await Models.Products.findAndCountAll({
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
        });

        let rows = result.rows

        for (let product of rows) {
            product.ingredients = []

            const productIngredients = await Models.ProductIngredients.findAll({
                where: {
                    product_id: product.id
                }
            })

            console.log("AAA", productIngredients)

            for (const productIngredient of productIngredients) {
                product.ingredients.push({
                    quantity: productIngredient.ingredient_quantity,
                    ingredient: await Models.Ingredients.findOne({
                        where: {
                            id: productIngredient.ingredient_id,
                        },
                    })
                })
            }
        }

        result.pages = Math.ceil(result.count / PAGE_SIZE)

        res.status(200).json(result);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
