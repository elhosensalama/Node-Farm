const http = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemp = require('./modules/replaceTemplate');
// const slugify = require('./modules/slugify');

const productsData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'));

// const slugs = productsData.map(el => slugify(el.productName));

const cardTemp = fs.readFileSync('./templates/template-card.html', 'utf-8');
const overviewTemp = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const productTemp = fs.readFileSync('./templates/template-product.html', 'utf8');
let cards = '';
productsData.forEach(product => {
    cards += replaceTemp(cardTemp, product);
});

const server = http.createServer((req, res) => {
    // eslint-disable-next-line node/no-deprecated-api
    const { pathname, query } = url.parse(req.url);
    if (pathname === '/' || pathname === '/overview') {
        res.end(overviewTemp.replace('{%PRODUCT_CARDS%}', cards));
    } else if (pathname.startsWith('/product')) {
        res.end(replaceTemp(productTemp, productsData[+query.slice(3)]));
    } else if (pathname === '/api') {
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
    // eslint-disable-next-line no-console
    console.log('Listening on port 8000...');
});
