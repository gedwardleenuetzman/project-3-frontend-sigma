import DailyOrders from "sql/models/dailyorders"

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const sum = await DailyOrders.sum('total_price');
            console.log('The sum of all total_price values is:', sum);

            res.send(sum);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    }
}