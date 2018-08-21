import InputSelect from './main'
//vue  插件。公开的方法install
InputSelect.install = function(Vue){
    Vue.component(InputSelect.name, InputSelect)
}
export default InputSelect