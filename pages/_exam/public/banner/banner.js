Component({
    properties: {},
    data: {
        show: !1,
        messageData: {}
    },
    ready: function() {
        var s = this;
        this.get_user(function(e) {
            s.get_list(e);
        });
    },
    methods: {
        get_user: function(s) {
            wx.getSystemInfo({
                success: function(e) {
                    console.info("不行", e), s(e);
                }
            });
        },
        get_list: function(s) {
            var e = this, t = {};
            t.model = s.model, t.brand = s.brand, t.appChannel = "wx", t.os = s.platform, t.height = s.screenHeight, 
            t.width = s.screenWidth, t.systemVersion = s.system, t.zoneIds = "1353", wx.request({
                url: "https://msg.eclicks.cn/msg/supplier/msgs",
                data: t,
                success: function(s) {
                    console.info("1353", s.data.data), "EMPTY" != s.data.data[1353].message ? (e.setData({
                        show: !0,
                        messageData: s.data.data[1353]
                    }), console.info("试试", s.data.data[1353])) : e.setData({
                        show: !1
                    });
                },
                fail: function(s) {
                    console.info("失败", s);
                }
            });
        },
        go_to_other: function() {
            var s = this.data.messageData.supplierAdvert.clickUrls;
            if (s.length > 0) for (i = 0; i < s.length; i++) s[i].indexOf("https") > -1 && wx.request({
                url: s[i]
            });
            var e = this.data.messageData.openURL, t = "", a = "", n = {}, o = "";
            if ((e = e.substr(5)).indexOf("/") > -1) {
                if (t = e.substr(0, e.indexOf("/")), a = e.substr(e.indexOf("/")), o = e.substr(e.indexOf("/")), 
                "/" == a) a = ""; else if (o.indexOf("?") > -1) {
                    o = (o = o.split("?")[1]).split("&");
                    for (var i = 0; i < o.length; i++) n[o[i].split("=")[0]] = o[i].split("=")[1];
                }
            } else t = e;
            console.info("appid", t), console.info("path", a), console.info("_obj", n), setTimeout(function() {
                wx.navigateToMiniProgram({
                    appId: t,
                    path: a,
                    extraData: n,
                    envVersion: "release",
                    success: function(s) {
                        console.info("跳转成功");
                    }
                });
            }, 300);
        }
    }
});