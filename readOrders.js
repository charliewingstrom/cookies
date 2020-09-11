import fs from 'fs';
export default function readOrders(app){
    app.get('/get_orders', (req, res) => {
        let rawdata = fs.readFileSync('orders.json');
        let orderList = JSON.parse(rawdata);
        res.send({orders: orderList});
    })
}
