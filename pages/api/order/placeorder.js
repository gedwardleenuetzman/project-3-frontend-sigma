import * as Models from "sql/models"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { product_id, product_quantity, product_price, product_total_price } = req.body;

        console.log(req.body);
        console.log(Models.orderProducts);

        await Models.orderProducts.create({
            product_id: 1,
            product_quantity: 1,
            product_price: 1,
            product_total_price: 1,
        });

        // await Models.orderProducts.create({
        //     product_id: product_id,
        //     product_quantity: product_quantity,
        //     product_price: product_price,
        //     product_total_price: product_total_price,
        // });

        res.status(201).json({ message: 'Order added to order products table' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}