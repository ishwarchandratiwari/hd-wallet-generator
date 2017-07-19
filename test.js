
let api = 'https://api.example.com/'
let msg2 = encodeURI(encodeURI('北京'));
let msg3 = encodeURI('上海');

console.log(`${api}?msg=${msg2}`)
console.log('-----------------------------')
console.log(`${api}?msg=${msg3}`)


