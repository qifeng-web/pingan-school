var t = require("../../../utils/question.js"), e = 1;
Page({
    data: {
        chapter: "",
        errorAll: [ {
            question_ids: []
        } ],
        errorEach: []
    },
    onLoad: function(r) {
        e = getApp().currentQuestionSetting.course, this.setData({
            chapter: t.chapters["course" + e]
        }), this.getChapter();
    },
    goOrderPlay: function() {
        wx.redirectTo({
            url: "../moni/index?ids=" + JSON.stringify(this.data.chapter)
          });
    },
    getChapter: function() {
        var t = this, r = t.data.chapter, n = [], i = [], o = [];
        wx.getStorage({
            key: "delstar" + e,
            success: function(t) {
                o = t.data;
            }
        }), wx.getStorage({
            key: "starids" + getApp().currentQuestionSetting.course,
            success: function(e) {
                console.log(o);
                for (var s = e.data, a = 0; a < o.length; a++) for (g = 0; g < s.length; g++) if (s[g][Object.keys(s[g]).toString()].indexOf(o[a]) > -1) {
                    var c = s[g][Object.keys(s[g]).toString()].indexOf(o[a]);
                    s[g][Object.keys(s[g]).toString()].splice(c, 1), 0 == s[g][Object.keys(s[g]).toString()].length && s.splice(g, 1);
                }
                wx.setStorage({
                    key: "starids" + getApp().currentQuestionSetting.course,
                    data: s
                }), wx.removeStorage({
                    key: "delstar" + getApp().currentQuestionSetting.course
                });
                for (var u = "", g = 0; g < s.length; g++) {
                    s[g][Object.keys(s[g]).toString()].toString() && (u += s[g][Object.keys(s[g]).toString()].toString() + ",");
                    for (a = 0; a < r.length; a++) Object.keys(s[g]).toString() == r[a].chapter_id && i.push({
                        title: r[a].title,
                        question_ids: s[g][Object.keys(s[g]).toString()]
                    });
                }
                n = "" != u ? [ {
                    title: "全部收藏",
                    question_ids: u.slice(0, -1).split(",")
                } ] : [ {
                    title: "全部收藏",
                    question_ids: []
                } ], t.setData({
                    errorAll: n,
                    errorEach: i
                });
            },
            fail: function() {}
        });
    },
    goquestion: function(t) {
        wx.navigateTo({
            url: "../errorstar/errorstar?ids=" + t.currentTarget.dataset.ids.join(",") + "&title=" + t.currentTarget.dataset.title + "&navtitle=我的收藏"
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getChapter();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});