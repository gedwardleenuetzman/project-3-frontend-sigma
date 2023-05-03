import * as Models from "sql/models"

import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(401).json({ error: 'You must be authenticated to access this resource.' });
        }
      
        const user = await Models.Users.findOne({ where: { email: session.user.email } })

        console.log(user.toJSON())
        if (user) {
            res.status(200).json(user.toJSON());
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}