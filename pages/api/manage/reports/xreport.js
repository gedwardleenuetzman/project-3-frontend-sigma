import DailyOrders from "sql/models/dailyorders"

export default async function handler(req, res) {
    if (req.method === "GET") {

        //const t = await db.transaction();

        DailyOrders.sum('total_price').then(sum => {
            console.log('The sum of all totalPrice values is:', sum);
        }).catch(error => {
            console.error('Error:', error);
        });

    }
}