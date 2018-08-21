<template>
  <div class="hello">
    测试组件
    <div class="selectWrap" :getSelectList="getSelectList" v-search-select>
      <div class="input-lit-div">
        <input type="text" class="searchInput" @keyup='search($event)' :placeholder="placeholder">
      </div>
      <div class="ulWrap" v-show="datalist.length">
        <div class="arrow">
            <div class="arrow_border"></div>
            <div class="arrow_content"></div>
        </div>
        <ul  class="ulSelect">
          <li v-for="item in datalist" @click="selItem(item)">{{item.name}}</li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vInputSelect',
    data () {
      return {
        // selectShow:false
        datalist:[]
      }
    },
    props:{
      
      searchName:{
        type:String,
        default:function(){
          return ""
        }
      },
      getSelectList:{
        type:Array,
        default: function(){
            return null
        }
      },
      placeholder:{
        type:String,
        default:function(){
          return "请输入搜索的内容"
        }
      }
    },
    directives:{
      "search-select":{
        bind:function(el,binding,vnode){
          console.log("<<<<<<<<<<<<<<")
            console.log(vnode)
            let searchInput = el.querySelector(".searchInput");
           
        },
        update:(el,vnode)=>{
           console.log(el)
           let searchInput = el.querySelector(".searchInput");
           if(searchInput.value){

           }else{
            console.log(vnode)
           }
        }

      }
    },
    computed:{
     
    },
    methods:{
      search(e){
        let vm = this,searchvalue = e.currentTarget.value;
        vm.datalist = vm.getSelectList.filter(function(item,index,arr){
            return item.name.indexOf(searchvalue) != -1;
        });

      }
    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .selectWrap{
    width:400px;
  }
  .ulSelect{
    border: 1px solid #cecaca;
    max-height: 100px;
    overflow: auto;
    z-index: 8000;
    position: relative;
    top: -10px;
    background :#ffffff;
    width:400px;
    box-shadow: 0 0 30rpx 0 #E0E0E0;
  }
  .ulSelect li{
    list-style: none;
    font-size: 14px;
    color: #6f6969;
    margin: 5px 0;
  }

  .arrow{position: relative;width: 20px;height: 20px;margin: 0 0 0 15px;}
.arrow .arrow_border,.arrow .arrow_content{width: 0;height: 0;overflow: hidden;border-width: 10px;border-style: dashed dashed solid dashed;}
.arrow .arrow_border{border-color: transparent transparent #CCCCCC transparent;}
.arrow .arrow_content{border-color: transparent transparent #EEEEEE transparent;position: absolute;top: 1px;}
</style>
