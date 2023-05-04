import * as Models from "sql/models"

import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, image, description, price, ingredients } = req.body;
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(401).json({ error: 'You must be authenticated to access this resource.' });
        }
      
        const user = await Models.Users.findOne({ where: { email: session.user.email } })
      
        if (!user.manager_permissions) {
            return res.status(401).json({ error: 'Only managers have access to this resource '})
        }
        
        const product = await Models.Products.create({ 
            name: name,
            image: image,
            description: description,
            price: price,
        })

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