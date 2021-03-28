var t = require("../../../../signjson/sign.js"), e = require("../../../../utils/kjz_subject_json.js"), a = require("../../../../utils/question.js"), s = {
    "1_1": "129,209,277,278,283,296,303,509,539,554,839,2002,2003",
    "1_3": "1537,1538,1544,1560,1593,1718,1733,1786,1789,1879,1914,2067,2068,2180,2206,2265,2330",
    "8_1": "10036,10155,10054,10158,10165,10170",
    "8_3": "10344"
};

Page({
    data: {
        colorlist: [ "order-purple", "order-green", "order-orange", "order-blue", "order-Cambridge-blue", "order-yellow", "order-pink", "order-light-green" ],
        ids: e,
        sign: t
    },
    specialEvery: function(t) {
        wx.navigateTo({
            url: "../idsmsg/idsmsg?ids=" + t.currentTarget.dataset.every.ids.join(",") + "&title=" + t.currentTarget.dataset.every.title
        });
    },
    onLoad: function(t) {
        console.log(t.show), 1 == t.show ? wx.setNavigationBarTitle({
            title: "图标速记"
        }) : wx.setNavigationBarTitle({
            title: "专项练习"
        });
    },
    signGo: function(t) {
        "0" == t.currentTarget.dataset.ind ? wx.navigateTo({
            url: "../../trafficsign/trafficsign"
        }) : wx.navigateTo({
            url: "../../signsort/signsort?ind=" + t.currentTarget.dataset.ind
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log(this.data.special_two);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});