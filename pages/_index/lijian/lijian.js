// pages/lijian/lijian.js
const DC = wx.cloud.database().collection("my_youhui")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ke: [],
    shiyong: [],
    guoqi: [],
    time: '',
    tabs: [{
        id: 0,
        value: "可使用",
        isActive: true
      },
      {
        id: 1,
        value: "已使用",
        isActive: false
      },
      {
        id: 2,
        value: "已过期",
        isActive: false
      },
    ]
  },
  getyouhuiquan() {
    let that = this
    DC.where({
      type: "1"
    }).get({
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].end1 = res.data[i].end.toString(),
            res.data[i].start1 = res.data[i].start.toString()
            if (res.data[i].start < that.data.time && res.data[i].end > that.data.time){
              that.setData({
                ke: that.data.ke.concat(res.data[i])
              })
            }else{
              that.setData({
                guoqi: that.data.guoqi.concat(res.data[i])
              })
            }
        }
      }
    })
    DC.where({
      type: "2"
    }).get({
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].end1 = res.data[i].end.toString(),
            res.data[i].start1 = res.data[i].start.toString()
        }
        that.setData({
          shiyong: res.data
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
  goto:function(t){
    wx.navigateTo({
      url: t.currentTarget.dataset.url
    })
  },
  onLoad: function (options) {
    this.getyouhuiquan();
    let dt = new Date()
    this.setData({
      time: dt
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