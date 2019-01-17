##### 计算属性和监听的区别
      对于任何复杂的运算都应该使用计算属性
      计算属性：其实就是标签调用变量，在computed中定义函数进行相应的计算

      计算属性缓存和方法之间，虽然方法可以实现和计算属性一样的效果。但是计算属性是基于依赖缓存的。
      计算属性只有在它的相关依赖发生变化的时候才会重新求值，否则不会。所以计算属性在一定时候会立即返回处理之后的值


      而监听 watch 一个属性，当一个属性变化时，就执行相应的操作。适用于，当数据发生变化时，执行异步操作或较大开销操作的情况

      通过对比，对于获取fullName 目标需要依赖一个或者多个其他的变量的时候用计算属性比较简洁。

      而且计算属性中还可以设置get和set
```
<body>
    <!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    

    <div id="example">
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</body>

<script>
    new Vue({
        el:'#example',
        data:{
            message:'This is the description that will be processed'
        },
        computed:{
            reversedMessage() {
                return this.message.split('').reverse().join('')
            },
            // fullName() {
            //     return this.fullName = this.firstName + this.lastName
            // }
            fullName:{
                get(){
                    return this.fullName = this.firstName + this.lastName
                },
                set(newValue) {
                    var names = newValue.split(' ')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                }
            }

        },
        method:{
            reversedMessage() {
                return this.message.split('').reverse().join('')
            }
        },
        watch:{
            firstName(val) {
                return this.fullName = val + this.lastName
            },
            lastName(val) {
                return this.fullName = this.firstName + val
            }
        }
    })

</script>

```
    
    