/* 
1、通过Vue.use(MyPlugins) 使用，本质上是MyPlugins.insatll(Vue)
2、使用插件必须在new Vue()启动之前完成，实例化之前要配置好
3、如果使用Vue.use()多次注册同一个插件，只会成功一次
*/

Vue.use = function(plugin) {
    if (plugin.installed) {
        return
    }
    // 集合转数组，并去除第一个参数
    // var args = toArray(arguments, 1);
    var args = Array.prototype.slice.call(arguments, 1)
    /* 
    // ES5
    var args = Array.prototype.slice.call(arguments);
    var args = [].slice.call(arguments);

    // ES6
    const args = Array.from(arguments);
    const args = [...arguments];
     */
    
    // 把this(Vue) 添加到数组的第一个参数中  这样就可以在调用plugin.install方法的时候把Vue对象传递过去
    args.unshift(this) 

    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
        plugin.apply(plugin, args)
    }

    plugin.installed = true

    return this;
}
// toArray 的实现
function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    // 循环去除 前start元素
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret
  }

var vm = new Vue({
    data: { foo: 10 },
    rules: {
        foo: {
            validate: value => value > 1,
            message: 'foo must be greater than one'
        }
    },

    created() {
        var rules = this.$options.rules
        if (rules) {
            Object.keys(rules).forEach(key => {
                const {validate, message}  = rules[key]

                //监听，键是变量，值是函数
                this.$watch(key, newValue => {
                    const valid = validate(newValue)
                    if (!valid) {
                        console.log(message)
                    }
                })
            })
        }
    }
})

// 编写一个rules的插件，为了在Vue中直接使用，可以通过Vue.mixin注入到Vue组件中，这样所有的Vue实例都可以使用。

import Vue from 'vue'

const RulesPlugin = {
    insatll(Vue) {
        /* 
        插件应该有一个公开方法install
        第一个参数是Vue 构造器
        第二个参数是一个可选的选项对象 
        */
        Vue.minin({
            created() {
                var rules = this.$options.rules
                if (rules) {
                    Object.keys(rules).forEach(key => {
                        const {validate, message}  = rules[key]
        
                        //监听，键是变量，值是函数
                        this.$watch(key, newValue => {
                            const valid = validate(newValue)
                            if (!valid) {
                                console.log(message)
                            }
                        })
                    })
                }
            }
        })
    }
}

Vue.use(RulesPlugin)