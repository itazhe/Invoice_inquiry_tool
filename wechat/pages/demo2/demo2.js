// pages/demo2/demo2.js
var util = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    aa_text: "到底啦",
    datalist: null,
    new_datalist: null,
    page_index: 1,
    all_page: null,
    user_input: null,
    isshow: true
  },
  onLoad: function() {
    var time = util.formatTime(new Date());
    
    this.setData({
      date1: time,
      date2: time, 
    }); 
  },
  bindDate1Change: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  bindDate2Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },
  query_form: function(data) {
    // 获取表单input里输入的内容
    var user_input = data.detail.value.user_input;
    var _this = this;
    console.log(user_input)

    var username = app.globalData.username;

    var num1 = this.data.date1;
    var num2 = this.data.date2;
    // console.log(id)
    console.log(num1)
    console.log(num2)
    if (num1 > num2) {
      wx.showToast({
        title: '日期跨度不合法',
        icon: 'none',
        duration: 2000
      })  
    } else {
      wx.request({
        url: ':*', //仅为示例，并非真实的接口地址
        method: "POST",
        data: { 
          num: 0,
          input_infor: user_input,
          select_date1: num1,
          select_date2: num2, 
          username: username,
        },  
        header: {
          "Content-Type": "application/x-www-form-urlencoded" // 默认值
        },
        success(res) {
          console.log("连接成功");
          var datalist = res.data;
          console.log(datalist);
          // console.log(datalist.msg[0]);
          if (datalist.status == 0) {
            wx.showModal({
              content: '无记录',
              showCancel: false
            })
          } else if (datalist.pages>1) {
            wx.showToast({
              title: '已查询！',
              icon: "none",
              duration: 2000
            })
            _this.setData({
              datalist: datalist.msg, 
              all_page: datalist.pages,
              user_input: user_input,
              isshow: false
            })
          } else {
            wx.showToast({
              title: '已查询！',
              icon: "none",
              duration: 2000
            })
            _this.setData({
              datalist: datalist.msg,
              all_page: datalist.pages,
              user_input: user_input,
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
    var index_num = e.currentTarget.dataset.value;
    console.log(index_num)
    var data = this.data.datalist[index_num]
    var data = {index_num : data}

    console.log(data)
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
        url: '*', //仅为示例，并非真实的接口地址
        method: "POST",
        data: { 
          num: 0,
          input_infor: this.data.user_input,
          select_date1: this.data.date1,
          select_date2: this.data.date2,
          username: app.globalData.username,
        },  
        header: {
          "Content-Type": "application/x-www-form-urlencoded" // 默认值
        },
        success(res) {
          console.log("连接成功");
          var datalist = res.data;
          console.log(datalist);
          // console.log(datalist.msg[0]);
          if (datalist.status == 0) {
            wx.showModal({
              content: '无记录',
              showCancel: false
            })
          } else {
            _this.setData({
              datalist: datalist.msg,
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
          url: '*', //仅为示例，并非真实的接口地址
          method: "POST",
          data: {  
            num: index,
            input_infor: this.data.user_input,
            select_date1: this.data.date1,
            select_date2: this.data.date2,
            username: app.globalData.username,
          },  
          header: {
            "Content-Type": "application/x-www-form-urlencoded" // 默认值
          },
          success(res) {
            console.log("连接成功");
            var datalist = res.data;
            console.log(datalist);
            // console.log(datalist.msg[0]);
            if (datalist.status == 0) {
              wx.showModal({
                content: '无记录',
                showCancel: false
              })
            } else { 
              _this.setData({
                datalist: datalist.msg,
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
            url: '*', //仅为示例，并非真实的接口地址
            method: "POST",
            data: { 
              num: index,
              input_infor: this.data.user_input,
              select_date1: this.data.date1,
              select_date2: this.data.date2,
              username: app.globalData.username,
            },  
            header: { 
              "Content-Type": "application/x-www-form-urlencoded" // 默认值
            },  
            success(res) {
              console.log("连接成功");
              var datalist = res.data;
              console.log(datalist);
              // console.log(datalist.msg[0]);
              if (datalist.status == 0) {
                wx.showModal({
                  content: '无记录',
                  showCancel: false
                })
              } else {
                _this.setData({
                  datalist: datalist.msg,
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
        }
    }
  }
})