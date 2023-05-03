import orderProducts from "sql/models/orderProducts"
import ProductIngredients from "sql/models/productIngredients"
import Ingredients from "sql/models/ingredients"

const { Op } = require('sequelize');

export default async function handler(req, res) {
    if(req.method === "GET"){
    try {

        const { startDate, endDate } = req.query;

        // Query order products within date range
        const OrderProducts = await orderProducts.findAll(
            {
            where: {
                createdAt: {
                [Op.between]: [startDate, endDate],
                },
            },
            }
        );

        // Group order products by product ID
        const orderProductsByProductId = {};

        for (const orderProduct of OrderProducts) {
            const productId = orderProduct.product_id;
            if (!orderProductsByProductId[productId]) {
                orderProductsByProductId[productId] = [];
            }
            orderProductsByProductId[productId].push(orderProduct);
        }

        // Query product ingredients for each product ID
        const productIngredientsByProductId = {};
        for (const productId of Object.keys(orderProductsByProductId)) {
        const productIngredients = await ProductIngredients.findAll({
            where: {
            product_id: productId,
            },
        });
        productIngredientsByProductId[productId] = productIngredients;
        }

        // Calculate excess report for each ingredient
        const excessReport = {};

        for (const productId of Object.keys(orderProductsByProductId)) {
            const OrderProducts = orderProductsByProductId[productId];
            const productIngredients = productIngredientsByProductId[productId];

            for (const productIngredient of productIngredients) {
                const ingredientId = productIngredient.ingredient_id;
                const ingredientQuantity = productIngredient.ingredient_quantity;

                if (!excessReport[ingredientId]) {
                    excessReport[ingredientId] = {
                        name: '', // Will be set later
                        sold: 0,
                        inventory: 0,
                    };
                }

                // Calculate how much of this ingredient was sold
                let soldQuantity = 0;

                for (const orderProduct of OrderProducts) {
                    if (orderProduct.product_id == productId) {
                        soldQuantity += orderProduct.product_quantity;
                    }
                }

                // Get current inventory of this ingredient
                const ingredient = await Ingredients.findByPk(ingredientId);
                const inventoryQuantity = ingredient.quantity;

                // Update excess report with sold and inventory quantities
                excessReport[ingredientId].name = ingredient.name;
                excessReport[ingredientId].sold += soldQuantity;
                excessReport[ingredientId].inventory = inventoryQuantity;
            }
        }

        // Calculate excess percentage for each ingredient and return report for those below 10%
        const excessPercentageReport = [];

            for (const ingredientId of Object.keys(excessReport)) {

                const ingredientName = excessReport[ingredientId].name;
                const soldQuantity = excessReport[ingredientId].sold;
                const inventoryQuantity = excessReport[ingredientId].inventory;

                let excessPercentage = soldQuantity / inventoryQuantity;

                if (excessPercentage < 0.1) {
                    excessPercentageReport.push({
                        name: ingredientName,
                        excessPercentage: excessPercentage,
                    });
                }
            }

            console.log(excessPercentageReport);
            res.send(excessPercentageReport);
        } catch (err) {
            console.error(err);
        }
    }
};