var t = require("../data_init/imgMsg_url.js"), e = getApp();

module.exports = {
    up_visvit_num: function(i, n) {
        var a = {
            noPower: 1,
            nickName: "平安学员",
            avatarUrl: "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/default/gungun.png"
        }, r = wx.getStorageSync("wgwUserInfo") || a, c = e.coachCid;
        t.request_public({
            url: e.COACH_URL + "/MiniWeb/MiniReport",
            data: {
                cid: c,
                openid: e.currentQuestionSetting.openid,
                nickname: r.nickName,
                avatar: r.avatarUrl,
                type: i,
                content: n
            }
        }, function(t) {});
    }
};