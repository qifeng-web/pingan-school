var q = require('../../../utils/question.js'),
  u = require("../../../utils/underscore-min.js"),
  t = require("../../../utils/constants.js"),
  n = "random",
  s = 1,
  r = "exam";
Page({


  data: {
    StorageAll: {},
    indexInd: 0,
    redNum: 0,
    greenNum: 0,
    allNum: 0,
    intensify_qis: [],
    intensify_eids: [],
    intensify_okids: [],
    orderPX: {},
    idarr: [],
    textTab: "答题模式",
    selectInd: !0,
    moreArr: {
      A: !1,
      B: !1,
      C: !1,
      D: !1
    },
    iconInd: !1,
    iconcircle: [],
    startPoint: {
      x: 0,
      y: 0
    },
    recmend: !1,
    iconIndtwo: !1,
    youind: 0,
    outside: !0,
    current: 0,
    questions: [],
    xiejie: !0,
    timeshow: !0,
    times: "",
    ytimes: "",
    danxuan: 0,
    duoxuan: 0,
    panduan: 0,
    allfen: 0,
    passf: 0,
    interval: 800,
    training_qids: "",
    training_jl: "",
    videoctrl: !0,
    videoMedia: "",
    startTime: 0,
    startTimeind: !1,
    nums: 0,
    testMode: t.config.testMode,
    statusOptions: {
      statusType: 0,
      statusColor: "#ff4f42",
      statusBg: "#ffe3e1",
      statusPlan: 1.5,
      statusError: 11,
      statusAnswer: 39,
      statusScore: 50
    }
  },

  onLoad: function (t) {
    var e = this
    e.setData({
      times: 1 * t.time + 1 + ":00",
      passf: t.passf,
      training_jl: t.training_qids,
      startTime: 1 * t.time,
      nums: t.nums
    }), e.random(), t.timeback ? (e.setData({
      timeshow: !1
    }), wx.setNavigationBarTitle({
      title: "错题回顾"
    }), setTimeout(function () {
      wx.hideLoading();
    }, 1e3)) : e.timeServal(1 * t.time);
    var i = 0,
      d = 0,
      o = 0;
    switch (1 * getApp().currentQuestionSetting.car_type) {
      case 32:
      case 16:
      case 128:
      case 512:
        i = 1, d = 2, o = 1;
        break;

      case 8:
        i = 2, d = 2, o = 2;
        break;

      case 64:
      case 256:
        i = 1, d = 1, o = 1;
        break;

      default:
        i = 1 == getApp().currentQuestionSetting.course ? 1 : 2, d = 1 == getApp().currentQuestionSetting.course ? 1 : 2,
          o = 1 == getApp().currentQuestionSetting.course ? 1 : 2;
    }
    this.setData({
      danxuan: i,
      duoxuan: d,
      panduan: o
    }), wx.getStorage({
      key: r + "list" + getApp().currentQuestionSetting.course,
      success: function (t) {
        console.log(t.data)
        e.setData({
          orderPX: t.data,
          allNum: t.data.all
        });
        var a = 0,
          n = 0;
        for (var r in e.data.orderPX) "red" == e.data.orderPX[r] ? (a++ , e.setData({
          redNum: a
        })) : "green" == e.data.orderPX[r] && (n++ , e.setData({
          greenNum: n
        }));
      },
    }), e.getMsg(t)
    console.log(this.data)
  },

  onReady: function () {

  },

  onShow: function () {
var t = this;
        this.setData({
            videoctrl: !1
        }), setTimeout(function() {
            t.setData({
                videoctrl: !0
            });
        }, 1e3);
  },

  getMsg: function (t) {
    var e = this;
    wx.showLoading({
      title: "加载中",
    }), wx.getStorage({
      key: r + "" + getApp().currentQuestionSetting.course,
      success: function (t) {
        console.log(t.data)
        e.setData({
          StorageAll: t.data
        });
      },
    })
    wx.getStorage({
      key: r + "all" + getApp().currentQuestionSetting.course,
      success: function (t) {
        if (e.data.timeshow || e.changeTab(), e.data.orderPX) {
          for (var a = e.data.orderPX, s = [], i = 0; i < t.data.length; i++) "green" != a[t.data[i].question_id] && s.push(t.data[i]);
          n = s
        } else n = t.data;
        e.setData({
          questions: n.slice(0, 3)
        }), wx.getStorage({
          key: r + "ids" + getApp().currentQuestionSetting.course,
          success: function (t) {
            var a = [];
            if (e.data.orderPX) {
              for (var n = e.data.orderPX, r = [], s = 0; s < t.data.length; s++) "green" != n[t.data[s]] && r.push(t.data[s]);
              a = r;
            } else a = t.data;
            e.setData({
              idarr: a
            });
          },
        })
      },
      fail: function () {
        if (t.continued || "") {
          var n = wx.getStorageSync("exam_allfen" + getApp().currentQuestionSetting.course);
          n && e.setData({
            allfen: 1 * n
          });
          var s = wx.getStorageSync(r + "ids" + getApp().currentQuestionSetting.course);
          e.ind_to_data(s), setTimeout(function () {
            wx.hideLoading();
          }, 1e3);
        } else {
          s = getApp().currentQuestionSetting.course;
          console.log(s)
          wx.getStorage({
            key: n + "" + s,
            success: function (t) {
              r.setData({
                StorageAll: t.data
              });
              console.log(t.data)
            },
            complete: function () {
              var t = q.questionIds["course" + s]
              var question_ids = e.getRandomArrayElements(t, e.data.nums)
              e.setData({
                question_ids: question_ids
              })
              e.ind_to_data(question_ids);
              setTimeout(function () {
                wx.hideLoading();
              }, 1e3);
            }
          })
        }
      }
    })
  },
  ind_to_data: function (t) {
    for (var a = this, s = q.getQuestionsByIds(getApp().currentQuestionSetting.course, t), i = 0; i < s.length; i++)
      if (s[i].answerArr = s[i].answer.split(""), a.data.StorageAll[s[i].question_id]) {
        var d = a.data.StorageAll[s[i].question_id];
        "1" == d.subup || "0" == d.after ? s[i].order = d : "多选" == s[i].type_name && (s[i].order = {},
          s[i].order.subup = 0, s[i].order.down = {
            A: !1,
            B: !1,
            C: !1,
            D: !1
          });
      } else "多选" == s[i].type_name && (s[i].order = {}, s[i].order.subup = 0, s[i].order.down = {
        A: !1,
        B: !1,
        C: !1,
        D: !1
      });
    n = s, a.setData({
      idarr: t,
      questions: s.slice(0, 3)
    }), wx.setStorage({
      key: r + "ids" + getApp().currentQuestionSetting.course,
      data: t
    }), a.getthree();
  },

  getthree: function () {
    var t = this;
    wx.getStorage({
      key: r + "ind" + getApp().currentQuestionSetting.course,
      success: function (e) {
        var a = {
          currentTarget: {
            dataset: {
              index: e.data
            }
          }
        };
        t.jumpToQuestion(a), t.nextVideo(e.data);
      },
      fail: function () {
        var e = {
          currentTarget: {
            dataset: {
              index: 0
            }
          }
        };
        t.jumpToQuestion(e), t.nextVideo(0);
      }
    }), wx.getStorage({
      key: r + "" + getApp().currentQuestionSetting.course,
      success: function (e) {
        if (e.data) {
          var a = t.data.orderPX;
          a[t.data.idarr[e.data]] = "blue", t.setData({
            orderPX: a,
            recmend: !0
          }), t.questionStatus(), setTimeout(function () {
            t.setData({
              recmend: !1
            });
          }, 2e3);
        }
      }
    })
  },

  _updown: function () {
    this.setData({
      iconInd: !this.data.iconInd,
      iconIndtwo: !this.data.iconIndtwo,
      videoctrl: !this.data.videoctrl
    })
  },

  jumpToQuestion: function (t) {
    var e = this,
      a = e.data.orderPX;
    for (var r in a) "blue" == a[r] && (a[r] = "");
    this.setData({
      orderPX: a,
      iconInd: !1,
      iconIndtwo: !1,
      videoctrl: !0
    });
    var s = t.currentTarget.dataset.color;
    if ("red" != s && "green" != s) {
      var i = e.data.orderPX;
      i[t.currentTarget.dataset.id] = "blue", e.setData({
        orderPX: i
      });
    }

    var d = t.currentTarget.dataset.index;
    e.data.indexInd = d;
    var o = [];
    1 == this.data.current ? (e.data.indexInd <= 0 ? o.push(n[n.length - 1]) : o.push(n[e.data.indexInd - 1]),
      o.push(n[e.data.indexInd]), e.data.indexInd >= n.length - 1 ? o.push(n[0]) : o.push(n[n.length - 1])) : 0 == this.data.current ? (o.push(n[e.data.indexInd]),
        e.data.indexInd == n.length - 1 ? (o.push(n[0]), o.push(n[1])) : e.data.indexInd == n.length - 2 ? (o.push(n[e.data.indexInd + 1]),
          o.push(n[0])) : (o.push(n[e.data.indexInd + 1]), o.push(n[e.data.indexInd + 2]))) : (0 == e.data.indexInd ? (o.push(n[n.length - 2]),
            o.push(n[n.length - 1])) : 1 == e.data.indexInd ? (o.push(n[n.length - 1]), o.push(n[0])) : (o.push(n[e.data.indexInd - 2]),
              o.push(n[e.data.indexInd - 1])), o.push(n[e.data.indexInd])), this.setData({
                questions: o,
                indexInd: d
      }), this.nextVideo(d);

  },

  changeTab: function () {
    var e = this,
      a = e.data.questions;
    e.setData({
      questions: a,
      textTab: "背题模式",
      selectInd: !1
    })
  },
  random: function () {
    var r = this;
    s = getApp().currentQuestionSetting.course;
    console.log(s)
    wx.getStorage({
      key: n + "" + s,
      success: function (t) {
        r.setData({
          StorageAll: t.data
        });
        console.log(t.data)
      },
      complete: function () {
        var t = q.questionIds["course" + s]
        var question_ids = r.getRandomArrayElements(t, 100)
        console.log(question_ids)
      }
    })
  },
  getRandomArrayElements(arr, count) {
    // console.log(arr)
    // return arr.slice(0, count)
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);

  },
  timeServal: function (t) {
    if (0 != t) {
      var e = t,
        a = 59,
        n = this;
      setInterval(function () {
        a < 10 ? n.setData({
          times: e + ":0" + a,
          ytimes: t - e + ":" + (59 - a)
        }) : n.setData({
          times: e + ":" + a,
          ytimes: t - e + ":" + (59 - a)
        }), --a < 0 && (e > 0 ? (a = 59, e--) : (a = 0, e = 0, n.setData({
          startTimeind: !0
        })));
      }, 1e3);
    } else this.setData({
      times: 0,
      startTimeind: !0
    });
  },

  selectAnswer: function (t) {
    function e() {
      if (i = a.data.idarr[s], s < a.data.idarr.length - 1) {
        if ("green" != a.data.orderPX[i] && "red" != a.data.orderPX[i]) {
          wx.setStorage({
            key: r + "ind" + getApp().currentQuestionSetting.course,
            data: s
          });
          var t = a.data.orderPX;
          for (var n in t) "blue" == t[n] && (t[n] = "");
          return t[i] = "blue", void a.setData({
            orderPX: t
          });
        }
        s++ , e();
      } else wx.setStorage({
        key: r + "ind" + getApp().currentQuestionSetting.course,
        data: a.data.idarr.length - 1
      });
    }
    var a = this, s = a.data.indexInd + 1, i = a.data.idarr[s];
    if (e(), "背题模式" != a.data.textTab) {
      var d = n, o = a.data.questions;
      if (console.log(n[a.data.indexInd]), console.log(a.data.questions[a.data.current]),
        a.data.StorageAll[a.data.idarr[a.data.indexInd]]) o[a.data.current].order = a.data.StorageAll[a.data.idarr[a.data.indexInd]],
          a.setData({
            questions: o
          }); else {
        d[a.data.indexInd].textTab = a.data.textTab, d[a.data.indexInd].order = {
          after: 0,
          down: t.currentTarget.dataset.ind,
          answer: t.currentTarget.dataset.answer
        }, o[a.data.current].textTab = a.data.textTab, o[a.data.current].order = {
          after: 0,
          down: t.currentTarget.dataset.ind,
          answer: t.currentTarget.dataset.answer
        }, n = d, a.setData({
          questions: o
        });
        var u = a.data.StorageAll;
        u[t.currentTarget.dataset.id] = {
          after: 0,
          down: t.currentTarget.dataset.ind,
          answer: t.currentTarget.dataset.answer
        }, wx.setStorage({
          key: r + "" + getApp().currentQuestionSetting.course,
          data: u
        }), a.setData({
          StorageAll: u
        });
        var c = a.data.allNum;
        if (c++ , t.currentTarget.dataset.ind == t.currentTarget.dataset.answer) {
          (l = a.data.orderPX)[t.currentTarget.dataset.id] = "green", l.all = c, wx.setStorage({
            key: r + "list" + getApp().currentQuestionSetting.course,
            data: l
          });
          var g = a.data.greenNum;
          g++ , a.setData({
            greenNum: g,
            allNum: c
          }), a.jsfensu(n[a.data.indexInd].type_name), a.storageokids(n[a.data.indexInd].question_id);
          a.questionStatus(), a.data.indexInd < n.length - 1 ? a.autoPlay() : setTimeout(function () {
            a.data.indexInd != n.length - 1 || 1 * a.data.greenNum + 1 * a.data.redNum != n.length ? (console.log(a.data.indexInd),
              a.data.indexInd == n.length - 1 && a.handexam()) : a.result();
          }, 600);
        } else if (t.currentTarget.dataset.ind != t.currentTarget.dataset.answer) {
          getApp().setIdsStroage("errorids", getApp().currentQuestionSetting.course, 1, o[a.data.current].question_id);
          var l = a.data.orderPX;
          l[t.currentTarget.dataset.id] = "red", l.all = c, wx.setStorage({
            key: r + "list" + getApp().currentQuestionSetting.course,
            data: l
          });
          var h = a.data.redNum;
          h++ , a.setData({
            redNum: h,
            allNum: c
          }), a.storagenoids(n[a.data.indexInd].question_id);
          a.questionStatus(), a.data.indexInd < n.length - 1 ? '' : setTimeout(function () {
            a.data.indexInd != n.length - 1 || 1 * a.data.greenNum + 1 * a.data.redNum != n.length ? (console.log(a.data.indexInd),
              a.data.indexInd == n.length - 1 && a.handexam()) : a.result();
          }, 600);
        }

      }
    }
  },
  selectAnswerMore: function (t) {
    var e = this;
    if ("背题模式" != e.data.textTab && "1" != e.data.questions[e.data.current].order.subup) {
      var a = e.data.StorageAll, n = e.data.moreArr;
      n[t.currentTarget.dataset.ind] ? n[t.currentTarget.dataset.ind] = !1 : n[t.currentTarget.dataset.ind] = !0,
        a[t.currentTarget.dataset.id] = {
          subup: 0,
          down: n
        }, e.setData({
          moreArr: n
        }), wx.setStorage({
          key: r + "" + getApp().currentQuestionSetting.course,
          data: a
        }), wx.getStorage({
          key: r + "" + getApp().currentQuestionSetting.course,
          success: function (t) {
            e.setData({
              StorageAll: t.data
            });
          }
        });
      var s = e.data.questions;
      s[e.data.current].textTab = e.data.textTab, s[e.data.current].order = a[t.currentTarget.dataset.id],
        e.setData({
          questions: s
        });
    }
  },
  moreSelectSub: function (t) {
    function e() {
      if (i = a.data.idarr[s], s < a.data.idarr.length - 1) {
        if ("green" != a.data.orderPX[i] && "red" != a.data.orderPX[i]) {
          wx.setStorage({
            key: r + "ind" + getApp().currentQuestionSetting.course,
            data: s
          });
          var t = a.data.orderPX;
          for (var n in t) "blue" == t[n] && (t[n] = "");
          return t[i] = "blue", a.setData({
            orderPX: t
          }), void console.log(a.data.orderPX);
        }
        s++ , e();
      } else wx.setStorage({
        key: r + "ind" + getApp().currentQuestionSetting.course,
        data: a.data.idarr.length - 1
      });
    }
    var a = this, s = a.data.indexInd + 1, i = a.data.idarr[s];
    a.storageTraining_qids(n[a.data.indexInd].question_id), e();
    var d = a.data.StorageAll, o = a.data.moreArr;
    d[t.currentTarget.dataset.id] = {
      subup: 1,
      down: o
    }, console.log(d[t.currentTarget.dataset.id]), a.setData({
      StorageAll: d
    }), wx.setStorage({
      key: r + "" + getApp().currentQuestionSetting.course,
      data: d
    });
    var u = a.data.questions, c = n;
    c[a.data.indexInd].textTab = a.data.textTab, c[a.data.indexInd].order = {
      subup: 1,
      down: o
    }, u[a.data.current].textTab = a.data.textTab, u[a.data.current].order = {
      subup: 1,
      down: o
    }, n = c, a.setData({
      questions: u
    });
    var g = 0;
    //for (var l in a.data.moreArr) a.data.moreArr[l] && g++;
    var downAnswer = ""
    for (var v in a.data.moreArr) {
      if (a.data.moreArr[v]) {
        g++;
        downAnswer += v
      }

    }
    var h = a.data.allNum;

    if (h++ , g == t.currentTarget.dataset.answer.length && downAnswer == t.currentTarget.dataset.answer) {
      (f = a.data.orderPX)[t.currentTarget.dataset.id] = "green", f.all = h, wx.setStorage({
        key: r + "list" + getApp().currentQuestionSetting.course,
        data: f
      });
      var p = a.data.greenNum;
      p++ , a.setData({
        greenNum: p,
        allNum: h
      }), a.questionStatus(), a.jsfensu(n[a.data.indexInd].type_name), a.storageokids(n[a.data.indexInd].question_id);
      a.data.indexInd < n.length - 1 ? a.autoPlay() : setTimeout(function () {
        a.data.indexInd != n.length - 1 || 1 * a.data.greenNum + 1 * a.data.redNum != n.length ? (console.log(a.data.indexInd),
          a.data.indexInd == n.length - 1 && a.handexam()) : a.result();
      }, 600)
    } else {
      getApp().setIdsStroage("errorids", getApp().currentQuestionSetting.course, 1, u[a.data.current].question_id);
      var f = a.data.orderPX;
      f[t.currentTarget.dataset.id] = "red", f.all = h, wx.setStorage({
        key: r + "list" + getApp().currentQuestionSetting.course,
        data: f
      });
      var x = a.data.redNum;
      x++ , a.setData({
        redNum: x,
        allNum: h
      }), a.questionStatus(), a.storagenoids(n[a.data.indexInd].question_id);
      a.data.indexInd < n.length - 1 ? '' : setTimeout(function () {
        a.data.indexInd != n.length - 1 || 1 * a.data.greenNum + 1 * a.data.redNum != n.length ? (console.log(a.data.indexInd),
          a.data.indexInd == n.length - 1 && a.handexam()) : a.result();
      }, 600)
    }
    a.setData({
      moreArr: {
        A: !1,
        B: !1,
        C: !1,
        D: !1
      }
    }), setTimeout(function () {
      a.data.indexInd != n.length - 1 || 1 * a.data.greenNum + 1 * a.data.redNum != n.length ? a.data.indexInd == n.length && a.handexam() : a.result();
    }, 600);
  },
  storageTraining_qids: function (t) {
    var e = this.data.training_qids;
    e = e + "" + t + "," + wx.setStorage({
      key: "training_qids" + getApp().currentQuestionSetting.course,
      data: e,
    }), this.setData({
      training_qids: e
    });
    var a = this.data.intensify_qis;
    a.push(t), this.setData({
      intensify_qis: a
    }), wx.setStorage({
      key: "intensify_qis" + getApp().currentQuestionSetting.course,
      data: a,
    });
  },

  storageokids: function (t) {
    var e = this.data.intensify_okids;
    e.push(t), this.setData({
      intensify_okids: e
    }), wx.setStorage({
      key: "intensify_okids" + getApp().currentQuestionSetting.course,
      data: e
    })
  },

  storagenoids: function (t) {
    console.log(this.data.allNum)
    var e = this.data.intensify_eids;
    if (e.push(t), this.setData({
      intensify_eids: e
    }), wx.setStorage({
      key: "intensify_noids" + getApp().currentQuestionSetting.course,
      data: e
    }), 11 == e.length || 11 == this.data.redNum) {
      var a = {
        statusType: 0,
        statusColor: "#ffcd05",
        statusBg: "#fff4c9",
        statusPlan: 2.8,
        statusError: this.data.redNum,
        statusAnswer: this.data.nums - this.data.allNum,
        statusScore: this.data.allfen
      };
      this.setData({
        iconInd: !1,
        showStatus: !0,
        statusOptions: a
      });
    }
  },

  jsfensu: function (t) {
    var e = this.data.allfen, a = 0;
    a = "判断" == t ? this.data.panduan : "单选" == t ? this.data.danxuan : this.data.duoxuan,
      this.setData({
        allfen: e + a
      });
  },

  questionStatus: function () {
    var t = this;
    wx.getStorage({
      key: r + "list" + getApp().currentQuestionSetting.course,
      success: function (e) {
        t.setData({
          orderPX: e.data,
          allNum: e.data.all
        });
      }
    });
  },

  autoPlay: function () {
    this.setData({
      autoplay: !0
    });
  },

  pageChange: function (t) {
    console.log(this.data.orderPX)
    "autoplay" == t.detail.source && this.setData({
      autoplay: !1
    });
    var e = this;
    e.setData({
      moreArr: {
        A: !1,
        B: !1,
        C: !1,
        D: !1
      }
    }), e.setData({
      xiejie: !0
    });
    var a = this.data.current, r = t.detail.current, s = e.data.indexInd, i = 1 * r - 1 * a;
    if (-2 == i ? i = 1 : 2 == i && (i = -1), (s += i) >= n.length) return s = 0, wx.showToast({
      title: "已经是最后一题了"
    }), void e.setData({
      xiejie: !1,
      current: 2
    });
    if (s < 0) return wx.showToast({
      title: "已经是第一题了"
    }), e.setData({
      xiejie: !1,
      current: 0
    }), void (s = n.length - 1);
    console.log("last: " + a + " current: " + r + " index: " + s + " page:" + n[s]);
    var d = [];
    0 == r ? (d.push(n[s]), d.push(n[s + 1]), d.push(n[s - 1]), d[1] || (d[1] = n[0]),
      d[2] || (d[2] = n[n.length - 1])) : 1 == r ? (d.push(n[s - 1]), d.push(n[s]), d.push(n[s + 1]),
        d[2] || (d[2] = n[0]), d[0] || (d[0] = n[n.length - 1])) : 2 == r && (d.push(n[s + 1]),
          d.push(n[s - 1]), d.push(n[s]), d[0] || (d[0] = n[0]), d[1] || (d[1] = n[n.length - 1]));
    var o = this;
    console.log("change data..."), o.setData({
      questions: d,
      indexInd: s,
      current: r
    }), this.nextVideo(s);
  },

  newUp_exam: function () {
    console.log(this.data.allNum);
    var t = 2 * (parseInt(this.data.allNum / this.data.nums * 100) / 100) + 1.5;
    t < 1.6 && 0 != this.data.allNum && (t = 1.6), console.log(t);
    var e = {
      statusType: 1,
      statusColor: "#ff4f42",
      statusBg: "#ffe3e1",
      statusPlan: t,
      statusError: this.data.redNum,
      statusAnswer: this.data.nums - this.data.allNum,
      statusScore: this.data.allfen
    };
    this.setData({
      showStatus: !0,
      statusOptions: e
    });
  },

  nextVideo: function(t) {
        this.setData({
            videoMedia: "2" == n[t].media_type ? n[t].media : ""
        });
    },

  touchstart: function (t) { },
  bindtouchmove: function (t) { },
  bindtouchend: function (t) { },
  scrolltop: function (t) { },

  set_time: function () {
    var t = parseInt(this.data.times);
    0 == t && (t = 1), wx.setStorage({
      key: "time" + getApp().currentQuestionSetting.course,
      data: t
    }), wx.setStorage({
      key: "exam_allfen" + getApp().currentQuestionSetting.course,
      data: this.data.allfen
    });
  },

  result: function () {
    for (var t = "", e = this.data.orderPX, a = 0; a < this.data.idarr.length; a++) "green" != e[this.data.idarr[a]] && (t += this.data.idarr[a],
      a != this.data.idarr.length - 1 && (t += ","));
    wx.setStorage({
      key: "exam_up" + getApp().currentQuestionSetting.course,
      data: 1,
    }), wx.setStorage({
      key: r + "all" + getApp().currentQuestionSetting.course,
      data: n
    }),
      wx.redirectTo({
        url: "../examresult/examresult?greenNum=" + this.data.greenNum + "&redNum=" + this.data.redNum + "&allNum=" + this.data.allNum + "&ytimes=" + this.data.ytimes + "&allfen=" + this.data.allfen + "&passf=" + this.data.passf + "&wrongIds=" + t + "&allQuestionCount=" + this.data.idarr.length,
      })
  },

  onUnload: function () {
    this.set_time();
  },

  onHide: function () {
    this.set_time();
  },

  status_choose_btn: function (t) {
    console.log(t.detail.msg), this.setData({
      showStatus: !1
    }), "up" == t.detail.msg ? this.result() : "again" == t.detail.msg && a._repeat_examGo(this);
  }
})