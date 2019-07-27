// pages/index/module/chat.js

var utils = require('../../../utils/util.js')
var network = require('../../../utils/network.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstFocuse:1,
    isChange:{
      isColect1:true,
      isColect2: false,
      isColect3: false,
      isColect4: false,
    },
    currentData:0,  
    userInfo: {},
    commditylist: [],
    commditytemp:{},
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getCommdity();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getCommdity:function(){
    let that = this;
    network.request({
      url: utils.getUrl() + 'commdity/getCommdity',
      data: {
        currentDate:''
      },
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data); 
        that.setData({
          commditylist: res.data
        })
        console.log(that.data.commditylist);    
      }
    })
  
  },
  /**
   * 获取焦点跳转页面
   */
  searchPage: utils.throttle(function (e) {
    wx.navigateTo({
      url: './search',
    })
  }, 3000),

  catchTouchMove: function (res) {
    return false
  },

  goPersonal: function (arg){
    wx.navigateTo({
      url: './../pages/personal?id=' + arg.currentTarget.dataset.gid,
    })
  },

  panelActive:function(arg){
    var that = this;
    if (that.data.currentData != arg.currentTarget.dataset.gid) {
      that.setData({
        currentData: arg.currentTarget.dataset.gid
      })
    }
    if (arg.currentTarget.dataset.gid == 0){
      that.setData({
        isChange: {
          isColect1:true,
          isColect2:false,
          isColect3: false,
          isColect4: false,
        },
      });
    } else if (arg.currentTarget.dataset.gid == 1) {
      that.setData({
        isChange: {
          isColect1: false,
          isColect2: true,
          isColect3: false,
          isColect4: false,
        },
      });
    } else if (arg.currentTarget.dataset.gid  == 2) {
      that.setData({
        isChange: {
          isColect1: false,
          isColect2: false,
          isColect3: true,
          isColect4: false,
        },
      });
    } else if (arg.currentTarget.dataset.gid  == 3) {
      that.setData({
        isChange: {
          isColect1: false,
          isColect2: false,
          isColect3: false,
          isColect4: true,
        },
      });
    }
  },

  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
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
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    wx.request({
      url: 'https://xxx/?page=' + page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 回调函数
        var moment_list = that.data.moment;
        const oldData = that.data.moment;
        that.setData({
          moment: oldData.concat(res.data.data)
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  lower:function(){
    let that = this;
    that.getCommdity();
  }

})