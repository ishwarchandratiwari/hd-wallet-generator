const fs = require('fs');
const del = require('del');

var sql = '';

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

for (let i = 2; i <= 200; i++) {
    var tmp = 'insert into users (mobilephone,email,password,created_at,updated_at) values (' +
        randomNum(13563211111, 13563299999) + ',' + '"lishude@' + i + '.com"' + ',' + '"$2y$10$ANEhjptsW3xpHuCSdua4xupqnYgemgS1sBE2Nummq2hO47jpGctHS"' + ',' +
        'null' + ',' + 'null' + ');\n';

    sql += tmp;
}


fs.writeFile('sql/users.sql', sql, 'utf-8', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('Writed succeed!')
    }
})