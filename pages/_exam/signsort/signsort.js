var n = require("../../../signjson/DTTrafficMark.js"), t = require("../../../signjson/DTInteriorFeatures.js"), i = require("../../../signjson/DTPilotLamp.js"), e = require("../../../signjson/DTPoliceGesture.js"), s = require("../../../signjson/DTTrafficAccident.js");

Page({
  data: {
    sort: {
      0: n,
      1: i,
      2: t,
      3: e,
      4: s
    },
    sortname: {
      0: "交通标志大全",
      1: "汽车仪表盘指示灯",
      2: "车内功能按键",
      3: "新版交警手势",
      4: "交通事故详解"
    },
    name: "",
    ind: "",
    jtind: "",
    srotdown: null
  },
  onLoad: function (t) {
    "0" == t.ind ? (this.setData({
      name: t.title,
      ind: t.ind,
      jtind: t.jtind,
      srotdown: n[t.jtind].list
    }), wx.setNavigationBarTitle({
      title: this.data.name
    })) : (this.setData({
      name: this.data.sortname[t.ind],
      ind: t.ind,
      srotdown: this.data.sort[t.ind]
    }), wx.setNavigationBarTitle({
      title: this.data.name
    }));
  },
  sortGo: function (n) {
    "0" == this.data.ind ? wx.navigateTo({
      url: "../signswiper/signswiper?ind=0&sortdownind=" + n.currentTarget.dataset.sortdownind + "&jtind=" + this.data.jtind + "&name=" + this.data.name
    }) : wx.navigateTo({
      url: "../signswiper/signswiper?ind=" + this.data.ind + "&sortdownind=" + n.currentTarget.dataset.sortdownind
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