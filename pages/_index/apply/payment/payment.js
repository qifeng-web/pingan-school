// pages/apply/payment/payment.js
const DA = wx.cloud.database().collection("user")
const DE = wx.cloud.database().collection("banxing")
const DC = wx.cloud.database().collection("my_youhui")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // array: ["微信支付", "线下支付"],
    array: ["线下支付"],
    arrzf: "",
    id: '',
    openid: '',
    info: {},
    banxing: {},
    uamount: '0',
    time: '',
    newtime: '',
    is: true,
    now: '',
    _id:''
  },
  pan_you() {
    let that = this
    DC.where({
      type: "1"
    }).get({
      success(res) {
        console.log(res.data, that.data.banxing.price);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].start < that.data.newtime && res.data[i].end > that.data.newtime && Number(res.data[i].enough) <= Number(that.data.banxing.price)) {
            console.log("运行成功");
            that.setData({
              is: false
            })
          }
        }
      }
    })
  },
  bindPickerChange: function (a) {
    this.setData({
      arrzf: a.detail.value
    });
  },
  sousuo: async function () {
    await DA.where({
        id: this.data.id,
        _openid: this.data.openid
      }).field({
        time: true,
        _id: false,
        name: true,
        phone: true,
        id: true
      }).get()
      .then(res => {
        // console.log(res);
        this.setData({
          time: this._formatTime(res.data[0].time)
        })
        res.data[0].time = res.data[0].time.toString()
        this.setData({
          info: res.data[0]
        })
      })
    await DE.where({
        _id: this.data.id,
      }).field({
        describe: true,
        title: true,
        _id: false,
        price: true
      }).get()
      .then(res => {
        this.setData({
          banxing: res.data[0],
          now: res.data[0].price
        })
      })
    this.pan_you();
  },
  _formatTime: function (time_t) {
    var date = time_t.getFullYear() + "年" + time_t.getMonth() + "月" + time_t.getDate() + "日" + " "
    var time = (time_t.getHours() < 10 ? "0" + time_t.getHours() : time_t.getHours()) + ":" + (time_t.getMinutes() < 10 ? "0" + time_t.getMinutes() : time_t.getMinutes())
    return date + time
  },
  zhifu: async function () {
    let that = this
    if (!this.data.array[this.data.arrzf]) {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none',
        duration: 2000
      })
    } else {
      await DA.where({
        id: this.data.id,
        _openid: this.data.openid
      }).update({
        // data 传入需要局部更新的数据
        data: {
          isfalg: 2,
          now: that.data.now
        },
        success: function (res) {
          console.log(res);
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success:function(){
              wx.switchTab({
                url: '/pages/_index/index/index',
              })
            }
          })
        }
      })
      wx.cloud.callFunction({
        name: "dingyue",
        data: {
          openid: that.data.openid,
          type: 0,
          name: that.data.info.name,
          phone: that.data.info.phone,
          title: that.data.banxing.title,
          time: that.data.time
        },
        success(res) {
          console.log(res);
        }
      })
    }
    DC.doc(this.data._id).update({
      data:{
        type:"2"
      }
    })
  },
  goto: function (t) {
    wx.navigateTo({
      url: t.currentTarget.dataset.url + '?price=' + this.data.banxing.price
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dt = new Date()
    this.setData({
      id: options.id,
      openid: options.openid,
      newtime: dt
    })
    this.sousuo();
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
    this.setData({
      now: Number(this.data.banxing.price) - Number(this.data.uamount)
    })
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