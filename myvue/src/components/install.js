import Vue from 'vue'

import InputSelect from './inputSelect'
// 形成组件库
const components = [
    InputSelect
    
]

// 注册全局组件
components.map((com) =>{
    // Vue.component(com.name, com)
	
    Vue.use(com)
})

export default components