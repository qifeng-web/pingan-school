// pages/xingui/xingui.js
const DB = wx.cloud.database().collection("lunbotu")
const DC = wx.cloud.database().collection("xingui")
let id1 = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xingui: [],
    xingui1: [],
    tabs: [{
        id: 0,
        value: "最新",
        isActive: true
      },
      {
        id: 1,
        value: "科目一",
        isActive: false
      },
      {
        id: 2,
        value: "科目二",
        isActive: false
      },
      {
        id: 3,
        value: "科目三",
        isActive: false
      },
      {
        id: 4,
        value: "科目四",
        isActive: false
      },
    ],
    // 轮播图数组
    lunbotu: [],
    tab1: ''
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
    this.setData({
      tabs,
      tab1: e.detail.index
    })
    // 3 赋值到data中
    this.getxingui();
  },


  getLunbotu() {
    DB.where({}).get()
      .then(res => {
        this.setData({
          lunbotu: res.data
        })
      })
  },
  getxingui() {
    DC.where({
      type: this.data.tab1
    }).get()
      .then(res => {
        for (let i = 0; i < res.data.length; i++)
          res.data[i].addtime = res.data[i].addtime.toString()
        this.setData({
          xingui: res.data,
        })
        if (res.data.length == 0 && this.data.tabs[0].isActive == false) {
          wx.showToast({
            title: '暂无数据',
            icon: 'error',
            duration: 3000
          })
        }
      })
  },
  getxingui1() {
    DC.get()
      .then(res => {
        for (let i = 0; i < res.data.length; i++)
          res.data[i].addtime = res.data[i].addtime.toString()
        this.setData({
          xingui1: res.data
        })
      })
  },
  goto(res) {
    wx.cloud.callFunction({
      name: "yuedu",
      data: {
        _name: 'xingui',
        id: res.currentTarget.id
      }
    })
    id1 = res.currentTarget.id;
    wx.navigateTo({
      url: 'xingui-zi/xingui-zi?id=' + res.currentTarget.id,
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
    this.getLunbotu();
    this.getxingui();
    this.getxingui1();
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
    this.getxingui();
    this.getxingui1();
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