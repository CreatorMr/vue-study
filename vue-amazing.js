//关于循环中的img的src赋值的问题

<template>

        <div class="goods" v-for="item in morkdel.goodsList">
          <div class="goodsimg"><img src="item.productImg"></div><!--有错误-->
          <div class="content">
            <p>{{item.productName}}</p>
            <p><span>￥{{item.productPrice}}</span><span>x{{item.productNum}}</span></p>
          </div>
        </div>

</template>

<script>
     export default:{
         data(){
            return:{
               morkdel:{goodsList:[
                {productImg:"img/1.png",
                productName:"火龙果",
                productPrice：12,
                productNum:2
                }, {
                productImg:"img/1.png",
                productName:"火龙果",
                productPrice：12,
                productNum:2}
               ]}
          }
        }
    }

</script>
//在循环中使用   :src代替src可以实现
