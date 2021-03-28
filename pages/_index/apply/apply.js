// pages/apply/apply.js
const DE = wx.cloud.database().collection("banxing")
const DA = wx.cloud.database().collection("user")
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: '',
    _count: '',
    idcard: "",
    name: "",
    phone: "1",
    idcard1: "a",
    pan: true,
    openid: '',
    userInfo: {}
  },
  name: function (a) {
    var t = a.detail.value;
    this.setData({
      name: t
    });
    this.panduan();
  },
  write_phone: function (a) {
    var t = a.detail.value;
    let that = this
    that.isPoneAvailable(t)
    that.panduan();
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
  write_idcard: function (a) {
    var t = a.detail.value;
    let that = this
    that.isidcard(t)
    that.panduan();
  },
  isidcard: function (pone) {
    var myreg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!myreg.test(pone)) {
      this.setData({
        idcard1: ''
      });
    } else {
      console.log(pone);
      this.setData({
        idcard: pone,
        idcard1: pone
      });
    }
  },

  getOpenid: function () {
    let that = this;
    wx.getStorage({
      key: 'openid',
      success(res) {
        that.setData({
          openid: res.data
        })
        console.log(res.data)
      }
    })
  },
  getbanxing() {
    let that = this
    DE.where({
      _id: that.data.id
    }).get({
      success(res) {
        // console.log(res);
        that.setData({
          info: res.data[0],
        })
      }
    })
    wx.cloud.callFunction({
      name: "chaxun",
      data: {
        _name: 'user',
        id: that.data.id,
        type: "1"
      },
      success(res) {
        that.setData({
          _count: res.result
        })
      }
    })

  },
  shenfenzheng() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '请拍照扫描身份证号码',
      success(res) {
        if (res.confirm) {
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFilePaths = res.tempFilePaths
              that.uploadFile(tempFilePaths[0])
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  uploadFile(tempFile) {
    let that = this
    let sui = Math.ceil(Math.random() * 100);
    var timestamp = Date.parse(new Date());
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    wx.cloud.uploadFile({
      cloudPath: "idcard/" + that.data.id + '_' + timestamp + '_' + sui + '.png',
      filePath: tempFile, // 文件路径
      success: res => {
        console.log("上传图片成功", res.fileID)
        that.getImgUrl(res.fileID)
      },
      fail: err => {
        console.log("上传图片失败", err)
        wx.hideLoading();
      }
    })
  },
  getImgUrl(fileid) {
    let that = this
    wx.cloud.getTempFileURL({
      fileList: [fileid],
      success: res => {
        let tempUrl = res.fileList[0].tempFileURL
        console.log("获取图片url成功", tempUrl)
        that.shibie(tempUrl)
      },
      fail: err => {
        console.log("获取图片url失败", err)
        wx.hideLoading();
      }
    })
  },
  shibie(tempUrl) {
    let that = this
    wx.cloud.callFunction({
      name: "shenfenzheng",
      data: {
        imgQQ: tempUrl
      },
      success(res) {
        wx.hideLoading();
        wx.showToast({
          title: '识别成功',
          icon: 'success',
        })
        console.log("识别成功", res)
        that.setData({
          idcard: res.result.id,
          idcard1: res.result.id
        })
        that.panduan();
      },
      fail(res) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '识别失败，请重新上传照片或手动输入身份证号码',
          showCancel: false,
          success(res) {}
        })
        console.log("识别失败", res)
      }

    })
  },
  panduan() {
    if (this.data.name !== '' && this.data.phone !== '1' && this.data.phone !== '' && this.data.idcard1 !== '' && this.data.idcard1 !== 'a') {
      this.setData({
        pan: false
      })
    } else {
      this.setData({
        pan: true
      })
    }
  },
  charu() {
    let that = this
    db.collection('user').add({
        data: {
          name: that.data.name,
          phone: that.data.phone,
          id: that.data.id,
          idcard: that.data.idcard,
          time: db.serverDate(),
          isfalg: 0,
          price: that.data.info.price,
          title: that.data.info.title,
          aquire_number: that.data.info.aquire_number,
          eachcar_num: that.data.info.eachcar_num,
          avatarurl: that.data.userInfo.avatarurl
        }
      })
      .then(res => {
        console.log("上传成功", res)
      })
  },
  xuigai() {
    let that = this
    DA.where({
      id: this.data.id,
      _openid: this.data.openid
    }).update({
      // data 传入需要局部更新的数据
      data: {
        name: that.data.name,
        phone: that.data.phone,
        idcard: that.data.idcard,
        time: db.serverDate()
      },
      success: function (res) {
        // console.log(res.data)
        wx.showToast({
          title: '更新成功',
          icon: 'success',
        })
      },
      fail: function (err) {
        console.log("shibai", err);
      }
    })
  },
  tijiao: function () {
    let that = this
    DA.where({
        id: this.data.id,
        _openid: this.data.openid
      }).get()
      .then(res => {
        if (res.data == '') {
          this.charu();
          wx.navigateTo({
            url: 'tishi/tishi?name=' + that.data.name + '&id=' + that.data.id + '&phone=' + that.data.phone + '&idcard=' + that.data.idcard + '&openid=' + that.data.openid
          })
        } else {
          that.xuigai();
          wx.showToast({
            title: '更新成功',
            icon: 'success',
          })
          wx.navigateTo({
            url: 'tishi/tishi?name=' + that.data.name + '&id=' + that.data.id + '&phone=' + that.data.phone + '&idcard=' + that.data.idcard + '&openid=' + that.data.openid
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getbanxing();
    this.getOpenid();
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
    var that = this
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
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