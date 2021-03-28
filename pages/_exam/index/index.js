var a = require("../../../utils/course.js"),
  e = require("../../../utils/apappshare_init.js")
var t = require("../../../utils/constants")

Page({
  data: {
    courseList: a.courseList,
    showtarbar: 1,
    selectIndex: "1",
    orderids: "",
    is_login: true,
  },

  onLoad: function (t) {
    var a = this;
    wx.showLoading({
      title: "加载中"
    }), e.init(a, t, function (t) {
      console.log(t), t.code && setTimeout(function () {
        if (wx.getStorage({
            key: 'init',
            success: function (t) {
              var e = {
                currentTarget: {
                  dataset: {
                    texttab: t.data.subject
                  }
                }
              };
              a.changeTab(e);
            },
          }), wx.hideLoading()) {}
      }, 600)
    })
  },
  onShow: function () {
    var t = this;
    wx.getStorage({
      key: "init",
      success: function (e) {
        var a = {
          currentTarget: {
            dataset: {
              texttab: e.data.subject
            }
          }
        };
        t.changeTab(a);
      }
    });
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  changeTab: function (t) {
    var e = this,
      a = t.currentTarget.dataset.texttab,
      i = t.currentTarget.dataset.tabname;
    return console.log(t),
      e.setData({
        selectIndex: a,
        isAddStar: !1
      }),
      "tap" == t.type && wx.showToast({
        title: i,
      }), t.currentTarget.dataset.texttab ? void e.initStorage(a) : void 0;
    // e.currentTarget.dataset.texttab ? void t.initStorage(a) : void 0;
  },
  initStorage: function(t) {
    var e = this;
    getApp().currentQuestionSetting.course = t, "1" == t || "3" == t ? e.questionNuminit(t) : "v2" != t && "v3" != t || (this.videoList = this.selectComponent("#video-list"), 
    this.videoList.getVideoList(t)), wx.getStorage({
        key: "init",
        success: function(a) {
            e.setData({
                city: a.data.city_name,
                car: a.data.car_text
            }), getApp().currentQuestionSetting.city_id = a.data.city_id, getApp().currentQuestionSetting.car_type_title = a.data.car_text, 
            getApp().currentQuestionSetting.car_type = a.data.car_type, getApp().currentQuestionSetting.course = getApp().currentQuestionSetting.car_type + "_" + t, 
            wx.setStorage({
                key: "init",
                data: {
                    car_type: a.data.car_type,
                    subject: t,
                    car_text: a.data.car_text,
                    city_name: a.data.city_name,
                    city_id: a.data.city_id
                }
            }), console.log(wx.getStorage.init), e.questionAll();
        },
        fail: function() {}
    });
},
  orderGo: function (t) {
    var e = 1;
    t && t.currentTarget.dataset.mode && (e = 2), setTimeout(function () {
      wx.navigateTo({
        url: '/pages/_exam/moni/index?mode=' + e,
      })
    }, 30)
  },
  defaultGo: function (t) {
    var e = this;
    console.log(e.data.orderids);
    "0" == t.currentTarget.dataset.ind ? (setTimeout(function () {
      wx.navigateTo({
        url: "../errorpage/errorpage?ids=" + JSON.stringify(e.data.orderids),
      })
    }, 30), getApp().sectionList = JSON.stringify(this.data.orderids)) : setTimeout(function () {
      wx.navigateTo({
        url: "../collecpage/collecpage?ids=" + JSON.stringify(e.data.orderids),
      })
    })
  },
  gradeGo: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/_exam/grade/grade"
      });
    }, 30);
  },
  examGo: function () {
    if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login();
      return
    }
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/_exam/examhome/examhome',
      })
    }, 30)
  },
  startInit: function () {
    var e = this;
    wx.getStorage({
      key: "init",
      success: function (t) {
        console.log(t)
        var a = {
          currentTarget: {
            dataset: {
              texttab: t.data.subject
            }
          }
        };
        e.changeTab(a);
      },
      fail: function () {
        wx.redirectTo({
          url: "/pages/_exam/start/index?isFirst=1"
        });
      }
    })
  },
  questionAll: function () {
    var t = this;
    wx.getStorage({
      key: "init",
      success: function (e) {
        getApp().currentQuestionSetting.car_type_title = e.data.car_text,
          getApp().currentQuestionSetting.car_type = e.data.car_type,
          getApp().currentQuestionSetting.course = e.data.subject, getApp().currentQuestionSetting.model = getApp().currentQuestionSetting.car_type + "_" + e.data.subject,
          t.getCt();
      },
    })
  },
  getCt: function () {
    var t = this,
      e = getApp().currentQuestionSetting.course;
    this.setData({
      ctNum: 0
    }), wx.getStorage({
      key: 'errorids' + e,
      success: function (e) {
        for (var a = e.data, i = "", o = 0; o < a.length; o++) a[o][Object.keys(a[o]).toString()].toString() && (i += a[o][Object.keys(a[o]).toString()].toString() + ",");
        console.info("asas", i.slice(0, -1).split(",").length), "" != i ? t.setData({
          ctNum: i.slice(0, -1).split(",").length <= 99 ? i.slice(0, -1).split(",").length : 100
        }) : t.setData({
          ctNum: 0
        });
      },
    })
  },
  questionNuminit: function (t) {
    var e = this;
    wx.getStorage({
      key: 'initnum',
      success: function (a) {
        e.setData({
          questionnum: 1 == t ? a.data.course1 : a.data.course4,
          showtarbar: a.data.course4
        })
      },
    }), wx.getStorage({
      key: "subjectresult" + getApp().currentQuestionSetting.course,
      success: function (t) {
        if (console.log(t.data), t.data.list) {
          for (var a = t.data.list, i = 1 * a[0].code, o = 0; o < a.length; o++) i < 1 * a[o].code && (i = a[o].code);
          e.setData({
            maxf: i
          });
        }
      },
      fail: function () {
        e.setData({
          maxf: "no"
        });
      }
    }), wx.getStorage({
      key: "orderlist" + getApp().currentQuestionSetting.course,
      success: function (t) {
        t.data.all ? e.setData({
          afternum: t.data.all
        }) : e.setData({
          afternum: 0
        });
      },
      fail: function () {
        e.setData({
          afternum: 0
        });
      }
    });
  },

  myQuestion: function () {
    wx.navigateTo({
      url: "../start/index?isFirst=0"
    });
  },
  headerMenu: function (e) {
    console.log(e);
    var a = getApp().currentQuestionSetting.course,
      i = getApp().currentQuestionSetting.car_type,
      n = e.currentTarget.dataset.title;
    if (0 == e.currentTarget.dataset.ind) {
      var o = t.ruleUrls[a][i];
      wx.navigateTo({
        url: "../public/webview/webview?title=" + n + "&url=" + o
      });
    } else {
      var s = [];
      console.log(a), "1" == a || "3" == a ? s = ["../sports/sports", "../sports/specialplay/specialplay?show=1&ids=" + JSON.stringify(this.data.orderids)] : "v2" != a && "v3" != a || (s = ["../public/webview/webview?title=" + n + "&url=" + t.mj[a][i], "../sports/jiqiao/jiqiao?course=" + a]),
        console.log(s), wx.navigateTo({
          url: s[e.currentTarget.dataset.ind - 1]
        });
    }
  },
  login() {
    this.setData({
      is_login: !this.data.is_login
    })
  },
  bindgetuserinfo: function () {
    this.login()
    var that = this
    wx.getUserInfo({
      success(res) {
        wx.showLoading({
          title: '授权登录中',
        })
        wx.u.getUserInfo().then(res1 => {
          var bmobUser = res1.result;
          if (bmobUser.avatarUrl == '' || bmobUser.avatarUrl == undefined) {
            wx.u.changeUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName).then(res2 => {});
          }
          res1.result.avatarurl = res.userInfo.avatarUrl;
          res1.result.nickName = res.userInfo.nickName;
          wx.setStorageSync('userInfo', res1.result)
          that.setData({
            userInfo: res1.result,
          })
          wx.hideLoading()
        })
      }
    })
  },
})