module.exports = {
    handelShowShareImg: function(e, t, n) {
        wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(n) {
                wx.hideLoading(), setTimeout(function() {
                    e._fn_alertShow();
                }, 1500);
            },
            fail: function(e) {
                wx.showToast({
                    title: "保存失败",
                    image: n || "/images/q_answer_sheet_wrong.png",
                    duration: 1500,
                    mask: !1
                });
            }
        });
    },
    getLocalImagePath: function(e) {
        return new Promise(function(t, n) {
            wx.getImageInfo({
                src: e,
                success: function(e) {
                    t(e.path), console.log(e.path);
                },
                fail: function(e) {
                    n(e), console.log(e);
                }
            });
        });
    },
    request_public: function(e, t) {
        wx.request({
            url: e.url,
            header: {
                "content-type": "application/json"
            },
            data: e.data,
            success: function(e) {
                t({
                    result: 1,
                    res: e
                });
            },
            fail: function(e) {
                t({
                    result: 0,
                    res: e
                });
            }
        });
    }
};