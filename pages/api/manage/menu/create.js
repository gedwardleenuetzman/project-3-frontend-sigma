import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, image, description, price, ingredients } = req.body;

        const product = await Models.Products.create({ 
            name: name,
            image: image,
            description: description,
            price: price,
        });

        for (const item of ingredients) {
            await Models.ProductIngredients.create({
                product_id: product.id,
                ingredient_id: item.id,
                ingredient_quantity: item.quantity,
            })
        }

        res.status(201).json({ message: 'Product created successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}