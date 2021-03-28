const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.ocr.idcard({
      type: 'photo',
      imgUrl: event.imgQQ
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}