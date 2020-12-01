// pages/demo8/demo8.js
Page({
  onLoad: function(res) {
    var pages = getCurrentPages();
    var page = pages[pages.length - 2];
    var datalist = page.data.new_datalist;
    console.log('demo8')
    console.log(datalist) 
    this.setData({
      datalist: datalist
    })
  }
})