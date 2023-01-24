/* 微信：angewechat; like , i love you ; 2023-01-24 周二 */

function init () {
    initStyle()
}

init()

// vue options

function vueOptions () {
    const options = [
        `{
            el: '#pyz-btn',
            data: function () {
                return {
                    pages: [],
                    oldLi: {},
                    paths: []
                }
            },
            methods: {
                jumpNext: function () {
                    this.paths = [];
                    this.pages = document.querySelector('.el-pager').children;
                    this.oldLi = document.querySelector('.el-pager .active');
                    this.setPaths(this.oldLi);
                    this.oldLi.click();
                    const duration = 6 * 1000;
                    this.$message({ message: '跳转6s中...', duration, type: 'warning' });
                    setTimeout(() => {
                        const infos = [];
                        for (let index = 0; index < this.paths.length; index++) {
                            const element = this.paths[index];
                            infos.push(element.link.split('com')[1]);
                        }
                        const url = 'https://panyanzhi.github.io/page/#/ke?paths=' + infos.join(',');
                        window.open(url, '_blank');
                    }, duration);
                },
                setPaths: function (li, maxCount = 30) {
                    li.click();
                    setTimeout(() => {
                        const rows = document.querySelectorAll('.el-table__row');
                        const page = parseInt(li.textContent);
                        for (let rIndex = 0; rIndex < rows.length; rIndex++) {
                            const row = rows[rIndex];
                            const cols = row.children;
                            /* const text = cols[0].textContent */
                            const link = cols[2].innerHTML.match(/href="(.*?)"/)[1];
                            if (this.paths.find(item => item.link === link)) {
                                continue
                            }
                            if (this.paths.length < maxCount) {
                                this.paths.push({ page, link });
                            } else {
                                break
                            }
                        }
                        if (this.paths.length < maxCount) {
                            this.setPaths(this.pages[page]);
                        }
                    }, 2 * 1000);
                }
            }
        }`
    ]
    return options
}

// 中间页按钮
function addJumpBtn () {
    let form = document.querySelector('.demo-form-inline')
    const btns = document.querySelectorAll('.el-button--medium')
    for (let index = 0; index < btns.length; index++) {
        const element = btns[index];
        if (element.innerText.indexOf('查询') >=0) {
            form = element.parentElement
            break
        }
    }
    const p = document.createElement('span')
    p.innerHTML = `<el-button @click="jumpNext" style="margin-left: 10px" type="primary" plain size="medium">中间页</el-button>`
    p.id = 'pyz-btn'
    form.appendChild(p)
}

// 添加脚手架
function addTool () {
    const tools = [
        {
            type: 'script',
            url: 'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js',
            name: 'vue'
        },
        {
            type: 'script',
            url: 'https://cdn.jsdelivr.net/npm/axios@1.2.3/dist/axios.min.js',
            name: 'axios'
        },
        {
            type: 'script',
            url: 'https://cdn.jsdelivr.net/npm/element-ui@2.15.12/lib/index.min.js',
            name: 'elementui'
        },
        {
            type: 'link',
            url: 'https://cdn.jsdelivr.net/npm/element-ui@2.15.12/lib/theme-chalk/index.min.css',
            name: 'elementui'
        }
    ]
    for (let index = 0; index < tools.length; index++) {
        const tool = tools[index];
        const node = document.createElement(tool.type)
        node[tool.src] = tool.url
        if (tool.type === 'link') {
            node.rel = 'stylesheet'
            node.href = tool.url
        } else {
            node.src = tool.url
        }
        document.head.appendChild(node)
    }
}

// vue渲染
function initVue () {
    const options = vueOptions()
    for (let index = 0; index < options.length; index++) {
        const script = document.createElement('script')
        script.innerText = `new Vue(${options[index].replace(/[\r\n]/g, "")})` //.replace(/\s+/g, "")
        document.head.appendChild(script)
    }
}

// style
function initStyle () {
    const style = document.createElement('style')
    style.innerText = `.el-upload-list--text{max-width:300px}`
    document.head.appendChild(style)
}