var t = require("../../../utils/question.js"),
  e = [],
  a = "",
  r = "",
  s = "";
Page({

  data: {
    StorageAll: {},
    orderPX: {},
    redNum: 0,
    greenNum: 0,
    allNum: 0,
    iconInd: !1,
    iconIndtwo: !1,
    indexInd: 0,
    current: 0,
    textTab: "答题模式",
    selectInd: !0,
    testMode: !1,
    everyDay_all: 0,
    xiejie: !0,
    interval: 300,
    moreArr: {
      A: !1,
      B: !1,
      C: !1,
      D: !1
    },
    everyDay_error: 0,
    everyDay_all: 0,
    mode: "1",
    idarr: [],
    questions: [],
    iconcircle: [],
    collectData:[],
    starshow: !0
  },
  starcollect: function() {
    this.setData({
        starshow: !this.data.starshow
    });
    var t = this.data.delarr, e = this.data.idarr;
    this.data.starshow ? t.indexOf(e[this.data.indexInd]) > -1 && t.splice(t.indexOf(e[this.data.indexInd]), 1) : t.push(e[this.data.indexInd]), 
    this.setData({
        delarr: t
    }), wx.setStorage({
        key: "delstar" + getApp().currentQuestionSetting.course,
        data: t
    });
},
  onLoad: function(t) {
    e = this;
    console.log(t), r = t.navtitle, wx.setNavigationBarTitle({
      title: t.title
    }), a = "z" + t.title + "z", console.log(a)
    e.setData({
      del_chapter_id: t.chapter_id,
      ids: t.ids,
      idarr: t.ids.split(","),
      iconcircle: [{
        title: "",
        question_ids: t.ids.split(","),
        len: 0
      }],
      chelun: t.title
    })
    console.log(e.data.iconcircle)
    var e = this;
    s = getApp().currentQuestionSetting.course;
    console.log(s)
    "我的错题" == r ? (wx.getStorage({
      key: "errorids" + getApp().currentQuestionSetting.course,
      success: function(t) {
        console.log(t)
        e.setData({
          collectData: t.data,
          course: s
        });
      }
    }), this.setData({
      navtitle: "0"
    })) : "我的收藏" == r && (wx.getStorage({
      key: "starids" + getApp().currentQuestionSetting.course,
      success: function(t) {
        e.setData({
          collectData: t.data
        });
      }
    }), this.setData({
      navtitle: "1",
      course: s
    })), e.getMsg()
  },

  getMsg: function() {
    for (var a = this, r = t.getQuestionsByIds(getApp().currentQuestionSetting.course, a.data.ids), n = 0; n < r.length; n++)
      if (r[n].answerArr = r[n].answer.split(""),
        a.data.StorageAll[r[n].question_id]) {
        var d = a.data.StorageAll[r[n].question_id];
        "1" == d.subup || "0" == d.after ? r[n].order = d : (console.log(), "多选" == r[n].type_name && (r[n].order = {},
          r[n].order.subup = 0, r[n].order.down = {
            A: !1,
            B: !1,
            C: !1,
            D: !1
          }));
      } else "多选" == r[n].type_name && (r[n].order = {}, r[n].order.subup = 0, r[n].order.down = {
        A: !1,
        B: !1,
        C: !1,
        D: !1
      });
    e = r, a.getthree();
  },
  getthree: function() {
    var t = this,
      e = {
        currentTarget: {
          dataset: {
            index: 0
          }
        }
      };
    t.jumpToQuestion(e);
  },

  changeTab: function(t) {
    var e = this;
    console.log(t.currentTarget.dataset.texttab);
    var a = e.data.questions;
    e.setData({
      questions: a,
      textTab: t.currentTarget.dataset.texttab,
      selectInd: "答题模式" == t.currentTarget.dataset.texttab
    });
  },

  jumpToQuestion: function(t) {
    var a = this,
      r = a.data.orderPX;
    for (var n in r) "blue" == r[n] && (r[n] = "");
    this.setData({
      orderPX: r,
      iconInd: !1,
      iconIndtwo: !1
    });
    var d = t.currentTarget.dataset.color;
    if ("red" != d && "green" != d) {
      var i = a.data.orderPX;
      i[t.currentTarget.dataset.id] = "blue", a.setData({
        orderPX: i
      });
    }
    console.log(a.data.orderPX)
    var s = t.currentTarget.dataset.index;
    a.data.indexInd = s;
    var o = [];
    1 == this.data.current ? (a.data.indexInd <= 0 ? o.push(e[e.length - 1]) : o.push(e[a.data.indexInd - 1]),
      o.push(e[a.data.indexInd]), a.data.indexInd >= e.length - 1 ? o.push(e[0]) : o.push(e[e.length - 1])) : 0 == this.data.current ? (o.push(e[a.data.indexInd]),
      a.data.indexInd == e.length - 1 ? (o.push(e[0]), o.push(e[1])) : a.data.indexInd == e.length - 2 ? (o.push(e[a.data.indexInd + 1]),
        o.push(e[0])) : (o.push(e[a.data.indexInd + 1]), o.push(e[a.data.indexInd + 2]))) : (0 == a.data.indexInd ? (o.push(e[e.length - 2]),
      o.push(e[e.length - 1])) : 1 == a.data.indexInd ? (o.push(e[e.length - 1]), o.push(e[0])) : (o.push(e[a.data.indexInd - 2]),
      o.push(e[a.data.indexInd - 1])), o.push(e[a.data.indexInd])), this.setData({
      questions: o,
      indexInd: s
    })
  },

  _updown: function() {
    this.setData({
      iconInd: !this.data.iconInd,
      iconIndtwo: !this.data.iconIndtwo,
    })
  },

  del_data: function() {
     wx.navigateBack({
      delta: 1
    })
  },
  selectAnswer:function(t){
    function r() {
      if(i = n.data.idarr[0],d < n.data.idarr.length - 1){
        if ("green" != n.data.orderPX[i] && "red" != n.data.orderPX[i]) {
          wx.setStorage({
            key: a + "ind" + getApp().currentQuestionSetting.course,
            data: d
          });
          var t = n.data.orderPX;
          for (var e in t) "blue" == t[e] && (t[e] = "");
          return t[i] = "blue", n.setData({
            orderPX: t
          }), void console.log(n.data.orderPX);
        }
        d++ , r();
      }else wx.setStorage({
        key: a + "ind" + getApp().currentQuestionSetting.course,
        data: n.data.idarr.length - 1
      })
    }
    var n = this, d = n.data.indexInd + 1,i= n.data.idarr[d];
    if(r(),"背题模式"!=n.data.textTab){
      var s = e, o = n.data.questions
      if (n.data.StorageAll[n.data.idarr[n.data.indexInd]]) o[n.data.current].order = n.data.StorageAll[n.data.idarr[n.data.indexInd]], 
        n.setData({
          questions: o
        });
      else{
        s[n.data.indexInd].textTab = n.data.textTab, s[n.data.indexInd].order = {
          after:0,
          down:t.currentTarget.dataset.ind,
          answer:t.currentTarget.dataset.answer
        }, o[n.data.current].textTab = n.data.textTab, o[n.data.current].order = {
          after: 0,
          down: t.currentTarget.dataset.ind,
          answer: t.currentTarget.dataset.answer
        }, e = s,n.setData({
          questions: o
        });
        var u = n.data.StorageAll;
        u[t.currentTarget.dataset.id] = {
          after: 0,
          down: t.currentTarget.dataset.ind,
          answer: t.currentTarget.dataset.answer
        }, wx.setStorage({
          key: a + "" + getApp().currentQuestionSetting.course,
          data: u
        }), n.setData({
          StorageAll: u
        });
        var c = n.data.allNum;
        //判断
        if(c++,t.currentTarget.dataset.ind == t.currentTarget.dataset.answer){
          var h = n.data.orderPX
          h[t.currentTarget.dataset.id] = "green", h.all = c, 
          wx.setStorage({
            key: a + "list" + getApp().currentQuestionSetting.course,
            data: h
          });
          var l = n.data.greenNum;
          l++ , n.setData({
            greenNum: l
          });
          // var g = wx.getStorageSync("autoRemove");
          // console.log(g)
          // g ? (n.delCollect(),n.data.indexInd < e.length - 1 && 0 !==n.data.indexInd && n.autoPlay()) : 
          n.data.indexInd < e.length - 1 && n.autoPlay();
        }else if(t.currentTarget.dataset.ind != t.currentTarget.dataset.answer){
          var h = n.data.orderPX;
          h[t.currentTarget.dataset.id] = "red", h.all = c, wx.setStorage({
            key: a + "list" + getApp().currentQuestionSetting.course,
            data: h
          });
          var p = n.data.redNum;
          p++ , n.setData({
            redNum: p
          });

        }
        n.questionStatus();
      }
    }
  },
  selectAnswerMore:function(t) {
    var e = this;
    if("背题模式" != e.data.textTab && "1" != e.data.questions[e.data.current].order.subup){
        var r = e.data.StorageAll, n = e.data.moreArr;
        n[t.currentTarget.dataset.ind] ? n[t.currentTarget.dataset.ind] = !1 : n[t.currentTarget.dataset.ind] = !0, 
        r[t.currentTarget.dataset.id] = {
          subup: 0,
          down: n
        }, e.setData({
          moreArr: n
        }), wx.setStorage({
          key: a + "" + getApp().currentQuestionSetting.course,
          data: r
        }), wx.getStorage({
          key: a + "" + getApp().currentQuestionSetting.course,
          success: function (t) {
            e.setData({
              StorageAll: t.data
            });
          }
        });
      var d = e.data.questions;
      d[e.data.current].textTab = e.data.textTab, d[e.data.current].order = r[t.currentTarget.dataset.id],
        e.setData({
          questions: d
        });
    }
  },
  moreSelectSub:function(t) {
    function r() {
      if (i = n.data.idarr[d], d < n.data.idarr.length - 1) {
        if ("green" != n.data.orderPX[i] && "red" != n.data.orderPX[i]) {
          wx.setStorage({
            key: a + "ind" + getApp().currentQuestionSetting.course,
            data: d
          });
          var t = n.data.orderPX;
          for (var e in t) "blue" == t[e] && (t[e] = "");
          return t[i] = "blue", n.setData({
            orderPX: t
          }), void console.log(n.data.orderPX);
        }
        d++ , r();
      } else wx.setStorage({
        key: a + "ind" + getApp().currentQuestionSetting.course,
        data: n.data.idarr.length - 1
      });
    }

    var n =this,d = n.data.indexInd+1,i = n.data.idarr[d];
    r();
    var s = n.data.StorageAll,o = n.data.moreArr;
    s[t.currentTarget.dataset.id]={
      subup:1,
      down:o
    },n.setData({
      StorageAll:s
    }),wx.setStorage({
      key: a + "" + getApp().currentQuestionSetting.course,
      data: s,
    });
    var u = n.data.questions, c = e;
    c[n.data.indexInd].textTab = n.data.textTab, c[n.data.indexInd].order = {
      subup: 1,
      down: o
    }, u[n.data.current].textTab = n.data.textTab, u[n.data.current].order = {
      subup: 1,
      down: o
    }, e = c, n.setData({
      questions: u
    });
    var l = 0;
    var downAnswer = ""
    for (var v in n.data.moreArr) {
      if (n.data.moreArr[v]) {
        l++;
        downAnswer += v
      }

    }
    console.log(downAnswer)
    var h = n.data.allNum;
    if (h++ , l == t.currentTarget.dataset.answer.length && downAnswer == t.currentTarget.dataset.answer){
      (x = n.data.orderPX)[t.currentTarget.dataset.id] = "green", x.all = h, wx.setStorage({
        key: a + "list" + getApp().currentQuestionSetting.course,
        data: x
      });
      var p = n.data.greenNum;
      p++ , n.setData({
        greenNum: p
      });
      n.questionStatus();
      var g = wx.getStorageSync("autoRemove");
      g ? (n.delCollect(), n.data.indexInd < e.length - 1 && 0 !== n.data.indexInd && (console.log("11"),
        n.autoPlay()))  : n.data.indexInd < e.length - 1 && n.autoPlay();
      
    }else{
      var x = n.data.orderPX;
      x[t.currentTarget.dataset.id] = "red", x.all = h, wx.setStorage({
        key: a + "list" + getApp().currentQuestionSetting.course,
        data: x
      });
      var f = n.data.redNum;
      f++ , n.setData({
        redNum: f
      }), n.questionStatus();
    }
    n.setData({
      moreArr: {
        A: !1,
        B: !1,
        C: !1,
        D: !1
      }
    });
  },
  questionStatus: function () {
    var t = this;
    wx.getStorage({
      key: a + "list" + getApp().currentQuestionSetting.course,
      success: function (e) {
        t.setData({
          orderPX: e.data,
          allNum: e.data.all
        });
      }
    });
  },
  autoPlay:function() {
    console.log('auto')
    this.setData({
      autoplay: !0
    })
  },
  pageChange:function(t){
    "autoplay" == t.detail.source && this.setData({
      autoplay: !1
    });
    var a = this;
    a.setData({
      moreArr:{
        A: !1,
        B: !1,
        C: !1,
        D: !1
      }
    }), e.length < 3 ? a.setData({
      xiejie:!1
    }) : a.setData({
      xiejie: !0
    }), 1==e.length && a.setData({
      xiejie:!1,
      current:0
    });
    var r = this.data.current, n = t.detail.current, d = a.data.indexInd, i = 1 * n-1 * r;
    if (-2 == i ? i = 1 : 2 == i && (i = -1), (d += i) >= e.length) return d = 0, wx.showToast({
      title: "已经是最后一题了"
    }), void a.setData({
      xiejie: !1,
      current: 2
    });
    if (d < 0) return wx.showToast({
      title: "已经是第一题了"
    }), a.setData({
      xiejie: !1,
      current: 0
    }), void (d = e.length - 1);
    console.log("last: " + r + " current: " + n + " index: " + d + " page:" + e[d]);
    var s = [];
    e.length > 3 ? 0 == n ? (s.push(e[d]), s.push(e[d + 1]), s.push(e[d - 1]), s[1] || (s[1] = e[0]),
      s[2] || (s[2] = e[e.length - 1])) : 1 == n ? (s.push(e[d - 1]), s.push(e[d]), s.push(e[d + 1]),
        s[2] || (s[2] = e[0]), s[0] || (s[0] = e[e.length - 1])) : 2 == n && (s.push(e[d + 1]),
          s.push(e[d - 1]), s.push(e[d]), s[0] || (s[0] = e[0]), s[1] || (s[1] = e[e.length - 1])) : s = e,
      this.setData({
        questions: s,
        indexInd: d,
        current: n
      })
  },

  delCollect:function() {
    
    var t = this.data.idarr, a = this.data.greenNum, n=this.data.redNum;
    console.log(this.data.orderPX[t[this.data.indexInd]]);
    "red" == this.data.orderPX[t[this.data.indexInd]] ? n-- : "green" == this.data.orderPX[t[this.data.indexInd]] && a--;
    for (var d = this.data.collectData, i = 0; i < d.length; i++) if (d[i][Object.keys(d[i]).toString()].indexOf(t[this.data.indexInd]) > -1) {
      var s = d[i][Object.keys(d[i]).toString()].indexOf(t[this.data.indexInd]);
      d[i][Object.keys(d[i]).toString()].splice(s, 1), 0 == d[i][Object.keys(d[i]).toString()].length && d.splice(i, 1);
    }
    "我的收藏" == r ? wx.setStorage({
      key: "starids" + getApp().currentQuestionSetting.course,
      data: d
    }) : wx.setStorage({
        key: "errorids" + getApp().currentQuestionSetting.course,
        data: d,
      }), e.splice(this.data.indexInd, 1), t.splice(this.data.indexInd, 1);

    var o = this.data.questions;
    o.splice(this.data.current, 1), this.setData({
      idarr:t,
      question: o,
      iconcircle:[{
        title: "",
        question_ids: t,
        len: 0
      }],
      greenNum:a,
      redNum:n
    }), 0 != this.data.indexInd && this.setData({
      indexInd: this.data.indexInd - 1
      }), 2 == e.length && this.setData({
        current: 1
      }), this.pageChange({
        detail: {
          current: this.data.current
        }
      }), 0 == e.length && wx.navigateBack({
        delta: 1
      });
  },
  onShow: function() {

  },

  onUnload: function() {

  },
  touchstart: function (t) { },
  bindtouchmove: function (t) { },
  bindtouchend: function (t) { },
  scrolltop: function (t) { },
})