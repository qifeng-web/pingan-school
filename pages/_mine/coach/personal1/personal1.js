// pages/_mine/coach/personal1/personal1.js
const DA = wx.cloud.database().collection("coach")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    idcard:''
  },
  submit: function () {
    wx.navigateTo({
      url: "../personal1/info_change/info_change?id=" + this.data.info._id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  cha() {
    let that = this
    DA.where({
      type: "2"
    }).get({
      success: function (res) {
        that.setData({
          info: res.data[0],
          idcard:res.data[0].idcard
        })
      }
    })
  },
  onLoad: function (options) {
    this.cha();
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
    this.cha();
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