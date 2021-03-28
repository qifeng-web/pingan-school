var e = require("./utils/BaseApi.js"), t = require('./utils/question.js'), n = require("./utils/underscore-min.js"), i = require("./utils/constants.js"), Bmob = require('./utils/Bmob-1.6.7.min.js'), utils = require('./utils/util.js');

//初始化
Bmob.initialize("44aaedeaebf17a0689c41fc089b37c21","f0a541164ad05fc9f8db42a95ef709d6");
wx.u = utils

App({
  onLaunch: function() {
    wx.cloud.init({
      env:"houtai-7gazdqja690aa725",
      traceUser: true
    })
    Bmob.User.auth().then(res => {
      console.log(res)
      console.log('一键登陆成功')
      wx.setStorageSync('userId', res.objectId)
    }).catch(err => {
      console.log(err)
    });

    var n = wx.getStorageSync("init")
    n && (this.currentQuestionSetting.car_type = n.car_type, this.currentQuestionSetting.car_type_title = n.car_type_title,
      this.currentQuestionSetting.course = n.subject, this.currentQuestionSetting.model = this.currentQuestionSetting.car_type + "_" + this.currentQuestionSetting.course,
      t.initAllQuestionFromStorage(n.car_type), t.refreshQuestionIfNeeded(n.car_type)
    )
  },
  getSendUrl: e.buildGetUrlWithSign,
  JK_BASE_URL: i.config.JK_BASE_URL,
  getApiParams:function(e){
    var t = i.getApiParams;
    return e || (t = n.extend(t, this.currentQuestionSetting)), t;
  },
  currentQuestionSetting: {
    car_type: 1,
    car_type_title: "小车",
    course: 1,
    model: "1_1",
    city_id: "",
    city_name: "",
    uid: "",
    tel: "",
    openid: "",
    session_key: ""
  },
  sectionList: [],
  info: !1,
  removeids: function(t, e, n) {
    wx.getStorage({
        key: t + "" + getApp().currentQuestionSetting.course,
        success: function(e) {
            for (var i = e.data, o = 0; o < i.length; o++) if (i[o][Object.keys(i[o]).toString()].indexOf(n) > -1) {
                var r = i[o][Object.keys(i[o]).toString()].indexOf(n);
                i[o][Object.keys(i[o]).toString()].splice(r, 1), 0 == i[o][Object.keys(i[o]).toString()].length && i.splice(o, 1);
            }
            wx.setStorage({
                key: t + "" + getApp().currentQuestionSetting.course,
                data: i
            });
        }
    });
},
  saveInfo: function(e, t, n) {
    wx.getStorage({
      key: e + '' + getApp().currentQuestionSetting.course,
      success: function(e) {
        var t = e.data;
        getApp().info = !1;
        for (var i = 0; i < t.length; i++)
          if (t[i][Object.keys(t[i]).toString()].indexOf(n) > -1) return console.log(t[i][Object.keys(t[i]).toString()].indexOf(n) > -1),
            void(getApp().info = !0);
      },
    })
  },
  setIdsStroage: function(e, t, n, i) {
    wx.getStorage({
      key: e + "" + t,
      success: function(o) {
        for (var s = o.data, r = [], c = 0; c < s.length; c++) r.push(Object.keys(s[c]).toString());
        console.log(r)
        if (r.indexOf(n.toString()) > -1)
          for (c = 0; c < s.length; c++) Object.keys(s[c]).indexOf(n) > -1 && -1 == s[c][n].indexOf(i) && s[c][n].push(i);
        else {
          var a = {};
          a[n] = [], a[n].push(i), s.push(a);
        }
        wx.setStorage({
          key: e + "" + t,
          data: s
        });
      },fail:function() {
        var o = [], s = {};
        s[n] = [], s[n].push(i), o.push(s), wx.setStorage({
          key: e + "" + t,
          data: o
        });
      }
    })
  },

})