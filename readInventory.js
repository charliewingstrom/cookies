import fs from 'fs';
export default function readInventory(app){
    app.get('/cookies_backend', (req, res) => {
        let rawdata = fs.readFileSync('cookies.json');
        let cookiesList = JSON.parse(rawdata);
        res.send({ cookies: cookiesList});
    })
};