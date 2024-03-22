const http = require('http');
const url = require('url');
const async = require('async');
const request = require('request');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/I/want/title/' && req.method === 'GET') {
        let addresses = parsedUrl.query.address;
        if (!Array.isArray(addresses)) {
            addresses = [addresses];
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head></head><body><h1>Following are the titles of given websites:</h1><ul>');
        async.each(addresses,  (address, callback) => {
            const finalAddress =  address.includes("http") ? address : ("https://" + address)
            request(finalAddress, async (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const title = body.match(/<title>(.*?)<\/title>/i);
                    if (title && title[1]) {
                        res.write(`<li>${address} - "${title[1]}"</li>`);
                    } else {
                        res.write(`<li>${address} - NO RESPONSE</li>`);
                    }
                } else {
                    res.write(`<li>${address} - NO RESPONSE</li>`);
                }
                callback();
            });
        }, () => {
            res.end('</ul></body></html>');
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
