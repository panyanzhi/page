
appendBtns()

function appendBtns () {
  const div = document.body.querySelector('.el-form-item__content').parentElement.parentElement
  // const div = document.createElement('div')
  // div.style = 'margin: 4px'
  // form.appendChild(div)
  // 下载按钮
  const btns = [{ label: 'vip15', free: false, count: 15 }, { label: 'vip5', free: false, count: 5 }, { label: 'free5', free: true, count: 5 }]
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
}

function getTitles () {
  const list = []
  // 合并隐藏单元格
  const trs = document.querySelectorAll('.table-block tr')
  trs[0].children[3].textContent = '待上传文件'
  for (let index = 0; index < trs.length; index++) {
    const tr = trs[index];
    tr.children[3].colSpan = 4
    tr.children[4].style.display = 'none'
    tr.children[5].style.display = 'none'
    tr.children[6].style.display = 'none'
    list.push({
      resourceId: tr.children[0].textContent,
      title: tr.children[2].textContent,
      el: tr.children[3]
    })
  }
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
      td.el.textContent = fileName
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
    if (max <= sameValue && sameValue > 0.9) {
      max = sameValue
      target = td
    }
  }
  return target
}


function autoDownload (max = 15, free = false) {
  const result = window.confirm('将帮您每隔10秒，自动连续下载，确定操作吗？')
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
    const per = Math.floor(Math.random() * 3) + 2 // 返回 1 至 4 之间的数
    setTimeout(() => {
      window.open(nextA, '_blank')
      if (i === count - 1) {
        alert('最后一个了')
      }
    }, per * i * 1000)
  }
}

async function uploadFiles () {
  const input = document.getElementById('fileUpload');
  const btn = document.getElementById('pyz_file')
  btn.disabled = true
  const files = input.files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.resourceId) {
      await uploadFile(file);
      btn.textContent = file.resourceId + '正在上传'
    } else {
      console.log(file.name, 'uploaded')
    }
  }
  input.value = ''
  btn.disabled = false
  btn.textContent = '批量上传'
  alert('上传完成')
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