Component({
    properties: {
        alertShow: {
            type: Boolean,
            value: !1
        },
        alertTitle: {
            type: "String",
            value: "温馨提示"
        },
        alertContent: {
            type: "String",
            value: "海报已成功保存至本地相册，去朋友圈分享给朋友们围观吧"
        },
        alertFooter: {
            type: "String",
            value: "朕知道了"
        }
    },
    data: {},
    methods: {
        el_mark: function() {
            var e = {
                code: 1
            }, t = {};
            this.triggerEvent("myevent", e, t);
        }
    }
});