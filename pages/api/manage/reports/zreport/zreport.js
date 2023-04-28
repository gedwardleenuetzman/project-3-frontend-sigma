import * as dailyOrders from "sql/models/dailyOrders"
import * as dailyOrderProducts from "sql/models/dailyOrderProducts"

export default async function handler(reg, res) {
    if(req.method === "GET"){

        const daily = await dailyOrders.findAll();

        const totalPrice = daily.reduce((acc, daily) => acc + daily.total_price, 0);

        console.log('Total Price: ', totalPrice);
    }
}