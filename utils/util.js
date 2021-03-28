const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('_User');
    query.get(uid).then(res => {
      resolve({
        'result': res
      });
    })
  })
}

/**
 * 保存用户头像昵称
 * avatarUrl：头像
 * nickName:昵称
 */
const changeUserInfo = (avatarUrl, nickName) => {
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('_User');
    query.get(uid).then(res => {
      res.set('avatarurl', avatarUrl);
      res.set('nickName', nickName);
      res.save();
      resolve({
        'result': 'success'
      });
    })
  })
}

/**
 * 获取题目json文件url
 */
const getQuestionUrl = (ctype,course)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('CarType')
    query.equalTo('ctype','==',ctype);
    query.equalTo('course','==',course);
    query.find().then(res =>{
      if(res.length>0){
        resolve({
          'result': res[0]
        });
      }else{
        reject(
          console.log('error')
        )
      }
    })
  })
}

/**
 * 保存意见反馈
 */
const saveFeedback = (params) => {
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('Feedback')
    const pointer = wx.Bmob.Pointer('_User')
    const poiID = pointer.set(uid)
    query.set('uid', poiID)
    query.set('contact', params.contact)
    query.set('content', params.content)
    query.save().then(res => {
      resolve({
        'result': 'success'
      })
    }).catch(err => {
      resolve({
        'result': 'fail'
      })
    })
  })
}

module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
  changeUserInfo: changeUserInfo,
  getQuestionUrl: getQuestionUrl,
  saveFeedback: saveFeedback
}
