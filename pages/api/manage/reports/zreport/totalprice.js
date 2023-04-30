import DailyOrders from "sql/models/dailyorders"
import DailyOrderProducts from "sql/models/dailyorderproducts"

export default async function handler(req, res) {
    if(req.method === "GET"){

        //const t = await db.transaction();

        //let sum = 0;

        DailyOrders.sum('total_price').then(sum => {
            console.log('The sum of all totalPrice values is:', sum);
        }).catch(error => {
            console.error('Error:', error);
        });

        //destroys all rows as per Z report
        DailyOrders.destroy({
            where: {},
        });

        DailyOrderProducts.destroy({
            where: {},
        });

        //const res = sum;
        //return sum;
    }
}