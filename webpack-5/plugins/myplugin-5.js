// webpack向下兼容，所以监听钩子可以使用plugin方法
const pluginName = 'MyPlugin'
//tapable是webpack自带的package，是webpack的核心实现
const { SyncHook } = require("tapable");


/**
 * @description
 * Webpack5 插件编写方式
 * compiler.hooks、compilation.hooks 对象被 freeze，不能添加自定义钩子
 * 插件添加自定义钩子采用 WeakMap + static getHooks() 方式
 */

const MyPluginHooksMap = new WeakMap();

function getMyPluginHooks (compiler) {
    let hooks = MyPluginHooksMap.get(compiler);
    // Setup the hooks only once
    if (hooks === undefined) {
        hooks = {
            myPluginHook: new SyncHook(['data'])
        };
        MyPluginHooksMap.set(compiler, hooks);
    }
    return hooks;
}

class MyPlugin {
    // 传入webpack config中的plugin配置参数
    constructor(options) {
        // { test: 1 }
        console.log('@plugin constructor', options);
    }

    static getHooks(compiler) {
        return getMyPluginHooks(compiler)
    }

    apply(compiler) {
        console.log('@plugin apply');

        compiler.hooks.environment.tap(pluginName, () => {
            console.log('@environment');
        });

        compiler.hooks.afterEnvironment.tap(pluginName, () => {
            console.log('@after-environment');
        });

        compiler.hooks.entryOption.tap(pluginName, () => {
            console.log('@entry-option');
        });

        compiler.hooks.afterPlugins.tap(pluginName, (compiler) => {
            console.log('@after-plugins');
        });

        compiler.hooks.afterResolvers.tap(pluginName, (compiler) => {
            console.log('@after-resolvers');
        });

        compiler.hooks.beforeRun.tap(pluginName, (compiler) => {
            console.log('@before-run', compiler.options.plugins[0]);
        });

        compiler.hooks.run.tap(pluginName, (compiler) => {
            //广播自定义事件
            getMyPluginHooks(compiler).myPluginHook.call("It's my plugin.")
            console.log('@run');
        });

        compiler.hooks.watchRun.tap(pluginName, (compiler) => {
            console.log('@watch-run');
        });

        compiler.hooks.normalModuleFactory.tap(pluginName, (normalModuleFactory) => {
            // normalModuleFactory like compilation, extend Tapable
            console.log('@normal-module-factory');
        });

        compiler.hooks.contextModuleFactory.tap(pluginName, (ContextModuleFactory) => {
            console.log('@context-module-factory');
        });

        compiler.hooks.beforeCompile.tap(pluginName, (compilationParams) => {
            console.log('@before-compile');
        });

        compiler.hooks.compile.tap(pluginName, (compilationParams) => {
            console.log('@compile');
        });

        compiler.hooks.thisCompilation.tap(pluginName, (compilationParams) => {
            console.log('@this-compilation');
        });

        compiler.hooks.make.tap(pluginName, (compilation) => {
            console.log('@make');
        });

        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            console.log('@compilation');
        });

        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            //使用对应loader去编译一个module
            // 包含了module的resource（资源路径），loaders（经过的loaders）等信息
            compilation.hooks.buildModule.tap(pluginName, (module) => {
                console.log('@build-module');
            });

            compilation.hooks.normalModuleLoader.tap(pluginName, (loaderContext, module) => {
                console.log('@normal-module-loader');
            });
            
            //所有module都通过依赖转换完成
            compilation.hooks.seal.tap(pluginName, () => {
                console.log('@seal');
            });
        });

        compiler.hooks.afterCompile.tap(pluginName, (compilation) => {
            console.log('@after-compile');
        });

        compiler.hooks.shouldEmit.tap(pluginName, (compilation) => {
            console.log('@should-emit');
        });

        // 文件输出钩子，最后一个可以修改输出数据的地方
        compiler.hooks.emit.tap(pluginName, (compilation) => {
            console.log('@emit');
        });

        compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
            console.log('@after-emit');
        });

        compiler.hooks.done.tap(pluginName, (stats) => {
            console.log('@done');
        });

        compiler.hooks.failed.tap(pluginName, (error) => {
            console.log('@failed');
        });

        //webpack watch被停止
        compiler.hooks.invalid.tap(pluginName, (options) => {
            console.log('@invalid');
        });
    }

}
module.exports = MyPlugin