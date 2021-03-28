var t = require("./question.js"),
  a = function() {};

a.prototype = {
  init: function(t, e, a) {
    var i = this;
    Object.keys(e).length ? wx.getStorage({
      key: "init",
      success: function(i) {
        wx.setStorage({
          key: "init",
          data: {
            car_type: i.data.car_type,
            subject: e.appshare_tap || e.appshare_course || i.data.subject,
            car_text: i.data.car_text
          }
        }), t.startInit(), a(Object.assign({
          code: 1
        }, e));
      },
      fail: function() {
        i._getlocationData(t, e, a);
      }
    }) : (t.startInit(), a(Object.assign({
      code: 1
    }, e)));
  },
  _getlocationData: function(t, a, i) {
    var c = this;
    getApp().currentQuestionSetting.car_type_title = "小车", c.setStorage(a.appshare_tap, e),
      c.questionData(1), t.startInit(), i(Object.assign({
        code: 1
      }, a));
  },
  setStorage:function(t,e){
    wx.setStorage({
      key: "init",
      data: {
        car_type: 1,
        car_text: "小车",
        subject: t || 1
      }
    });
  },
  questionsData:function(e){
    t.initQuestions(e, 1), 1 * e > 8 || (t.initQuestions(e, 3));
  }
}, module.exports = new a();