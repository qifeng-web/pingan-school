var t = {
    testMode: !1,
    serverTestMode: !1,
    appVersion: "7.0.2",
    xcxVersion: "1.0.7",
    COACH_URL: "http://dev.cjjl.chelun.com",
    COACH_URL_OTHER: "http://app2.chaojijiaolian.cn.chelun.com",
    JK_BASE_URL: "https://kaojiazhao.eclicks.cn",
    pass_port: "https://passport.chelun.com/",
    PAY_URL: "http://pay-test.chelun.com",
    REM_URL: "http://remapi-test.chelun.com"
}, i = {
    app: "WxLittleApp",
    appChannel: "wx",
    appVersion: t.appVersion,
    xcxVersion: t.xcxVersion
};

t.serverTestMode ? (t.COACH_URL = "http://dev.cjjl.chelun.com", t.JK_BASE_URL = "http://kjzdev.eclicks.cn/kaojiazhao2", 
t.pass_port = "http://passport-test.chelun.com/", t.COACH_URL_OTHER = "http://app2.chaojijiaolian.cn.chelun.com", 
t.PAY_URL = "http://pay-test.chelun.com", t.REM_URL = "http://remapi-test.chelun.com") : (t.COACH_URL = "https://cjjl.chelun.com", 
t.JK_BASE_URL = "https://kaojiazhao.eclicks.cn", t.pass_port = "https://passport.chelun.com/", 
t.COACH_URL_OTHER = "https://app2.chaojijiaolian.cn", t.PAY_URL = "https://pay.chelun.com", 
t.REM_URL = "https://lkapi.chelun.com");

var o = {
    1: {
        1: "https://picture.eclicks.cn/kaojiazhao/400/course1/kg/kg_nodown.html",
        2: "https://picture.eclicks.cn/kaojiazhao/400/course1/kg/kg_nodown.html",
        4: "https://picture.eclicks.cn/kaojiazhao/400/course1/kg/kg_nodown.html",
        8: "https://picture.eclicks.cn/kaojiazhao/400/motobike/course1/kg/kg_nodown.html",
        16: "https://picture.eclicks.cn/kaojiazhao/400/zgz/czczgzkg_nodown.html",
        32: "https://picture.eclicks.cn/kaojiazhao/400/zgz/hyzgzkg_nodown.html",
        64: "https://picture.eclicks.cn/kaojiazhao/400/zgz/jlzgzkg_nodown.html",
        128: "https://picture.eclicks.cn/kaojiazhao/400/zgz/kyzgzkg_nodown.html",
        256: "https://picture.eclicks.cn/kaojiazhao/400/zgz/wxpzgzkg_nodown.html"
    },
    v2: {
        1: "https://picture.eclicks.cn/kaojiazhao/400/course2/kg/xiaoche_nodown.html",
        2: "https://picture.eclicks.cn/kaojiazhao/400/course2/kg/dache_nodown.html",
        4: "https://picture.eclicks.cn/kaojiazhao/400/course2/kg/dache_nodown.html",
        8: "https://picture.eclicks.cn/kaojiazhao/400/motobike/course2/kg/kg_nodown.html"
    },
    v3: {
        1: "https://picture.eclicks.cn/kaojiazhao/400/course3/kg/xiaoche_nodown.html",
        2: "https://picture.eclicks.cn/kaojiazhao/400/course3/kg/dache_nodown.html",
        4: "https://picture.eclicks.cn/kaojiazhao/400/course3/kg/dache_nodown.html",
        8: "https://picture.eclicks.cn/kaojiazhao/400/motobike/course3/kg/kg_nodown.html"
    },
    3: {
        1: "https://picture.eclicks.cn/kaojiazhao/400/course4/kg/kg_nodown.html",
        2: "https://picture.eclicks.cn/kaojiazhao/400/course4/kg/kg_nodown.html",
        4: "https://picture.eclicks.cn/kaojiazhao/400/course4/kg/kg_nodown.html",
        8: "https://picture.eclicks.cn/kaojiazhao/400/motobike/course4/kg/kg_nodown.html"
    }
}, c = {
    v2: {
        1: "https://picture.eclicks.cn/kaojiazhao/400/course2/mj/index_nodown.html",
        2: "https://picture.eclicks.cn/kaojiazhao/400/course2/mj/index_nodown.html",
        4: "https://picture.eclicks.cn/kaojiazhao/400/course2/mj/index_nodown.html",
        8: "https://picture.eclicks.cn/kaojiazhao/400/motobike/course2/mj/index_nodown.html"
    },
    v3: {
        1: "https://picture.eclicks.cn/kaojiazhao/400/course3/mj/index_nodown.html",
        2: "https://picture.eclicks.cn/kaojiazhao/400/course3/mj/index_nodown.html",
        4: "https://picture.eclicks.cn/kaojiazhao/400/course3/mj/index_nodown.html",
        8: "https://picture.eclicks.cn/kaojiazhao/400/motobike/course2/mj/index_nodown.html"
    }
}, e = {
    v2: {
        h5: "https://picture.eclicks.cn/kaojiazhao/400/jiqiao_html5",
        jq: [ {
            title: "?????????",
            image: "skill_aqd",
            url: "anquandai",
            tid: "158718"
        }, {
            title: "????????????",
            image: "skill_dhkg",
            url: "dianhuokaiguan",
            tid: "158719"
        }, {
            title: "?????????",
            image: "skill_fxp",
            url: "fangxiangpan",
            tid: "158720"
        }, {
            title: "?????????",
            image: "skill_lhq",
            url: "liheqi",
            tid: "158721"
        }, {
            title: "????????????",
            image: "skill_jstb",
            url: "jiasutaban",
            tid: "158722"
        }, {
            title: "????????????",
            image: "skill_zdtb",
            url: "zhidongtaban",
            tid: "158723"
        }, {
            title: "????????????",
            image: "skill_zczd",
            url: "zhuchezhidong",
            tid: "158724"
        }, {
            title: "????????????",
            image: "skill_zytz",
            url: "zuoyitiaozheng",
            tid: "158725"
        }, {
            title: "?????????",
            image: "skill_hsj",
            url: "houshijing",
            tid: "158726"
        }, {
            title: "????????????",
            image: "skill_jyjq",
            url: "jingyanjiqiao",
            tid: "158728"
        } ]
    },
    v3: {
        h5: "https://picture.eclicks.cn/kaojiazhao/400/jiqiao_html5",
        jq: [ {
            title: "????????????",
            image: "skill_cjpd",
            url: "chejupanduan",
            tid: "156748"
        }, {
            title: "????????????",
            image: "skill_dwcz",
            url: "dangweicaozuo",
            tid: "156750"
        }, {
            title: "??????",
            image: "skill_dg",
            url: "dengguang",
            tid: "156751"
        }, {
            title: "??????",
            image: "skill_zx",
            url: "zhixing",
            tid: "156752"
        }, {
            title: "????????????",
            image: "skill_jyjq",
            url: "jingyanjiqiao3",
            tid: "156753"
        } ]
    }
};

module.exports = {
    getApiParams: i,
    config: t,
    ruleUrls: o,
    mj: c,
    jq: e
};