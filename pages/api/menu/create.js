import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, image, description, threshold, quantity } = req.body;

        await Models.Products.create({ 
            name: name,
            image: image,
            description: description,
            threshold: threshold,
            quantity: quantity,
        });

        res.status(201).json({ message: 'Ingredient created successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}