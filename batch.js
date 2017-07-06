const fs = require('fs')

let i1 = fs.readFileSync('./sql/ans.sql','utf-8')
let i2 = fs.readFileSync('./sql/btc.sql','utf-8')
let i3 = fs.readFileSync('./sql/eth.sql','utf-8')


let i = i1 + '\n' + i2 + '\n' + i3;

fs.writeFileSync('./sql/my.sql',i,'utf-8',(err) => {
    if(err){
        console.error(err);
    }else{
        console.info('Writed succeed!')
    }
});