<template>
  <div class="hello">
    <div class="main" v-clickoutside="handleClose">
      <button @click="show = !show">点击显示下啦菜单</button>
      <div class="dropdown" v-show="show">
        <p>ssssssss</p>
      </div>
    </div>

    <div>
      <div v-time="timeNow"></div>
      <div v-time="timeBefore"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show:false,
      timeNow:(new Date()).getTime(),
      timeBefore:1488930695721
    }
  },
  methods:{
    handleClose:function(){
      this.show = false
    }
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
