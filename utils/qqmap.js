//引入腾讯位置服务SDK核心类
var QQMapWX = require('./qqmap-lib/qqmap-wx-jssdk.js');
//实例化腾讯位置服务API核心类
const qqmapsdk = new QQMapWX({
    key:'VEHBZ-QXKLW-YRMR4-RWZSZ-UNGOS-FLFFM'
});
module.exports=qqmapsdk
