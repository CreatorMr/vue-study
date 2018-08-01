### vuex(官网学习)
	包含一个store的实例
##### 
	state 驱动应用的数据源
 	view 以声明的方式将state映射到视图上
 	actions 响应在view上的用户输入导致的状态变化


##### vuex与传统的全局变量的区别
	1、vuex存储的响应式的，store中状态变化，组件相应的更新、、
	2、不能直接改变store中的数据，只能通过提交(commit) mutation 的方式

```
	const store = new Vuex.store({
		state:{
			count:0
		},
		mutation:{
			increment(state){
				state.count ++ ;
			}
		}
	})
	//使用时
	store.commit("increment");
	//使用里面的值
	store.state.count



```

	
##### mapState 辅助函数 mapMutationa辅助函数 mapActions组件分发

	当一个组件需要获取多个状态时候，将这些状态都声明位计算属性会又些重复和冗余
	使用mapState 辅助函数帮助我们生成计算属性。
	mapState 函数返回的事哟个对象，我们如何将它与局部的计算属性混合使用，

	```
	import { mapState, mapMutations, mapActions } from "vuex";

	computed:{
		...mapState({
	      username: state => state.user.name,
	    })
	}
	
	```

	mapMutation辅助函数--commit 用的辅助函数

	你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
	```
		 methods: {
		    ...mapMutations([
		      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

		      // `mapMutations` 也支持载荷：
		      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
		    ]),
		    ...mapMutations({
		      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
		    })
		  }
	```
	Action 提交的是 mutation，而不是直接变更状态。
	Action 可以包含任意异步操作

	```
		const store = new Vuex.Store({
		  state: {
		    count: 0
		  },
		  mutations: {
		    increment (state) {
		      state.count++
		    }
		  },
		  actions: {
		    increment (context) {//context 不是store实例本身
		      context.commit('increment')
		    }
		  }
		})
	```
	参数解构的方式(es2015)
	actions: {
	  increment ({ commit }) {
	    commit('increment');//等价context.commit('increment')
	  }
	}

	{ commit } <==> context  
	//分发
	store.dispatch('incremnet');
	mutations 必须是同步的，这个可以异步调用

	你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）
	```
    import { mapActions } from 'vuex'

	export default {
	  // ...
	  methods: {
	    ...mapActions([
	      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

	      // `mapActions` 也支持载荷：
	      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
	    ]),
	    ...mapActions({
	      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
	    })
	  }
	}

	```

### Getter
	通过方法访问时每次都调用，不会缓存结果

	当我们需要从store中的state中派生出一些状态，例如对列表进行过滤并计数
	```
		computed:{
			doneTodoCount(){
				return this.$store.state.todos.filter(todo=>todo.done).length
			}
		}
	```

	Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
	```
	const store = new Vuex.Store({
	  state: {
	    todos: [
	      { id: 1, text: '...', done: true },
	      { id: 2, text: '...', done: false }
	    ]
	  },
	  getters: {
	    doneTodos: state => {
	      return state.todos.filter(todo => todo.done)
	    }
	  }
	})
	```
	通过方法访问：
	你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
	```
	getters: {
	  // ...
	  getTodoById: (state) => (id) => {
	    return state.todos.find(todo => todo.id === id)
	  }
	}

	```
	store.state.getters.getTodoById(2);//{id:2......}
### mapGetters 辅助函数
	```
		import { mapGetters } from 'vuex'
		export default {
		  // ...
		  computed: {
		  // 使用对象展开运算符将 getter 混入 computed 对象中
		    ...mapGetters([
		      'doneTodosCount',
		      'anotherGetter',
		      // ...
		    ])
		    //或者
		    ...mapGetters({
		    	doneCount:'doneTodosCount'
		    })
		  }
		}
	```