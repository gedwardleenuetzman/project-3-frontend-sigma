import * as Models from "sql/models"

import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body)
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(401).json({ error: 'You must be authenticated to access this resource.' });
        }
      
        const user = await Models.Users.findOne({ where: { email: session.user.email } })

        await user.update({
            manager_permissions: req.body.manager_permissions,
            server_permissions: req.body.server_permissions,
        })

        console.log('sets', user.toJSON())

        res.status(200).json({ message: 'Updated settings successfully '});

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}