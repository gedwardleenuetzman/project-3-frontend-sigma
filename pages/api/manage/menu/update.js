import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id, name, description, image, price, ingredients } = req.body;
        const item = await Models.Products.findByPk(id);

        if (item) {
            await item.update({ 
                name: name,
                description: description,
                image: image,
                price: price,
            });

            await Models.ProductIngredients.destroy({ 
                where: { 
                    product_id: id 
                } 
            })

            for (const item of ingredients) {
                await Models.ProductIngredients.create({
                    product_id: id,
                    ingredient_id: item.id,
                    ingredient_quantity: item.quantity,
                })
            }

            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}