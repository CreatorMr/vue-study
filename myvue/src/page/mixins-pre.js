export default {
    methods:{
        pre(){
            console.log("打印出pre");
        },
        handleClose(){
            console.log("mixins-pre中的同名方法")
        },
        a(){
            console.log("pre---- aaaaa")
        }
    }
}