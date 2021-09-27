var NodeHelper = require("node_helper");
const http = require('http');

module.exports = NodeHelper.create({

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'LOAD_BOM_FORECAST') {
            this.getBomForecast(payload);
        }
    },

    getBomForecast: function (payload) {
	console.log("Fetch URL: " + payload);
	const options = {host: "www.bom.gov.au",
		hostname: "www.bom.gov.au",
		headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:90.0) Gecko/20100101 Firefox/90.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        } };

        http.get(payload, options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                console.log('BomForecast', 'Forecast received');
                this.sendSocketNotification('LOAD_BOM_FORECAST_RECEIVED', data);
            });
        }).on('error', (error) => {
            console.log("Error: " + error.message);
        });
    },

});


