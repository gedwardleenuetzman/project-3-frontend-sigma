import db from "sql/db"
import orderProducts from "sql/models/orderProducts"
import Products from "sql/models/products"

const { Op } = require('sequelize');

// assuming this function is called by an Express route handler that has access to the request and response objects
export default async function handler(req, res) {

  const { startDate, endDate } = req.query;
  
  const orders = await orderProducts.findAll({
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      'product_id',
      [db.Sequelize.fn('sum', db.Sequelize.col('product_total_price')), 'total_price'], // use the sum() function to get the total price for each product
      [db.Sequelize.fn('sum', db.Sequelize.col('product_quantity')), 'total_quantity'], // use the sum() function to get the total quantity for each product
    ],
    group: ['product_id'], // group by product_id to get the totals per product
  });

//   console.log(orders);
//   orders.forEach(order => {
//     console.log(order.total_quantity);
//   });
  
  const products = await Products.findAll({
    where: {
      id: orders.map(order => order.product_id), // get the list of product IDs from the orders array
    },
    attributes: ['id', 'name'],
  });
  
  // create an object with product IDs as keys and names as values
  const productNames = products.reduce((acc, product) => {
    acc[product.id] = product.name;
    return acc;
  }, {});
  
  // create an array of sales report items with product name, total quantity, and total price
  const salesReport = orders.map(order => ({
    name: productNames[order.product_id],
    totalQuantity: order.dataValues.total_quantity,
    totalPrice: order.dataValues.total_price,
  }));

  console.log(salesReport);
  
  res.send(salesReport);
}