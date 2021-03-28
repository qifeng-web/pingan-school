require("../../../signjson/DTTrafficMark.js");

var t = [{
  title: "禁止标志",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_0@2x.png",
  jtnum: 50
}, {
  title: "警告标志",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_1@2x.png",
  jtnum: 69
}, {
  title: "指示标志",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_2@2x.png",
  jtnum: 32
}, {
  title: "指路标志",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_3@2x.png",
  jtnum: 143
}, {
  title: "旅游区标志",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_4@2x.png",
  jtnum: 17
}, {
  title: "道路施工安全标志",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_5@2x.png",
  jtnum: 26
}, {
  title: "辅助标志",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_6@2x.png",
  jtnum: 27
}, {
  title: "禁止标线",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_7@2x.png",
  jtnum: 24
}, {
  title: "警告标线",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_8@2x.png",
  jtnum: 13
}, {
  title: "指示标线",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_9@2x.png",
  jtnum: 33
}, {
  title: "道路施工安全设施设置示例",
  jtsrc: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/sign/trafficMark_logo_10@2x.png",
  jtnum: 15
}];

Page({
  data: {
    jtlist: t
  },
  onLoad: function (t) { },
  sortGo: function (t) {
    wx.navigateTo({
      url: "../signsort/signsort?ind=0&jtind=" + t.currentTarget.dataset.index + "&title=" + t.currentTarget.dataset.title
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