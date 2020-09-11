import fs from 'fs';

export default function convertOrdersToXlsx() {
    let rawdata = fs.readFileSync('orders.json');
    let orders = JSON.parse(rawdata);
    var fields = Object.keys(orders[0])
    var replacer = function(key, value) { return value === null ? '' : value }
    var csv = orders.map(function(row) {
        return fields.map(function(fieldName) {
            return JSON.stringify(row[fieldName], replacer)
        }).join(',')
    })
    csv.unshift(fields.join(','))
    csv = csv.join('\r\n');
    console.log(csv)

    fs.writeFile('./orders.csv', csv, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("orders written to orders.csv")
    })
}