// 用于监听 myplugin-5.js 中的自定义事件
const MyPlugin = require('./myplugin-5')

class Listen5Myplugin {
    apply(compiler) {
        // 在myplugin environment 阶段被广播
        MyPlugin.getHooks(compiler).myPluginHook.tap('Listen5Myplugin', (data) => {
            console.log('@Listen5Myplugin', data)
        })
    }
}

module.exports = Listen5Myplugin