var t = require("../../../signjson/sign.js")

Page({

  data: {
    sign: t,
  },

  onLoad: function (options) {
    var e = this, s = getApp().getApiParams();
    
  },

  onReady: function () {

  },

  onShow: function () {

  },

  signGo: function (t) {
    "0" == t.currentTarget.dataset.ind ? wx.navigateTo({
      url: "../trafficsign/trafficsign"
    }) : wx.navigateTo({
      url: "../signsort/signsort?ind=" + t.currentTarget.dataset.ind
    });
  },
})