'use strict';

const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const PORT = 8883;
const HOST = '121.42.143.106';
const USERNAME = 'admin';
const PASSWORD = 'finfosoft123';
const KEY = fs.readFileSync(path.join(__dirname, './file-key/client/client.key'));
const CERT = fs.readFileSync(path.join(__dirname, './file-key/client/client.crt'));
const TRUSTED_CA_LIST = fs.readFileSync(path.join(__dirname, './file-key/ca/ca.crt'));

const options = {
    port: PORT,
    host: HOST,
    username: USERNAME,
    password: PASSWORD,
    key: KEY,
    cert: CERT,
    ca: TRUSTED_CA_LIST,
    rejectUnauthorized: false,
    protocol: 'mqtt'
}
const client = mqtt.connect(options);
// const client = mqtt.connect('mqtt://test.mosquitto.org');


// 创建日志
const logoptions = {
     flags: 'a',     // append模式
     encoding: 'utf8',  // utf8编码
};
let log = fs.createWriteStream('./mqtt.log', logoptions);
let logger = new console.Console(log);


function mqttpublish(topic, messages) {
    client.on('connect', function () {
        console.log('publish:', messages);
        client.publish(topic, messages);
    })
}

function mqttsubscribe(topic) {
    client.on('connect', function () {
        client.subscribe(topic)
    })
    client.on('message', function (topic, msg) {
        msg = JSON.parse(msg);
        console.log('subscribe:', msg);

        const time = moment().format('YYYY-MM-DD HH:mm:ss');
        logger.log(`[${time}] - log message ${msg}`);
    })
    
}
module.exports.mqttpublish = mqttpublish;
module.exports.mqttsubscribe = mqttsubscribe;






// 发布/订阅
// client.on('connect', function () {
//     client.subscribe('presence', function (err) {
//         if (!err) {
//             for(let i=0; i<2000; i++) {
//                 client.publish('presence', i.toString())
//             }
//         }
//     })
// })
   
// client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log('subscribe:', message.toString())
//     client.end()
// })