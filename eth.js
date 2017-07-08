const fs = require('fs');
const del = require('del');

let i = fs.readFileSync('ethaddr2.txt', 'utf-8');
if (i.match('\r\n')) {
    var arrEth = i.split('\r\n').filter(Boolean);
} else {
    var arrEth = i.split('\n').filter(Boolean);
}

var length = arrEth.length;
console.log(length);
var sql = '';
/*
* 因为 mysql 中的id字段是从1开始的，所以对应的user_id要从1开始
* 但是数组的 index 是从0开始的，所以还要减掉1
 */
for (let i = 1; i <= length; i++) {
    var tmp = 'insert into addresses (user_id,address,type,balance,created_at,updated_at) values (' +
        i + ',"' + arrEth[i-1] + '","' + 'eth' + '",' + 0 + ',' + null + ',' + null + ')' + ';\n';
    sql += tmp;
}

del.sync(['sql/eth.sql']);

fs.writeFile('sql/eth.sql',sql,'utf-8',(err) => {
    if(err){
        console.error(err);
    }else{
        console.info('Writed succeed!')
    }
})
