// pages/index/pages/personal.js
var utils = require('../../../utils/util.js')
var network = require('../../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    specificGoods:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.getSpecificGoodsById(decodeURIComponent(options.id));
    console.log("123");

  },

  getSpecificGoodsById:function(id){
    let that = this;
    network.request({
      url: utils.getUrl() + 'specificGoods/getSpecificGoodsById',
      data: {
        id: id
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          specificGoods:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})