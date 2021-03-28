// pages/_index/apply/price/price.js
const DC = wx.cloud.database().collection("my_youhui")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    youhui: [],
    time: '',
    price: ''
  },
  goto: function (a) {
    let t = Number(a.currentTarget.dataset.enough)
    if (t > this.data.price) {
      wx.showToast({
        title: "订单金额未满" + t + ",不能使用该优惠券",
        icon: "none"
      })
    } else {
      let pages = getCurrentPages(); // 当前页，
      let prevPage = pages[pages.length - 2]; // 上一页
      prevPage.setData({
        uamount:a.currentTarget.dataset.amount,
        _id:a.currentTarget.dataset._id
      })

      wx.navigateBack({ //返回
        delta: 1
      })
    }
  },
  cha: function () {
    let that = this
    DC.where({
      type: "1"
    }).get({
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].end1 = res.data[i].end.toString(),
            res.data[i].start1 = res.data[i].start.toString()
          if (res.data[i].start < that.data.time && res.data[i].end > that.data.time) {
            console.log("成功");
            that.setData({
              youhui: that.data.youhui.concat(res.data[i])
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dt = new Date()
    this.setData({
      time: dt,
      price: options.price
    })
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