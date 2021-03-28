// pages/_mine/guanli/shenhe/shenhe.js
const _ = wx.cloud.database().command
const DA = wx.cloud.database().collection("coach")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    jiao: [],
    tabs: [{
        id: 0,
        value: "学员报名",
        isActive: false
      },
      {
        id: 1,
        value: "教练注册",
        isActive: true
      },
    ],
    shuang: false
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
  _handlerPreviewImage(evt) {
    wx.previewImage({
      urls: this.data.jiao[evt.currentTarget.id].photo,
      current: evt.currentTarget.dataset.src
    })
  },
  cha1() {
    let that = this
    wx.cloud.callFunction({
      name: "chaxun",
      data: {
        _name: 'user',
        type: "2"
      },
      success(res) {
        that.setData({
          info: res.result
        })
      }
    })

  },
  cha2() {
    let that = this
    wx.cloud.callFunction({
      name: "chaxun",
      data: {
        _name: 'c_zhuce',
        type: "3"
      },
      success(res) {
        that.setData({
          jiao: res.result
        })
      }
    })

  },
  gly(e) {
    let that = this;
    wx.showModal({
      title: '审核通知',
      content: '是否同意 ' + e.currentTarget.dataset.name + ' 成为管理员？',
      confirmText: "同意",
      cancelText: "拒绝",
      success: function (res) {
        if (res.confirm) {

          console.log("cg-gly");
          
          DA.add({
            data: {
              name: that.data.jiao[e.currentTarget.id].name,
              phone: that.data.jiao[e.currentTarget.id].phone,
              idcard: that.data.jiao[e.currentTarget.id].idcard,
              gly: true,
              photo: that.data.jiao[e.currentTarget.id].photo,
              area: '',
              time: wx.cloud.database().serverDate(),
              avatarurl: that.data.jiao[e.currentTarget.id].avatarurl,
              openid:that.data.jiao[e.currentTarget.id]._openid
            },
            success: function (res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
          return;
          if (that.data.jiao[e.currentTarget.id].shenfen.length == 2) {
            that.glyshenhe(e.currentTarget.dataset.name);
          }
          let jiao = that.data.jiao
          jiao[e.currentTarget.id].shenfen.push(["gly"])
          that.setData({
            jiao: jiao
          })
          wx.cloud.callFunction({
            name: "xiugai",
            data: {
              _name: 'coach',
              id: e.currentTarget.dataset.id,
              type: "1",
              shen: "jl"
            },
            success(res) {
              wx.showToast({
                title: '成功通过注册',
                icon: 'success',
              })
            }
          })
          return;
          DA.doc(e.currentTarget.dataset.id).remove({
            success: function (res) {
              wx.showToast({
                title: '成功拒绝注册',
                icon: 'success',
              })
            }
          })

        } else if (res.cancel) {
          console.log("sb-gly");
        }
      }
    })
  },
  jl(a) {
    wx.showModal({
      title: '审核通知',
      content: '是否同意 ' + a.currentTarget.dataset.name + ' 成为教练？',
      confirmText: "同意",
      cancelText: "拒绝",
      success: function (res) {
        if (res.confirm) {
          console.log("cg-jl");
        } else if (res.cancel) {
          console.log("sb-jl");
        }
      }
    })
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
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    // this.cha1();
    this.cha2();
    wx.hideLoading();
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