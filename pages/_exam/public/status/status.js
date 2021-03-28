Component({
    properties: {
        showStatus: {
            type: Boolean,
            value: !1
        },
        statusOptions: {
            type: Object,
            value: {
                statusType: 0,
                statusColor: "#ffcd05",
                statusBg: "#fff4c9",
                statusPlan: 2.8,
                statusError: null,
                statusAnswer: null,
                statusScore: null
            },
            observer: function(t, s) {
                console.info("new", t.statusPlan), this.setData({
                    color: t.statusColor,
                    bg: t.statusBg,
                    plan: t.statusPlan
                });
            }
        }
    },
    data: {
        color: "",
        bg: "",
        plan: ""
    },
    ready: function() {
        this.draw_status();
    },
    methods: {
        draw_status: function() {
            var t = this, s = wx.createCanvasContext("status", this);
            s.beginPath(), s.arc(65, 65, 55, 0, 2 * Math.PI), s.setLineCap("round"), s.setLineWidth(15), 
            s.setStrokeStyle(this.data.bg), s.stroke(), s.draw();
            var a = this.data.plan, e = 1.5;
            if (e != a) var n = setInterval(function() {
                (e = 1 * e.toString().substr(0, 3)) <= a ? (console.log(e), t.continue_step(1.5, e)) : clearInterval(n), 
                e = parseFloat(e + .1);
            }, 30);
        },
        continue_step: function(t, s) {
            var a = wx.createCanvasContext("status-gap", this);
            a.beginPath(), a.arc(65, 65, 55, t * Math.PI, s * Math.PI), a.setLineCap("round"), 
            a.setLineWidth(15), a.setStrokeStyle(this.data.color), a.stroke(), a.draw();
        },
        choose_btn: function(t) {
            this.triggerEvent("myevent", {
                msg: t.currentTarget.dataset.msg
            });
        }
    }
});