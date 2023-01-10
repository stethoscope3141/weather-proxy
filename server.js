const axios = require("axios");
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const domain = 'http://weather-api:8081';

app.get('/weather', async(req, res, next) => {
    const x = req.query.x;
    const y = req.query.y;

    try {
		const apiUrl = domain + '/weather/tomorrow';
		console.log(apiUrl);
        const response = await axios.get(apiUrl, {
			params: {
				"x": x,
				"y": y
			}
		});
		const { data } = response;
		
        res.send(data.hourlyWeathers);
    }
    catch (e) {
        next(e);
    }
});

app.get('/location', async (req, res, next) => {

    const type = req.query.type;
    const code = req.query.code;
    const name = req.query.name;

    try {
		if(type === 'top' || type === 'mid' || type === 'leaf') {		
		const apiUrl = domain + '/location/' + type;
		console.log(apiUrl);	
			const response = await axios.get(apiUrl, {
				params: {
					"name": name,
					"code": code
				}
			});
			const { data } = response;
			res.send(data);
		}
		else {
			res.error('illegal type value');
		}
    }
    catch (e) {
        next(e);
    }
});

app.get('/foo', async(req, res, next) => {
    try {
		const apiUrl = domain + '/foo';
		console.log(apiUrl);
        const response = await axios.get(apiUrl);
		const { data } = response;
		
        res.send(data);
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