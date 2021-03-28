var t = getApp();

Page({
    data: {
        video: null,
        videoTopics: null,
        stepList: [],
        startTime: -1,
        endTime: -1,
        currentTime: 0
    },
    onReady: function(t) {
        this.videoContext = wx.createVideoContext("video");
    },
    onLoad: function(t) {
        console.log(t);
        var e = t.videoId;
        this.getVideoDetail(e), this.getVideoTopics(e);
    },
    videotimeupdate: function(t) {
        console.log(t);
        var e = Math.floor(t.detail.currentTime);
        this.setData({
            currentTime: e
        });
    },
    seekStep: function(t) {
        console.log(t), this.setData({
            startTime: t.currentTarget.dataset.starttime,
            endTime: t.currentTarget.dataset.endtime
        }), this.videoContext.seek(t.currentTarget.dataset.starttime), this.videoContext.play();
    },
    getVideoDetail: function(e) {
        var a = this, i = this;
        wx.showLoading({
            title: "加载中"
        });
        var o = t.getApiParams();
        o.id = e, wx.request({
            url: t.JK_BASE_URL + "/xc_v6/video/videoDetail?" + t.getSendUrl(o),
            method: "get",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), 1 === t.data.code && (i.setData({
                    video: t.data.data,
                    stepList: t && t.data && t.data.data && t.data.data.step_list ? t.data.data.step_list : []
                }), console.log(a.data.stepList)), wx.hideLoading();
            },
            fail: function(t) {
                wx.hideLoading();
            }
        });
    },
    getVideoTopics: function(e) {
        var a = this, i = t.getApiParams();
        i.vid = e, wx.request({
            url: t.JK_BASE_URL + "/xc_v1/System/videoTopics?" + t.getSendUrl(i),
            method: "get",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), 1 === t.data.code && (a.setData({
                    videoTopics: t.data.data ? t.data.data : null
                }), console.log(a.data.videoTopics));
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    mjDetails: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.title, a = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: "../public/webview/webview?title=" + e + "&url=" + encodeURIComponent(a)
        });
    },
    onShareAppMessage: function() {
        return {
            title: "平安驾考",
            path: "pages/_exam/particular/particular?videoId=" + this.data.video.id
        };
    }
});