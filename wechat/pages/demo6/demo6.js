// pages/demo6/demo6.js
const app = getApp()

Page({
  data: {
    url1: '../../icon/bozheng.png',
    url2: '../../icon/user.png',
    url3: '../../icon/password.png'
  },
  onLoad: function(options) {

    
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
          console.log(res.userInfo.nickName)
          app.globalData.nickname = res.userInfo.nickName
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
      var that = this;
      //查看是否授权
      wx.getSetting({    
        success: function(res) {
          // console.log(res)
          if (res.authSetting['scope.userInfo']) {
            console.log("用户授权了");
            var that = this;
            wx.getStorage({
              key: 'id',
              success: function(res) {
                console.log(res.data)
                if (res.data == undefined){
                  wx.showModal({
                    content: '授权过期,请重新授权!',
                    showCancel: false,
                    success: function(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '../demo7/demo7',
                        })
                        }
                    }
                  })
                } else {
                  app.globalData.id = res.data
                }
              }
            })
          } else {
            //用户没有授权
            console.log("用户没有授权");
            wx.navigateTo({
                url: '../demo7/demo7',
              })
          }
        }
      });
    
    }, 
  query_form: function(e) {
    var username = e.detail.value.username
    app.globalData.username = username

    var password = e.detail.value.password
    var md5 = require('../../utils/md5.js');
    password = md5.md5(password)
    
    var that = this;
    // var pages = getCurrentPages();
    // var prevPage = pages[pages.length - 2];
    var nickname = app.globalData.nickname;
    wx.getSetting({    
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了");
            wx.request({
              url: '',

              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              }, 
              data: {
                username: username,
                password: password, 
                nickname: nickname,
              }, 
              success: function(res) {
                console.log(res.data.status)
                if (res.data.status == 1) {
                  wx.switchTab({
                    url: '../demo1/demo1', 
                  }) 
                };
                if (res.data.status == 0) {
                  wx.showToast({
                    title: '用户名或密码错误！',
                    icon: 'none',
                    duration: 2000
                  })
                }
              },
              fail() {
                wx.showToast({
                  title: '登录失败,请检查网络',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
            } else {
                //用户没有授权
                console.log("用户没有授权");
                wx.navigateTo({
                    url: '../demo7/demo7',
                  })
              }
          }
        })
    
    // console.log(md5.md5(password))
  }
})