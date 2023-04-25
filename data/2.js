(function(){
  window.dianbo = {
    content: `富文本编辑器根据其实现方式，业内将其划分为L0 ~ L2
    L0	视图层基于contenteditable，逻辑层基于document.execCommand，直接操作DOM	，如UEditor、TinyMCE
    L1	视图层基于contenteditable，逻辑层对DOM进行抽象，用数据去驱动视图更新，如Quill、Prosemirror、slate、Draft
    L2	自己实现内容排版，不依赖于浏览器原生操作，而使用canvas或svg来实现内容编排，焦点、选区等操作都是自身手动去实现，如Google Docs、WPS`,
    date: '2023/04/12 11:17:07',
    where: '山东舰2'
  }
})()