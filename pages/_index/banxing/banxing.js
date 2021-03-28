const DE = wx.cloud.database().collection("banxing")
const DA = wx.cloud.database().collection("user")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //班型栏
    banxing: [],
    openid:'',
    baoming:[]
  },
	getbanxing() {
		let that = this
		console.log("banxing");
		DE.get({
			success(res) {
				for(let i=0;i<that.data.baoming.length;i++){
					for(let j=0;j<res.data.length;j++){
						if(that.data.baoming[i].id==res.data[j]._id){
							res.data[j].isflag=that.data.baoming[i].isfalg
						}
					}
				}
				that.setData({
					banxing: res.data
				})
			}
		})
	},
  goto: function (e) {
		wx.navigateTo({
			url: e
		})
  },
  isflag:async function() {
		console.log("isflag");
		 await DA.field({
				id: true,
				isfalg: true,
				_id: false
			}).get()
			.then(res => {
				// console.log(res);
				this.setData({
					baoming: res.data
				})
			})
			this.getbanxing();
	},
  hiti:async function (a) {
		let that=this
		var t = a.currentTarget.dataset.isflag;
		if (0 == t) {
      await wx.requestSubscribeMessage({
				tmplIds: ['qyjAikc5JVPcYehsm-eMF1BDZys-JagYlx_-SG0Zwd8'],
				success(res) {
					console.log(res);
				}
			})
				var e = "/pages/_index/apply/payment/payment?id=" + a.currentTarget.dataset.id+'&openid='+that.data.openid;
				this.goto(e);
		}
		if (-1 == t) {
			var e = "/pages/_index/apply/apply?id=" + a.currentTarget.dataset.id;
			this.goto(e);
		}
		// if (1 == t) {
		// 		e = "/pages/_index/index/course/course?id=" + a.currentTarget.dataset.id;
		// 		app.goto(e);
		// }
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid:options.openid
    })
    wx.showLoading({
			title: "加载中",
			mask: true
    });
    this.isflag();
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
		this.isflag();
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