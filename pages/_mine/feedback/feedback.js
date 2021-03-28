// pages/feedback/index.js
const DA = wx.cloud.database().collection("feedback")
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {},
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData ({
      name: options.name
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

  bindsubmit: function (e) {
    let that = this
    var params = {
      'contact': e.detail.value.contact,
      'content': e.detail.value.content
    }
    that.setData({
      params: params
    })
    if (params.contact == "" || params.content == "") {
      wx.showToast({
        title: "请填写完整",
        icon: 'none'
      })
      return
    }
    wx.u.saveFeedback(params).then(res => {
      DA.add({
        data: {
          contact: that.data.params.contact,
          content: that.data.params.content,
          name:that.data.name,
          time: db.serverDate()
        }
      })
      if (res.result == 'success') {
        wx.showModal({
          title: "反馈成功",
          content: "已经收到您的反馈，谢谢您的关注！",
          showCancel: !1,
          confirmText: "我知道啦",
          confirmColor: "#1bd0ad",
          success: function (e) {
            wx.navigateBack();
          }
        });
      } else {
        console.log('提交失败')
      }
    })
  }
})