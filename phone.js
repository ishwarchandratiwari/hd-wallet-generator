const fs = require('fs')
const axios = require('axios')

const api = 'http://222.73.117.158/msg/HttpBatchSendSM';
const account = 'account';
const pw = 'password';

let msg = encodeURI(encodeURI('msg'));
let txt = fs.readFileSync('./phone.txt', 'utf-8');
let arr;

if (txt.match('\r\n')) {
    arr = txt.split('\r\n').filter(Boolean).map((v, i) => {
        return Number(v.trim());
    })
} else {
    arr = txt.split('\n').filter(Boolean).map((v, i) => {
        return Number(v.trim());
    });
}

let set = new Set(arr);

for (let i of set.values()) {
    axios.post(`${api}?account=${account}&pswd=${pw}&msg=${msg}&mobile=${i}&needstatus=false`)
    .then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}



