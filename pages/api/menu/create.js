import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, image, description, price } = req.body;

        await Models.Products.create({ 
            name: name,
            image: image,
            description: description,
            price: price,
        });

        res.status(201).json({ message: 'Product created successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}