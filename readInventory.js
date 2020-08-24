import fs from 'fs';
export default function readInventory(){
    let rawdata = fs.readFileSync('cookies.json');
    let cookiesList = JSON.parse(rawdata);
    return cookiesList;
};