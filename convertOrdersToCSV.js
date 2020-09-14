import fs from 'fs';

export default function convertOrdersToCSV(app) {
    app.get('/convertOrdersToCSV', (req, res) => {
        let rawdata = fs.readFileSync('orders.json');
        let orders = JSON.parse(rawdata);
        
        let headers = ['Name', 'Email', 'Phone Number', 'Order Items', 'Total', 'Time of Order']
    
        let csv = headers + '\n';
        orders.forEach( order => {
            console.log(order)
            let orderArray = []
            orderArray.push(order.name)
            orderArray.push(order.email)
            orderArray.push(order.phoneNumber)
            let orderItemsArray = []
            Object.entries(order.order).forEach( orderItem => {
                //console.log(orderItem[0])
                orderItemsArray.push(orderItem[0] + ': ' + orderItem[1])
            })
            orderArray.push(orderItemsArray.join('; '))
            orderArray.push(order.total)
            orderArray.push(order.timeOfOrder)
    
            csv += orderArray.join() + "\n";
        })
    
        //console.log(csv)
        fs.writeFile('./orders.csv', csv, (err) => {
            if (err) {
                console.log(err)
            }
            console.log("orders written to orders.csv")
        })
        res.sendStatus(200)
    })
}