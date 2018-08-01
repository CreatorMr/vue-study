class Observer{
	constructor(data){
		this.observer(data);//专门对data数据将原有的属性改成set和get的形式
	}
	//递归，让每个子属性都observe
	observer(data){
		if(!data || typeof data !== 'object'){
			return;
		}
		// 将数据一一劫持
		Object.keys(data).forEach(key=>{
			//劫持--定义响应式
			this.defineReactive(data,key,data[key])
		})
  	}
    defineReactive(obj,key,value){
    	//本身劫持之后在对新的值进行劫持
    	let that = this;
    	let child  = this.observer(value);
    	let dep = new Dep();//每个变化的数据，都会对应一个数组，这个数组存放所有更新的操作
		//在获取某个值的时候
		Object.defineProperty(obj,key,{
			enumerable: true,
    		configurable: true,
		    get: ()=>{
		    	Dep.target && dep.addSub(Dep.target);
		    	return value;
		    },
		    set:newVal=> {//当data属性中设置值的时候，更改获取的属性的值，
		    	if(newVal !== value){
		    		that.observer(newVal);//如果是对象继续劫持->递归
		    		child = newVal;
		    		dep.notify();//通知所有人，数据更新了
		    	}
		    }
		})

	}
  
}
//发布--订阅
class Dep{
	constructor(){
		this.subs = [];//订阅的数组
	}
	//添加订阅
	addSub(watcher){
		this.subs.push(watcher);
	}
	notify(){
		this.subs.forEach(watcher => watcher.update())
	}
}


