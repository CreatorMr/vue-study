import mixinsPre from "./mixins-pre.js"
export default {
    mixins:[mixinsPre],
    created(){
        console.log("mixins的created钩子函数")
      },
      data(){
          return {
            placeholder:"请输入mixins 中的placeholder",
            bbbb:"asdfasdf"
          }
      },
    methods:{
        handleClose(){
            console.log("mixins中的同名方法")
        },
        getSelectList(){
            this.$axios.post('/console/icom',this.qryInput).then(res => {
              console.log("mock模拟的数据")
              console.log(res);
              this.refundList = res.data.data.dataList;
              this.totalCount = res.data.data.total;
            })
          },
          a(){
              console.log("aaaa这是mixinx 中的methods")
              this.pre();
          }
    },
    computed:{
        num(){
            return this.personName + "  num";
        },
        num2(){
            return this.personName + "  num2";
        }
    },
    watch:{
        "personName":function(oldVal,newVal) {
          console.log("mixins 中 变化了")
          this.a()
        }
     },
}