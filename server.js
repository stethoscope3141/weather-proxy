const axios = require("axios");
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.post('/location', async(req, res, next) => {

    const { body } = req;

    try {
        await axios.post('http://localhost:8081/location-coord', body);

        res.send('OK');
    }
    catch (e) {
        next(e);
    }
});
app.get('/location', async (req, res, next) => {

    const { code } = req.query;

    try {
        const response = await axios.get('http://localhost:8081/location-coord');
        const { data } = response;

        // data is
        // {
        //   code: number,
        //   value: string
        // }[

        const matched = data.filter(elem => elem.code === code);

        if (0 < matched.length) {
            const value = matched[0].value
            res.send(value);
        }
        else {
            res.send('no data');
        }
    }
    catch (e) {
        next(e);
    }
});
app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:` + port);
});