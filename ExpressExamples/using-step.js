const http = require('http');
const url = require('url');
const request = require('request');
const step = require('step');
const express = require("express");

const app = express();

app.get('/I/want/title/', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
 let addresses = parsedUrl.query.address;
        if (!Array.isArray(addresses)) {
            addresses = [addresses];
        }
        step(

                    function processAddresses() {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write('<html><head></head><body><h1>Following are the titles of given websites:</h1><ul>');
                       addresses.forEach((address) => {
                           const finalAddress = address.includes("http") ? address : ("https://" + address)
                            request(finalAddress, (error, response, body) => {
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
                            },()=>{
                                console.log("callBack");
                            });
                        })
                    },
                    function sendResponse() {
                        res.end('</ul></body></html>');
                    }
        );
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
