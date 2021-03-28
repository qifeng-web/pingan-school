Page({

  data: {
    logo: '',
    name: '',
    is_login: true,
    angle: 0,
  },

  onLoad: function(options) {
    var that = this;
    // that.auth();
  },
  // auth: function() {
  //   console.log("22")
  //   var that = this;
  //   wx.getSetting({
  //     success(res) {
  //       //第一次弹窗允许授权
  //       console.log(res.authSetting['scope.userInfo'])
  //       if (!res.authSetting['scope.userInfo']) {
  //         that.showlogin(false, 2500);
  //       }else{
  //         setTimeout(function () {
  //           wx.reLaunch({
  //             url: '/pages/_index/index/index'
  //           })
  //         }, 1500) 
  //       }
  //     }
  //   })
  // },
  //首次点击允许获取用户信息并且授权
  getUserInfo: function (e) {
    var that = this
    if(e.detail.userInfo != undefined){
      var userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', userInfo);
      wx.u.getUserInfo().then(res1 => {
        var bmobUser = res1.result;
        if (bmobUser.avatarurl == '' || bmobUser.avatarurl == undefined) {
          wx.u.changeUserInfo(userInfo.avatarUrl, userInfo.nickName).then(res2 => { });
        }
        this.showlogin(false);
        wx.setStorageSync('userInfo', res1.result)
        wx.reLaunch({
          url: '/pages/_index/index/index'
        })
        that.setData({
          userInfo: res1.result,
        })
      })
    }
  },
  //是否显示登录授权框
  // showlogin: function(ishouw, times = 1500) {
  //   var that = this;
  //   setTimeout(function() {
  //     that.setData({
  //       is_login: ishouw
  //     })
  //   }, times)
  // },
  onReady: function() {

  },

  onShow: function() {
    var that = this
    wx.getUserInfo({
      success(res) {
        wx.u.getUserInfo().then(res1 => {
          console.log("数据",res1)
          var bmobUser = res1.result;
          if (bmobUser.avatarUrl == '' || bmobUser.avatarUrl == undefined) {
            wx.u.changeUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName).then(res2 => { });
          }
          wx.setStorageSync('userInfo', res1.result)
          that.setData({
            userInfo: res1.result,
            finish: true,
          })
        })
      }
    })
  },
  goSign: function () {
    wx.reLaunch({
      url: '/pages/_index/index/index'
    })
  }

})