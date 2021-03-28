// pages/jiaolianpaiming/jiaolianpaiming.js
const db = wx.cloud.database().collection("jiaolian")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //教练栏综合
    jiaolian: [],
    //教练栏评分
    jiaolian1: [],
    //教练栏学员
    jiaolian2: [],
    //教练栏约课
    jiaolian3: [],
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "按评分",
        isActive: false
      },
      {
        id: 2,
        value: "按学员数",
        isActive: false
      },
      {
        id: 3,
        value: "按约课次数",
        isActive: false
      },
    ]
  },
  // 教练综合
  getjiaolian() {
    let that = this
    db.orderBy('starscore', 'desc')
      .orderBy('driving_age', 'desc').orderBy('yueke','desc').get({
        success(res) {
          that.setData({
            jiaolian: res.data
          })
        }
      })
  },
  // 教练评分
  getjiaolian1() {
    let that = this
    db.orderBy('starscore', 'desc')
      .get({
        success(res) {
          that.setData({
            jiaolian1: res.data
          })
        }
      })
  },
  // 教练学员
  getjiaolian2() {
    let that = this
    db.orderBy('count', 'desc')
      .get({
        success(res) {
          that.setData({
            jiaolian2: res.data
          })
        }
      })
  },
  // 教练约课
  getjiaolian3() {
    let that = this
    db.orderBy('yueke','desc').get({
        success(res) {
          that.setData({
            jiaolian3: res.data
          })
        }
      })
  },
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const {
      index
    } = e.detail;
    // 2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs
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
    this.getjiaolian();
    this.getjiaolian1();
    this.getjiaolian2();
    this.getjiaolian3();
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