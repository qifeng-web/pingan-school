var t = require("../../../data_init/exam_data.js"),
  e = require("../../../data_init/imgMsg_url.js"),
  a = require("../../../data_init/drawImage.js"),
  s = require("../../../utils/fliter_list.js"),
  n = "";

Page({

  data: {
    greenNum: "",
    redNum: "",
    allNum: "",
    unAnswerNum: "",
    ytimesf: "",
    ytimesm: "",
    src: "",
    storage: "",
    allfen: "",
    passf: 0,
  },

  onLoad: function(e) {
    t._repeat_getInit(this), this.setStrage_grade(e), this.go_impower({
      right: e.greenNum,
      wrong: e.redNum,
      used_time: 60 * e.ytimes.split(":")[0] + 1 * e.ytimes.split(":")[1],
      total: e.allQuestionCount,
      score: e.allfen
    });

    var a = this, n = wx.getStorageSync("intensify_okids" + getApp().currentQuestionSetting.course) || [], r = wx.getStorageSync("intensify_noids" + getApp().currentQuestionSetting.course) || [];
    s.get_new_intensify({
      error_ids: r,
      correct_ids: n,
      mode: 1
    }, function (t) {
      console.info("list", t), a.setData({
        intensify_name: t.max_name,
        intensify_num: t.max_nums
      });
    });

    var o = getApp().currentQuestionSetting.course + "_" + e.allfen + "_" + (60 * e.ytimes.split(":")[0] + 1 * e.ytimes.split(":")[1]);

  },

  onShow: function() {

  },

  setStrage_grade: function(t) {
    var e = this,
      a = "",
      s = "",
      i = "",
      r = "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/exam/daren.jpg";
    1 * t.allfen == 100 ? (s = "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/page/dj1.jpg",
      a = "驾考车神", r = "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/exam/cheshen.jpg",
      i = "#1896ed") : 1 * t.allfen >= 1 * t.passf + 5 && 1 * t.allfen < 100 ? (s = "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/page/dj2.jpg",
      a = "驾考达人", i = "#46c223", r = "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/exam/daren.jpg") : 1 * t.allfen >= 1 * t.passf && 1 * t.allfen < 1 * t.passf + 5 ? (s = "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/page/dj3.jpg",
      r = "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/exam/xinxiu.jpg", a = "驾考新秀",
      i = "#46c223") : (s = "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/page/dj4.jpg",
      r = "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/exam/shashou.jpg", a = "马路杀手",
      i = "#f95240");

    var o = new Date(),
      c = o.getMonth() + 1,
      u = o.getDate(),
      p = "炫耀一下";
    p = 1 * t.allfen >= 1 * t.passf ? "炫耀一下" : "" == getApp().currentQuestionSetting.tel ? "再接再厉" : "我要安慰",
      this.setData({
        greenNum: t.greenNum,
        redNum: t.redNum,
        allNum: t.allNum,
        unAnswerNum: t.allQuestionCount - t.allNum,
        ytimesf: t.ytimes.split(":")[0],
        ytimesm: t.ytimes.split(":")[1],
        str: s,
        allfen: t.allfen,
        passf: t.passf,
        share_poster_bottom: r,
        share_poster_color: i,
        msgStr: a,
        button_text: p
      }), n = t.wrongIds, wx.getStorage({
        key: "subjectresult" + ("1" == getApp().currentQuestionSetting.course ? "1" : "3"),
        success: function(s) {
          var i = s.data;
          i.addupexam = 1 * i.addupexam + 1, i.addup_t = 1 * i.addup_t + 1 * e.data.allNum, 
            1 * e.data.allfen >= 1 * e.data.passf ? i.pass = 1 * i.pass + 1 : i.pass = i.pass,
            i.list.unshift({
              code: e.data.allfen,
              time: e.data.ytimesf + "分" + e.data.ytimesm + "秒",
              date: c + "月" + u + "日",
              rank: a
            }), wx.setStorage({
              key: "subjectresult" + ("1" == getApp().currentQuestionSetting.course ? "1" : "3"),
              data: i
            }), e.upGrade({
              right: t.greenNum,
              wrong: t.redNum,
              used_time: 60 * t.ytimes.split(":")[0] + 1 * t.ytimes.split(":")[1],
              total: t.allQuestionCount,
              score: t.allfen
            });
        },
        fail: function() {
          var s = {};
          s.addupexam = 1, s.addup_t = e.data.allNum, 1 * e.data.allfen >= 1 * e.data.passf ? s.pass = 1 : s.pass = 0,
            s.list = [{
              code: e.data.allfen,
              time: e.data.ytimesf + "分" + e.data.ytimesm + "秒",
              date: c + "月" + u + "日",
              rank: a
            }], wx.setStorage({
              key: "subjectresult" + ("1" == getApp().currentQuestionSetting.course ? "1" : "3"),
              data: s
            }), e.upGrade({
              right: t.greenNum,
              wrong: t.redNum,
              used_time: 60 * t.ytimes.split(":")[0] + 1 * t.ytimes.split(":")[1],
              total: t.allQuestionCount,
              score: t.allfen
            });
        }
      })
  },
  go_impower: function (t) {
    var e = this;
    wx.authorize({
      scope: "scope.userInfo",
      success: function () {
        wx.getUserInfo({
          success: function (a) {
            e.setData({
              userInfo: {
                nickName: a.userInfo.nickName,
                avatarUrl: a.userInfo.avatarUrl
              }
            }), e.send_init_rank(a, t), wx.setStorageSync("rank_list_status", {
              code: 1
            }), e.get_share_banner(a.userInfo.avatarUrl);
          }
        });
      },
      fail: function () {
        e.get_share_banner("https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/default/gungun.png");
      }
    });
  },
  upGrade: function (t) {
    var e = getApp().getApiParams();
    e.right = t.right, e.wrong = t.wrong, e.used_time = t.used_time, e.total = t.total,
      e.score = t.score, e.answer_time = parseInt(1 * new Date() / 1e3), 0 != t.score
  },
  send_init_rank: function (t, e) {
    console.log(e);
    var a = getApp().getApiParams();
    a.nick = t.userInfo.nickName, a.avatar = t.userInfo.avatarUrl, a.right = e.right,
      a.wrong = e.wrong, a.used_time = e.used_time, a.total = e.total, a.score = e.score,
      a.answer_time = parseInt(1 * new Date() / 1e3), a.wxapp_name = "jkt_yd", 0 != e.score && wx.request({
        url: getApp().JK_BASE_URL + "/xc_v6/jktWxapp/reportExamScore?" + getApp().getSendUrl(a),
        header: {
          "content-type": "application/json"
        },
        method: "get",
        success: function (t) { }
      });
  },
  get_share_banner: function (t) {
    var s = this, i = e.getLocalImagePath("https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/new404/exam-bg.jpg"), n = e.getLocalImagePath(t), r = e.getLocalImagePath(this.data.share_poster_bottom);
    Promise.all([i, n, r]).then(function (t) {
      a.draw_exam_poster({
        exam_bg: t[0],
        exam_header: t[1],
        exam_bottom: t[2]
      }, s), a.draw_exam_banner({
        exam_bottom: t[2]
      }, s);
    });
  },
  examBack: function () {
    wx.redirectTo({
      url: "../exam/exam?timeback=1&passf=" + this.data._repeat_passf + "&time=" + (this.data._repeat_time - 1) + "&training_qids=0&nums=" + this.data._repeat_num
    });
  },
  exam_repeat: function () {
    t._repeat_examGo(this);
  },
})