const mqttclient = require('./public/mqttclient');

for(let i=0; i<10000; i++) {
    // mqttclient.mqttpublish('zxctemp', i.toString());
    mqttclient.mqttpublish('presence222', i.toString());
}
