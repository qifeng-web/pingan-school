// pages/_mine/guanli/guanli.js
const DA = wx.cloud.database().collection("coach")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarurl: '',
    nickName: '',
    openid: '',
    info: ''
  },
  York(){
    wx.navigateTo({
      url: '../guanli/shenhe/shenhe'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          avatarurl: res.data.avatarurl,
          nickName: res.data.nickName,
          openid: res.data.username
        })
      }
    })
    DA.where({
      type: "2"
    }).get({
      success: function (res) {
        that.setData({
          info: res.data[0]
        })
      }
    })
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

  }
})