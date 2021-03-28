var t = require("../../../signjson/DTTrafficMark.js"), n = require("../../../signjson/DTInteriorFeatures.js"), e = require("../../../signjson/DTPilotLamp.js"), i = require("../../../signjson/DTPoliceGesture.js"), o = require("../../../signjson/DTTrafficAccident.js");

Page({
  data: {
    sort: {
      0: t,
      1: e,
      2: n,
      3: i,
      4: o
    },
    sortname: {
      0: "交通标志大全",
      1: "汽车仪表盘指示灯",
      2: "车内功能按键",
      3: "新版交警手势",
      4: "交通事故详解"
    },
    name: "",
    srotdown: null,
    current: null
  },
  onLoad: function (n) {
    console.log(n), "0" == n.ind ? this.setData({
      name: n.name,
      current: n.sortdownind,
      srotdown: t[n.jtind].list
    }) : this.setData({
      name: this.data.sortname[n.ind],
      current: n.sortdownind,
      srotdown: this.data.sort[n.ind]
    }), wx.setNavigationBarTitle({
      title: this.data.name + "(" + (1 * this.data.current + 1) + "/" + this.data.srotdown.length + ")"
    });
  },
  currentChange: function (t) {
    this.setData({
      current: t.detail.current
    }), wx.setNavigationBarTitle({
      title: this.data.name + "(" + (1 * this.data.current + 1) + "/" + this.data.srotdown.length + ")"
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});