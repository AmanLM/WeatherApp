const http = require('http');
const port = 8000;
const fs = require('fs');
var requests = require('requests');

const homeFile = fs.readFileSync("home.html","utf-8");

const server = http.createServer((req,res) => {
    if(req.url = '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=efa754131d0f8202084e654b46206d11')

        .on('data', (chunk) => {
            const objData = JSON.parse(chunk);
            const arrayData = [objData];
            let a = arrayData[0].main.temp - 273.15;
            let b = arrayData[0].main.temp - 273.15;
            let c = arrayData[0].main.temp - 273.15;
            var realTimeData = homeFile.replace("{%tempVal%}",a.toFixed(2)).replace("{%tempmin%}",b.toFixed(2)).replace("{%tempmax%}",c.toFixed(2));
            res.write(realTimeData);
        })
        .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
        });
    }
})

server.listen(port,"127.0.0.1");
