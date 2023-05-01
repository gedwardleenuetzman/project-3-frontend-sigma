import orderProducts from "sql/models/orderProducts"
import Ingredients from "sql/models/ingredients"

export default async function handler(req, res) {
    if(req.method === "GET"){
        try {
            const {start, end} = req.body;

            const where = {
                from: {
                $between: [start, end],
            }}

            const orderproducts = await orderProducts.findAll({
                where: {where},
            });


            for(const order of orderproducts){

            }


            res.send();
        } catch(error) {
            console.error('Error:', error);
            res.status(500).send(error);
        }
    }
}