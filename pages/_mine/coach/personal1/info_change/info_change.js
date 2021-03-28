// pages/_mine/coach/personal1/info_change/info_change.js
const DA = wx.cloud.database().collection("coach")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  write_phone: function (a) {
    var t = a.detail.value;
    let that = this
    that.isPoneAvailable(t)
  },
  isPoneAvailable: function (pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
      this.setData({
        phone: ''
      });
    } else {
      console.log(pone);
      this.setData({
        phone: pone
      });
    }
  },
  submit: function () {
    let that = this
    if (this.data.phone == "") {
      wx.showToast({
        title: '输入格式有误',
        icon: 'error'
      })
    } else {
      wx.showModal({
        title: "提示",
        content: "是否确认修改手机号。",
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })
            DA.where({
              type: "2"
            }).update({
              data: {
                // 表示将 done 字段置为 true
                phone: that.data.phone
              },
              success: function (res) {
                console.log(res)
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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