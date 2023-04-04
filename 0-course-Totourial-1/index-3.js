const http = require('http');
// const url = require('url');
const fs = require('fs');

const productsData = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
);
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    } else if (pathName === '/product') {
        res.end('This is a Product');
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'content-type': 'application/json'
        });
        res.end(JSON.stringify(productsData));
    } else {
        res.writeHead(400, {
            'my-own-header': 'elhosen-salama'
        });
        res.end('Page Not found');
    }
});

server.listen(8000, 'localhost', () => {
    console.log('Listening on port 8000...');
});
