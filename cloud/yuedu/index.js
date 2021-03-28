// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database().collection(event._name).doc(event.id).update({
    data: {
      nclick : cloud.database().command.inc(1)
    }
  })

}