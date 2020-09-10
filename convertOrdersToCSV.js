import fs from 'fs';
import csvjson from 'csvjson'
import readOrders from './readOrders.js';

export default function convertOrdersToXlsx() {
    let orders = readOrders();
    const csvData = csvjson.toCSV(orders, {
        headers: 'key'
    })
    fs.writeFile('./orders.csv', csvData, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("orders written to orders.csv")
    })
}