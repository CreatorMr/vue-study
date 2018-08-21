import Mock from 'mockjs'


import incom from './incom.js'

// 业务模拟数据   end



let businessListCopy = [incom]
let businessList = []
let data = [].concat(...businessListCopy)
data.forEach(function(res){
  Mock.mock(res.path,res.data)
})

export default Mock
