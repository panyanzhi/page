/* 微信：angewechat; like , i love you ; 2023-01-24 周二 */

function init () {
    // 添加元素 - 按钮
    addJumpBtn()
    // 添加脚手架
    addTool()
    // 视图渲染
    setTimeout(() => {
        initVue()
    }, 5 * 1000);
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
                    this.paths = []
                    this.pages = document.querySelector('.el-pager').children
                    this.oldLi = document.querySelector('.el-pager .active')
                    this.setPaths(this.oldLi)
                    this.oldLi.click()
                    setTimeout(() => {
                        const infos = []
                        for (let index = 0; index < this.paths.length; index++) {
                            const element = this.paths[index];
                            infos.push(element.link.split('com')[1])
                        }
                        const url = 'https://panyanzhi.github.io/page/#/ke?paths=' + infos.join(',')
                        window.open(url, '_self')
                    }, 6 * 1000);
                },
                setPaths: function (li, maxCount = 30) {
                    li.click()
                    setTimeout(() => {
                        const rows = document.querySelectorAll('.el-table__row')
                        const page = parseInt(li.textContent)
                        for (let rIndex = 0; rIndex < rows.length; rIndex++) {
                            const row = rows[rIndex];
                            const cols = row.children
                            // const text = cols[0].textContent
                            const link = cols[2].innerHTML.match(/href="(.*?)"/)[1]
                            if (this.paths.find(item => item.link === link)) {
                                continue
                            }
                            if (paths.length < maxCount) {
                                this.paths.push({ page, link })
                            } else {
                                break
                            }
                        }
                        if (this.paths.length < maxCount) {
                            this.setPaths(this.pages[page])
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
    const form = document.querySelector('.demo-form-inline')
    const p = document.createElement('p')
    p.innerHTML = `<el-button @click="jumpNext" size="mini">中间页</el-button>`
    p.id = 'pyz-btn'
    form.appendChild(section)
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
        console.log('add tool', node)
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
