var mqtt = require('mqtt')
const process = require("process");
require('dotenv').config();

var options = {
    host: process.env.MQTT_HOST ,
    port: process.env.MQTT_PORT,
    protocol: 'mqtts',
    username:  process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: process.env.MQTT_CLIENT_ID,
    rejectUnauthorized: false,
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic all topics
client.subscribe('#');

