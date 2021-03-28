const db = wx.cloud.database();
const DE = wx.cloud.database().collection("banxing")
const DA = wx.cloud.database().collection("user")
var app = getApp()
Page({
  data: {
    value: "",
    goodList: [],
    goodList1: [],
    openid: '',
    baoming: []
  },
  // 输入
  bindinput(e) {
    const {
      value
    } = e.detail;
    console.log(value);
    // 2 检测合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      // 值不合法
      return;
    }
    this.setData({
      value: value
    })
  },
  isflag: function () {
    console.log("isflag");
    DA.field({
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
  getbanxing:async function() {
    let that = this
    await db.collection('banxing').where({
        title: new db.RegExp({
          regexp: this.data.value, //做为关键字进行匹配
          options: 'i', //不区分大小写
        })
      })
      .orderBy('price', 'asc')
      .orderBy('title', 'asc')
      .get().then(res => {
        wx.hideLoading();
        for (let i = 0; i < that.data.baoming.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (that.data.baoming[i].id == res.data[j]._id) {
              res.data[j].isflag = that.data.baoming[i].isfalg
            }
          }
        }
        for (var i = 0; i < res.data.length; i++) {
          var _id = "goodList[" + i + "]._id"
          var describe = "goodList[" + i + "].describe"
          var isflag = "goodList[" + i + "].isflag"
          var price = "goodList[" + i + "].price"
          var title = "goodList[" + i + "].title"
          this.setData({
            [_id]: res.data[i]._id,
            [describe]: res.data[i].describe,
            [isflag]: res.data[i].isflag,
            [price]: res.data[i].price,
            [title]: res.data[i].title,
          })

        }
      }).catch(err => {
        console.error(err)
        wx.hideLoading();
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
  // 查询
  search:async  function () {
    await this.setData({
      goodList: [],
      goodList1: []
    })
    let that = this
    wx: wx.showLoading({
      title: '加载中',
      mask: true,
    })
    that.isflag();
     await db.collection('jiaolian').where({
        title: new db.RegExp({
          regexp: this.data.value, //做为关键字进行匹配
          options: 'i', //不区分大小写
        })
      })
      .orderBy('starscore', 'desc')
      .orderBy('driving_age', 'desc')
      .get().then(res => {
        wx.hideLoading();
        for (var i = 0; i < res.data.length; i++) {
          var _id = "goodList1[" + i + "]._id"
          var starscore = "goodList1[" + i + "].starscore"
          var image = "goodList1[" + i + "].image"
          var driving_age = "goodList1[" + i + "].driving_age"
          var title = "goodList1[" + i + "].title"
          var count = "goodList1[" + i + "].count"
          this.setData({
            [_id]: res.data[i]._id,
            [starscore]: res.data[i].starscore,
            [image]: res.data[i].image,
            [driving_age]: res.data[i].driving_age,
            [title]: res.data[i].title,
            [count]: res.data[i].count,
          })
        }
        
      }).catch(err => {
        console.error(err)
        wx.hideLoading();
      })
      if (this.data.goodList.length == 0 && this.data.goodList1.length == 0) {
        wx.showToast({
          title: '暂无搜索数据',
          icon: 'error',
          duration: 3000
        })
      }
    // console.log(this.data);
  },
  hiti: function (a) {
    let that=this
    console.log("ce",a);
		var t = a.currentTarget.dataset.isflag;
		if (0 == t) {
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
  goto: function (e) {
		wx.navigateTo({
			url: e
		})
  },
  onLoad: function (options) {
    this.getOpenid();
  }
})