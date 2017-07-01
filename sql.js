const fs = require('fs');


var getBtcKeys = Object.keys(JSON.parse(fs.readFileSync('btc.json', 'utf-8')));
var BtcArray = [];
var length = getBtcKeys.length;
var sql = '';
const btcType = 'btc';
const ethType = 'eth';
const ansType = 'ans';
const time = null;

getBtcKeys.forEach(function (ele, index, obj) {
    BtcArray[index] = ele;
});


for (let i = 0; i < length; i++) {
    var tmp = 'insert into addresses (user_id,address,type,balance,created_at,updated_at) values (' +
        i + ',"' + BtcArray[i] + '","' + btcType + '",' + 0 + ',' + time + ',' + time + ')' + ';\n';
    sql += tmp;
}

fs.writeFile('outputs/my.sql',sql,'utf-8',(err) => {
    if(err){
        console.error(err);
    }else{
        console.info('Writed succeed!')
    }
})
