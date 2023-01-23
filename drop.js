/* 微信：angewechat; like , i love you ; 2023-01-23 周一 */

function init () {
    // 添加元素 - 按钮
    step0()
    // 添加元素 - 新列表
    step1()
    // 添加脚手架
    step2()
    // 视图渲染
    setTimeout(() => {
        step3()
    }, 5 * 1000);

}

init()

// vue options

function vueOptions () {
    const options = [
        `{
            el: '#upload-mode-btn',
            template: '<el-button @click="visible = true">Button</el-button>
            <el-dialog :visible.sync="visible" title="Hello world">
              <p>Try Element</p>
            </el-dialog>',
            data: function () {
                return {
                    visible: false
                }
            },
            methods: {

            }
        }`,
        `{
            el: '#upload-mode-page',
            template: '<el-pagination
            small
            layout="prev, pager, next"
            :total="page">
          </el-pagination>',
            data: function () {
                return {
                    list: [],
                    page: {
                        current: 1,
                        total: 10
                    }
                }
            },
            methods: {

            }
        }`
    ]
    return options
}

// 模式切换按钮
function step0 () {
    // const bro = document.querySelector('section')
    const bro = document.querySelector('body')
    const section = document.createElement('section')
    section.id = 'upload-mode-btn'
    // const script = document.createElement('script')
    // script.id = 'upload-mode-btn-script'
    // script.innerHTML = `<el-button @click="visible = true">Button</el-button>
    // <el-dialog :visible.sync="visible" title="Hello world">
    //   <p>Try Element</p>
    // </el-dialog>`
    // script.type = 'x-template'
    // bro.appendChild(script)
    bro.appendChild(section)
}

// 添加上传模式页面
function step1 () {
    const bro = document.querySelector('body')
    const section = document.createElement('section')
    section.id = 'upload-mode-page'
    bro.parentElement.appendChild(section)
}

// 添加脚手架
function step2 () {
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
function step3 () {
    const options = vueOptions()
    for (let index = 0; index < options.length; index++) {
        const script = document.createElement('script')
        script.innerText = `new Vue(${options[index].replace(/[\r\n]/g, "")})` //.replace(/\s+/g, "")
        document.head.appendChild(script)
    }
}

