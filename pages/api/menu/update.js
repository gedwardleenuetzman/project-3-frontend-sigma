import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id, name, description, image, price } = req.body;
        const item = await Models.Products.findByPk(id);

        if (item) {
            await item.update({ 
                name: name,
                description: description,
                image: image,
                price: price,
            });

            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}