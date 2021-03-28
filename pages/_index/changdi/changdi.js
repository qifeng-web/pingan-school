const DG = wx.cloud.database().collection("changdi")
Page({

  /**
   * 页面的初始数据
   */
  data: {
		//场地栏
		changdi: []
  },
	getchangdi() {
		let that = this
		DG.get({
			success(res) {
				that.setData({
					changdi: res.data
				})
			}
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
    this.getchangdi();
    wx.hideLoading();
  },
  openLocation: function (a) {
		var t = Number(a.currentTarget.dataset.lat),
			e = Number(a.currentTarget.dataset.lng),
			n = a.currentTarget.dataset.address,
			i = a.currentTarget.dataset.name;
		wx.openLocation({
			latitude: e,
			longitude: t,
			scale: 15,
			name: i,
			address: n
		});
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