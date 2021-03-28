// pages/_mine/stocks/stocks.js
const DA = wx.cloud.database().collection("user")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    wan:[]
  },
  wan() {
    DA.where({
      _openid: this.data.openid,
      isfalg: 1
    }).get().then(res => {
      if(res.data.length==0){
        wx.showToast({
          title: '暂无搜索数据',
          icon: 'error',
          duration: 3000
        })
      }
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].time = res.data[i].time.toString()
      }
      this.setData({
        wan: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    this.setData({
      openid: options.openid
    })
    this.wan();
    wx.hideLoading();
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