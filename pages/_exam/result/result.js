getApp();

var e, a = wx.createCanvasContext("canvasArcCir"), t = wx.createCanvasContext("canvasCircle1")
Page({

  data: {
    error:"",
    success:"",
    all:"",
    afterall:"",
    bgh: "",
    yc_text: "科一预测",
    isplay: !1,
    down_text: "炫耀一下"
  },
  onLoad: function (e) {
    console.log(e.intentify_error_ids)
    this.get_every_num(),this.setData({
      isplay:"0" != e.isplay,
      yc_text: "1" == getApp().currentQuestionSetting.course ? "科一预测" : "科四预测"
    })
    var a = this;
    setTimeout(function() {
      a.setData({
        isplay: "0" != e.isplay
      });
      var t = Math.floor(e.success/e.afterall * 100)/100*1.5,r="";
      console.log(t)
      t ? (r = Math.floor(e.success / e.afterall * 100), a.getInit(t)) : r = 0, a.getone(), 
      a.setData({
        error:e.error,
        success:e.success,
        all:e.all,
        afterall:e.afterall,
        bfh: r,
        isplay: "0" != e.isplay,
        question_jindu: parseInt(100 * (e.afterall / e.all).toFixed(2))
      })
    },200);
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  get_every_num: function () {
    var e = this;
    wx.getStorage({
      key: "every_day_play",
      success: function(a) {
        console.log(a)
        var r = (a.data.everyDay_all - a.data.everyDay_error) / a.data.everyDay_all * 100;

        e.setData({
          everyDay_error: a.data.everyDay_error,
          everyDay_all: a.data.everyDay_all,
          everyDay_bfs: 100 == r ? 100 : r.toString().substr(0, 2),
        })
      },
    })
  },
  getone: function () {
    t.setFillStyle("white"), t.clearRect(0, 0, 200, 200), t.draw();
    t.setLineWidth(8), t.setStrokeStyle("#f9d3b6"), t.setLineCap("round"), t.beginPath(),
      t.arc(54, 54, 50, .75 * Math.PI, 2.25 * Math.PI, !1), t.stroke(), t.draw();
  },
  getInit: function (t) {
    function r(e, t) {
      a.setFillStyle("#f9d3b6"), a.clearRect(0, 0, 200, 200), a.draw();
      a.setLineWidth(8), a.setStrokeStyle("#fff"), a.setLineCap("round"), a.beginPath(),
        a.arc(54, 54, 50, e, t, !1), a.stroke(), a.draw();
    }
    var s = this;
    if (clearInterval(e), this.data.isplay) {
      var i = "";
      i = 0 == s.data.everyDay_error ? 100 : s.data.everyDay_bfs, console.info("asasasasasas", i);
      var n = 0;
      if (100 == i ? n = .25 : i < 100 && i >= 90 ? n = 0 : i < 90 && i >= 70 ? n = 1.75 : i < 70 && i > 50 ? n = 1.6 : 50 == i ? n = 1.5 : i < 50 && i >= 30 ? n = 1.2 : i < 30 && i > 0 ? n = .9 : 0 == i && (n = .751),
        0 == i) return;
      r(.75 * Math.PI, n * Math.PI);
    } else {
      var o = 1, l = .75 * Math.PI, c = 0;
      e = setInterval(function () {
        o <= 60 ? (c = .75 * Math.PI + t * Math.PI, r(l, c), o++) : clearInterval(e);
      }, 15);
    }
  },
  goError: function () {
    wx.redirectTo({
      url: "/pages/_exam/errorpage/errorpage?ids=" + getApp().sectionList
    });
  },
})