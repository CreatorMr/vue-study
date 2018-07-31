/*
  vue中双向数据绑定。 1模版的编译（把模版编译成我们想要的数据）、2数据劫持（Object.defineProperty 观察数据的变化，）、3watcher

*/

class MVVM{
	constructor(options){
		//一上来。先把可用的东西挂载在实例上
		this.$el = options.el;
		this.$data = options.data;

		//如果有要编译的模版，就开始编译
		if(this.$el){
			//在编译之前进行[数据]劫持,就是吧对象的所有属性改成get和set方法

			new Observer(this.$data);
			//代理
			this.proxyData(this.$data);
			//用数据和元素进行编译
			new Compile(this.$el,this);
		}
	}
	proxyData(data){
		Object.keys(data).forEach(key=>{
			Object.defineProperty(this,key,{
				get(){
					return data[key];
				},
				set(newValue){
					data[key] = newValue;
				}
			})
		})
	}
}