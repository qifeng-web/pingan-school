function e(e,r){
  console.log(e)
  wx.u.getQuestionUrl(e,r).then(res=>{
    console.log(res)
    wx.request({
      url: res.result.questionUrl,
      success: function (c) {
        console.log(c.statusCode)
        if (200 == c.statusCode) {
          var u = c.data;
          if (u.data) {
            var i = u.data, n = i.question_list || [], a = i.question_ids || [], d = o(e, r);
            wx.setStorage({
              key: d,
              data: n,
              complete: function () {
                d = s(e, r)
                wx.setStorage({
                  key: d,
                  data: a,
                  complete: function () {
                    t(e, r);
                  }
                })
              }
            })
          }
        }
      }
    })
  })
}
function r(e,t,r,o){

}
function s(e, t) {
  return "qid_cartype_" + e + "_course_" + t;
}
function t(e, t) {
  for (var r = wx.getStorageSync(o(e, t)), u = wx.getStorageSync(s(e, t)), i = wx.getStorageSync(c(e, t)), n = {}, _ = 0; _ < r.length; _++) {
    var g = r[_];
    n[g.question_id] = g;
  }
  a["course" + t] = n, d["course" + t] = u, p["course" + t] = i;
}
function o(e, t) {
  return "q_cartype_" + e + "_course_" + t;
}
function c(e, t) {
  return "chapter_cartype_" + e + "_course_" + t;
}
function i(e){
  return "course"+e;
}
var n = require("./underscore-min.js"), a = {
  course1: {},
  course3: {}
},d= {
  course1: [],
  course3: []
},p = {
  course1:[],
  course3:[]
}

module.exports = {
  initQuestions: e,
  questions: a,
  chapters:p,
  questionIds:d,
  refreshQuestionIfNeeded:function(t){
    a.course1 && !n.isEmpty(a.course1) && d.course1 && d.course1.length > 0 || e(t,1),
    a.course3 && !n.isEmpty(a.course3) && d.course3 && d.course3.length > 0 || e(t,3)
  },
  getQuestionsByIds: function (e, t) {
    var r = a["course" + e], o = [], s = [];
    s = n.isArray(t) ? t : t.split(",");
    for (var c = 0; c < s.length; c++) {
      var u = s[c];
      r[u] && o.push(n.clone(r[u]));
     
    }
    console.log(r)
    return o;
  },
  initAllQuestionFromStorage: function (e) {
    t(e, 1), t(e, 3);
  },
}