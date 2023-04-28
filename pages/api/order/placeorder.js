import db from "/sql/db"
import Orders from "/sql/models/orders"
import orderProducts from "/sql/models/orderProducts"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { server_id, product_details } = req.body;

    console.log(req.body);
    
    // Create a transaction to ensure atomicity of the updates
    const t = await db.transaction();

    try {
      // Create the order in the orders table
      const order = await Orders.create({ server_id: server_id, total_price: 0 }, { transaction: t });

      // Update the order_products table with the product details and order ID
      let total_price = 0;
      for (const product of product_details) {
        const { product_id, product_quantity, product_price } = product;
        const product_total_price = product_quantity * product_price;
        total_price += product_total_price;
        await orderProducts.create({
          product_id: product_id,
          product_quantity: product_quantity,
          product_price: product_price,
          product_total_price: product_total_price,
          order_id: order.id,
        }, { transaction: t });
      }

      // Update the total price of the order in the orders table
      await order.update({ total_price: total_price }, { transaction: t });

      // Commit the transaction
      await t.commit();

      res.status(201).json({ message: 'Order placed successfully' });
    } catch (err) {
      // Rollback the transaction if an error occurs
      await t.rollback();
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
