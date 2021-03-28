function e(e, r, c, n) {
    var a = u.getApiParams;
    a.car_type = e || a.car_type, a.course = r || a.course, a.city_id = c || a.city_id, 
    a.mode = n || a.mode || 1, wx.request({
        url: u.config.JK_BASE_URL + "/xc_v6/jktWxapp/getQuestionsByMode?" + i.buildGetUrlWithSign(a),
        header: {
            "content-type": "application/json"
        },
        method: "get",
        success: function(c) {
            if (200 == c.statusCode) {
                var u = c.data;
                if (1 == u.code && u.data) {
                    var i = u.data, n = i.question_list || [], a = i.question_ids || [], d = o(e, r);
                    wx.setStorage({
                        key: d,
                        data: n,
                        complete: function() {
                            d = s(e, r), wx.setStorage({
                                key: d,
                                data: a,
                                complete: function() {
                                    t(e, r);
                                }
                            });
                        }
                    });
                }
            }
        },
        fail: function(e) {}
    });
}

function t(e, t) {
    for (var r = wx.getStorageSync(o(e, t)), u = wx.getStorageSync(s(e, t)), i = wx.getStorageSync(c(e, t)), n = {}, _ = 0; _ < r.length; _++) {
        var g = r[_];
        n[g.question_id] = g;
    }
    a["course" + t] = n, d["course" + t] = u, p["course" + t] = i;
}

function r(e, t, r, o) {
    var s = u.getApiParams;
    s.car_type = e || s.car_type, s.course = t || s.course, s.city_id = r || s.city_id, 
    s.mode = o || s.mode, wx.request({
        url: u.config.JK_BASE_URL + "/xc_v6/jktWxapp/getChapterList?" + i.buildGetUrlWithSign(s),
        header: {
            "content-type": "application/json"
        },
        method: "get",
        success: function(r) {
            if (200 == r.statusCode) {
                var o = r.data;
                if (1 == o.code && o.data) {
                    var s = o.data;
                    console.log(s);
                    var u = c(e, t);
                    wx.setStorage({
                        key: u,
                        data: s
                    }), p["course" + t] = s;
                }
            }
        },
        fail: function(e) {}
    });
}

function o(e, t) {
    return "q_cartype_" + e + "_course_" + t;
}

function s(e, t) {
    return "qid_cartype_" + e + "_course_" + t;
}

function c(e, t) {
    return "chapter_cartype_" + e + "_course_" + t;
}

var u = require("./constants.js"), i = require("./BaseApi.js"), n = require("./underscore-min.js"), a = {
    course1: {},
    course3: {}
}, d = {
    course1: [],
    course3: []
}, p = {
    course1: [],
    course3: []
};

module.exports = {
    initQuestions: e,
    initAllQuestionFromStorage: function(e) {
        t(e, 1), t(e, 3);
    },
    initChapters: r,
    refreshQuestionIfNeeded: function(t, o) {
        a.course1 && !n.isEmpty(a.course1) && d.course1 && d.course1.length > 0 || e(t, 1, o), 
        a.course3 && !n.isEmpty(a.course3) && d.course3 && d.course3.length > 0 || e(t, 3, o), 
        p.course1 && p.course1.length > 0 || r(t, 1, o), p.course3 && p.course3.length > 0 || r(t, 3, o);
    },
    getQuestionsByIds: function(e, t) {
        var r = a["course" + e], o = [], s = [];
        s = n.isArray(t) ? t : t.split(",");
        for (var c = 0; c < s.length; c++) {
            var u = s[c];
            r[u] && o.push(n.clone(r[u]));
        }
        return o;
    },
    questions: a,
    questionIds: d,
    chapters: p
};