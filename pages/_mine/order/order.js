
// pages/_mine/order/order.js
const DA = wx.cloud.database().collection("user")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    wan:[],
    tabs: [{
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待审核",
        isActive: false
      },
    ],
    dai: [],
    shen: [],
    tab1: ''
  },
  wan() {
    DA.where({
      _openid: this.data.openid,
      isfalg: 1
    }).get().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].time = res.data[i].time.toString()
      }
      this.setData({
        wan: res.data
      })
    })
  },
  handleTabsItemChange(e) {
    // console.log(e.detail);
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
    if ((index == 0 && this.data.shen.length == 0 && this.data.dai.length == 0) || (index == 1 && this.data.dai.length == 0) || (index == 2 && this.data.shen.length == 0)) {
      wx.showToast({
        title: '暂无数据',
        icon: 'error',
        duration: 3000
      })
    }
  },
  dai() {
    DA.where({
      _openid: this.data.openid,
      isfalg: 0
    }).get().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].time = res.data[i].time.toString()
      }
      this.setData({
        dai: res.data
      })
    })
  },
  shen() {
    DA.where({
      _openid: this.data.openid,
      isfalg: 2
    }).get().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].time = res.data[i].time.toString()
      }
      this.setData({
        shen: res.data
      })
    })
  },
  goto: function (e) {
    wx.navigateTo({
      url: e
    })
  },
  hiti: async function (a) {
    await wx.requestSubscribeMessage({
      tmplIds: ['qyjAikc5JVPcYehsm-eMF1BDZys-JagYlx_-SG0Zwd8'],
      success(res) {
        console.log(res);
      }
    })
    var e = "/pages/_index/apply/payment/payment?id=" + a.currentTarget.dataset.id + '&openid=' + this.data.openid;
    this.goto(e);
  },
  canel: function(e){
    console.log(e.currentTarget.dataset.id);
    const id=e.currentTarget.dataset.id
    DA.doc(id).remove({
      success: function(res) {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 3000
        })
      },
      fail:function(res){
        console.log("shib",res);
      }
    })
    this.dai();
    if(this.data.dai.length==0){
      wx.showToast({
        title: '暂无数据',
        icon: 'error',
        duration: 3000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    this.dai();
    this.shen();
    this.wan();
    const index = Number(options.id);
    console.log(index);
    // 2 修改源数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中
    this.setData({
      tabs,
      openid: options.openid
    })
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
    this.dai();
    this.shen();
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