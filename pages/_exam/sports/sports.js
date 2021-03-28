Page({
    data: {
        template_data: [ {
            title: "答题技巧",
            summary: "教练总结，让你事半功倍",
            articles: [ {
                title: "交规相关题巧记",
                url: "order-purple"
            }, {
                title: "八种交警手势信号口诀",
                url: "order-green"
            }, {
                title: "处罚相关题巧记",
                url: "order-orange"
            }, {
                title: "罚款金额题巧记",
                url: "order-blue"
            }, {
                title: "最低最高时速题巧记",
                url: "order-Cambridge-blue"
            }, {
                title: "安全距离题巧记",
                url: "order-yellow"
            }, {
                title: "日期类题巧记",
                url: "order-pink"
            }, {
                title: "易混淆知识汇总",
                url: "order-light-green"
            } ]
        }, {
            title: "最新法规",
            summary: "",
            articles: [ {
                title: "2018新交规扣分标准",
                url: "order-purple"
            }, {
                title: "酒驾新规",
                url: "order-green"
            }, {
                title: "机动车驾驶证申领和使用规定",
                url: "order-orange"
            }, {
                title: "中华人民共和国道路交通安全法（2011修正）",
                url: "order-blue"
            }, {
                title: "中华人民共和国道路交通安全法实施条例",
                url: "order-Cambridge-blue"
            }, {
                title: "中华人民共和国刑法",
                url: "order-yellow"
            } ]
        } ]
    },
    onLoad: function(t) {},
    acrobaticsText: function(t) {
        wx.navigateTo({
            url: "../sports/acrobaticstext/acrobaticstext?one=" + t.currentTarget.dataset.one + "&two=" + t.currentTarget.dataset.two + "&title=" + t.currentTarget.dataset.title
        });
    },
    onReady: function() {},
    randomPractice: function(t) {
        console.log(t.currentTarget.dataset.ind);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});