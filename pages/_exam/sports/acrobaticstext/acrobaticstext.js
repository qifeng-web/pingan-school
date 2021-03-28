Page({
    data: {
        text: "",
        sports: [ [ "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/jiaogui_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/bazhong_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/chufa_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/fakuan_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/zuidi_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/anquan_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/riqi_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/yihun_nodown.html" ], [ "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/2015_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/dtjq/jiujia_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/fagui/jszslhsygd_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/fagui/dljtaqf_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/fagui/dljtaqfsstl_nodown.html", "https://picture.eclicks.cn/kaojiazhao/400/course1/fagui/xingfa_nodown.html" ] ],
        src: ""
    },
    onLoad: function(t) {
        wx.openBluetoothAdapter ? wx.openBluetoothAdapter() : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        }), wx.setNavigationBarTitle({
            title: t.title
        }), this.setData({
            src: this.data.sports[t.one][t.two]
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});