var t = require("../../../utils/question.js"), e = 1;

Page({

  data: {
    autoRemove: !0
  },

  onLoad: function (o) {
    e = getApp().currentQuestionSetting.course, this.setData({
      chapter: t.chapters["course" + e]
    }), console.log(t.chapters["course" + e]), this.getChapter();
  },

  onReady: function () {

  },

  onShow: function () {
    this.getChapter();
    var t = wx.getStorageSync("autoRemove");
    t ? this.setData({
      autoRemove: t
    }) : wx.setStorageSync("autoRemove", !0);
  },
  getChapter:function(){
    var t = this, o = t.data.chapter, r = [], a = [];
    wx.getStorage({
      key: "errorids" + e,
      success: function (e) {
        console.log(e)
        for (var i = e.data, n = "", s = 0; s < i.length; s++) {
          i[s][Object.keys(i[s]).toString()].toString() && (n += i[s][Object.keys(i[s]).toString()].toString() + ",");
          for (var c = 0; c < o.length; c++) Object.keys(i[s]).toString() == o[c].chapter_id && a.push({
            title: o[c].title,
            chapter_id: o[c].chapter_id,
            question_ids: i[s][Object.keys(i[s]).toString()]
          });
        }
        r = "" != n ? [{
          title: "全部错题",
          question_ids: n.slice(0, -1).split(",")
        }] : [{
          title: "全部错题",
          question_ids: []
        }], t.setData({
          errorAll: r,
          errorEach: a
        });
      },
      fail: function () {}
    });
  },
  goquestion:function(t){
    wx.navigateTo({
      url: "../errorstar/errorstar?ids=" + t.currentTarget.dataset.ids.join(",") + "&title=" + t.currentTarget.dataset.title + "&navtitle=我的错题&chapter_id=" + t.currentTarget.dataset.chapter_id
    })
  },
  switchChange:function(t) {
    wx.setStorageSync("autoRemove", t.detail.value)
  },
  goOrderPlay: function () {
    wx.redirectTo({
      url: "../moni/index?ids=" + JSON.stringify(this.data.chapter)
    });
  },
})