import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/page/HelloWorld'
import webApp from '@/page/webApp'
import webSecond from '@/page/webSecond'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
     	{
	    	path:'/',
	    	name:'webApp',
	    	component:webApp
	    },{
	    	path:'/webSecond',
	    	name:'webSecond',
	    	component:webSecond
	    }
      ]
    }
  ]
})
