const express = require('express');
const url = require('url');
const request = require('request-promise');

const app = express();

app.get('/I/want/title/', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let addresses = parsedUrl.query.address;
    if (!Array.isArray(addresses)) {
        addresses = [addresses];
    }

    const promises = addresses.map(address => {
        const finalAddress =  address.includes("http") ? address : ("https://" + address)
        return request(finalAddress)
            .then(body => {
                const title = body.match(/<title>(.*?)<\/title>/i);
                if (title && title[1]) {
                    return `<li>${address} - "${title[1]}"</li>`;
                } else {
                    return `<li>${address} - NO RESPONSE</li>`;
                }
            })
            .catch(() => {
                return `<li>${address} - NO RESPONSE</li>`;
            });
    });

    Promise.all(promises)
        .then(results => {
            const html = `
                <html>
                <head></head>
                <body>
                    <h1>Following are the titles of given websites:</h1>
                    <ul>
                        ${results.join('')}
                    </ul>
                </body>
                </html>`;
            res.send(html);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
