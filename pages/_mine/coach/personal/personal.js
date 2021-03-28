// pages/_mine/coach/personal/personal.js
const DA = wx.cloud.database().collection("coach")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcard: '',
    array: ["男", "女"],
    image: "",
    name: "",
    sex: 1,
    phone: "",
    discription: "",
    img_one: "",
    area: "",
    chepai: '',
    leftLength: 150,
    maxLength: 150,
    id:''
  },
  bindPickerChange: function (e) {
    if (console.log(e), 0 == (a = e.detail.value)) var a = 1;
    else a = 2;
    this.setData({
      sex: a
    });
  },
  driving_img: function (e) {
    console.log(e);
    var a = this;
    wx.showActionSheet({
      itemList: ["拍照", "从相册中选择"],
      itemColor: "#000",
      success: function (e) {
        wx.showLoading({
          title: "加载中",
          mask: true
        });
        e.cancel || (1 == e.tapIndex ? a.chooseWxImage("album") : 0 == e.tapIndex && a.chooseWxImage("camera"));
      }
    });
  },
  chooseWxImage: function (e) {
    var t = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [e],
      success: function (e) {
        var a = e.tempFilePaths[0];
        t.setData({
          img_one: a
        }), t.SC_driving_img(a);
      },
      fail:function(e){
        wx.hideLoading();
      }
    });
  },
  SC_driving_img: function (e) {
    var a = e,
      t = wx.getStorageSync("openid"),
      timestamp = Date.parse(new Date());
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: "coach/" + t + '_' + timestamp + '.png',
      // 指定要上传的文件的小程序临时文件路径
      filePath: a,
      // 成功回调
      success: res => {
        this.setData({
          image: res.fileID
        })
        console.log('上传成功', res)
        wx.hideLoading();
      },
    })
  },
  bindRegionChange: function (e) {
    var a = e.detail.value,
      t = a[0] + "," + a[1] + "," + a[2];
    this.setData({
      area: t
    });
  },
  discription: function (e) {
    this.setData({
      discription: e.detail.value,
      leftLength: this.data.maxLength - e.detail.value.length
    });
  },
  submit: function () {
    if (this.data.image == '') {
      wx.showToast({
        title: '务必填写头像!',
        icon: 'error'
      })
    } else {
      if (this.data.area == '') {
        wx.showToast({
          title: '务必填写地区!',
          icon: 'error'
        })
      } else {
        if (this.data.discription == '') {
          wx.showToast({
            title: '务必填写自我介绍!',
            icon: 'none'
          })
        } else {
          DA.doc(this.data.id).update({
            data: {
              image:this.data.image,
              sex:this.data.sex,
              area:this.data.area,
              discription:this.data.discription
            },
            success:async function(res) {
             await wx.showToast({
                title: '保存成功',
                icon: 'success'
              })
              wx.navigateBack({
                delta: 1
              })
            }
          })
          console.log("aa");
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    DA.where({
      type: "2",
      area: ''
    }).get({
      success: function (res) {
        that.setData({
          name: res.data[0].name,
          phone: res.data[0].phone,
          idcard: res.data[0].idcard,
          chepai: res.data[0].chepai,
          id:res.data[0]._id
        })
      }
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