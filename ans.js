const fs = require('fs');

/*
*  小蚁客户端生成地址，导出为txt文件
*  重命名为ans.txt放入项目根目录  
*  运行node ans.js即可
*  生成的sql放在了outputs/ans.sql中
*/
let i = fs.readFileSync('address.txt', 'utf-8');
if (i.match('\r\n')) {
    var arrAns = i.split('\r\n');
} else {
    var arrAns = i.split('\n');
}

var length = arrAns.length;
var sql = '';

for (let i = 1; i < length; i++) {
    var tmp = 'insert into addresses (user_id,address,type,balance,created_at,updated_at) values (' +
        i + ',"' + arrAns[i-1] + '","' + 'ans' + '",' + 0 + ',' + null + ',' + null + ')' + ';\n';
    sql += tmp;
}

fs.writeFile('outputs/ans.sql',sql,'utf-8',(err) => {
    if(err){
        console.error(err);
    }else{
        console.info('Writed succeed!')
    }
})
