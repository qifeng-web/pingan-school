
// pages/_mine/receive/receive.js
const DC = wx.cloud.database().collection("youhuiquan")
const DA = wx.cloud.database().collection("my_youhui")
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    youhuiquan: [],
    time: ''
  },
  getyouhuiquan() {
    let that = this
    const _ = db.command
    DC.get({
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].end1 = res.data[i].end.toString(),
            res.data[i].start1 = res.data[i].start.toString()
          if (res.data[i].start < that.data.time && res.data[i].end > that.data.time) {
            that.setData({
              youhuiquan: that.data.youhuiquan.concat(res.data[i])
            })
          }
        }
      }
    })
  },
  getbind: function (a) {
    let t = a.currentTarget.id
    let that = this
    DA.where({
      id:that.data.youhuiquan[t]._id
    }).get({
      success: function (res) {
        console.log("yunxing");
        if (res.data.length == 0) {
          DA.add({
            data: {
              amount: that.data.youhuiquan[t].amount,
              enough: that.data.youhuiquan[t].enough,
              end: that.data.youhuiquan[t].end,
              start: that.data.youhuiquan[t].start,
              id: that.data.youhuiquan[t]._id,
              type:"1"
            },
            success: function (res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
          wx.showToast({
            title: "领取成功",
            icon: 'success'
          })
        }else{
          wx.showToast({
            title: "您已领取",
            icon: 'none'
          })
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
    this.getyouhuiquan();
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