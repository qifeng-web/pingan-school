Component({
    properties: {
        markShow: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        del_mark: function() {
            var e = {
                code: 1
            }, t = {};
            this.triggerEvent("myevent", e, t);
        },
        save_img: function() {
            var e = {
                code: 2
            }, t = {};
            this.triggerEvent("myevent", e, t);
        }
    }
});