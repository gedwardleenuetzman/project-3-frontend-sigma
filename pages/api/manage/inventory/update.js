import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id, name, description, image, threshold, quantity } = req.body;
        const item = await Models.Ingredient.findByPk(id);

        if (item) {
            await item.update({ 
                name: name,
                description: description,
                image: image,
                threshold: threshold,
                quantity: quantity,
            });

            res.status(200).json({ message: 'Ingredient updated successfully' });
        } else {
            res.status(404).json({ message: 'Ingredient not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}