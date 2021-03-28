function n(n) {
    return "&" != n && (n = n.replace("sign=", "")), e.hex_md5(t + e.hex_md5(n) + o);
}

var e = require("./md5.js"), o = "kl7q4hlsduW7jRidghadM0kXly65kPhstn", t = "kBu7703wjhs7l8SHM89kxelX73jcTsYq";

module.exports = {
    buildGetUrlWithSign: function(e) {
        var o = n((e = Object.keys(e).map(function(n) {
            return encodeURIComponent(n) + "=" + encodeURIComponent(e[n]);
        }).join("&")) + "&sign=");
        return e + "&sign=" + o;
    },
    buildPostUrlWithSign: function(i, r) {
        var r = Object.keys(r).map(function(n) {
            return encodeURIComponent(n) + "=" + encodeURIComponent(r[n]);
        }).join("&"), p = {
            app: "WxLittleApp",
            appVersion: "6.8.7",
            appChannel: "wx"
        }, u = (p = Object.keys(p).map(function(n) {
            return encodeURIComponent(n) + "=" + encodeURIComponent(p[n]);
        }).join("&")) + "&", c = n(u), d = r, s = e.hex_md5(t + e.hex_md5(d) + o);
        return i + "?" + u + "sign=" + e.hex_md5(s + c);
    }
};