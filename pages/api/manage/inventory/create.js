import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, image, threshold, quantity } = req.body;

        await Models.Ingredients.create({ 
            name: name,
            image: image,
            threshold: threshold,
            quantity: quantity,
        });

        res.status(201).json({ message: 'Ingredient created successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}