// Creating a Web Server
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello world');
});

server.listen(8000, 'localhost', () => {
    console.log('Listening on port 8000...');
});
