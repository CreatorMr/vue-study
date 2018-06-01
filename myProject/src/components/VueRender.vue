<template>

<div>
  <div class="header">
    <button type="button" @click="goDis"> 控制renderContent中的三个按钮的显隐</button>
  </div>

  <div class="hello">
    <el-tree :data="menuList || []" :props="defaultProps" :expand-on-click-node="false" :render-content="renderContent" default-expand-all highlight-current></el-tree>
  </div>

</div>
</template>

<script>
export default {
  name: 'VueRender',
  data () {
    return {
      menuList: [{
        name:"管理员",
        parentId:0,
        parentIds:"0,15,",
        permission:"",
        showType:1,
        sort:1,
        subMenu:[{id: 19, parentId: 15, parentIds: "0,15,19,", name: "余额管理", sort: 11, href: "", showType: 1},{id: 25, parentId: 15, parentIds: "0,15,25,", name: "充值记录", sort: 12, href: "", showType: 1},{id: 26, parentId: 15, parentIds: "0,15,26,", name: "消费记录", sort: 13, href: "", showType: 1}]

      },{
        name:"管理员",
        parentId:0,
        parentIds:"0,15,",
        permission:"",
        showType:1,
        sort:1,
        subMenu:[{id: 19, parentId: 15, parentIds: "0,15,19,", name: "余额管理", sort: 11, href: "", showType: 1},{id: 25, parentId: 15, parentIds: "0,15,25,", name: "充值记录", sort: 12, href: "", showType: 1},{id: 26, parentId: 15, parentIds: "0,15,26,", name: "消费记录", sort: 13, href: "", showType: 1}]

      }],
      defaultProps: {
        children: "subMenu",
        label: "name"
      },
      PERMISSION:{
        isDisplay:false
      }
    }
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return h('span',{style:"flex: 1; display: flex; align-items: center; justify-content: space-around; font-size: 14px; padding-right: 8px;"},[
          h('span',{class:'my-span-long'},[h('span',null,node.label)]),
          h('span',{class:'my-span'},[h('span',null,data.sort)]),
          h('span',{class:'my-span'},[h('span',null,data.href)]),
          h('span',{class:'my-span'},[h('span',null,data.showType===1?'可见':'不可见')]),
          h('span',{class:'my-span'},[h('span',null,data.permission)]),
          h('span',{class:'my-span'},this.PERMISSION['isDisplay']?[
            h('elButton',{attrs:{type:"text","v-show":false},on:{
              click:() => this.remove(node, data)
            }},"删除"),
            h('elButton',{attrs:{type:"text","v-show":false},on:{
              click:() => this.modify(node, data)
            }},"修改"),
            h('elButton',{attrs:{type:"text","v-show":false},on:{
              click:() => this.add(node)
            }},"添加")
            ]:[])
        ])
    },
    goDis(){
      if(this.PERMISSION['isDisplay']){
        this.PERMISSION['isDisplay'] = false;
      }else{
        this.PERMISSION['isDisplay'] = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  margin: 20px;
}
</style>
