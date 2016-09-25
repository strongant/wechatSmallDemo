//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    motto: 'Hello World',
    userInfo: {},
    modalHidden: true,
    content: null,
    src: null,
    loadImage:null,
    imageUrl:null
  },
  markers: [ {
    latitude: 23.099994,
    longitude: 113.324520,
    name: 'T.I.T 创意园',
    desc: '我现在的位置'
  }],
  covers: [ {
    latitude: 23.099794,
    longitude: 113.324520,
    icaonPath: 'images/a.png',
    rotate: 10
  }, {
      latitude: 23.099298,
      longitude: 113.324129,
      iconPath: 'images/a.png',
      rotate: 90
    }],
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../logs/logs'
    })
  },
  modalChange: function( e ) {
    this.setData( {
      modalHidden: true
    })
  },
  modalTap: function( e ) {
    this.setData( {
      modalHidden: false
    })
  },
  getMyLocaiton: function( e ) {
    var that = this;
    wx.getLocation( {
      type: 'wgs84',
      success: function( res ) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData( {
          modalHidden: false,
          content: JSON.stringify( res )
        })
      }
    })
  },
  loadSomeData: function() {
    var that = this;
    wx.request( {
      url: 'https://raw.githubusercontent.com/strongant/pfplugin/master/bower.json',
      data: {
        x: '',
        y: ''
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function( res ) {
        console.log( res )
        that.setData( {
          modalHidden: false,
          content: JSON.stringify( res.data )
        })
      }
    })
  },
  getSystemInfo: function( e ) {
    var that = this;
    wx.getSystemInfo( {
      success: function( res ) {
        that.setData( {
          modalHidden: false,
          content: JSON.stringify( res )
        })
      }
    })

  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo( {
      sourceType: [ 'album', 'camera' ],
      maxDuration: 60,
      camera: [ 'front', 'back' ],
      success: function( res ) {
        that.setData( {
          src: res.tempFilePath
        })
      }
    })
  },
  startMusic:function(e){
    wx.playBackgroundAudio({
    dataUrl: 'http://play.baidu.com/?__m=mboxCtrl.playSong&__a=490468&__o=song/490468||playBtn&fr=altg_new3||www.baidu.com#',
    title: '测试音乐播放',
    coverImgUrl: 'images/a.png'
})
  }
  ,
  startVideo:function(e){
    var that = this
    wx.chooseImage({
  count: 1, // 默认9
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    var tempFilePaths = res.tempFilePaths
    that.setData( {
        loadImage: true,
        imageUrl:tempFilePaths[0]
      })
    console.log(tempFilePaths[0]);
  }
})
  }
  ,
  onLoad: function() {
    console.log( 'onLoad' )
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  }
})