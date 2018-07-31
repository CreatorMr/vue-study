import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import webApp from '@/components/webApp'
import webSecond from '@/components/webSecond'

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
