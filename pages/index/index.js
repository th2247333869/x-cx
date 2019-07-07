//index.js
//获取应用实例
var utils = require('../../utils/util.js')
var network = require('../../utils/network.js')


const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  doLogin:function(e){
   let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          network.request({
            url: utils.getUrl() +'wxlogin',
            data: {
              code: res.code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
              headurl: app.globalData.userInfo.avatarUrl,//这些是用户的基本信息
              nickname: app.globalData.userInfo.nickName,//获取昵称
              sex: app.globalData.userInfo.gender,//获取性别
              country: app.globalData.userInfo.country,//获取国家
              province: app.globalData.userInfo.province,//获取省份
              city: app.globalData.userInfo.city//获取城市
            },
            success: function (res) {
              console.log(res.data.message);
              that.jumpPage();
            }
          })   
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  getUUid:function(){
    console.log(utils.getUrl()+this.userInfo)
    wx.request({
      url:"test",
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' ,
                'Authorization': "1234"},
      success: function (res) {
        console.log(res.data + "你是从后台来的ma?");
        
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      },
    })
  },

  jumpPage:function () {
    wx.navigateTo({
      url: '/pages/index/module/chat'
    })
  }
})
/**
 * 跳转页面
 */


