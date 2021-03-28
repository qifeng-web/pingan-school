const DA = wx.cloud.database().collection("c_zhuce")
const db = wx.cloud.database()
const MAXIMAGECOUNT = 9
let jl = false
let gly = false
Page({
  data: {
    userInfo: {},
    items: [{
        name: 'jl',
        value: '教练',
        checked: 'true'
      },
      {
        name: 'gly',
        value: '管理员'
      }
    ],
    shenfen: ["jl"],
    name: "",
    phone: "1",
    idcard: "",
    idcard1: "a",
    code: "",
    yanzheng: "",
    bian: false,
    pan: true,
    yan: false,
    chooseImages: [],
    chooseImages1: [],
    openid: '',
    time: ''
  },
  _handlerDeleteImage(evt) {
    let index = evt.currentTarget.dataset.index
    this.data.chooseImages.splice(index, 1)
    this.setData({
      chooseImages: this.data.chooseImages
    })
  },
  _handlerPreviewImage(evt) {
    wx.previewImage({
      urls: this.data.chooseImages,
      current: evt.currentTarget.dataset.src
    })
  },
  _handlerChooseImage() {
    wx.chooseImage({
      count: MAXIMAGECOUNT - this.data.chooseImages.length,
      success: (res) => {
        this.setData({
          chooseImages: this.data.chooseImages.concat(res.tempFilePaths)
        })
      }
    })
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
  checkboxChange: function (e) {
    if (e.detail.value[0] == 'jl' || e.detail.value[1] == 'jl') {
      jl = true
    } else {
      jl = false
    }
    if (e.detail.value[0] == 'gly' || e.detail.value[1] == 'gly') {
      gly = true
    } else {
      gly = false
    }
    console.log(jl, gly);
    this.setData({
      shenfen: e.detail.value
    })
    this.panduan();
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  createCode() {
    var code;
    //首先默认code为空字符串
    code = '';
    //设置长度，这里看需求，我这里设置了4
    var codeLength = 4;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //循环codeLength 我设置的4就是循环4次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围,这设置为0 ~ 36
      var index = Math.floor(Math.random() * 36);
      //字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    //将拼接好的字符串赋值给展示的code
    this.setData({
      code: code
    })
  },
  write_yanzheng: function (a) {
    var t = a.detail.value;
    this.setData({
      yanzheng: t
    })
    if (this.data.code.toUpperCase() == this.data.yanzheng.toUpperCase()) {
      console.log("1");
      this.setData({
        yan: true
      })
    } else {
      this.setData({
        yan: false
      })
    }
  },
  tiao: function (a) {
    this.setData({
      bian: !this.data.bian
    })
    this.panduan();
  },
  panduan() {
    if (this.data.name !== '' && this.data.phone !== '1' && this.data.phone !== '' && this.data.idcard1 !== '' && this.data.idcard1 !== 'a' && this.data.bian == true && this.data.yan == true && this.data.shenfen.length !== 0) {
      this.setData({
        pan: false
      })
    } else {
      this.setData({
        pan: true
      })
    }
  },
  _ti: async function () {
    let that = this;
    DA.add({
      data: {
        name: that.data.name,
        phone: that.data.phone,
        idcard: that.data.idcard,
        gly: gly,
        jl: jl,
        photo: that.data.chooseImages1,
        area: '',
        time: db.serverDate(),
        avatarurl: that.data.userInfo.avatarurl
      },
      success: function (res) {
        wx.cloud.callFunction({
          name: "dingyue",
          data: {
            openid: that.data.openid,
            type: 1,
            name: that.data.name,
            time: that.data.time
          },
          success(res) {
            console.log("chenggong", res);
          }
        })
        wx.switchTab({
          url: '/pages/_mine/mine'
        })
        wx.hideLoading();
      }
    })
  },
  tijiao: async function (a) {
    let that = this
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    if (that.data.chooseImages.length != 0) {
      for (let i = 0; i < that.data.chooseImages.length; i++) {
        let sui = Math.ceil(Math.random() * 100);
        var timestamp = Date.parse(new Date());
        wx.cloud.uploadFile({
          cloudPath: "coach/" + timestamp + '_' + sui + '_' + i + '.png',
          filePath: that.data.chooseImages[i], // 文件路径
          success: async function (res) {
            console.log("上传图片成功", res.fileID)
            await that.setData({
              chooseImages1: that.data.chooseImages1.concat(res.fileID)
            })
            if (i == that.data.chooseImages.length - 1) {
              that._ti();
            }
          },
          fail: err => {
            console.log("上传图片失败", err)
            wx.hideLoading();
          }
        })
      }
    } else {
      that._ti();
    }
    wx.showToast({
      title: '报名成功',
      icon: 'success',
    })
  },
  _formatTime: function (time_t) {
    var date = time_t.getFullYear() + "年" + time_t.getMonth() + "月" + time_t.getDate() + "日" + " "
    var time = (time_t.getHours() < 10 ? "0" + time_t.getHours() : time_t.getHours()) + ":" + (time_t.getMinutes() < 10 ? "0" + time_t.getMinutes() : time_t.getMinutes())
    return date + time
  },
  onLoad: function (options) {
    this.createCode();
    let dt = new Date()
    this.setData({
      openid: options.openid,
      time: this._formatTime(dt),
      userInfo: wx.getStorageSync('userInfo')
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

  }
});