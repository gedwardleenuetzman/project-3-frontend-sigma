import db from "/sql/db"
import * as Models from "sql/models"

import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  if (req.method === 'POST') {

    // const server_id = (await Models.Users.findOne({ where: { email: session.user.email } })).id
    const server_id = -1;
    const t = await db.transaction();

    try {
      const order = await Models.Orders.create({ server_id: server_id, total_price: 0 }, { transaction: t });
      const daily_order = await Models.DailyOrders.create({ server_id: server_id, total_price: 0 }, { transaction: t });

      let total_price = 0;

      for (const item of req.body) {
        const product = await Models.Products.findOne({ where: { id: item.id } })
        const product_total_price = item.quantity * product.price;

        total_price += product_total_price;

        const productIngredients = await Models.ProductIngredients.findAll({
          where: { product_id: product.id },
          attributes: ['ingredient_id', 'ingredient_quantity'],
          transaction: t
        });

        for (const productIngredient of productIngredients) {
          const ingredient = await Models.Ingredients.findOne({
            where: { id: productIngredient.ingredient_id },
            transaction: t
          });

          const newQuantity = ingredient.quantity - (productIngredient.ingredient_quantity * item.quantity);

          if (newQuantity < 0) {
            throw new Error('Insufficient ingredients');
          }

          await ingredient.update({
            quantity: newQuantity
          }, { transaction: t });
        }

        await Models.OrderProducts.create({
          product_id: product.id,
          product_quantity: item.quantity,
          product_price: product.price,
          product_total_price: total_price,
          order_id: order.id,
        }, { transaction: t });
        
        await Models.DailyOrderProducts.create({
          product_id: product.id,
          product_quantity: item.quantity,
          product_price: product.price,
          product_total_price: total_price,
          order_id: order.id,
        }, { transaction: t });
      }
      
      // Update the total price of the order in the orders table
      await order.update({ total_price: total_price }, { transaction: t });
      await daily_order.update({ total_price: total_price }, { transaction: t });

      // Commit the transaction
      await t.commit();

      console.log("order made")

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