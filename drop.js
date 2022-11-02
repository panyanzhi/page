/* 微信：angewechat; like , i love you ; 2022-10-29 周六 */

if (confirm(`攀岩志提示：即将为您加载自动拆解程序？`)) {
    setTimeout(() => {
        try {
            appendDiv()
        } catch (error) {
            alert('攀岩志提示：宿主不正确\n' + error.message)
        }
    }, 2 * 1000);
}
function appendDiv() {
    const target1 = document.querySelector('.el-form label[for=title]')
    const target2 = document.querySelector('.el-form label[for=sourceId]')
    const title = target1.parentElement.querySelector('input')
    const sourceId = target2.parentElement.querySelector('input')
    const div = document.createElement('div')
    div.className = 'pan-yan-zhi'
    div.innerHTML = `<p id="dashboard" class="dashboard" style="width: calc(100% - 40px);
max-height: 100px;
box-sizing: border-box;
padding: 12px;
border: 2px dashed #F8BBD0;
border-radius: 5px;
font-size: 14px;
margin-top: 10px;
color: #2c1612;
cursor: text;
white-space: pre-wrap;
/*word-break: break-all;*/
word-wrap: break-word;
overflow-y: auto;">将文件拖动到此处，自动拆解</p>
<input id="pyz_num" style="width: 36px;
float: right;
margin-top: -58px;
border: 1px solid #dcdfe6;
height: 44px;
text-align: center;
border-radius: 4px;" value="24" />
`
    document.querySelector('.resource-upload').insertAdjacentElement("afterend", div);
    setTimeout(() => {
        var dashboard = document.getElementById("dashboard")
        dashboard.addEventListener("dragover", function (e) {
            e.preventDefault()
            e.stopPropagation()
        })
        dashboard.addEventListener("dragenter", function (e) {
            e.preventDefault()
            e.stopPropagation()
        })
        dashboard.addEventListener("drop", function (e) {
            // 必须要禁用浏览器默认事件
            e.preventDefault()
            e.stopPropagation()
            var files = this.files || e.dataTransfer.files
            if (files && files.length > 0) {
                const fileName = files[0].name
                dashboard.innerText = fileName
                const num = parseInt(document.getElementById('pyz_num').value)
                const pointIndex = fileName.lastIndexOf('.')
                const sourceIdText = fileName.substring(pointIndex - num, pointIndex)
                title.value = fileName.split(sourceIdText)[0] + sourceIdText
                sourceId.value = sourceIdText
                title.dispatchEvent(new Event('input'))
                sourceId.dispatchEvent(new Event('input'))
                // 输入框内容超出输入框宽度时，可以自动定位最后面
                title.scrollLeft = title.scrollWidth
            }
        })
    }, 1);

}