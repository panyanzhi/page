(function gzh() {
    const a = document.createElement('a')
    a.href = 'https://mp.weixin.qq.com/s/hqeNpaJQZ4jhs1ew3_ZdDw'
    a.textContent = '点击一下，关注公众号，挂号不迷路'
    a.style = "width: 100%;text-align:center;display:block;text-decoration: underline;"
    a.target = '_blank'
    const target = document.getElementById('appointContent')
    target.appendChild(a)
})()

// <a href="https://mp.weixin.qq.com/s/hqeNpaJQZ4jhs1ew3_ZdDw" target="_blank" style="width: 100%; text-align: center; display: block; text-decoration: underline;">点击一下，关注公众号，挂号不迷路</a>