// 数据导入
const fs = require('fs')

const getRandomPlace = require ('./where')

const lines = ``

const linelist = lines.split('\n')
const list = []
for (let index = 0; index < linelist.length; index++) {
  const element = linelist[index];
  list.push(
    {
      content: element,
      date: '2023/05/03 11:17:07',
      where: getRandomPlace(),
      type: 'work'
    }
  )
}

for (let index = 1; index <= list.length; index++) {
  const element = list[index - 1];
  const path = element.type + index
  const content = `(function(){window.dianbo = {content:'${element.content}',date:'${element.date}',where:'${element.where}'}})()`
  create(path, content)
}

function create (path, content) {
  // 调用fs.writeFile()方法
  fs.writeFile('./data/' + path + '.js', content, function (err) {
    // 如果err为true，则文件写入失败，并返回失败信息
    if (err) {
      return console.log('文件写入失败！' + err.message)
    }
    // 若文件写入成功，将显示“文件写入成功”
    console.log(path, '文件写入成功！')
  })
}
