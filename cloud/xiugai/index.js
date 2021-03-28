// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type == "1") {
    return await cloud.database().collection(event._name).doc(event.id)
      .update({
        // data 传入需要局部更新的数据
        data: {
          type: "2",
          shenfen1: cloud.database().command.push([event.shen])
        }
      })
  }
}