const express = require('express');

const app = express();
const port = 5000;

app.get('/api/cookies', (req, res) => {
    const cookies = [
        {id: 1, name: 'Chocolate', price: 2},
        {id: 2, name: 'Vanilla', price: 1},
    ];
    res.json(cookies);
})
app.listen(port, () => console.log(`server started on ${port}`));