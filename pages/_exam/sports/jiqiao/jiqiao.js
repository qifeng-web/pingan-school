var t = require("../../../../utils/constants");

Page({
    data: {
        jqList: null
    },
    onLoad: function(e) {
        var a = e.course, i = t.jq[a];
        this.setData({
            jqList: i
        }), console.log(i);
    },
    jqDetails: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.title, a = t.currentTarget.dataset.url, i = this.data.jqList.h5;
        wx.navigateTo({
            url: "../../public/webview/webview?url=" + i + "/" + a + "_nodown.html&title=" + e
        });
    }
});