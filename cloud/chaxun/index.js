// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type == "1") {
    return cloud.database().collection(event._name).where({
      id: event.id
    }).count().then(res => {
      return res.total
    })
  } else if (event.type == "2") {
    return cloud.database().collection(event._name).where({
      isfalg: 2
    }).get().then(res => {
      return res.data
    })
  } else if (event.type == "3") {
    return cloud.database().collection(event._name).where({
      type: "1"
    }).get().then(res => {
      return res.data
    })
  }

}