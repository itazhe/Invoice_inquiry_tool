// pages/demo1/demo1.js
Page({
  /**
   * 页面的初始数据
   */
  // 扫一扫功能
  // getscanCode: function() {
  //   var _this = this;
  //   wx.scanCode({
  //     success(res) {
  //       var result_infro = res.result;
  //       _this.setData({
  //         result: result_infro,
  //       })
  //     }
  //   })
  // },
  getscanCode: function () {
    wx.scanCode({
      success(req) {
        // 扫描得到的发票号
        var result_infro = req.result;
        // 向服务器发起请求
        wx.request({
          url: 'http://192.168.31.220', //仅为示例，并非真实的接口地址
          data: {
            msg: result_infro
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            // 验证成功 跳转
            if (res.data == 1) {
              wx.navigateTo({
                url: '../demo3/demo3',
              })
            } else {
              // 验证失败 提示
              wx.showToast({
                title: '发票验证不通过',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail() {
            wx.showToast({
              title: '扫描失败,请检查网络',
              icon: 'none', 
              duration: 2000
            })
          }
        })
      }
    })
  },
  //页面跳转
  // navigateto: function(){
  //   wx.navigateTo({
  //     url: '../demo3/demo3',
  //   })
  // }

})