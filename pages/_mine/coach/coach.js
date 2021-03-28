// pages/_mine/coach/coach.js
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
  personal: function () {
    if (this.data.info.area == '') {
      wx.navigateTo({
        url: "/pages/_mine/coach/personal/personal"
      });
    }else{
      wx.navigateTo({
        url: "/pages/_mine/coach/personal1/personal1"
      });
    }
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
    let that = this
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