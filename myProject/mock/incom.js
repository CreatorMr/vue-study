var data = {
  "ret": "success",
  "code": "0",
  "message": null,
  "data": {
    "dataList": [
      {id:1,name:"颠颠",amount:"1000"},
      {id:2,name:"‘@@@ YH",amount:"1000"},
      {id:3,name:"小爱",amount:"1000"},
      {id:4,name:"Jin~",amount:"1500"},
      {id:5,name:"橘子皮🍊",amount:"1500"},
      {id:6,name:"Lisa·Lin",amount:"1500"},
      {id:7,name:"李丽（🍦卿卿）",amount:"1500"},
      {id:8,name:"🍐曾",amount:"2000"},
      {id:9,name:"Z……",amount:"2000"},
      {id:10,name:"燕莎 ",amount:"1500"},
      {id:11,name:"侯琳琳Amy",amount:"1500"},
      {id:12,name:"老司机",amount:"1000"},
      {id:13,name:"张月月",amount:"1000"},
      {id:14,name:"Elvin",amount:"1000"},
      {id:15,name:"帅行天下",amount:"1000"},
      {id:16,name:"Shero",amount:"500"},
      {id:17,name:"李咏2333",amount:"500"},
      {id:18,name:"花啵啵",amount:"500"},
      {id:19,name:"嗨，小康",amount:"3000"},
      {id:20,name:".sara.😊",amount:"2500"},
      {id:21,name:"未填写～",amount:"2500"},
      {id:22,name:"李先生",amount:"2500"},
      {id:23,name:"AA_William💘",amount:"2500"},
      {id:24,name:"龍嘯鷲闐",amount:"2000"},
      {id:25,name:"壞ren",amount:"2000"},
      {id:26,name:"大道。至简",amount:"1500"},
      {id:27,name:"王林💪",amount:"2000"},
      {id:28,name:"qinming.zhou",amount:"1500"}
    ],
    total:7,
    pageNo:1,
    pageSize:10
  }
}
//list中字段
/*
退款编号 refundId
审批状态 approvalStatus
    case 1:
      return "待审批";
    case 2:
      return "已通过";
    case 3:
      return "已拒绝";
    case 4:
      return "退款成功";
    case 5:
      return "退款失败"
发起人类型 createUserType
  case 1:
    return "客服发起";
  case 2:
    return "用户发起";
发起人姓名/昵称 createUserName
用户ID userId
订单号 orderId
发起时间 createTimeStart
审批时间 approvalTime
退款完成时间 refundFinishTime
审批人 refundUser
退款类型 refundType
    case 1:
    return "整单退款";
  case 2:
    return "单品退款";


*/
export default [{
  path: '/console/icom',
  data: data
}]
