// pages/demo3/demo3.js
Page({
  query_form: function(data) {
    var inv_number = data.detail.value.number
    var inv_username = data.detail.value.username
    var inv_department = data.detail.value.department
    // console.log(infor)
    wx.request({
      url: 'http://127.0.0.1:8000/pm/add/', //仅为示例，并非真实的接口地址
      data: {
        numb: inv_number,
        name: inv_username,
        department: inv_department
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var num = res.data;
        if (num.status == 2) {
          wx.showToast({
            title: '信息不能为空', 
            icon: 'none',
            duration: 2000
          })
        }
        if (num.status == 1) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000 
          })
          // wx.switchTab({
          //   url: '../demo1/demo1',
          // })
        } 
        // else { 
        //   wx.showToast({
        //     title: '保存失败,请重新保存',
        //     icon: 'none',
        //     duration: 2000
        //   })
        // }
        
      },
      fail() {
        wx.showToast({
          title: '保存失败,请检查网络',
          icon: 'none',
          duration: 2000
        }) 
      }
    })
  }
})