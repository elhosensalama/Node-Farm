const http = require('http');
const url = require('url');
const fs = require('fs');

const productsData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'));
const cardTemp = fs.readFileSync('./templates/template-card.html', 'utf-8');
const overviewTemp = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const productTemp = fs.readFileSync('./templates/template-product.html', 'utf8');
const replaceTemp = (temp, product) => {
    temp = temp
        .replace(/{%PRODUCTNAME%}/g, product.productName)
        .replace(/{%FROM%}/g, product.from)
        .replace(/{%PRICE%}/g, product.price)
        .replace(/{%IMAGE%}/g, product.image)
        .replace(/{%QUANTITY%}/g, product.quantity)
        .replace(/{%NUTRIENTSC%}/g, product.nutrientsc)
        .replace(/{%DESCRIPTION%}/g, product.description)
        .replace(/{%ID%}/g, product.id);
    if (!product.organic) {
        temp = temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return temp;
};
let cards = '';
productsData.forEach(product => {
    cards += replaceTemp(cardTemp, product);
});

const server = http.createServer((req, res) => {
    // eslint-disable-next-line node/no-deprecated-api
    const { pathname, query } = url.parse(req.url);
    console.log(pathname, query);
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
    console.log('Listening on port 8000...');
});
