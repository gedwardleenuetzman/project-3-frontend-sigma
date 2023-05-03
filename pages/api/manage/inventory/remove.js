import * as Models from "sql/models"

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Removes the item in the table dependent on the id that is given through functions throughout the project
 */
export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id } = req.body;
        const item = await Models.Ingredients.findByPk(id);

        if (item) {
            await item.update({
                enabled: false
            });

            res.status(200).json({ message: 'Ingredient removed successfully' });
        } else {
            res.status(404).json({ message: 'Ingredient not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}