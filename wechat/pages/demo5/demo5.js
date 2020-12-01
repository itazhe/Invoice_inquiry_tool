// //index.js
// //获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    aa_text: '到底啦',
    num: null,
    count: null,
    userInfo: {}, 
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isshow: true,
    page_index: 1,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({ 
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var time = util.formatTime(new Date());
    // 获取当前时间减去7天
    var sdtime3=new Date().setDate((new Date().getDate()-7))
    var sdtime4=new Date().setDate((new Date().getDate()+1))
    // 将获取的数值格式化
    var userTime1 = util.formatTime(new Date(sdtime3))
    var userTime2 = util.formatTime(new Date(sdtime4))
    this.setData({
      date1: userTime1,
      date2: userTime2, 
    });

    var username = app.globalData.username;
    var num1 = this.data.date1;
    var num2 = this.data.date2;
    var _this = this;
    if (num1 > num2) {
      wx.showModal({
        content:'日期跨度不合法',
        showCancel: false
      }) 
    } else {
      wx.request({
        url: '1',

        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { 
          num: 0,
          // num: this.data.index,
          select_date1: num1,
          select_date2: num2,
          username:username
        },
        success:function(res) {
          console.log('连接成功')
          var datalist = res.data;
          console.log(datalist);
          wx.showToast({
            title: '已刷新！',
            icon: "none",
            duration:2000
          })
          if (datalist.status == 0) {
            wx.showModal({ 
              content: "无记录", 
              showCancel: false
            })
          } else if (datalist.pages>1) {
            _this.setData({
              datalist: datalist.msg, 
              all_page: datalist.pages,
              count: datalist.sur,
              num: datalist.all,
              // user_input: user_input,
              isshow: false,
              page_index: 1
              // pages: datalist.pages
            })
          } else {
            _this.setData({
              datalist: datalist.msg,
              count: datalist.sur,
              num: datalist.all,
              isshow: true
            })
          }
        },
        fail() {
          wx.showModal({
            content: '查询失败，请检查网络！',
            showCancel: false
          })
        }
      }) 
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindDate1Change: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })

    var username = app.globalData.username;
    var num1 = this.data.date1;
    var num2 = this.data.date2;
    var _this = this;
    if (num1 > num2) {
      wx.showModal({
        content:'日期跨度不合法',
        showCancel: false
      }) 
    } else {
      wx.request({
        url: '',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          num: 0,
          select_date1: num1,
          select_date2: num2,
          username:username
        },
        success:function(res) {
          console.log('连接成功')
          var datalist = res.data;
          console.log(datalist);
          if (datalist.status == 0) {
            wx.showModal({ 
              content: "无记录",
              showCancel: false
            })
          } else if (datalist.pages>1) {
            _this.setData({
              datalist: datalist.msg, 
              all_page: datalist.pages,
              count: datalist.sur,
              num: datalist.all,
              // user_input: user_input,
              isshow: false
            })
          } else {
            _this.setData({
              datalist: datalist.msg,
              count: datalist.sur,
              num: datalist.all,
              isshow: true
            })
          }
        },
        fail() {
          wx.showModal({
            content: '查询失败，请检查网络！',
            showCancel: false
          })
        }
      }) 
    }

  },
  bindDate2Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })

    var username = app.globalData.username;
    var num1 = this.data.date1;
    var num2 = this.data.date2;
    var _this = this;
    if (num1 > num2) {
      wx.showModal({
        content:'日期跨度不合法',
        showCancel: false
      }) 
    } else {
      wx.request({
        url: '',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          num: 0,
          select_date1: num1,
          select_date2: num2,
          username:username
        },
        success:function(res) {
          console.log('连接成功')
          var datalist = res.data;
          console.log(datalist);
          if (datalist.status == 0) {
            wx.showModal({ 
              content: "无记录",
              showCancel: false
            })
          } else if (datalist.pages>1) {
            _this.setData({
              datalist: datalist.msg, 
              all_page: datalist.pages,
              count: datalist.sur,
              num: datalist.all,
              // user_input: user_input,
              isshow: false
            })
          } else {
            _this.setData({
              datalist: datalist.msg,
              count: datalist.sur,
              num: datalist.all,
              isshow: true
            })
          }
        },
        fail() {
          wx.showModal({
            content: '查询失败，请检查网络！',
            showCancel: false
          })
        }
      }) 
    }
  },
  bindtable: function(e) {
    var num = e.currentTarget.dataset.value;
    var data = this.data.datalist[num];
    var data = {num : data}
    // console.log(num)
    this.setData({
      new_datalist: data
    })
    wx.navigateTo({
      url: '../demo8/demo8',
    })
  },
  bindletap: function(e) {
    var _this = this;
    var data = e.currentTarget.dataset.page;

    if (data == 2) {

      wx.request({
        url: '',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          num: 0,
          select_date1: this.data.date1,
          select_date2: this.data.date2,
          username:app.globalData.username
        },
        success:function(res) {
          var datalist = res.data;
          console.log(datalist);
          if (datalist.status == 0) {
            wx.showModal({
              content: "无记录",
              showCancel: false
            })
          } else {
            _this.setData({
              datalist: datalist.msg,
              count: datalist.substr,
              num: datalist.all,
              page_index: 1
            })
          }
        },
        fail() {
          wx.showModal({
            content: '查询失败，请检查网络！',
            showCancel: false
          })
        }
      }) 
    } else if (data == 3) {
      var index = this.data.all_page;
      console.log(index)
      wx.request({
        url: '',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          num: index,
          select_date1: this.data.date1,
          select_date2: this.data.date2,
          username:app.globalData.username
        },
        success:function(res) {
          var datalist = res.data;
          console.log(datalist);
          if (datalist.status == 0) {
            wx.showModal({
              content: "无记录",
              showCancel: false
            })
          } else {
            _this.setData({
              datalist: datalist.msg,
              count: datalist.substr,
              num: datalist.all,
              page_index: index
            })
          }
        },
        fail() {
          wx.showModal({
            content: '查询失败，请检查网络！',
            showCancel: false
          })
        }
      }) 
    } else {
        var index = this.data.page_index + data;
        console.log(index)
        if (index <= 0 || index > this.data.all_page) {
          wx.showModal({
            content: '到底啦！',
            showCancel: false,
          }) 
        } else {
          wx.request({
            url: '',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              num: index,
              select_date1: this.data.date1,
              select_date2: this.data.date2,
              username:app.globalData.username
            },
            success:function(res) {
              var datalist = res.data;
              console.log(datalist);
              if (datalist.status == 0) {
                wx.showModal({
                  content: "无记录",
                  showCancel: false
                })
              } else {
                _this.setData({
                  datalist: datalist.msg,
                  // count: datalist.substr,
                  // num: datalist.all,
                  page_index: index,
                  // index:index,
                  // isshow: false
                })
              }
            },
            fail() {
              wx.showModal({
                content: '查询失败，请检查网络！',
                showCancel: false
              })
            }
          }) 
        }
    }
  }
})
