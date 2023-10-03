
(function appendBtns() {
  const form = document.body.querySelector('.el-form-item__content').parentElement.parentElement
  const btns = [{ label: 'vip15', free: false, count: 15 }, { label: 'vip5', free: false, count: 5 }, { label: 'free5', free: true, count: 5 }]
  for (let i = 0; i < btns.length; i++) {
    const btn = btns[i]
    const btnE = document.createElement('button')
    btnE.id = 'pyz_' + btn.label
    btnE.style = 'height: 30px;margin:10px;'
    btnE.innerHTML = btn.label
    btnE.title = '一次性连续下载下方列表的' + btn.count + '份资料'
    btnE.addEventListener("click", () => {
      autoDownload(btn.count, btn.free)
    })
    form.appendChild(btnE)
  }
})()


function autoDownload(max = 15, free = false) {
  const result = window.confirm('将帮您每隔10秒，自动连续下载，确定操吗？')
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
    setTimeout(() => { window.open(nextA, '_blank') }, 10 * i * 1000)
  }
}

