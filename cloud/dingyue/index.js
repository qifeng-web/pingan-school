// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.type==0){
    try {
      const result = await cloud.openapi.subscribeMessage.send({
        touser: event.openid, //要推送给那个用户
        page: 'pages/loading/loading', //要跳转到那个小程序页面
        data: {//推送的内容
          phrase1: {
            value: '报名成功'
          },
          name2: {
            value: event.name
          },
          phone_number3: {
            value: event.phone
          },
          time9:{
            value: event.time
          },
          thing7:{
            value: event.title
          }
        },
        templateId: 'qyjAikc5JVPcYehsm-eMF1BDZys-JagYlx_-SG0Zwd8' //模板id
      })
      console.log(result)
      return result
    } catch (err) {
      console.log(err)
      return err
    }
  }else if(event.type==1){
    try {
      const result = await cloud.openapi.subscribeMessage.send({
        touser: event.openid, //要推送给那个用户
        page: 'pages/loading/loading', //要跳转到那个小程序页面
        data: {//推送的内容
          name1: {
            value: event.name
          },
          date2: {
            value: event.time
          },
          thing3:{
            value: "提交成功，请静候管理员审核"
          },
        },
        templateId: '2-J7stnYM0SxOJr6O_nLtshNjp_nblfVNl8ZhLhL_eY' //模板id
      })
      console.log("成功",result)
      return result
    } catch (err) {
      console.log("失败",err)
      return err
    }
  }
  
}