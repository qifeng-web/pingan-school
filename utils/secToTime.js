module.exports = {
    secToTime: function(e) {
        return [ parseInt(e / 60 % 60), parseInt(e % 60) ].join(":").replace(/\b(\d)\b/g, "0$1");
    }
};