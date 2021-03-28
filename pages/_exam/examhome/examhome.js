
Page({

  data: {
    passf: 0,
    time: 0,
    num: 0,
    everyf: 1,
    use_title: "",
    training_qids: ""
  },


  onLoad: function (e) {
    var t = this, n = getApp().getApiParams();
    console.log(n)
    wx.showLoading({
      title: "加载中"
    }), wx.request({
      url: getApp().JK_BASE_URL + "/xc_v6/jktWxapp/courseExamInit?" + getApp().getSendUrl(n),
      header: {
        "content-type": "application/json"
      },
      method: "get",
      success: function (e) {
        e.data.code && (wx.hideLoading(), t.setData({
          passf: e.data.data.pass_score,
          time: e.data.data.exam_full_mins,
          num: e.data.data.question_num,
          use_title: e.data.data.use_title
        }));
      }
    });
  },
  examGo:function (e) {
    var t = this;
    if(!t.data.time) return wx.showLoading({
      title: "考题读取中",
    }),void setTimeout(function () {
      wx.hideLoading();
    }, 999);
    var n = "examind" + getApp().currentQuestionSetting.course, i = wx.getStorageSync(n) ? wx.getStorageSync(n) + 1 : "", a = "exam_up" + getApp().currentQuestionSetting.course, o = wx.getStorageSync(a) || "";
    console.log(i)
    console.log(a)
    console.log(o)

    !o && i ? wx.showModal({
      title: "",
      cancelText: "重新考试",
      confirmText: "继续答题",
      content: "上次考试您已经做到第" + i + "题,重新考试答题记录会丢失~",
      success:function(n){
        if (console.log(n), n.confirm) {
          var i = wx.getStorageSync("time" + getApp().currentQuestionSetting.course);
          wx.redirectTo({
            url: "../exam/exam?continued=1&passf=" + t.data.passf + "&time=" + (i - 1) + "&training_qids=0&nums=" + t.data.num
          });
        } else t.change_continue(e);
      }
    }):t.change_continue(e)

  },

  change_continue:function (e){
    var t = this;
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
    }), wx.removeStorage({
      key: "intensify_noids" + getApp().currentQuestionSetting.course
    }), wx.removeStorage({
      key: "intensify_okids" + getApp().currentQuestionSetting.course
    }), wx.removeStorage({
      key: "exam_up" + getApp().currentQuestionSetting.course
    }), "0" == e.currentTarget.dataset.ind ? wx.redirectTo({
      url: "../exam/exam?passf=" + t.data.passf + "&time=" + (t.data.time - 1) + "&training_qids=0&nums=" + t.data.num
    }) : wx.redirectTo({
      url: "../exam/exam?passf=" + t.data.passf + "&time=" + (t.data.time - 1) + "&training_qids=" + t.data.training_qids + "&nums=" + t.data.num
    });
  },

  onReady: function () {

  },

  onShow: function () {

  },
})