// pages/moni/index.js
var r = "",
  t = require('../../../utils/question.js'),
  a = require("../../../utils/underscore-min.js"),
  s = 1,
  d = [],
  n = "",
  i = [];
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
    recmend: !1,
    videoctrl: !0,
    videoMedia: "",
    starshow:false
  },


  onLoad: function(t) {
    console.log(t)
    r = "", this.init_play(t)
  },

  onReady: function() {

  },

  onShow: function() {
    var t = this,
      a = "";
    setTimeout(function () {
      a = t.data.videoMedia;
    }, 1e3), setTimeout(function () {
      t.setData({
        videoMedia: a
      });
    }, 1500);
  },

  videoplay: function () { },

  init_play: function(a) {
    s = getApp().currentQuestionSetting.course;
    console.log(t.chapters["course" + s])
    var e = this,
      r = a.mode;
    this.setData({
      mode: r
    }), "2" == e.data.mode ? (n = "randow", wx.setNavigationBarTitle({
      title: '随机练习',
    })) : (n = "order", wx.setNavigationBarTitle({
      title: '顺序练习',
    }), e.setData({
      iconcircle: t.chapters["course" + s],
      course:s
    })), e.getMsg(r), e.getListOrder(), wx.getStorage({
      key: n + "list" + s,
      success: function(t) {
        console.log(t)
        e.setData({
          orderPX: t.data,
          allNum: t.data.all
        });
        var a = 0,
          r = 0;
        for (var d in e.data.orderPX) "red" == e.data.orderPX[d] ? (a++, e.setData({
          redNum: a
        })) : "green" == e.data.orderPX[d] && (r++, e.setData({
          greenNum: r
        }));
      }
    });
  },
  getMsg: function(e) {
    var r = this
    wx.showLoading({
      title: '加载中',
    }), wx.getStorage({
      key: n + "" + s,
      success: function(t) {
        r.setData({
          StorageAll: t.data
        });
        console.log(n + "" + s)
      },
      complete: function() {
        console.log(t)
        var e = t.questionIds["course" + s],
          n = r.data.iconcircle;
        console.log(e)
        "2" == r.data.mode && (n = [{
          title: "",
          question_ids: e = a.shuffle(e)
        }]);
        for (var i = [], o = 0; o < e.length; o++) i[o] = a.clone(t.questions["course" + s][e[o]]);
        console.log(i)
        for (o = 0; o < i.length; o++)
          if (i[o].answerArr = i[o].answer.split(""), r.data.StorageAll[i[o].question_id]) {
            var u = r.data.StorageAll[i[o].question_id];
            "1" == u.subup || "0" == u.after ? i[o].order = u : (console.log(), "多选" == i[o].type_name && (i[o].order = {},
              i[o].order.subup = 0, i[o].order.down = {
                A: !1,
                B: !1,
                C: !1,
                D: !1
              }));
          } else "多选" == i[o].type_name && (i[o].order = {}, i[o].order.subup = 0, i[o].order.down = {
            A: !1,
            B: !1,
            C: !1,
            D: !1
          });
        console.log(i)
        var iconcircle = [{
          'title': '试题',
          'len': 0,
          'question_count': e.length,
          'question_ids': e
        }]
        console.log(iconcircle)
        d = i, r.setData({
          idarr: e,
          iconcircle: iconcircle
        }), setTimeout(function() {
          wx.hideLoading();
        }, 1e3), r.getthree();
      }
    })
  },
  starcollect: function() {
    this.setData({
        starshow: !this.data.starshow
    }), this.data.starshow ? getApp().setIdsStroage("starids", s, this.data.questions[this.data.current].chapter_id, this.data.questions[this.data.current].question_id) : getApp().removeids("starids", s, this.data.questions[this.data.current].question_id);
},
  getthree: function() {
    var t = this;
    console.log(n + "ind" + s)
    wx.getStorage({
      key: n + "ind" + s,
      success: function(a) {
        console.log(a)
        var e = {
          currentTarget: {
            dataset: {
              index: a.data
            }
          }
        }
        t.jumpToQuestion(e);
      },
      fail: function() {
        var a = {
          currentTarget: {
            dataset: {
              index: 0
            }
          }
        };
        t.jumpToQuestion(a);
      }
    }), wx.getStorage({
      key: n + "" + s,
      success: function(a) {
        if (a.data) {
          var e = t.data.orderPX;
          e[t.data.idarr[a.data]] = 'blue', t.setData({
            orderPX: e,
            recmend: !0
          }), t.questionStatus(), setTimeout(function () {
            t.setData({
              recmend: !1
            });
          }, 2e3);
        }
      },
    })
  },
  del_data:function() {
    var t = this;
    wx.showModal({
      content: '确定要清空记录吗？',
      success:function(a){
        if(a.confirm){
          var e = n + "ind" + s,
            r = n + "list" + s,
            i = n + "" + s;
          wx.removeStorageSync(i), wx.removeStorageSync(r), wx.removeStorageSync(e);
          var o = {
            mode: t.data.mode
          };
          d = [], t.setData({
            iconInd: !1,
            StorageAll: {},
            everyDay_error: 0,
            greenNum: 0,
            redNum: 0,
            orderPX: {}
          }), t.init_play(o);
        }
      }
    })
  },
  jumpToQuestion: function(t) {
    var a = this,
      e = a.data.orderPX;
    for (var r in e) "blue" == e[r] && (e[r] = "");
    console.log(e)
    this.setData({
      orderPX: e,
      iconInd: !1,
      iconIndtwo: !1,
      videoctrl: !0
    });
    var n = t.currentTarget.dataset.color;
    console.log(n)
    if ("red" != n && "green" != n) {
      var i = a.data.orderPX;
      i[t.currentTarget.dataset.id] = "blue", a.setData({
        orderPX: i
      })
    }
    console.log("测试",a.data.orderPX)
    // a.getListOrder()
    var o = t.currentTarget.dataset.index;
    a.data.indexInd = o;
    var u = [];
    console.log(d[o])
    1 == this.data.current ? (a.data.indexInd <= 0 ? u.push(d[d.length - 1]) : u.push(d[a.data.indexInd - 1]),
      u.push(d[a.data.indexInd]), a.data.indexInd >= d.length - 1 ? u.push(d[0]) : u.push(d[d.length - 1])) : 0 == this.data.current ? (u.push(d[a.data.indexInd]),
      a.data.indexInd == d.length - 1 ? (u.push(d[0]), u.push(d[1])) : a.data.indexInd == d.length - 2 ? (u.push(d[a.data.indexInd + 1]),
        u.push(d[0])) : (u.push(d[a.data.indexInd + 1]), u.push(d[a.data.indexInd + 2]))) : (0 == a.data.indexInd ? (u.push(d[d.length - 2]),
      u.push(d[d.length - 1])) : 1 == a.data.indexInd ? (u.push(d[d.length - 1]), u.push(d[0])) : (u.push(d[a.data.indexInd - 2]),
      u.push(d[a.data.indexInd - 1])), u.push(d[a.data.indexInd])), this.setData({
      questions: u,
      indexInd: o
    }), getApp().saveInfo("starids", s, d[o].question_id), setTimeout(function() {
      a.setData({
        starshow: getApp().info
      });
      }, 500), this.nextVideo(o);
    console.log(u)
  },
  nextVideo: function (t) {
    this.setData({
      videoMedia: "2" == d[t].media_type ? d[t].media : ""
    });
  },
  getListOrder: function() {

  },
  touchstart: function(t) {},
  bindtouchmove: function(t) {},
  bindtouchend: function(t) {},
  selectAnswer: function(t) {
    function a() {
      if (o = e.data.idarr[i], i < e.data.idarr.length - 1) {
        if ("green" != e.data.orderPX[o] && "red" != e.data.orderPX[o]) {
          wx.setStorage({
            key: n + "ind" + s,
            data: i
          });
          var t = e.data.orderPX;
          for (var r in t) "blue" == t[r] && (t[r] = "");
          return t[o] = "blue", e.setData({
            orderPX: t
          }), void console.log(e.data.orderPX);
        }
        i++, a();
      } else wx.setStorage({
        key: n + "ind" + s,
        data: e.data.idarr.length - 1
      });
    }
    var e = this,
      i = e.data.indexInd + 1,
      o = e.data.idarr[i];
    console.log(e.data.orderPX)
    if (a(), "背题模式" != e.data.textTab) {
      console.log(d)
      var u = d,
        l = e.data.questions;
      console.log(e.data.StorageAll[e.data.idarr[e.data.indexInd]]);
      if (e.data.StorageAll[e.data.idarr[e.data.indexInd]]) l[e.data.current].order = e.data.StorageAll[e.data.idarr[e.data.indexInd]],
        e.setData({
          questions: l
        });
      else {
        console.log('eee')
        u[e.data.indexInd].textTab = e.data.textTab, u[e.data.indexInd].order = {
          after: 0,
          down: t.currentTarget.dataset.ind,
          answer: t.currentTarget.dataset.answer
        }, l[e.data.current].textTab = e.data.textTab, l[e.data.current].order = {
          after: 0,
          down: t.currentTarget.dataset.ind,
          answer: t.currentTarget.dataset.answer
        }, d = u, e.setData({
          questions: l
        });
        var c = e.data.StorageAll;
        console.log(c)
        c[t.currentTarget.dataset.id] = {
          after: 0,
          down: t.currentTarget.dataset.ind,
          answer: t.currentTarget.dataset.answer
        }, wx.setStorage({
          key: n + "" + s,
          data: c,
        }), e.setData({
          StorageAll: c
        });
        var g = e.data.allNum
        if (g++, t.currentTarget.dataset.ind == t.currentTarget.dataset.answer) {
          var v = e.data.orderPX
          v[t.currentTarget.dataset.id] = "green", v.all = g, wx.setStorage({
            key: n + "list" + s,
            data: v
          });
          var h = e.data.greenNum;
          if (h++, e.setData({
              greenNum: h
            }), e.data.indexInd < d.length - 1) {
            e.autoPlay();
            var x = e.data.everyDay_all;
            x++, e.setData({
              everyDay_all: x
            })
          }
        } else if (t.currentTarget.dataset.ind != t.currentTarget.dataset.answer) {
          getApp().setIdsStroage("errorids", s, l[e.data.current].chapter_id, l[e.data.current].question_id)
          var v = e.data.orderPX;
          v[t.currentTarget.dataset.id] = "red", v.all = g, wx.setStorage({
            key: n + "list" + s,
            data: v
          });
          var f = e.data.redNum;
          f++ , e.setData({
            redNum: f
          });
          var p = e.data.everyDay_error;
          r += "," + t.currentTarget.dataset.id;
          var x = e.data.everyDay_all;
          p++ , x++ , e.setData({
            everyDay_error: p,
            everyDay_all: x
          });
        }
        e.questionStatus();
      }
    }

  },
  selectAnswerMore:function(t){
    var a = this;
    if("背题模式" != a.data.textTab && "1" !=a.data.questions[a.data.current].order.subup){
      var e = a.data.StorageAll,
        r = a.data.moreArr;
      r[t.currentTarget.dataset.ind] ? r[t.currentTarget.dataset.ind] =!1 : r[t.currentTarget.dataset.ind] =!0,
      e[t.currentTarget.dataset.id]={
        subup:0,
        down:r
      },a.setData({
        moreArr:r
      }),wx.setStorage({
        key: n+""+s,
        data: e,
      }),wx.getStorage({
        key: n+""+s,
        success: function(t) {
          a.setData({
            StorageAll:t.data
          })
        },
      });
      var d = a.data.questions;
      d[a.data.current].textTab = a.data.textTab,d[a.data.current].order=e[t.currentTarget.dataset.id],
      a.setData({
        questions:d
      })
    }
  },
  moreSelectSub:function(t){
    console.log(this.data.moreArr)
    function a() {
      if (o = e.data.idarr[i], i < e.data.idarr.length - 1) {
        if ("green" != e.data.orderPX[o] && "red" != e.data.orderPX[o]) {
          wx.setStorage({
            key: n + "ind" + s,
            data: i
          });
          var t = e.data.orderPX;
          for (var r in t) "blue" == t[r] && (t[r] = "");
          return t[o] = "blue", e.setData({
            orderPX: t
          }), void console.log(e.data.orderPX);
        }
        i++ , a();
      } else wx.setStorage({
        key: n + "ind" + s,
        data: e.data.idarr.length - 1
      });
    }
    var e = this,
        i = e.data.indexInd + 1,
        o = e.data.idarr[i];
    a();
    var u = e.data.StorageAll,
        l = e.data.moreArr;
    u[t.currentTarget.dataset.id]={
      subup:1,
      down:l
    },e.setData({
      StorageAll:u
    }),wx.setStorage({
      key: n+""+s,
      data: u,
    });
    var c = e.data.questions,
        g =d;
    g[e.data.indexInd].textTab = e.data.textTab, g[e.data.indexInd].order = {
      subup: 1,
      down: l
    }, c[e.data.current].textTab = e.data.textTab, c[e.data.current].order = {
      subup: 1,
      down: l
    },d = g,e.setData({
      questions:c
    });
    var h = 0;
    var downAnswer = ""
    for(var v in e.data.moreArr) {
      if (e.data.moreArr[v]){
         h++;
        downAnswer += v
      }
       
    }
    console.log(downAnswer)
    var f = e.data.allNum;
    console.log(f)
    if (f++ , h == t.currentTarget.dataset.answer.length && downAnswer == t.currentTarget.dataset.answer){
      (x = e.data.orderPX)[t.currentTarget.dataset.id] = "green", x.all = f,wx.setStorage({
        key: n + "list" + s,
        data: x
      });
      var p = e.data.greenNum;
      p++,e.setData({
        greenNum:p
      }),e.questionStatus(),e.autoPlay();
      w = e.data.everyDay_all;
      w++ , e.setData({
        everyDay_all: w
      });
    }else{
      getApp().setIdsStroage("errorids", s, c[e.data.current].chapter_id, c[e.data.current].question_id);
      var x = e.data.orderPX;
      console.log(x)
      x[t.currentTarget.dataset.id] = "red",x.all = f,wx.setStorage({
        key: n+"list"+s,
        data: x,
      })
      var y = e.data.redNum;
      y++,e.setData({
        redNum:y
      }),e.questionStatus();
      var D = e.data.everyDay_error,
          w = e.data.everyDay_all;
      r += "," + t.currentTarget.dataset.id, D++ , w++ , e.setData({
        everyDay_error: D,
        everyDay_all: w
      });
    }
    e.setData({
      moreArr: {
        A: !1,
        B: !1,
        C: !1,
        D: !1
      }
    });
  },
  autoPlay: function() {
    console.log('auto')
    this.setData({
      autoplay: !0
    });
  },
  pageChange: function(t) {
    console.log(t)
    "autoplay" == t.detail.source && this.setData({
      autoplay: !1
    });
    var a = this;
    a.setData({
      moreArr: {
        A: !1,
        B: !1,
        C: !1,
        D: !1
      }
    }), a.setData({
      xiejie: !0
    });

    var e = this.data.current,
      r = t.detail.current,
      n = a.data.indexInd,
      i = 1 * r - 1 * e;
    console.log(i)
    if (-2 == i ? i = 1 : 2 == i && (i = -1), (n += i) >= d.length)
      return n = 0, a.result(0),
        void a.setData({
          xiejie: !1,
          current: 2
        });
    if (n < 0) return wx.showToast({
      title: "已经是第一题了"
    }), a.setData({
      xiejie: !1,
      current: 0
    }), void(n = d.length - 1);
    console.log("%s", "last: ", e, " current: ", r, " index: ", n, " page:", d[n]);
    var o = [];
    0 == r ? (o.push(d[n]), o.push(d[n + 1]), o.push(d[n - 1]), o[1] || (o[1] = d[0]),
        o[2] || (o[2] = d[d.length - 1])) : 1 == r ? (o.push(d[n - 1]), o.push(d[n]), o.push(d[n + 1]),
        o[2] || (o[2] = d[0]), o[0] || (o[0] = d[d.length - 1])) : 2 == r && (o.push(d[n + 1]),
        o.push(d[n - 1]), o.push(d[n]), o[0] || (o[0] = d[0]), o[1] || (o[1] = d[d.length - 1])),
      console.log(o)
    this.setData({
      questions: o,
      indexInd: n,
      current: r
    }), getApp().saveInfo("starids", s, d[n].question_id), setTimeout(function() {
      a.setData({
        starshow: getApp().info
      });
      }, 300), this.nextVideo(n);
  },
  _updown: function() {
    console.log('22')
    var t = this;
    this.setData({
      iconInd: !this.data.iconInd,
      iconIndtwo: !this.data.iconIndtwo,
      videoctrl: !this.data.videoctrl
    }), setTimeout(function() {
      i.length < 2 || t.setData({
        scrolltop: i[i.length - 2]
      });
    }, 0);
    console.log(this.data.iconcircle)
    console.log(i.length)
  },
  changeTab: function(t) {
    var a = this
    var e = a.data.questions;
    a.setData({
      questions: e,
      textTab: t.currentTarget.dataset.texttab,
      selectInd: "答题模式" == t.currentTarget.dataset.texttab
    })
  },
  questionStatus: function() {
    var t = this;
    wx.getStorage({
      key: n + "list" + s,
      success: function(a) {
        t.setData({
          orderPX: a.data,
          allNum: a.data.all
        });
      }
    });
  },
  result:function(t){
    console.log(t)
    1 != t && (this.setData({
      everyDay_all: 0
    }), r = ""), wx.navigateTo({
      url: "../result/result?error=" + this.data.redNum + "&success=" + this.data.greenNum + "&afterall=" + this.data.allNum + "&all=" + this.data.idarr.length + "&isplay=" + t + "&intentify_error_ids=" + r
    });
  },
  onUnload:function() {
    console.log(this.data.mode)
    console.log(this.data.everyDay_all)
    "2" != this.data.mode && this.data.everyDay_all >= 5 && (wx.setStorageSync("every_day_play",{
      everyDay_error: this.data.everyDay_error,
      everyDay_all: this.data.everyDay_all
    }),this.setData({
      everyDay_all: 0
    }),this.result(1));
  }
})