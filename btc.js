const fs = require('fs');
const del = require('del');

let i = fs.readFileSync('btcAddr.txt', 'utf-8');
if (i.match('\r\n')) {
    var arrBtc = i.split('\r\n').filter(Boolean);
} else {
    var arrBtc = i.split('\n').filter(Boolean);
}

var arr = arrBtc.map((value,index) => {
    return value.trim();
})
var length = arr.length;
console.log(length);
var sql = '';

for (let i = 1; i <= 20000; i++) {
    var tmp = 'insert into addresses (user_id,address,type,balance,created_at,updated_at) values (' +
        i + ',"' + arr[i-1] + '","' + 'btc' + '",' + 0 + ',' + null + ',' + null + ')' + ';\n';
    sql += tmp;
}

del.sync(['sql/btc.sql']);

fs.writeFile('sql/btc.sql',sql,'utf-8',(err) => {
    if(err){
        console.error(err);
    }else{
        console.info('Writed succeed!')
    }
})
