import * as Models from "sql/models"

import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id } = req.body;
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(401).json({ error: 'You must be authenticated to access this resource.' });
        }
      
        const user = await Models.Users.findOne({ where: { email: session.user.email } })
      
        if (!user.manager_permissions) {
            return res.status(401).json({ error: 'Only managers have access to this resource '})
        }
        
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