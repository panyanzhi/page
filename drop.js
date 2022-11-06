/* 微信：angewechat; like , i love you ; 2022-10-29 周六 */

if (top !== self || confirm(`攀岩志提示：即将为您加载自动拆解程序？`)) {
    setTimeout(() => {
        try {
            const resp = relayout()
            appendSplitDiv()
            // setDragDiv(resp)
            addNewDropEvent(resp)
            if (top === self && confirm(`攀岩志提示：是否开启加速模式`)) {
                cloneForm()
            }
        } catch (error) {
            alert('攀岩志提示：宿主不正确\n' + error.message)
        }
    }, 1 * 1000);
}

// 调整上传表单的位置，返回目标元素集合
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
    const target1 = document.querySelector('.el-form label[for=title]')
    const target2 = document.querySelector('.el-form label[for=sourceId]')
    const title = target1.parentElement.querySelector('input')
    const sourceId = target2.parentElement.querySelector('input')
    return {
        title,
        sourceId
    }
}

// 在原拖拽框追加自定义drop事件
function addNewDropEvent({ title, sourceId }) {
    let target = document.querySelector('.resource-upload .el-upload-dragger')
    if (target) {
        target.addEventListener("drop", e => {
            splitFileName(e, title, sourceId)
        });
    }
    var mutation = new MutationObserver(function (e) {
        const list = e[0].addedNodes;
        if (list.length > 0) {
            target = list[0]
            if (target.className.indexOf('el-upload-dragger') >= 0) {
                target.addEventListener("drop", e => {
                    splitFileName(e, title, sourceId)
                });
            }
        }
    });
    mutation.observe(document.querySelector('.resource-upload .el-upload--text'), { childList: true })
}

// 文件名拆解
function splitFileName(e, title, sourceId) {
    e.preventDefault()
    e.stopPropagation()
    var files = this.files || e.dataTransfer.files
    if (files && files.length > 0) {
        const fileName = files[0].name
        var dashboard = document.getElementById("dashboard")
        dashboard.innerText = fileName;
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

}


// 追加拆解拖动框
function appendSplitDiv() {
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
overflow-y: auto;">拆解原始信息将展示到这里</p>
<input id="pyz_num" style="width: 36px;
float: right;
margin-top: -58px;
border: 1px solid #dcdfe6;
height: 44px;
text-align: center;
border-radius: 4px;" value="24" />
`
    document.querySelector('.resource-upload').insertAdjacentElement("afterend", div);
}

// 追加拆解拖动事件
function setDragDiv({ title, sourceId }) {
    setTimeout(() => {
        const dashboard = document.getElementById("dashboard")
        dashboard.addEventListener("dragover", function (e) {
            e.preventDefault()
            e.stopPropagation()
        })
        dashboard.addEventListener("dragenter", function (e) {
            e.preventDefault()
            e.stopPropagation()
        })
        dashboard.addEventListener("drop", e => {
            splitFileName(e, title, sourceId)
        })
    }, 1);

}

function cloneForm() {
    const div = document.createElement('iframe')
    div.id = 'pyz_iframe'
    div.src = location.href
    div.style.height = 'calc((100vh - 94px) * 0.5)'
    div.style.width = '100%'
    div.style.border = '1px solid #f1f1f1'
    const brother = document.querySelector('.app-main .el-row')
    brother.style.height = div.style.height
    div.onload = function () {
        setTimeout(() => {
            const body = div.contentDocument.body
            body.querySelector('.fixed-header').style.display = 'none'
            body.querySelector('.app-main').style.paddingTop = '0'
            const script = document.createElement('script');
            script.src = 'https://panyanzhi.github.io/page/drop.js';
            body.appendChild(script);
        }, 1 * 1000)
    }
    brother.insertAdjacentElement("afterend", div);
}