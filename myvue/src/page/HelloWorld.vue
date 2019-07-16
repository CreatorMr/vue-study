<template>
  <div class="hello">
    <div class="main" v-clickoutside="handleClose">
      <button @click="show = !show">点击显示下啦菜单</button>
      <div class="dropdown" v-show="show">
        <p>ssssssss</p>
      </div>
    </div>
    <input type="text" v-model="personName">
    <router-view></router-view>

    <div>
      <div v-time="timeNow"></div>
      <div v-time="timeBefore"></div>
      <v-inputSelect :getSelectList="refundList"  :placeholder="placeholder"></v-inputSelect>
    </div>
    {{num}}
  </div>
</template>

<script>
import mixix from "./mixin.js"
import { debuglog } from 'util';
export default {
  name: 'HelloWorld',
  mixins:[mixix],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show:false,
      timeNow:(new Date()).getTime(),
      timeBefore:1488930695721,
      placeholder:"请输入名字",
      personName:"",
      refundList:[]
    }
  },
  created(){
    console.log("组件的created钩子函数")
  },
  computed:{
    num(){
      return this.personName + "  哈哈";
    }
  },
  watch:{
     "personName":function(oldVal,newVal) {
       console.log("这个personName 变化了")
       console.log(this)
      this.a()
     }
  },
  methods:{
    handleClose:function(){
      this.show = false
      this.a()
      console.log(this.handleClose)
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
      console.log("组件中的a")
    }
   
  },
  mounted(){
    this.getSelectList()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  width: 125px;
}
button{
  display: block;
  width: 100%;
  color: #FFFFFF;
  background-color: #39f;
  border: 0;
  text-align: center;
  padding: 6px;
  font-size: 12px;
  border-right: 4px;
  cursor: pointer;
  outline: none;
  position: relative;
}
button:active{
  top: 1px;
  left:1px;
}
.dropdown{
  width: 100%;
  height: 150px;
  margin: 5px 0;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0,0,0,.2)
}
</style>
