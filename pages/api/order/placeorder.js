import db from "/sql/db"
import Orders from "/sql/models/orders"
import orderProducts from "/sql/models/orderProducts"
import Ingredients from "/sql/models/ingredients"
import ProductIngredients from "/sql/models/productIngredients"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const { server_id, product_details } = req.body;
    const { server_id, product_details } = {server_id: 0, product_details: [{product_id: 1, product_quantity: 1, product_price: 5.00}, {product_id: 1, product_quantity: 1, product_price: 5.00},]}
    // above are hardcoded values to illustrate data structure that this file needs.
    console.log("Body:")
    console.log(server_id, product_details);

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

        const productIngredients = await ProductIngredients.findAll({
          where: { product_id: product_id },
          attributes: ['ingredient_id', 'ingredient_quantity'],
          transaction: t
        });

        for (const ingredient of productIngredients) {
          const { ingredient_id, ingredient_quantity } = ingredient;

          const existingIngredient = await Ingredients.findOne({
            where: { id: ingredient_id },
            transaction: t
          });

          if (!existingIngredient) {
            throw new Error('Ingredient not found');
          }

          const newQuantity = existingIngredient.quantity - (ingredient_quantity * product_quantity);

          if (newQuantity < 0) {
            throw new Error('Insufficient ingredients');
          }

          await existingIngredient.update({
            quantity: newQuantity
          }, { transaction: t });
        }

        await orderProducts.create({
          product_id: product_id,
          product_quantity: product_quantity,
          product_price: product_price,
          product_total_price: product_total_price,
          order_id: order.id,
        }, { transaction: t });

        // await dailyorderProducts.create({
        //     product_id: product_id,
        //     product_quantity: product_quantity,
        //     product_price: product_price,
        //     product_total_price: product_total_price,
        //     order_id: order.id,
        //   }, { transaction: t });
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
