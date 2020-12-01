// pages/demo1/demo1.js
var app = getApp()

Page({
  data: {
    id: null,
    msg: null,
    url1: '../../icon/scan.png',
    url2: '../../icon/write.png',
    url3: '../../icon/file.png',
    test_data: {'status': 1, 'msg_main': ["1","2","3","4","5"], 'i_type':"增值税电子普通发票", 'invoice_rate': 6, 'invoice_amount': 7, 'price_tax': 8, 'invoice_entity': 9, 'remark': 10},
    path: ""
  },
  getscanCode: function () {
    var that = this;
    wx.scanCode({
      scanType: ["qrCode"],
      success(req) {
        // 扫描得到的发票信息
        var result_infro = req.result; 
        console.log(result_infro)
        wx.request({
          url: '*',
          method: 'POST',
          data: {
            i_infor: result_infro,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            console.log(res.data)
            that.setData({
              msg: res.data
            })
            wx.navigateTo({
              url: '../demo4/demo4',
            })
          },
          fail() {
            wx.showToast({
              title: '请检查网络！',
              icon: "none",
              duration: 3000
            })
          }
        })
      }
    })
  },
  hand_input: function(e) {
    wx.navigateTo({
      url: '../demo3/demo3',
    })
  },
  getfile: function(e) {
    var id = app.globalData.id;
    console.log(id)
    var username = app.globalData.username;
    var nickname = app.globalData.nickname;
    var that = this;
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
    } else {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFiles
          var tempFilePath = tempFilePaths[0]["path"]
          console.log(tempFilePaths)
          console.log(tempFilePath)
          console.log(username)
          console.log(nickname)
          wx.uploadFile({
            url: '*', //仅为示例，非真实的接口地址
            filePath: tempFilePath,
            name: 'pdf_file',
            header: {
              "Content-Type": "multipart/form-data"
              // "Content-Type": "application/x-www-form-urlencoded" // 默认值
            },  
            formData: {
              id: id,
              username: username,
              nickname: nickname,
            },
            success (res){
              // const data = res.data
              // console.log(res.data, typeof(res.data))
              var data1 = JSON.parse(res.data)
              // console.log(data1, typeof(data1))
              console.log(data1.status)
              console.log(data1)
              // console.log(data1["status"])
              if (data1.status == 1) {
                console.log("222")
                that.setData({
                  test_data: data1
                })
                wx.navigateTo({
                  url: '../demo9/demo9',
                })
              } else if (data1.status == 0) {
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
              } else if (data1.status == 4) {
                wx.showModal({
                  content: '验真伪次数不足！',
                  showCancel: false,
                  success: function(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../demo1/demo1', 
                      })
                    }
                  }
                }) 
              } else {
                wx.showModal({
                  content: data1.msg_1,
                  showCancel: false,
                  success: function(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../demo1/demo1', 
                      })
                    }
                  }
                })
              }
              //do something
            }
          })
        }
      })
    }
  }
})