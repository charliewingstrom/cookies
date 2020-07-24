import fs from 'fs';
export default function readFile(){
    let rawdata = fs.readFileSync('cookies.json');
    let cookiesList = JSON.parse(rawdata);
    return cookiesList;
};