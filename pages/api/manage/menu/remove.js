import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id } = req.body;
        const item = await Models.Products.findByPk(id);

        if (item) {
            await item.update({ 
                enabled: false
            });

            res.status(200).json({ message: 'Product removed successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}