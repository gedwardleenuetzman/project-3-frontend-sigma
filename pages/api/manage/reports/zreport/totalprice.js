import DailyOrders from "sql/models/dailyorders"
import DailyOrderProducts from "sql/models/dailyorderproducts"

export default async function handler(req, res) {
    if(req.method === "GET"){
        try {
            const sum = await DailyOrders.sum('total_price');
            console.log('The sum of all total_price values is:', sum);
    
            await DailyOrders.destroy({
                where: {},
            });
    
            await DailyOrderProducts.destroy({
                where: {},
            });

            res.send(sum);
        } catch(error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    }
}