const fs = require('fs');
const btc = require('./btc.json');
const del = require('del')

/*
*  Electrum客户端生成地址，导出为json文件
*  重命名为btc.json放入项目根目录  
*  运行node btc.js即可
*  生成的sql放在了outputs/btc.sql中
*/
var BtcArray = Object.keys(btc);
var length = BtcArray.length;
var sql = '';
const btcType = 'btc';
const time = null;

for (let i = 1; i <= length; i++) {
    var tmp = 'insert into addresses (user_id,address,type,balance,created_at,updated_at) values (' +
        i + ',"' + BtcArray[i-1] + '","' + btcType + '",' + 0 + ',' + time + ',' + time + ')' + ';\n';
    sql += tmp;
}
// 先删除以前生成的文件
del.sync('sql/btc.sql');
fs.writeFile('sql/btc.sql',sql,'utf-8',(err) => {
    if(err){
        console.error(err);
    }else{
        console.info('Writed succeed!')
    }
})

