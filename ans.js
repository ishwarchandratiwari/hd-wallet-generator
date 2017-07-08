const fs = require('fs');
const del = require('del');

/*
*  小蚁客户端生成地址，导出为txt文件
*  重命名为ans.txt放入项目根目录  
*  运行node ans.js即可
*  生成的sql放在了outputs/ans.sql中
*/
let i = fs.readFileSync('address.txt', 'utf-8');
if (i.match('\r\n')) {
    var arrAns = i.split('\r\n').filter(Boolean);
} else {
    var arrAns = i.split('\n').filter(Boolean);
}

var length = arrAns.length;
var sql = '';
/*
* 因为 mysql 中的id字段是从1开始的，所以对应的user_id要从1开始
* 但是数组的 index 是从0开始的，所以还要减掉1
 */
for (let i = 1; i <= length; i++) {
    var tmp = 'insert into addresses (user_id,address,type,balance,created_at,updated_at) values (' +
        i + ',"' + arrAns[i-1] + '","' + 'ans' + '",' + 0 + ',' + null + ',' + null + ')' + ';\n';
    sql += tmp;
}
del.sync(['sql/ans.sql']);

fs.writeFile('sql/ans.sql',sql,'utf-8',(err) => {
    if(err){
        console.error(err);
    }else{
        console.info('Writed succeed!')
    }
})
