class Compile{
	constructor(el,vm){
		this.el = this.isElement(el)?el:document.querySelector(el);
		this.vm = vm;
		if(this.el){
			//如果这个元素能获取到。我们才开始编译
			//1、先把这些真实的DOM移入到内存中 fragment
			let fragment = this.nodeToFragment(this.el);
			//2、编译 => 提取想要的元素节点 v-model 和文本节点 {{}}

			this.compile(fragment);
			//3、把编译好的fragment 再塞回到页面中去
			this.el.appendChild(fragment);
		}
	}
	//专门写一些辅助的方法
	isElement(node){
		return node.nodeType === 1;
	}
	//是不是指令
	isDirective(name){
		return name.includes('v-')
	}
	//核心的方法
	compileElement(node){
		//带v-model v-text v-aa
		let attrs = node.attributes;//取出当前节点的属性
		Array.from(attrs).forEach(attrs => {
			console.log(attrs.name);
			//判断属性名字是不是包含v-
			let attrName = attrs.name;
			if(this.isDirective(attrName)){
				//取到对应的值放到节点中
				let expr = attrs.value;
				let [,type] = attrName.split('-');
				//node this.vm.$data expr
				CompileUtil[type](node,this.vm,expr);
				//
			}
		})
	}
	compileText(node){
		//带{{}}
		let expr = node.textContent;//取文本中内容
		let reg = /\{\{([^}]+)\}\}/g;
		console.log(expr);
		if(reg.test(expr)){
			//node this.vm.$data expr
			CompileUtil['text'](node,this.vm,expr);
		}
	}
	compile(fragment){
		//需要递归
		let childNodes = fragment.childNodes;
		Array.from(childNodes).forEach(node =>{
			if(this.isElement(node)){
				//是元素节点。还需要深入的检查
				console.log('element',node);

				//这里需要编译元素
				this.compileElement(node);
				this.compile(node);
			}else{
				//文本节点
				console.log('text',node);
				//这里需要编译文本
				this.compileText(node);
			}
		})
	}
	nodeToFragment(el){//需要讲el中的内容全部放到内存中
		//文档碎片 内存中的dom节点
		let fragment = document.createDocumentFragment();//创建一个文档碎片
		let firstChild;
		while(firstChild = el.firstChild){
			fragment.appendChild(firstChild);
		}
		return fragment;//内存中的节点
	}
}

CompileUtil = {
	getValue(vm,expr){//获取实例上对应的数据
		expr = expr.split(".");//[a,v,c,s,a,w,r]

		return expr.reduce((prev,next) => {//vm.$data.a
			return prev[next];
		},vm.$data);
	},
	getTextValue(vm,expr){//获取编译文本后的结果
		return expr.replace(/\{\{([^}]+)\}\}/g,(...arguments)=>{
			return this.getValue(vm,arguments[1]);
		})
	},
	text(node,vm,expr){//文本处理
		let updateFn = this.updater['textUpdater'];
		//"message.a" => [message,a] vm.$data.message.a
		//{{message.a}} => 文本 {{a}} {{b}}
		let value = this.getTextValue(vm,expr)
		expr.replace(/\{\{([^}]+)\}\}/g,(...arguments)=>{
			//添加监控，数据变化了，调用这个watcher的callback
			new Watcher(vm,arguments[1],(newValue)=>{
				//如果数据变化了，文本需要重新获取依赖的属性更新文本中的内容
				updateFn && updateFn(node,this.getTextValue(vm,expr));//更新视图
			})
		})
		

		updateFn && updateFn(node,value);//更新视图
	},
	setVal(vm,expr,newValue){
		expr = expr.split(".");
		//收敛
		return expr.reduce((prev,next,currentIndex) => {
			if(currentIndex === expr.length-1){
				prev[next] = newValue;
			}
			return prev[next];
		},vm.$data)
	},
	model(node,vm,expr){//输入框处理
		let updateFn = this.updater['modelUpdater'];
		//"message.a" => [message,a] vm.$data.message.azzzzzzzzzzzzz

		//添加监控，数据变化了，调用这个watcher的callback
		new Watcher(vm,expr,(newValue)=>{
			//当值变化后会调用cb，传递进来新的值
			updateFn && updateFn(node,this.getValue(vm,expr));//更新视图
		})
		node.addEventListener('input',(e)=>{
			let newValue = e.target.value;
			this.setVal(vm,expr,newValue);
		})

		updateFn && updateFn(node,this.getValue(vm,expr))
	},

	updater:{
		//文本更新
		textUpdater(node,value){
			node.textContent = value;
		},
		//输入框更新
		modelUpdater(node,value){
			node.value = value;
		}
	}
}