Page({
    data: {
        src: "",
        title: ""
    },
    onLoad: function(t) {
        console.log(t), t && (t.title && wx.setNavigationBarTitle({
            title: t.title
        }), this.setData({
            src: decodeURIComponent(t.url)
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "学车神器,分享给你~助你光速拿驾照",
            path: "pages/public/webview/webview?title=" + this.data.title + "&url=" + encodeURIComponent(this.data.src)
        };
    }
});