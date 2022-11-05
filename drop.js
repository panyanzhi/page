/* 微信：angewechat; like , i love you ; 2022-10-29 周六 */

const target1 = document.querySelector('.el-form label[for=title]')
const target2 = document.querySelector('.el-form label[for=sourceId]')
const title = target1.parentElement.querySelector('input')
const sourceId = target2.parentElement.querySelector('input')
let upload = document.querySelector('.resource-upload .el-upload-dragger')

if (confirm(`攀岩志提示：即将为您加载自动拆解程序？`)) {
    setTimeout(() => {
        try {
            relayout()
            addNewDropEvent()
        } catch (error) {
            alert('攀岩志提示：宿主不正确\n' + error.message)
        }
    }, 1 * 1000);
}

// 追加拆解拖动框
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

// 调整上传表单的位置
function relayout() {
    // 表单右靠齐
    const div = document.querySelector('.el-row .el-col-15')
    div.style.float = 'right'
    // 按钮位置对调
    const btns = document.querySelectorAll('.el-row button')
    var insert = function (nodeInsert, nodeTo) {
        if (nodeInsert.insertAdjacentElement) {
            nodeTo.insertAdjacentElement('beforeBegin', nodeInsert);
        }
        else {
            nodeTo.parentNode.insertBefore(nodeInsert, nodeTo);
        }
    }
    var obj = document.createElement("a");
    insert(obj, btns[1]);
    insert(btns[1], btns[0]);
    insert(btns[0], obj);
}

function addNewDropEvent() {
    if (upload) {
        upload.addEventListener("drop", splitFileName, title, sourceId);
    } else {
        var mutation = new MutationObserver(function (e) {
            const list = e[0].addedNodes;
            if (list.length > 0) {
                upload = list[0]
                if (upload.className.indexOf('el-upload-dragger') >= 0) {
                    upload.addEventListener("drop", splitFileName, title, sourceId);
                }
            }
        });
        mutation.observe(document.querySelector('.resource-upload .el-upload--text'), { childList: true })
    }
}


function splitFileName(e, title, sourceId) {
    var files = this.files || e.dataTransfer.files
    if (files && files.length > 0) {
        const fileName = files[0].name
        const num = 24 // parseInt(document.getElementById('pyz_num').value)
        const pointIndex = fileName.lastIndexOf('.')
        const sourceIdText = fileName.substring(pointIndex - num, pointIndex)
        title.value = fileName.split(sourceIdText)[0] + sourceIdText
        sourceId.value = sourceIdText
        title.dispatchEvent(new Event('input'))
        sourceId.dispatchEvent(new Event('input'))
        // 输入框内容超出输入框宽度时，可以自动定位最后面
        title.scrollLeft = title.scrollWidth
    }

}