/* like, i love you ! 2023-11-18 23:08:26 */

const like = document.body.querySelector('small').textContent === 'xy01886'
if (like) {
  const date = new Date()
  const day = date.getDate()
  const fileId = day < 31 ? day : 1
  laodData('like' + fileId, {}).then(resp => {
    const offset = date.getDay()
    const week = offset > 0 && offset < 6 ? '距离周末还有' + (5 - offset) : '周末愉快'
    alert('like：🌹🌹🌹，今天' + day + '号,   ' + week + '！\n\n' + resp.content)
  })
}
appendBtns()
function appendBtns () {
  const div = document.body.querySelector('.el-form-item__content').parentElement.parentElement
  // 下载按钮
  const btns = [{ label: 'vip15', free: false, count: 15 }, { label: 'vip10', free: false, count: 10 }, { label: 'vip5', free: false, count: 5 }, { label: 'free5', free: true, count: 5 }]
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i]
    const btnE = document.createElement('button')
    btnE.id = 'pyz_' + btn.label
    btnE.style = 'height: 30px;margin:10px;'
    btnE.innerHTML = btn.label
    btnE.title = '一次性连续下载下方列表的' + btn.count + '份资料'
    btnE.type = 'button'
    btnE.addEventListener("click", () => {
      autoDownload(btn.count, btn.free)
    })
    div.appendChild(btnE)
  }
  // 批量选择文件
  const input = document.createElement('input')
  input.id = 'fileUpload'
  input.type = 'file'
  input.multiple = true
  input.addEventListener('change', handleFileUpload);
  div.appendChild(input)
  // 批量上传
  const btnE = document.createElement('button')
  btnE.id = 'pyz_file'
  btnE.type = 'button'
  btnE.innerHTML = '批量上传'
  btnE.addEventListener("click", uploadFiles)
  div.appendChild(btnE)

  div.appendChild(getReasonDom())
}

function getReasonDom () {
  const div1 = document.createElement('div')
  div1.style = 'display:flex;'
  const textArea = document.createElement('textarea')
  textArea.placeholder = '1,2,3'
  textArea.style = 'width: 580px;height: 64px;'
  const button = document.createElement('button')
  button.innerHTML = '选择全部'
  button.type = 'button'
  button.style = 'margin: 0 4px;'

  // 添加点击事件到按钮
  button.addEventListener('click', function () {
    const trs = document.querySelectorAll('.table-block tr')
    const ids = []
    for (let index = 1; index < trs.length; index++) {
      const td = trs[index].children[0].children[0];
      ids.push(td.innerText)
    }
    textArea.value = ids.join('，')
  })

  const input = document.createElement('input')
  input.placeholder = '废弃理由'
  const button1 = document.createElement('button')
  button1.innerHTML = '一键废弃'
  button1.type = 'button'
  button1.style = 'margin: 0 4px;'

  // 添加点击事件到按钮
  button1.addEventListener('click', async function () {
    const ids = textArea.value.split('，')
    if (ids.length && input.value) {
      const result = window.confirm('一键废弃，确定操作吗？')
      if (result === false) return
      button1.disabled = true
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const resp = await feiqi(id, input.value)
        if (resp) {
          button1.innerHTML = id + '废弃中'
        } else {
          button1.innerHTML = id + '废弃失败'
        }
      }
      textArea.value = ''
      button1.disabled = false
      button1.innerHTML = '一键废弃'
    } else {
      alert('ids或理由不能为空')
    }
  })

  div1.appendChild(textArea)
  div1.appendChild(button)
  div1.appendChild(input)
  div1.appendChild(button1)
  return div1
}

function getTitles () {
  const list = []
  // 合并隐藏单元格
  const trs = document.querySelectorAll('.table-block tr')
  for (let index = 0; index < trs.length; index++) {
    const tr = trs[index];
    tr.children[3].colSpan = 3
    tr.children[4].style.display = 'none'
    tr.children[5].style.display = 'none'
    list.push({
      resourceId: tr.children[0].textContent,
      title: tr.children[2].textContent,
      el: tr.children[3]
    })
  }
  trs[0].children[3].textContent = '待上传文件名称'
  return list
}

function handleFileUpload (event) {
  const list = getTitles()
  // 获取选择的文件列表  
  const files = event.target.files;
  // 遍历文件列表并处理每个文件  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name.split('.').slice(0, -1).join('.')
    const td = getSameTd(fileName, list)
    if (td.resourceId) {
      td.el.textContent = file.name
      file.resourceId = td.resourceId
    } else {
      console.log(fileName, 404)
    }
  }
}

function getSameTd (fileName, list) {
  let max = 0
  let target = {}
  for (let index = 0; index < list.length; index++) {
    const td = list[index];
    // td.title 和 fileName的相似度，取最大的一个
    const sameValue = similarity(td.title, fileName)
    console.log(sameValue, 'td.title', td.title, 'fileName', fileName)
    if (max <= sameValue && sameValue > 0.88) {
      max = sameValue
      target = td
    }
  }
  return target
}


async function autoDownload (max = 15, free = false) {
  const result = window.confirm('将帮您每隔3秒，自动连续下载，确定操作吗？')
  if (result === false) return
  let prefix = 'https://www.21cnjy.com/asset/download-view?downType=1&id=idx'
  if (free) {
    prefix = 'https://www.21cnjy.com/asset/download-view?downType=0&id=idx&coin=0&vipCoin=0'
  }
  const list = document.body.querySelectorAll('.cell a')
  let count = list.length < max ? list.length : max
  for (let i = 0; i < count; i++) {
    const a = list[i]
    const infos = a.href.split('/')
    const id = infos[infos.length - 1].split('.')[0]
    const nextA = prefix.replace('idx', id)
    setTimeout(() => {
      window.open(nextA, '_blank')
    }, 3 * i * 1000)
  }
}

async function uploadFiles () {
  const input = document.getElementById('fileUpload');
  const btn = document.getElementById('pyz_file')
  const list = getTitles()
  btn.disabled = true
  const files = input.files
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.resourceId) {
        await uploadFile(file);
        const td = list.find(item => item.resourceId === file.resourceId)
        if (td) {
          td.el.textContent = ''
        }
        btn.textContent = file.resourceId + '上传中'
      } else {
        console.log(file.name, 'uploaded')
      }
    }
    input.value = ''
    btn.disabled = false
    btn.textContent = '批量上传'
  } catch (error) {
    alert('上传报错：' + error.message)
    input.value = ''
    btn.disabled = false
    btn.textContent = '批量上传'
  }
}

function uploadFile (file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('resourceId', file.resourceId);
    formData.append('files', file);
    fetch('/console/resource/upload_file', {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (response.ok) {
        console.log('文件上传成功！');
        resolve();
      } else {
        console.error('文件上传失败：' + response.statusText);
        reject();
      }
    }).catch(error => {
      console.error('上传发生错误：', error);
      reject();
    });
  });
}

function feiqi (id, remark) {
  return new Promise((resolve, reject) => {
    fetch('/console/resource/discard/' + id + '?remark=' + remark, {
      method: 'POST'
    }).then(response => {
      if (response.ok) {
        console.log('废弃成功！');
        resolve(true);
      } else {
        console.error('废弃失败：' + response.message);
        resolve(false);
      }
    }).catch(error => {
      resolve(false);
    });
  });
}

function levenshteinDistance (str1, str2) {
  if (str1.length < str2.length) {
    [str1, str2] = [str2, str1];
  }

  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = new Array(len1 + 1);

  for (let i = 0; i <= len1; i++) {
    matrix[i] = new Array(len2 + 1);
    matrix[i][0] = i;
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // 替换  
          matrix[i][j - 1] + 1, // 插入  
          matrix[i - 1][j] + 1 // 删除  
        );
      }
    }
  }

  return matrix[len1][len2];
}

function similarity (str1, str2) {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - distance / maxLength;
}

function laodData (fileId, params) {
  const path = 'https://panyanzhi.github.io/page/data/' + fileId + '.js'
  if (UrlExists(path)) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = path;
    return new Promise((resolve, reject) => {
      head.appendChild(script);
      script.onload = function () {
        const resp = window.dianbo
        resp.content = params.content || resp.content
        resp.date = params.date || resp.date
        resp.where = params.where || resp.where
        resolve(resp)
      }
    })
  } else {
    return laodData(404, params)
  }
}

function UrlExists (url) {
  if (location.origin === 'file://') {
    return true
  }
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status != 404;
}
