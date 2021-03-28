// pages/apply/tishi/tishi.js
// import formatTime from '../../../utils/formatTime.js'
const DA = wx.cloud.database().collection("user")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    openid: '',
    name: '',
    phone: '',
    idcard: ''
  },

  dianji:async function() {
    let that = this
    await wx.requestSubscribeMessage({
      tmplIds: ['qyjAikc5JVPcYehsm-eMF1BDZys-JagYlx_-SG0Zwd8'],
      success (res) { 
        console.log(res);
      }
    })
    wx.navigateTo({
      url: '../payment/payment?id=' + that.data.id + '&openid=' + that.data.openid
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      openid: options.openid,
      name: options.name,
      phone: options.phone,
      idcard: options.idcard,
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