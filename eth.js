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
