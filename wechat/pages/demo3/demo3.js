// pages/demo3/demo3.js
var app = getApp()

Page({
  data: {
    array: [ "增值税电子普通发票","增值税普通发票", "增值税普通发票(卷票)", "增值税专用发票", "增值税电子普通发票(通行费)" , "机动车销售统一发票", "二手车销售统一发票", "货物运输业增值税专用发票"],
    index:0,
    msg:"请选择开票日期",
    // date: '2020-6-17'
    data_3: null,
    isshow1: true,
    isshow2: false,
    isshow3:true,
    // name_list: ["azhe", "lh"]
    name: '',
    department: ''
  },
  onLoad:function(e) {
    this.setData({
      name: app.globalData.name,
      department: app.globalData.department
    }) 
  },
  bindpickerchange: function(e) {
    this.setData({
      index: e.detail.value
    })
  }, 
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value,
      msg: ''
    })
  },
  bind_blur: function(e) {
    var input_num = e.detail.value;
    var num1 = 0
    this.setData({
      data1: num1,
      data2: 0.00,
      data3: input_num,
      data_3: input_num
    })
  },
  bind_blur2: function(e) {
    var input_num2 = e.detail.value;
    var data2 = this.data.data_3 * input_num2 * 0.01;
    var data3 = parseFloat(this.data.data_3) + data2;
    this.setData({
      data2: data2.toFixed(2),
      data3: data3.toFixed(2),
    })
  },
  // view_btn: function(e) {
  //   var that= this;
  //   wx.showActionSheet({
  //     itemList :that.data.name_list,
  //     success: function(res) {
  //       console.log(res.tapIndex);
  //       console.log(res);
  //       that.setData({
  //         name: that.data.name_list[res.tapIndex]
  //       })
  //     },    
        
  //     })
  // },

  query_form: function(e) {
    if (e.detail.target.dataset.type == '1') {
      var _this = this;
      var invoice_code = e.detail.value.i_code;
      var invoice_number = e.detail.value.i_number;
      var invoice_date = e.detail.value.i_date;
      var code = e.detail.value.code;
      var money = e.detail.value.money;
      var name = e.detail.value.name;
      var department = e.detail.value.department;
      var remark = e.detail.value.remark;
      var username = app.globalData.username;
      var nickname = app.globalData.nickname;
      var id = app.globalData.id;
      console.log(id)
      if (id == undefined) {
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
      }
      else {
        wx.request({
          url: '*', //仅为示例，并非真实的接口地址
          method: "POST",
          data: {
            invoice_code: invoice_code,
            invoice_number:invoice_number,
            invoice_date:invoice_date,
            code:code,
            money:money,
            name:name,
            department:department,
            remark:remark,
            username: username,
            nickname:nickname,
            id:id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded" // 默认值
          },
          success(res) {
            // 记录
            app.globalData.name = name
            app.globalData.department = department
  
  
            console.log(res.data) 
            // if (name in _this.data.name_list) {
            //   console.log("存在")
            // } else {
            //   _this.data.name_list.unshift(name)
            // }
  
            // 验证成功
            if (res.data.status == 1) {
              _this.setData({
                isshow: '../../icon/checks.png',
                isshow1: false,
                isshow2: true,
                invoice_entity: res.data.invoice_entity,
                remark: res.data.remark,
                data1:res.data.invoice_rate,
                data2:res.data.invoice_amount,
                data3: res.data.price_tax,
              })
            } else if (res.data.status == 0) {
              // 验证失败 
              wx.showModal({
                content: '服务器内部错误！',
                showCancel:false,
                success: function(res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../demo1/demo1', 
                    })
                  }
                }
              })
            } else if (res.data.status == 2) {
              // wx.showModal({
              //   content: '发票已存在！',
              //   showCancel: false
              // })
              _this.setData({
                isshow: '../../icon/已存在.png',
                isshow2: true,
                isshow3: false
              })
            } else if (res.data.status == 4) {
              wx.showModal({
                content: '验证为次数不足！',
                showCancel: false
              })
            } else {
              wx.showModal({
                content: res.data.msg_1,
                showCancel: false
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
    if (e.detail.target.dataset.type == '2') {
      var invoice_type = e.detail.value.i_type;
      var invoice_code = e.detail.value.i_code;
      var invoice_number = e.detail.value.i_number;
      var invoice_date = e.detail.value.i_date;
      var code = e.detail.value.code;
      var money = e.detail.value.money;
      var invoice_rate = e.detail.value.invoice_rate;
      var invoice_amount = e.detail.value.invoice_amount;
      var price_tax = e.detail.value.price_tax;
      var name = e.detail.value.name;
      var department = e.detail.value.department;
      var invoice_entity = e.detail.value.invoice_entity;
      var remark = e.detail.value.remark;
      var username = app.globalData.username;
      console.log('######') 
      console.log(invoice_rate)
      wx.request({
        url: '*',

        method: "POST",
        data: {
          invoice_type:invoice_type,
          invoice_code:invoice_code,
          invoice_number:invoice_number,
          invoice_date:invoice_date,
          code:code,
          money:money,
          invoice_rate:invoice_rate,
          invoice_amount:invoice_amount,
          price_tax:price_tax,
          name:name,
          department:department,
          invoice_entity:invoice_entity,
          remark:remark,
          username: username
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          // 记录
          app.globalData.name = name
          app.globalData.department = department
          var num = res.data.status;
          if (num == 2) {
            wx.showModal({
              content: '星号内容不能为空！',
              showCancel:false,
            })
          }
          if (num == 1) {
            wx.showModal({
              content: '保存成功',
              showCancel:false,
              success: function(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../demo1/demo1', 
                  })
                }
              }
            })
          }
          // if (num == 0) {
          //   wx.showModal({
          //     content: '发票已存在！',
          //     showCancel:false,
          //     success: function(res) {
          //       if (res.confirm) {
          //         wx.switchTab({
          //           url: '../demo1/demo1', 
          //         })
          //       }
          //     }
          //   })
          // }
        },
        fail() {
          wx.showModal({
            content: '录入失败，请检查网络！',
            showCancel:false
          })
        }
      })
    } 
  } 
})