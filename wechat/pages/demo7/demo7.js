// pages/demo7/demo7.js
const app = getApp()

Page({
  data: {
    code: null,
    id: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(options) {
    var _this = this
    wx.login({ 
      success:function(e) { 
        console.log(e)
        _this.setData({
          code: e.code
        })
      }
    })
    
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
      var that = this;
      //查看是否授权
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            console.log("用户授权了");
      
                  // wx.navigateTo({
                  //   url: '../demo6/demo6',
                  // })
          } else {
            //用户没有授权
            console.log("用户没有授权");
          }
        }
      });
    }, 
  bindGetUserInfo: function(res) {
      if (res.detail.userInfo) {
        //用户按了允许授权按钮
        var that = this;
        // 获取到用户的信息了，打印到控制台上看下
        var nickname = res.detail.userInfo.nickName;
        // 微信名  全局定义
        app.globalData.nickname = nickname
        
        console.log(res.detail)
        console.log("code为：",this.data.code)
        //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
        that.setData({
          isHide: false
        });
        wx.request({
          url: '',
          method: 'POST',
          data: {
            nickcode: this.data.code,
            nickname:nickname
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            var id = res.data.id; 
            console.log(id)
            if (id != undefined){
              wx.setStorage({
                data: id,
                key: 'id',
              })
              wx.navigateTo({
                url: '../demo6/demo6',
              })
            } else {
              wx.showToast({
                title: '请检查网络！',
                icon: "none",
                duration: 2000
              })
            }
          },
          fail() {
            wx.showToast({
              title: '请检查网络',
              icon: "none",
              duration: 2000
            })
          }
        })
      } else {
        //用户按了拒绝按钮
        wx.showModal({
          title: '温馨提示',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        })
      }
   }
})