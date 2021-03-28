var t = require("../../../utils/secToTime.js"), e = getApp();

Component({
    properties: {},
    data: {
        videoList: [],
        a: null
    },
    ready: function(t) {
        console.log(t);
    },
    methods: {
        getVideoList: function(a) {
          console.log("nanshou");
            var o = this, i = e.getApiParams();
            console.log("qq",i);
            i.car_type = e.currentQuestionSetting.car_type, i.course = a, i.limit = 20, wx.request({
                url: e.JK_BASE_URL + "/xc_v6/video/videoList?" + e.getSendUrl(i),
                method: "get",
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    console.log(e), 1 === e.data.code && (e.data.data.rows.forEach(function(e) {
                        e.total_time = t.secToTime(e.total_time);
                    }), o.setData({
                        videoList: e.data.data.rows
                    }));
                },
                fail: function(t) {}
            });
        },
        videoDetail: function(t) {
            console.log(t);
            var e = t.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/pages/_exam/particular/particular?videoId=" + e
            });
        }
    }
});