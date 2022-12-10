
export const EDU = {
  initSDK: (callback) => {
    const sdk = window.EDU || {}
    sdk.callback = callback
    sdk.send = function (message) {
      const origin = '*'
      const msg = JSON.stringify(message) // 为了兼容ie9，用字符串传送
      window.top.postMessage(msg, origin)
    }
    // 接收
    window.addEventListener('message', function (resp) {
      const data = resp.data
      const isEduData = typeof (data) === 'string' && data.indexOf('edu-') !== -1
      let message = null
      if (isEduData) {
        try {
          message = JSON.parse(data)
        } catch (e) {
          alert(e.message + '\n' + data)
          return
        }
        if (message) {
          if (sdk.callback) {
            sdk.callback(message)
          } else {
            EDU.parseMessage(message.info)
          }
        }
      }
    })
    window.EDU = sdk
  },
  parseMessage: function (info) {
    console.log(info)
  }
}
