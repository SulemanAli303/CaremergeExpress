const http = require('http');
const url = require('url');
const request = require('request');
const Q = require('q');
const express = require('express');
const async = require('async');

const app = express();
app.get('/I/want/title/', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
  let addresses = parsedUrl.query.address;
        if (!Array.isArray(addresses)) {
            addresses = [addresses];
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html><head></head><body><h1>Following are the titles of given websites:</h1><ul>');

        const promises = addresses.map(address => {
            const deferred = Q.defer();

            const finalAddress =  address.includes("http") ? address : ("https://" + address)
            request(finalAddress, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const title = body.match(/<title>(.*?)<\/title>/i);
                    if (title && title[1]) {
                        deferred.resolve(`<li>${address} - "${title[1]}"</li>`);
                    } else {
                        deferred.resolve(`<li>${address} - NO RESPONSE</li>`);
                    }
                } else {
                    deferred.resolve(`<li>${address} - NO RESPONSE</li>`);
                }
            });
            return deferred.promise;
        });

        Q.all(promises)
            .then(results => {
                res.write(results.join(''));
                res.end('</ul></body></html>');
            })
            .catch(error => {
                console.error('Error:', error);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
