// pages/demo2/demo2.js
var util = require('../../utils/util.js');

Page({
  data: {
    aa_text: "到底啦"
  },
  // onLoad: function() {
  //   var time = util.formatTime(new Date());
    
  //   this.setData({
  //     date1: time,
  //     date2: time,
  //   }); 
  // },
  // bindDate1Change: function(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     date1: e.detail.value
  //   })
  // },
  // bindDate2Change: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     date2: e.detail.value
  //   })
  // },
  query_form: function(data) {
    // 获取表单input里输入的内容
    var user_input = data.detail.value.user_input
    var _this = this
    // console.log(user_input)
    // var num1 = this.data.date1
    // var num2 = this.data.date2
    // if (num1 > num2) {
    //   wx.showToast({
    //     title: '日期跨度不合法',
    //     icon: 'none',
    //     duration: 2000
    //   }) 
    // } else {
      wx.request({
        url: 'http://127.0.0.1:8000/pm/check/', //仅为示例，并非真实的接口地址
        data: {
          // date_one: num1,
          // date_two: num2,
          input_infor: user_input
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log("连接成功")
          var datalist = res.data
          if (datalist.status == 0) {
            wx.showToast({
              title: '无记录',
              icon: 'none',
              duration: 2000
            })
          } else {
            _this.setData({
              datalist: datalist
            })
          }
        },
        fail() {
          wx.showToast({
            title: '查询失败,请检查网络',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
})