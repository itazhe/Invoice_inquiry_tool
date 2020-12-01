// pages/demo3/demo3.js
var app = getApp()

Page({
  data: {
    array: [ "增值税电子普通发票","增值税普通发票", "增值税普通发票(卷票)", "增值税专用发票", "增值税电子普通发票(通行费)" , "机动车销售统一发票", "二手车销售统一发票", "货物运输业增值税专用发票"],
    index:0,
    msg:"请选择开票日期",
    // date: '2020-6-17'
    data_3: null, 
    isshow1:false,
    isshow3:true
  },
  onLoad:function(e) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var datalist = prevPage.data.test_data;
    console.log(datalist)
    if (datalist.status == 1) {
      this.setData({
        isshow: '../../icon/checks.png',
        input1: datalist.msg_main[0],
        input2: datalist.msg_main[1],
        input3: datalist.msg_main[2],
        input4: datalist.msg_main[3],
        input5: datalist.msg_main[4],
        data1: datalist.invoice_rate,
        data2: datalist.invoice_amount,
        data3: datalist.price_tax,
        data_3: datalist.price_tax,
        invoice_entity: datalist.invoice_entity,
        remark: datalist.remark,
        name: app.globalData.name,
        department: app.globalData.department
      }) 
    } else {
      this.setData({
        isshow: '../../icon/已存在.png',
        isshow1:true,
        isshow3:false,
        input1: datalist.msg_main[0],
        input2: datalist.msg_main[1],
        input3: datalist.msg_main[2],
        input4: datalist.msg_main[3],
        input5: datalist.msg_main[4],
        data1: datalist.invoice_rate,
        data2: datalist.invoice_amount,
        data3: datalist.price_tax,
        data_3: datalist.price_tax,
        invoice_entity: datalist.invoice_entity,
        remark: datalist.remark,
        name: app.globalData.name,
        department: app.globalData.department
      }) 
    }
    
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
      data_3: input_num,
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
  quit_btn: function(e) {
    wx.switchTab({
      url: '../demo1/demo1', 
    })
  },

  query_form: function(e) {
    console.log("1")
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
      console.log("2")
      wx.request({
        url: '',
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
          console.log(res.data.status)
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
          if (num == 0) {
            wx.showModal({
              content: '发票已存在！',
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