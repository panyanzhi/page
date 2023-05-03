const url = 'https://panyanzhi.github.io/page/travel.html?id='  
console.log('<table border="1">')
// 穿越电波
for (let index = 1; index <= 600; index++) {
  console.log(`<tr><td>${url + index.toString(2) + '&type=travel'}</td></tr>`)
}
// vip
for (let index = 1; index <= 50; index++) {
  console.log(`<tr><td>${url + index.toString(2) + '&type=vip'}</td></tr>`)
}
// work
for (let index = 1; index <= 20; index++) {
  console.log(`<tr><td>${url + index.toString(2) + '&type=work'}</td></tr>`)
}
// like
for (let index = 1; index <= 30; index++) {
  console.log(`<tr><td>${url + index.toString(2) + '&type=like'}</td></tr>`)
}
console.log('</table>')
