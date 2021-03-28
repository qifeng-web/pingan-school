// pages/start/index.js
var t= require("../../../utils/question.js")
var c = [{
  nosrc: "/images/icon/car1.png",
  oksrc: "/images/icon/car1_selected.png",
  title: "小车",
  ctype: 1,
  sub_title: "C1/C2/C3"
}, {
    nosrc: "/images/icon/car2.png",
    oksrc: "/images/icon/car2_selected.png",
  title: "货车",
  ctype: 4,
  sub_title: "A2/B2"
}, {
    nosrc: "/images/icon/car3.png",
    oksrc: "/images/icon/car3_selected.png",
  title: "客车",
  ctype: 2,
  sub_title: "A1/A3/B1"
}, {
    nosrc: "/images/icon/car4.png",
    oksrc: "/images/icon/car4_selected.png",
  title: "摩托车",
  ctype: 8,
  sub_title: "D/E/F"
}], i = [{
  nosrc: "/images/icon/car5.png",
  oksrc: "/images/icon/car5_selected.png",
  title: "教练员",
  ctype: 64
}, {
    nosrc: "/images/icon/car6.png",
    oksrc: "/images/icon/car6_selected.png",
  title: "客运",
  ctype: 128
}, {
    nosrc: "/images/icon/car7.png",
    oksrc: "/images/icon/car7_selected.png",
  title: "货运",
  ctype: 32
}, {
    nosrc: "/images/icon/car8.png",
    oksrc: "/images/icon/car8_selected.png",
  title: "危险品",
  ctype: 256
}, {
    nosrc: "/images/icon/car9.png",
    oksrc: "/images/icon/car9_selected.png",
  title: "出租车",
  ctype: 16
}, {
    nosrc: "/images/icon/car10.png",
    oksrc: "/images/icon/car10_selected.png",
  title: "网约车",
  ctype: 512
}], a = !0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course1: 0,
    course4: 0,
    drive: c,
    status: i,
    selectedCarType: 1,
    selectedCarTypeTitle: "小车",
    storgetype: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    console.log(t.isFirst)
    a = 1 == t.isFirst, this.gitAllinit();
  },
  gitAllinit:function() {
    console.log(getApp().currentQuestionSetting.car_type)
    var t = this;
    getApp().currentQuestionSetting.car_type ? (this.setData({
      storgetype: getApp().currentQuestionSetting.car_type,
      selectedCarType: getApp().currentQuestionSetting.car_type,
      selectedCarTypeTitle: getApp().currentQuestionSetting.car_type_title,
    }), t.startInit()) : (this.setData({
        sections: [{
          title: "科目一",
          show: this.data.show1
        }, {
          title: "科目四",
          show: this.data.show4
        }],
        storgetype: 1,
        show1: !0,
        cartext: "请稍后，正在获取最新全国小车题库和地方题库"
      }), t.startInit());
  },
  cardSelect: function (t) {
    this.setData({
      selectedCarType: t.currentTarget.dataset.ctype,
      selectedCarTypeTitle: t.currentTarget.dataset.title,
    }), this.startInit();
  },
  startInit:function(){
    var t = this;
    t.setData({
      loading: !0
    }), wx.showLoading({
      title: "加载中"
    });
    var e = getApp().getApiParams();
    e.city_name = '广州', e.city_id = 100, e.car_type = t.data.selectedCarType;
    var c = getApp().JK_BASE_URL + "/xc_v6/jktWxapp/init?" + getApp().getSendUrl(e);
    wx.request({
      url: c,
      header: {
        "content-type": "application/json"
      },
      method: "get",
      success: function (e) {
        if (wx.hideLoading(), e.data.code) {
          setTimeout(function () {
            t.setData({
              loading: !1
            });
          }, 1e3);
          var c = e.data.data, i = c.course1.question_count, a = c.course1.local_num, n = c.course4 ? c.course4.question_count : 0, s = c.course4 ? c.course4.local_num : 0;
          t.setData({
            course1: i,
            local1: a,
            course4: n,
            local4: s
          });
        }
      },
      fail: function (t) { }
    });
  },
  clickOver:function() {
    var t = this
    return t.data.loading ? (t.setData({
      zzzToast: {
        show: !0,
        title: "请稍后，正在为你更新最新题库"
      }
    }), void setTimeout(function () {
      t.setData({
        zzzToast: {
          show: !1,
          title: "请稍后，正在为你更新最新题库"
        }
      });
    }, 1500)) : (wx.setStorage({
      key: "initnum",
      data: {
        course1: t.data.course1,
        course4: t.data.course4
      }
    }), void ("" != this.data.storgetype && this.data.storgetype != this.data.selectedCarType ? wx.showModal({
      title: "温馨提示",
      content: "为避免混淆，切换题库之后会清除之前的答题记录，你确定要切换吗？",
      success: function (e) {
        e.confirm ? (wx.clearStorage(), t.saveQuestionSettings()) : e.cancel && console.log("用户点击取消");
      }
    }) : t.saveQuestionSettings()));
  },
  goHome: function () {
    console.log(a)
    a ? wx.switchTab({
      url: "../index/index"
    }) : wx.navigateBack({
      delta: 1
    });
  },
  saveQuestionSettings:function(){
    wx.Bmob.User.auth().then(res => {
      console.log(res)
      console.log('一键登陆成功')
      wx.setStorageSync('userId', res.objectId)
    }).catch(err => {
      console.log(err)
    });
    var t = this
    getApp().currentQuestionSetting.car_type = t.data.selectedCarType, getApp().currentQuestionSetting.car_type_title = t.data.selectedCarTypeTitle;
    var e = t.data.course4 <= 0 ? 1 : getApp().currentQuestionSetting.course || 1;
    getApp().currentQuestionSetting.course = e, getApp().currentQuestionSetting.model = getApp().currentQuestionSetting.car_type + "_" + e, 
      wx.setStorage({
        key: "init",
        data: {
          car_type: getApp().currentQuestionSetting.car_type,
          car_text: getApp().currentQuestionSetting.car_type_title,
          subject: getApp().currentQuestionSetting.course,
        }
      }), wx.setStorage({
        key: "initnum",
        data: {
          course1: t.data.course1,
          course4: t.data.course4
        }
      }), t.refreshQuestionData(getApp().currentQuestionSetting.car_type)
    t.goHome();
  },
  refreshQuestionData:function(e){
    t.initQuestions(e, 1), 1 * e > 8 || (t.initQuestions(e, 3));
  }
})