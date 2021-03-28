// pages/index/index.js
var app = getApp(); //获取当前小程序的实例，方便使用全局方法和属性
//引入腾讯位置服务SDK核心类
var qqmapsdk = require('../../../utils/qqmap.js');
const DB = wx.cloud.database().collection("lunbotu")
const DC = wx.cloud.database().collection("gonggao")
const DD = wx.cloud.database().collection("daohang")
const DE = wx.cloud.database().collection("banxing")
const DF = wx.cloud.database().collection("jiaolian")
const DG = wx.cloud.database().collection("changdi")
const DA = wx.cloud.database().collection("user")
Page({
	data: { //设置页面数据，后面空值将在页面显示时通过请求服务器获取
		//定位城市信息
		province: "",
		city: "",
		// 轮播图数组
		lunbotu: [],
		//公告题目
		gongtitle: [],
		//导航栏
		daohang: [],
		//分类栏
		tabs: [{
				id: 0,
				value: "班型",
				isActive: true
			},
			{
				id: 1,
				value: "教练",
				isActive: false
			},
			{
				id: 2,
				value: "场地",
				isActive: false
			},
		],
		is_login: true,
		//班型栏
		banxing: [],
		//教练栏
		jiaolian: [],
		//场地栏
		changdi: [],
		openid: '',
		baoming: [],
		userInfo: {}
	},
	getgongtitle() {
		let that = this
		DC.get({
			success(res) {
				that.setData({
					gongtitle: res.data
				})
			}
		})
	},
	getOpenid: function () {
		let that = this;
		wx.getStorage({
			key: 'openid',
			success (res) {
				that.setData({
					openid: res.data
				})
				console.log(res.data)
			}
		})
		return;
	},
	getLunbotu() {
		DB.where({}).get()
			.then(res => {
				this.setData({
					lunbotu: res.data
				})
			})
	},
	getdaohang() {
		let that = this
		DD.get({
			success(res) {
				that.setData({
					daohang: res.data
				})
			}
		})
	},
	getbanxing() {
		let that = this
		console.log("banxing");
		DE.get({
			success(res) {
				for(let i=0;i<that.data.baoming.length;i++){
					for(let j=0;j<res.data.length;j++){
						if(that.data.baoming[i].id==res.data[j]._id){
							res.data[j].isflag=that.data.baoming[i].isfalg
						}
					}
				}
				that.setData({
					banxing: res.data
				})
			}
		})

	},
	getjiaolian() {
		let that = this
		DF.get({
			success(res) {
				that.setData({
					jiaolian: res.data
				})
			}
		})
	},
	getchangdi() {
		let that = this
		DG.get({
			success(res) {
				that.setData({
					changdi: res.data
				})
			}
		})
	},
	_handcity() {
		if (this.data.city == 0) {
			this.getUserLocation()
		}
	},
	goto: function (e) {
		wx.navigateTo({
			url: e
		})
	},
	login() {
    this.setData({
      is_login: !this.data.is_login
    })
  },
	hiti:async function (a) {
		if (this.data.userInfo.avatarurl == undefined || this.data.userInfo.avatarurl == '') {
      this.login()
      return
    }
		let that=this
		var t = a.currentTarget.dataset.isflag;
		if (0 == t) {
			await wx.requestSubscribeMessage({
				tmplIds: ['qyjAikc5JVPcYehsm-eMF1BDZys-JagYlx_-SG0Zwd8'],
				success(res) {
					console.log(res);
				}
			})
				var e = "/pages/_index/apply/payment/payment?id=" + a.currentTarget.dataset.id+'&openid='+that.data.openid;
				this.goto(e);
		}
		if (-1 == t) {
			var e = "/pages/_index/apply/apply?id=" + a.currentTarget.dataset.id;
			this.goto(e);
		}
		// if (1 == t) {
		// 		e = "/pages/_index/index/course/course?id=" + a.currentTarget.dataset.id;
		// 		app.goto(e);
		// }
	},
	isflag:async function() {
		console.log("isflag");
		 await DA.field({
				id: true,
				isfalg: true,
				_id: false
			}).get()
			.then(res => {
				// console.log(res);
				this.setData({
					baoming: res.data
				})
			})
			this.getbanxing();
	},
	bindgetuserinfo: function () {
    this.login()
    var that = this
    wx.getUserInfo({
      success(res) {
        wx.showLoading({
          title: '授权登录中',
        })
        wx.u.getUserInfo().then(res1 => {
          var bmobUser = res1.result;
          if (bmobUser.avatarUrl == '' || bmobUser.avatarUrl == undefined) {
            wx.u.changeUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName).then(res2 => {});
          }
          res1.result.avatarurl = res.userInfo.avatarUrl;
          res1.result.nickName = res.userInfo.nickName;
          wx.setStorageSync('userInfo', res1.result)
          that.setData({
            userInfo: res1.result,
          })
          wx.hideLoading()
        })
      }
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading({
			title: "加载中",
			mask: true
		});
		// this.isflag();
		this.getLunbotu();
		this.getOpenid();
		this.getgongtitle();
		this.getdaohang();
		this.getjiaolian();
		this.getchangdi();
		wx.hideLoading();
	},
	//步骤1：获取当前地理位置，首先要拿到用户的授权 wx.openSeting
	getUserLocation() {
		let that = this
		//获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
					//表示非初始化进入该页面 且未授权：
					wx.showModal({
						title: '平安驾校请求授权当前位置',
						content: '平安驾校需要获取您的地理位置，请确认授权',
						showCancel: true,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#3CC51F',
						success: (result) => {
							if (res.cancel) {
								wx.showToast({
									title: '拒绝授权',
									icon: 'none',
									duration: 1000
								});
							} else if (result.confirm) {
								//调起客户端小程序设置界面，返回用户设置的操作结果。 
								//设置界面只会出现小程序已经向用户请求过的权限
								wx.openSetting({
									success: (dataAu) => {
										if (dataAu.authSetting["scope.userLocation"] == true) {
											wx.showToast({
												title: '授权成功',
												icon: 'success',
												duration: 1000
											});
											//再次授权之后，调用wx.getLocation的API
											that.getLocation()
										} else {
											wx.showToast({
												title: '授权失败',
												icon: 'none',
												duration: 1000
											});
										}
									}
								});

							}
						}
					});

				} else if (res.authSetting['scope.userLocation'] == undefined) {
					//调用wx.getLocation的API
					that.getLocation()
				} else {
					//调用wx.getLocation的API
					that.getLocation()
				}
			}

		})
	},
	/**
	 * 获取当前位置坐标经纬度
	 	步骤2：微信的getLocation接口，获取当前用户的地理位置（微信返回的是经纬度、速度等参数）
	 */
	getLocation() {
		let that = this
		//1.获取当前位置坐标经纬度
		wx.getLocation({
			type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
			success: function (res) {
				// success
				//console.log(res)
				let latitude = res.latitude //维度
				let longitude = res.longitude //经度
				//2.根据经纬度获取对应城市信息(使用腾讯位置服务)
				that.getLocal(latitude, longitude)
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
	},
	//步骤3：获取当前地理位置
	getLocal: function (latitude, longitude) {
		let that = this
		//逆地址解析
		qqmapsdk.reverseGeocoder({
			location: {
				latitude: latitude,
				longitude: longitude
			},
			success: function (res) {
				// console.log(res)
				let first_enter = wx.getStorageSync('first_enter')
				wx.setStorageSync('first_enter', false)
				let province = res.result.ad_info.province;
				let city = res.result.ad_info.city;
				let cityCode = res.result.ad_info.city_code;
				let nationCode = res.result.ad_info.nation_code;
				let city_code = cityCode.substring(nationCode.length)
				//如果本地存储没有城市信息，则将定位的城市信息存入本地存储
				if (!wx.getStorageSync('city_code')) {
					that.setData({
						city: city,
						city_code: city_code
					})
					wx.setStorageSync('city', city)
					wx.setStorageSync('city_code', city_code)
				}
				//首次进入，判断定位的城市与本地存储城市信息是否一致；若不一致，则提示是否切换城市信息
				if (first_enter) {
					if (city_code != wx.getStorageSync('city_code')) {
						wx.showModal({
							title: '提示',
							content: '检测到当前城市为' + city + "，是否切换？",
							showCancel: true,
							cancelText: '取消',
							cancelColor: '#000000',
							confirmText: '确定',
							confirmColor: '#3CC51F',
							success: (result) => {
								if (result.confirm) {
									that.setData({
										city: city,
										city_code: city_code
									})
									wx.setStorageSync('city', city)
									wx.setStorageSync('city_code', city_code)
								}
							}
						});

					}
				}
			},
			fail: function (res) {
				//console.log(res)
			}
		})
	},
	openLocation: function (a) {
		var t = Number(a.currentTarget.dataset.lat),
			e = Number(a.currentTarget.dataset.lng),
			n = a.currentTarget.dataset.address,
			i = a.currentTarget.dataset.name;
		wx.openLocation({
			latitude: e,
			longitude: t,
			scale: 15,
			name: i,
			address: n
		});
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	handleTabsItemChange(e) {
		// 1 获取被点击的标题索引
		const {
			index
		} = e.detail;
		// 2 修改源数组
		let {
			tabs
		} = this.data;
		tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
		// 3 赋值到data中
		this.setData({
			tabs
		})
	},
	onReady: function () {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		wx.showLoading({
			title: "加载中",
			mask: true
		});
		this.isflag();
		var that = this
		if (wx.getStorageSync('city_code')) {
			that.setData({
				city_code: wx.getStorageSync('city_code')
			})
		}
		if (wx.getStorageSync('city')) {
			that.setData({
				city: wx.getStorageSync('city')
			})
		}
		that.getUserLocation()
		var that = this
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
		wx.hideLoading();
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
})