var t = require("./intensify.js");

module.exports = {
    get_new_intensify: function(i, r) {
        var e = getApp().currentQuestionSetting.course, s = getApp().currentQuestionSetting.car_type.toString(), l = [];
        t.forEach(function(t, i) {
            var r = {};
            t.hasOwnProperty("course_" + e) && t["course_" + e].hasOwnProperty(s) && t["course_" + e][s] && (r.title = t.title, 
            r.subject_id = t.subject_id, r["course_" + e] = {}, r["course_" + e][s] = t["course_" + e][s].split(","), 
            l.push(r));
        });
        var o = {}, n = Array.isArray(i.error_ids) ? i.error_ids : i.error_ids.split(","), _ = Array.isArray(i.correct_ids) ? i.error_ids : i.correct_ids.split(","), c = n.concat(_);
        o.error_ids = n, o.correct_ids = _, o.all_ids = c, o.list = {}, l.forEach(function(t, i) {
            c.forEach(function(i, r) {
                -1 != t["course_" + e][s].indexOf(i) && (o.list.hasOwnProperty(t.title) ? o.list[t.title].ids.push(i) : (o.list[t.title] = {}, 
                o.list[t.title].title = t.title, o.list[t.title].ids = [ i ], o.list[t.title].error_ids = []));
            }), n.forEach(function(i, r) {
                -1 != t["course_" + e][s].indexOf(i) && (o.list.hasOwnProperty(t.title) ? o.list[t.title].error_ids.push(i) : (o.list[t.title] = {}, 
                o.list[t.title].title = t.title, o.list[t.title].error_ids = [ i ], o.list[t.title].ids = [ i ]));
            });
        });
        var u = 0;
        o.max_name = "", o.max_nums = 0;
        var a = 0, d = 0;
        for (var p in o.list) u < o.list[p].error_ids.length && (u = o.list[p].error_ids.length, 
        o.max_name = p, o.max_nums = u), o.list[p].bili = parseInt(o.list[p].error_ids.length / o.list[p].ids.length * 100), 
        o.list[p].bili <= 10 ? (a++, o.ok_num = a) : (d++, o.no_num = d);
        r(o);
    }
};