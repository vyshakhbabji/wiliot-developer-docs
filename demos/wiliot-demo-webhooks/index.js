//create a webhook url with ngrok
require('dotenv').config();
const ngrok = require('ngrok');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const BASE_URL = process.env.BASE_URL;
let webhookUrl = '';

/*
 * Init ngrok and get the webhook url
 */

async function init(options) {
    console.log('Starting ngrok . Please wait ...');
    const url = await ngrok.connect(process.env.PORT);
    webhookUrl = url + '/webhook';
    console.log('Webhook url is ready to use. Your webhook url is : ', webhookUrl);
    console.log('\n\n\nStarting express server....');
}

/*
Start the express server
 */

function startNodeServer() {
    const app = express();
    const port = process.env.PORT;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/webhook', (req, res) => {

        console.log('Webhook received');

        req.on('data', function (data) {
            console.log('Data received: ' + data);
        });


        console.log('Done')
        res.send('Hello World!');


    });

    app.listen(port, () => {
        console.log(`App is listening at http://localhost:${port}`);
    });
}



async function start() {
    await init();
    startNodeServer();
    console.log('Your webhookURL is: ', webhookUrl);


}

start().then(r => {
    console.log('Started Server.... ');
});