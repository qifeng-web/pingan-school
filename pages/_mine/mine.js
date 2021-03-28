// pages/mine/mine.js
const DA = wx.cloud.database().collection("coach")
let num = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    is_login: true,
    jiao: true
  },
  login() {
    this.setData({
      is_login: !this.data.is_login
    })
  },
  bindgetuserinfo: function () {
    this.login()
    var that = this
    wx.getUserInfo({
      success(res) {
        wx.showLoading({
          title: '授权登录中',
        })
        wx.u.getUserInfo().then(res1 => {
          var bmobUser = res1.result;
          if (bmobUser.avatarUrl == '' || bmobUser.avatarUrl == undefined) {
            wx.u.changeUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName).then(res2 => {});
          }
          res1.result.avatarurl = res.userInfo.avatarUrl;
          res1.result.nickName = res.userInfo.nickName;
          wx.setStorageSync('userInfo', res1.result)
          that.setData({
            userInfo: res1.result,
          })
          wx.hideLoading()
        })
      }
    })
  },
  goto: function (t) {
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
    var a = t.currentTarget.dataset.url + '?name=' + this.data.userInfo.nickName
    this.jump(a);
  },
  goto1: function (t) {
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
    // var a = t.currentTarget.dataset.url + '?openid=' + this.data.userInfo.username
    this.jump(t.currentTarget.dataset.url);
  },
  goto2: function (t) {
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
    var e = t.currentTarget.dataset.id,
      a = t.currentTarget.dataset.url + "?id=" + e + "&openid=" + this.data.userInfo.username;
    this.jump(a);
  },
  goto3: function (t) {
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
    var a = t.currentTarget.dataset.url + "?openid=" + this.data.userInfo.username;
    this.jump(a);
  },
  jump: function (a) {
    wx.navigateTo({
      url: a
    })
  },
  Aboutclass() {
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
    wx.showModal({
      title: '我的约课',
      content: '未查询到您的订单信息，是否跳转到报名界面？',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/_index/banxing/banxing'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  Aboutclass1() {
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
    wx.showModal({
      title: '我的教练',
      content: '未查询到您所选的教练，是否跳转到教练界面？',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/_index/jiaolian/jiaolian'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  coupon() {
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
    wx.navigateTo({
      url: '/pages/_index/lijian/lijian'
    })
  },
  about() {
    wx.showModal({
      title: '关于我们',
      content: '本程序仅供毕业设计使用，请勿使用于商业用途，如有问题，请联系QQ：2649345967、微信：18646330982。',
      showCancel: false
    })
  },
  coach: function (t) {
    let that = this
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
    DA.where({
      type: "2"
    }).get({
      success: function (res) {
        if (res.data.length !== 0) {
          if (res.data[0].shenfen.length == 2) {
            if ((res.data[0].shenfen[0] == "jl" && res.data[0].shenfen[1] == "gly") || (res.data[0].shenfen[1] == "jl" && res.data[0].shenfen[0] == "gly")) {
              wx.showModal({
                title: '温馨提示',
                content: '请您选择想要登录的账号',
                confirmText: '管理员',
                cancelText: '教练',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/_mine/guanli/guanli'
                    })
                  } else if (res.cancel) {
                    wx.navigateTo({
                      url: '/pages/_mine/coach/coach'
                    })
                  }
                }
              })
            }
          } else {
            if (res.data[0].shenfen[0] == "jl") {
              console.log("jl");
              wx.navigateTo({
                url: '/pages/_mine/coach/coach'
              })
            } else if (res.data[0].shenfen[0] == "gly") {
              console.log("gly");
              wx.navigateTo({
                url: '/pages/_mine/guanli/guanli'
              })
            }
          }
        } else {
          DA.where({
            type: "1"
          }).get({
            success: function (res) {
              if (res.data.length !== 0) {
                wx.showToast({
                  title: '您的申请已提交,请耐心等待管理员审核',
                  icon: "none"
                });
              } else {
                if (num == '4') {
                  wx.showModal({
                    title: '温馨提示',
                    content: '为确保您能准确递交注册信息，服务号需要在您的信息提交成功时向您发送消息',
                    confirmText: "同意",
                    cancelText: "拒绝",
                    success: function (res) {
                      if (res.confirm) {
                        wx.requestSubscribeMessage({
                          tmplIds: ['2-J7stnYM0SxOJr6O_nLtshNjp_nblfVNl8ZhLhL_eY'],
                          success(res) {
                            wx.navigateTo({
                              url: "/pages/_mine/zhuce/zhuce?openid="+that.data.userInfo.username
                            })
                          },
                          fail(err) {
                            console.log(err);
                          }
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消');
                        ///显示第二个弹说明一下
                        wx.showModal({
                          title: '温馨提示',
                          content: '拒绝后您将无法获取注册信息提交成功的消息',
                          confirmText: "知道了",
                          showCancel: false,
                          success: function (res) {
                            wx.navigateTo({
                              url: "/pages/_mine/zhuce/zhuce?openid="+that.data.userInfo.username
                            })
                          }
                        });
                      }
                    }
                  });
                  
                  num = 0
                } else {
                  console.log("1");
                  wx.showToast({
                    title: '您不是教练',
                    icon: "none"
                  });
                  num++
                }
              }
            }
          })

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "驾考助手，帮助你轻松拿到驾照！",
      path: "pages/_exam/loading/loading",
      // imageUrl: "https://bmob-cdn-24471.bmobcloud.com/2019/06/05/d3cebfef409ec4d28073dccb227f11f1.png"
    };
  },
})