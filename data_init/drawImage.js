module.exports = {
    draw_grade_Image: function(e, t) {
        var a = wx.createCanvasContext("myCanvas");
        a.drawImage(e.grade_bg, 0, 0, 600, 480), a.save(), a.beginPath(), a.arc(136, 214, 70, 0, 2 * Math.PI), 
        a.setFillStyle("white"), a.fill(), a.restore(), a.save(), a.beginPath(), a.arc(136, 214, 60, 0, 2 * Math.PI), 
        a.setFillStyle("white"), a.fill(), a.clip(), a.drawImage(e.grade_header, 70, 154, 140, 140), 
        a.restore(), a.save(), a.setFillStyle("white"), a.setFontSize(30), a.setTextAlign("center");
        var s = t.data.userInfo.nickName;
        s = 1 * s.length > 7 ? s.substring(0, 7) + "..." : t.data.userInfo.nickName, a.fillText(s, 140, 330), 
        a.restore(), a.setFillStyle("white"), a.setFontSize(34), a.fillText(t.data.rankwa, 300, 176), 
        a.setFillStyle("white"), a.setFontSize(132), a.fillText(t.data.rankfs, 300, 320);
        var i = 0;
        switch (1 * t.data.rankfs.length) {
          case 1:
            i = 0;
            break;

          case 2:
            i = 35;
            break;

          case 3:
            i = 75;
        }
        a.setFillStyle("white"), a.setFontSize(60), a.fillText("分", 2 * (190 + i), 320), 
        a.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 600,
                height: 480,
                destWidth: 600,
                destHeight: 480,
                canvasId: "myCanvas",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    });
                }
            });
        }), setTimeout(function() {
            t.data.shareImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 600,
                height: 480,
                destWidth: 600,
                destHeight: 480,
                canvasId: "myCanvas",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    });
                }
            });
        }, 2e3);
    },
    draw_grade_poster: function(e, t) {
        function a(e, a) {
            var l = "";
            if (t.data.poster_gradeArr[e]) {
                l = 1 * t.data.poster_gradeArr[e].code >= 90 ? "#0093f0" : "#fc3670", s.setFillStyle(l), 
                s.setFontSize(18 * i), s.fillText(t.data.poster_gradeArr[e].code, 45 * i, a * i);
                var r = 0;
                switch (1 * t.data.poster_gradeArr[e].code.length) {
                  case 1:
                    r = 0;
                    break;

                  case 2:
                    r = 13;
                    break;

                  case 3:
                    r = 24;
                }
                s.setFillStyle(l), s.setFontSize(13 * i), s.fillText("分", (55 + r) * i, a * i), 
                s.setFillStyle("#121212"), s.setFontSize(14 * i), s.fillText(t.data.poster_gradeArr[e].time, 105 * i, a * i), 
                s.setFillStyle("#b3b3b3"), s.setFontSize(14 * i), s.fillText(t.data.poster_gradeArr[e].date, 185 * i, a * i), 
                s.setFillStyle(l), s.setFontSize(18 * i), s.fillText(t.data.poster_gradeArr[e].rank, 260 * i, a * i);
            }
        }
        console.log(e);
        var s = wx.createCanvasContext("myCanvas_grade_poster"), i = 2;
        s.drawImage(e.grade_poster_bg, 0, 0, 375 * i, 575 * i), s.save(), s.beginPath(), 
        s.arc(290 * i, 85 * i, 70 * i / 2, 0, 2 * Math.PI), s.setFillStyle("white"), s.setShadow(2, 2, 8, "#e6f6ff"), 
        s.fill(), s.restore(), s.save(), s.beginPath(), s.arc(290 * i, 85 * i, 60 * i / 2, 0, 2 * Math.PI), 
        s.setFillStyle("white"), s.fill(), s.clip(), s.drawImage(e.grade_poster_header, 256 * i, 55 * i, 70 * i, 70 * i), 
        s.restore(), s.save(), s.setFillStyle("black"), s.setFontSize(16 * i), s.setTextAlign("center");
        var l = t.data.userInfo.nickName;
        l = 1 * l.length > 7 ? l.substring(0, 7) + "..." : t.data.userInfo.nickName, s.fillText(l, 290 * i, 140 * i), 
        s.restore(), s.setFillStyle("white"), s.setFontSize(16 * i), s.fillText(t.data.rankwa, 45 * i, 55 * i), 
        s.setFillStyle("white"), s.setFontSize(55 * i), s.fillText(t.data.rankfs, 45 * i, 110 * i);
        var r = 0;
        switch (1 * t.data.rankfs.length) {
          case 1:
            r = 0;
            break;

          case 2:
            r = 25;
            break;

          case 3:
            r = 55;
        }
        s.setFillStyle("white"), s.setFontSize(25 * i), s.fillText("分", (85 + r) * i, 110 * i), 
        s.save(), s.setFillStyle("black"), s.setFontSize(14 * i), s.setTextAlign("center"), 
        s.fillText(t.data.addupexam + "次", 84 * i, 175 * i), s.setFillStyle("black"), s.setFontSize(14 * i), 
        s.fillText(t.data.pass + "次", 189 * i, 175 * i), s.setFillStyle("black"), s.setFontSize(14 * i), 
        s.fillText(t.data.addup_t + "题", 292 * i, 175 * i), s.restore(), a(0, 280), a(1, 330), 
        a(2, 380), s.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 375 * i,
                height: 575 * i,
                destWidth: 375 * i,
                destHeight: 575 * i,
                canvasId: "myCanvas_grade_poster",
                success: function(e) {
                    t.setData({
                        saveImgUrl: e.tempFilePath
                    });
                }
            });
        }), setTimeout(function() {
            t.data.saveImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 375 * i,
                height: 575 * i,
                destWidth: 375 * i,
                destHeight: 575 * i,
                canvasId: "myCanvas_grade_poster",
                success: function(e) {
                    t.setData({
                        saveImgUrl: e.tempFilePath
                    });
                }
            });
        }, 2e3);
    },
    draw_exam_poster: function(e, t) {
        console.log(e);
        var a = wx.createCanvasContext("myCanvas_poster");
        a.drawImage(e.exam_bg, 0, 0, 750, 1050), a.save(), a.beginPath(), a.arc(300, 160, 70, 0, 2 * Math.PI), 
        a.setFillStyle("white"), a.setShadow(0, 0, 20, "#fff5ed"), a.fill(), a.restore(), 
        a.save(), a.beginPath(), a.arc(300, 160, 60, 0, 2 * Math.PI), a.setFillStyle("white"), 
        a.fill(), a.clip(), a.drawImage(e.exam_header, 234, 100, 140, 140), a.restore();
        var s = t.data.userInfo.nickName;
        s = 1 * s.length > 7 ? s.substring(0, 7) + "..." : t.data.userInfo.nickName, a.setFillStyle("black"), 
        a.setFontSize(36), a.fillText(s, 380, 176), a.drawImage(e.exam_bottom, 74, 220, 610, 480), 
        a.setFillStyle(t.data.share_poster_color), a.setFontSize(70);
        var i = 0;
        switch (1 * t.data.allfen.length) {
          case 1:
            i = 25;
            break;

          case 2:
            i = 10;
            break;

          case 3:
            i = -10;
        }
        a.fillText(t.data.allfen, 2 * (75 + i), 518), a.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1050,
                destWidth: 750,
                destHeight: 1050,
                canvasId: "myCanvas_poster",
                success: function(e) {
                    t.setData({
                        saveImgUrl: e.tempFilePath
                    });
                }
            });
        }), setTimeout(function() {
            t.data.saveImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1050,
                destWidth: 750,
                destHeight: 1050,
                canvasId: "myCanvas_poster",
                success: function(e) {
                    t.setData({
                        saveImgUrl: e.tempFilePath
                    });
                }
            });
        }, 2e3);
    },
    draw_exam_banner: function(e, t) {
        console.log(e);
        var a = wx.createCanvasContext("myCanvas_banner");
        a.drawImage(e.exam_bottom, 0, 0, 610, 480), a.setFillStyle(t.data.share_poster_color), 
        a.setFontSize(70);
        var s = 0;
        switch (1 * t.data.allfen.length) {
          case 1:
            s = 18;
            break;

          case 2:
            s = 3;
            break;

          case 3:
            s = -18;
        }
        a.fillText(t.data.allfen, 2 * (45 + s), 300), a.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 610,
                height: 480,
                destWidth: 610,
                destHeight: 480,
                canvasId: "myCanvas_banner",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    });
                }
            });
        }), setTimeout(function() {
            t.data.shareImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 610,
                height: 480,
                destWidth: 610,
                destHeight: 480,
                canvasId: "myCanvas_banner",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    });
                }
            });
        }, 2e3);
    },
    draw_result_banner: function(e) {
        var t = wx.createCanvasContext("result_banner"), a = t.createLinearGradient(0, -100, 300, 240);
        a.addColorStop(0, "#fc9128"), a.addColorStop(1, "#fa4d4f"), t.setFillStyle(a), t.fillRect(0, 0, 600, 480), 
        t.beginPath(), t.arc(290, 240, 140, .75 * Math.PI, .25 * Math.PI), t.setLineWidth(30), 
        t.setStrokeStyle("#fa8d60"), t.setLineCap("round"), t.stroke();
        var s = "", i = "";
        0 == e.data.everyDay_error ? (i = 3, s = 100) : i = 1 * (s = 100 * ((e.data.everyDay_all - e.data.everyDay_error) / e.data.everyDay_all).toFixed(2)).toString().length;
        var l = 0;
        100 == s ? l = .25 : s < 100 && s >= 90 ? l = 0 : s < 90 && s >= 70 ? l = 1.75 : s < 70 && s > 60 ? l = 1.65 : s < 60 && s > 50 ? l = 1.6 : 50 == s ? l = 1.5 : s < 50 && s >= 30 ? l = 1.2 : s < 30 && s > 0 && (l = .9), 
        0 != s && (t.beginPath(), t.arc(290, 240, 140, .75 * Math.PI, l * Math.PI), t.setLineWidth(30), 
        t.setStrokeStyle("#ffffff"), t.setLineCap("round"), t.stroke());
        var r = 0, n = 0;
        switch (console.info("asasas", i), i) {
          case 1:
            r = 0, n = 0;
            break;

          case 2:
            r = -8, n = 12;
            break;

          case 3:
            r = -20, n = 25;
        }
        t.setFontSize(80), t.setFillStyle("white"), t.fillText(s, 2 * (125 + r), 250), t.setFontSize(32), 
        t.setFillStyle("white"), t.fillText("%", 2 * (150 + n), 250), t.setFontSize(32), 
        t.setFillStyle("white"), t.fillText("答案正确率", 216, 300), t.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 600,
                height: 480,
                destWidth: 600,
                destHeight: 480,
                canvasId: "result_banner",
                success: function(t) {
                    e.setData({
                        shareImgUrl: t.tempFilePath
                    });
                }
            });
        }), setTimeout(function() {
            e.data.shareImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 600,
                height: 480,
                destWidth: 600,
                destHeight: 480,
                canvasId: "result_banner",
                success: function(t) {
                    e.setData({
                        shareImgUrl: t.tempFilePath
                    });
                }
            });
        }, 2e3);
    },
    draw_result_share: function(e, t) {
        var a = wx.createCanvasContext("result_share");
        a.drawImage(e.result_poster_bg, 0, 0, 750, 1030), a.save(), a.beginPath(), a.arc(200, 160, 70, 0, 2 * Math.PI), 
        a.setFillStyle("white"), a.setShadow(0, 0, 10, "#fff5ed"), a.fill(), a.restore(), 
        a.save(), a.beginPath(), a.arc(200, 160, 60, 0, 2 * Math.PI), a.setFillStyle("white"), 
        a.fill(), a.clip(), a.drawImage(e.result_poster_header, 134, 100, 140, 140), a.restore(), 
        a.setFontSize(32), a.setFillStyle("black"), a.fillText(t.data.userInfo.nickName, 300, 140), 
        a.beginPath(), a.setLineCap("round"), a.setStrokeStyle("#fb6442"), a.fill(), a.setLineWidth(50), 
        a.moveTo(320, 190), a.lineTo(640, 190), a.stroke(), a.setFontSize(28), a.setFillStyle("#ffffff"), 
        a.fillText("已练习" + t.data.afterall + "道科目" + (1 == getApp().currentQuestionSetting.course ? "一" : "四") + "考题", 320, 200), 
        a.beginPath(), a.arc(380, 460, 140, .75 * Math.PI, .25 * Math.PI), a.setLineWidth(30), 
        a.setStrokeStyle("#fee8e3"), a.setLineCap("round"), a.stroke();
        var s = "", i = "";
        0 == t.data.everyDay_error ? (i = 3, s = 100) : i = 1 * (s = 100 * ((t.data.everyDay_all - t.data.everyDay_error) / t.data.everyDay_all).toFixed(2)).toString().length;
        var l = 0;
        100 == s ? l = .25 : s < 100 && s >= 90 ? l = 0 : s < 90 && s >= 70 ? l = 1.75 : s < 70 && s > 60 ? l = 1.65 : s < 60 && s > 50 ? l = 1.6 : 50 == s ? l = 1.5 : s < 50 && s >= 30 ? l = 1.2 : s < 30 && s > 0 && (l = .9), 
        0 != s && (a.beginPath(), a.arc(380, 460, 140, .75 * Math.PI, l * Math.PI), a.setLineWidth(30), 
        a.setStrokeStyle("#fb6442"), a.setLineCap("round"), a.stroke());
        var r = 0, n = 0;
        switch (i) {
          case 1:
            r = 0, n = 0;
            break;

          case 2:
            r = -8, n = 12;
            break;

          case 3:
            r = -20, n = 25;
        }
        a.setFontSize(80), a.setFillStyle("#fa5e41"), a.fillText(s, 2 * (170 + r), 470), 
        a.setFontSize(32), a.setFillStyle("#fa5e41"), a.fillText("%", 2 * (195 + n), 470), 
        a.setFontSize(32), a.setFillStyle("#fa5e41"), a.fillText("答案正确率", 300, 520), a.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1030,
                destWidth: 750,
                destHeight: 1030,
                canvasId: "result_share",
                success: function(e) {
                    console.log(e), t.setData({
                        saveImgUrl: e.tempFilePath
                    });
                }
            });
        }), setTimeout(function() {
            t.data.saveImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1030,
                destWidth: 750,
                destHeight: 1030,
                canvasId: "result_share",
                success: function(e) {
                    t.setData({
                        saveImgUrl: e.tempFilePath
                    });
                }
            });
        }, 2e3);
    },
    draw_vote_poster: function(e, t) {
        var a = wx.createCanvasContext("vote_poster");
        console.log(e.circle_bg), a.drawImage(e.circle_bg, 0, 0, 750, 1206), a.setFillStyle("#ef4a4a"), 
        a.setFontSize(40), a.setTextAlign("center"), a.fillText(t.data.city_name, 370, 150), 
        a.save(), a.beginPath(), a.arc(370, 520, 60, 0, 2 * Math.PI), a.setFillStyle("white"), 
        a.fill(), a.clip(), a.drawImage(e.header, 304, 460, 140, 140), a.restore();
        var s = t.data.coachMsg.nick;
        s = 1 * s.length > 7 ? s.substring(0, 7) + "..." : t.data.coachMsg.nick, a.save(), 
        a.setFillStyle("black"), a.setFontSize(32), a.setTextAlign("center"), a.fillText(s, 370, 640), 
        a.restore(), a.setFillStyle("#666666"), a.setFontSize(26), a.setTextAlign("center"), 
        a.fillText(t.data.coachMsg.phone + " | " + t.data.coachMsg.school, 370, 700), a.restore(), 
        a.drawImage(e.pcode, 510, 852, 160, 160), a.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1206,
                destWidth: 750,
                destHeight: 1206,
                canvasId: "vote_poster",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    });
                }
            });
        }), setTimeout(function() {
            t.data.shareImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1206,
                destWidth: 750,
                destHeight: 1206,
                canvasId: "vote_poster",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    });
                }
            });
        }, 2e3);
    },
    draw_vote_Image: function(e, t) {
        var a = wx.createCanvasContext("friend_bg");
        a.drawImage(e.friend_bg, 0, 0, 600, 480), a.save(), a.beginPath(), a.arc(300, 110, 62, 0, 2 * Math.PI), 
        a.setFillStyle("white"), a.setShadow(0, 0, 10, "white"), a.fill(), a.restore(), 
        a.save(), a.beginPath(), a.arc(300, 110, 60, 0, 2 * Math.PI), a.setFillStyle("white"), 
        a.fill(), a.clip(), a.drawImage(e.header, 232, 44, 140, 140), a.restore(), a.save();
        var s = t.data.coachMsg.nick;
        s = 1 * s.length > 7 ? s.substring(0, 7) + "..." : t.data.coachMsg.nick, a.save(), 
        a.setFillStyle("#333333"), a.setFontSize(40), a.setTextAlign("center"), a.fillText(s, 300, 320), 
        a.setFillStyle("#5b4c30"), a.setFontSize(36), a.setTextAlign("center"), a.fillText(t.data.coachMsg.school, 300, 370), 
        a.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 600,
                height: 480,
                destWidth: 600,
                destHeight: 480,
                canvasId: "friend_bg",
                success: function(e) {
                    t.setData({
                        bannerImgUrl: e.tempFilePath
                    });
                }
            });
        }), setTimeout(function() {
            t.data.bannerImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 600,
                height: 480,
                destWidth: 600,
                destHeight: 480,
                canvasId: "friend_bg",
                success: function(e) {
                    t.setData({
                        bannerImgUrl: e.tempFilePath
                    });
                }
            });
        }, 2e3);
    },
    draw_lsj_Image: function(e, t, a) {
        var s = wx.createCanvasContext("lsjCircle");
        s.drawImage(e.share_bg, 0, 0, 580, 900);
        var i = e.nickname, l = 207;
        1 * i.length > 4 ? (i = i.substring(0, 4) + "...", l = 212) : i = i;
        var r = "考生" + i + "，理论考试", n = e.score + "分";
        s.save(), s.setFillStyle("#333333"), s.setFontSize(22), s.setTextAlign("center"), 
        s.fillText(r, 260, 190), s.setFillStyle("#f00202"), s.setFontSize(22), s.setTextAlign("center"), 
        s.fillText(n, 2 * l, 190), s.drawImage(e.share_banner, 0, 200, 580, 426), s.drawImage(e.share_code, 400, 696, 100, 100), 
        s.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 580,
                height: 900,
                destWidth: 580,
                destHeight: 900,
                canvasId: "lsjCircle",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    }), a(e.tempFilePath);
                }
            });
        }), setTimeout(function() {
            t.data.shareImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 580,
                height: 900,
                destWidth: 580,
                destHeight: 900,
                canvasId: "lsjCircle",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    }), a(e.tempFilePath);
                }
            });
        }, 2e3);
    },
    draw_lsj_friend: function(e, t, a) {
        var s = wx.createCanvasContext("lsjFriend");
        s.drawImage(e.coach_bg, 0, 0, 600, 480), s.save(), s.beginPath(), s.arc(300, 240, 65, 0, 2 * Math.PI), 
        s.setFillStyle("white"), s.fill(), s.restore(), s.save(), s.beginPath(), s.arc(300, 240, 60, 0, 2 * Math.PI), 
        s.setFillStyle("white"), s.fill(), s.clip(), s.drawImage(e.coach_header, 234, 180, 140, 140), 
        s.restore(), s.setFillStyle("#1a1c1e"), s.setFontSize(36), s.setTextAlign("center"), 
        s.fillText("今日题库由", 300, 360);
        var i = "「" + e.coach_nick + "」提供";
        s.setFillStyle("#1a1c1e"), s.setFontSize(36), s.setTextAlign("center"), s.fillText(i, 300, 420), 
        s.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 600,
                height: 480,
                destWidth: 600,
                destHeight: 480,
                canvasId: "lsjFriend",
                success: function(e) {
                    console.log(e), t.setData({
                        friendImgUrl: e.tempFilePath
                    }), a(e.tempFilePath);
                }
            });
        }), setTimeout(function() {
            t.data.friendImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 600,
                height: 480,
                destWidth: 600,
                destHeight: 480,
                canvasId: "lsjFriend",
                success: function(e) {
                    t.setData({
                        friendImgUrl: e.tempFilePath
                    }), a(e.tempFilePath);
                }
            });
        }, 2e3);
    },
    draw_lsj_new_banner: function(e, t, a) {
        var s = wx.createCanvasContext("lsjNewCircle");
        s.drawImage(e.share_bg, 0, 0, 580, 878);
        var i = e.nickname;
        i.length > 15 && (i = i.substring(0, 15) + "..."), i += "：", s.save(), s.setFillStyle("#333333"), 
        s.setFontSize(24), s.fillText(i, 86, 400), s.save(), s.setFillStyle("#333333"), 
        s.setFontSize(24), s.setTextAlign("left"), s.fillText("理论考试100分，分得", 86, 450), s.save(), 
        s.setFillStyle("#cf1a16"), s.setFontSize(24), s.setTextAlign("center"), s.fillText(e.money, 356, 450), 
        s.save(), s.setFillStyle("#333333"), s.setFontSize(24), s.setTextAlign("left"), 
        s.fillText("元奖学金", 390, 450), s.drawImage(e.share_code, 400, 678, 98, 98), s.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 580,
                height: 878,
                destWidth: 580,
                destHeight: 878,
                canvasId: "lsjNewCircle",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    }), a(e.tempFilePath);
                }
            });
        }), setTimeout(function() {
            t.data.shareImgUrl || wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 580,
                height: 878,
                destWidth: 580,
                destHeight: 878,
                canvasId: "lsjNewCircle",
                success: function(e) {
                    t.setData({
                        shareImgUrl: e.tempFilePath
                    }), a(e.tempFilePath);
                }
            });
        }, 2e3);
    }
};