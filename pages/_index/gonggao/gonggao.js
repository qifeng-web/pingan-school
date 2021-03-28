const DC = wx.cloud.database().collection("gonggao")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gonggao: []
  },
  getgonggao() {
    DC.orderBy('addtime', 'desc').get().then(res => {
      for (let i = 0; i < res.data.length; i++)
        res.data[i].addtime = res.data[i].addtime.toString()
      this.setData({
        gonggao: res.data
      })
    })
  },
  goto(res) {
    wx.cloud.callFunction({
      name: "yuedu",
      data: {
        _name: 'gonggao',
        id: res.currentTarget.id
      }
    })
    wx.navigateTo({
      url: 'gonggao-zi/gonggao-zi?id=' + res.currentTarget.id,
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
    this.getgonggao();
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
    this.getgonggao();
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
    this.getgonggao();
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