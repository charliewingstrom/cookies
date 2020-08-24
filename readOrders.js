import fs from 'fs';
export default function readOrders(){
    let rawdata = fs.readFileSync('orders.json');
    let orderList = JSON.parse(rawdata);
    return orderList;
};