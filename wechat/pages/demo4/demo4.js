// pages/demo4/demo4.js
Page({

  navigateto: function () {
    // 页面跳转   
    wx.switchTab({
      url: '../demo1/demo1',
    })
  },
  navigateto2: function () {
    wx.navigateTo({
      url: '../demo3/demo3',
    })
  }
})