getApp();

var a = require("../../../data_init/imgMsg_url.js"), t = require("../../../data_init/drawImage.js");

Page({

  data: {
    addupexam: 0,
    addup_t: 0,
    pass: 0,
    list: [],
    rankfs: "",
    rankwa: "科一预测",
    dancolor: "",
    shencolor: "",
    show: !1,
    subject: "",
    stype: "",
    markShow: !1,
    userInfo: {
      nickName: "未授权",
      avatarUrl: "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/default/gungun.png"
    }
  },


  onLoad: function (options) {
    this.getInit(), this.go_impower(),  this.get_share_banner()
  },


  onReady: function () {

  },

  onShow: function () {

  },
  getInit:function() {
    var a = this
    a.setData({
      subject: "1" == getApp().currentQuestionSetting.course ? "科目一" : "科目四",
      stype: getApp().currentQuestionSetting.car_type_title
    }),wx.getStorage({
      key: "subjectresult" + ("1" == getApp().currentQuestionSetting.course ? "1" : "3"),
      success: function(t) {
        console.log(t)
        for(var e = 0,r = [],s = 0;s<t.data.list.length;s++) e += 1 * t.data.list[s].code,
          s <= 2 && r.push(t.data.list[s]);
        a.setData({
          addupexam: t.data.addupexam,
          addup_t: t.data.addup_t,
          pass: t.data.pass,
          list: t.data.list,
          rankfs: (e / (1 * t.data.addupexam)).toFixed(0),
          dancolor: e / (1 * t.data.addupexam) >= 90 ? "#e5f4fd" : "#fff4e9",
          shencolor: e / (1 * t.data.addupexam) >= 90 ? "#05a2f3" : "#fb6e3f",
          rankwa: "1" == getApp().currentQuestionSetting.course ? "科一预测" : "科四预测",
          poster_gradeArr: r
        });
      },
      fail: function () {
        a.setData({
          addupexam: 0,
          addup_t: 0,
          pass: 0,
          list: [],
          rankfs: 0,
          dancolor: "#fff4e9",
          shencolor: "#fb6e3f",
          rankwa: "1" == getApp().currentQuestionSetting.course ? "科一预测" : "科四预测",
          poster_gradeArr: []
        });
      }
    })
  },

  go_impower: function () {
    var a = this;
    wx.getUserInfo({
      success: function (t) {
        a.setData({
          userInfo: {
            nickName: t.userInfo.nickName,
            avatarUrl: t.userInfo.avatarUrl || "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/default/gungun.png"
          }
        }), wx.setStorageSync("rank_list_status", {
          code: 1
        }), a.get_share_banner(t.userInfo.avatarUrl);
      }
    });
  },

  go_show_mark: function () {
    this.setData({
      markShow: !this.data.markShow
    });
  },

  onMyEvent: function (t) {
    console.log(this.data.saveImgUrl)
    1 == t.detail.code && this.go_show_mark(), 2 == t.detail.code && (wx.showLoading({
      title: "图片生成中"
    }), this.go_show_mark(), a.handelShowShareImg(this, this.data.shareImgUrl));
  },
  go_show_mark: function () {
    this.setData({
      markShow: !this.data.markShow
    });
  },
  onShareAppMessage: function () {
    return {
      title: "[权威预测] 我将在科" + ("1" == getApp().currentQuestionSetting.course ? "一" : "四") + "考试中获得了" + this.data.rankfs + "分，快来试试你能的几分？~",
      path: "pages/_exam/subject1/home/home",
      imageUrl: this.data.shareImgUrl
    };
  },
  _fn_alertShow: function () {
    this.setData({
      alertShow: !this.data.alertShow
    });
  },
  get_share_banner: function (e) {
    var r = this, s = a.getLocalImagePath("https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/grade/grade-share.jpg");
    console.log(s);
    var n = a.getLocalImagePath(e), o = a.getLocalImagePath("https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/grade/share-grade.jpg");
    Promise.all([s, n, o]).then(function (a) {
      t.draw_grade_Image({
        grade_bg: a[0],
        grade_header: a[1]
      }, r), t.draw_grade_poster({
        grade_poster_bg: a[2],
        grade_poster_header: a[1]
      }, r);
    });
  },
})