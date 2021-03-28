module.exports = {
    _repeat_getInit: function(e) {
        this._repeat_getTraining_qids(e);
        var t = getApp().getApiParams();
        wx.request({
            url: getApp().JK_BASE_URL + "/xc_v6/jktWxapp/courseExamInit?" + getApp().getSendUrl(t),
            header: {
                "content-type": "application/json"
            },
            method: "get",
            success: function(t) {
                t.data.code && e.setData({
                    _repeat_passf: t.data.data.pass_score,
                    _repeat_time: t.data.data.exam_full_mins,
                    _repeat_num: t.data.data.question_num,
                    _repeat_use_title: t.data.data.use_title
                });
            }
        });
    },
    _repeat_getTraining_qids: function(e) {
        wx.getStorage({
            key: "order" + getApp().currentQuestionSetting.course,
            success: function(t) {
                var a = "";
                for (var r in t.data) a += r + ",";
                e.setData({
                    _repeat_training_qids: a
                });
            }
        }), wx.getStorage({
            key: "training_qids" + getApp().currentQuestionSetting.course,
            success: function(t) {
                e.setData({
                    _repeat_training_qids: e.data.training_qids + "" + t.data
                });
            }
        });
    },
    _repeat_examGo: function(e) {
        if (!e.data._repeat_time) return wx.showLoading({
            title: "考题读取中"
        }), void setTimeout(function() {
            wx.hideLoading();
        }, 999);
        wx.removeStorage({
            key: "exam" + getApp().currentQuestionSetting.course
        }), wx.removeStorage({
            key: "examlist" + getApp().currentQuestionSetting.course
        }), wx.removeStorage({
            key: "examind" + getApp().currentQuestionSetting.course
        }), wx.removeStorage({
            key: "examids" + getApp().currentQuestionSetting.course
        }), wx.removeStorage({
            key: "examall" + getApp().currentQuestionSetting.course
        }), wx.redirectTo({
            url: "../exam/exam?passf=" + e.data._repeat_passf + "&time=" + (e.data._repeat_time - 1) + "&training_qids=0&nums=" + e.data._repeat_num
        });
    }
};