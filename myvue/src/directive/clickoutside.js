import Vue from 'vue'

Vue.directive('clickoutside',{
	bind:function(el,binding,vnode){
		function documentHandler(e){
			console.log(e)
			if(el.contains(e.target)){
				return false
			}
			if(binding.expression){
				binding.value(e);
			}
		}
		el._vueClickOutside_ = documentHandler;
		document.addEventListener('click',documentHandler,false);
	},
	unbind:function(el){
		document.removeEventListener('click',el._vueClickOutside_)
		delete el._vueClickOutside_;
	}
})