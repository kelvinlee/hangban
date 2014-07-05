var tapGoods = function () {
    if (!tapGoods.i) {
        tapGoods.i = 1;
    }
    console.log($(this))
    var el = $(this);
    var score = parseInt(el.attr('data-s')),
        index = parseInt(el.attr('data-i'));
    // console.log(index)
    if (el.hasClass('off')) {
        el.removeClass('off');
        game.score -= score;
        $('.game .car .gc'+index).addClass('visible-hide');
        $('.game .car .gc'+index).removeClass('zindex'+tapGoods.i);
    } else {
        el.addClass('off');
        // game.win();
        game.score += score;
        $('.game .car .gc'+index).removeClass('visible-hide');
        $('.game .car .gc'+index).addClass('zindex'+tapGoods.i);
    }
    $('.game .score').html(game.score+'%');
    if (game.score == 100) {
        game.win();
        return;
    }
    if (game.score > 100) {
        alert("这件物品装不下啦，\n不能超过行李厢的100%容量喔~");
        el.removeClass('off');
        game.score -= score;
        $('.game .car .gc'+index).addClass('visible-hide');
        $('.game .score').html(game.score+'%');
    }
    tapGoods.i++;
    console.log(tapGoods.i)
    
};
var startGame = function () {
    go('game');
    game.start();
};

var go321 = function () {
  // if (!go321.count && go321.count!=0) { go321.count = 5; }
  // var str = '<span class="go">'+((go321.count>0)?go321.count:'Go')+'</span>'
  // $('.start .text').html(str);
  // go321.count--;
  // setTimeout(function () {
  //   if (go321.count > -1) {
  //     go321();
  //   } else {
  //     // checkLoad();
  //     // game.start();
  //     go('game');
  //     game.reStart();
  //   }
  // }, 1000)
    
};
var clickGo = function () {
    go('game');
    game.reStart();
};
var game = {
    goods: [],
    ct: null,
    time: 1500,
    score: 0,
    init: function () {
        $('.game .car>div').addClass('visible-hide');
        $('.off').removeClass('off');
        $('.score').html('0%');
        $('.time').html('15.00');
        this.goods = [];
        this.time = 1500;
        this.score = 0;
        if (this.ct) {
            clearInterval(this.ct)
        }
    },
    start: function () {
        var that = this;
        go('start', 1);
        that.init();
        // go321()
    },
    reStart: function () {
        var time,
            that = this;
            that.ct = setInterval(function () {
            that.time -= 4;
            time = that.time;
            $('.time').html(parseInt(time/100)+'.'+((time%100)<10?'0'+(time%100):(time%100)));
            if (that.time <= 0) {
                clearInterval(that.ct)
                $('.time').html('0.00');
                that.lose();
            }
        }, 40);
    },
    lose: function () {
        $('.result').removeClass('win').addClass('lose');
        $('.result .text img').attr('src', 'img/losetext.png');
        $('.result .text img').attr('onclick', 'startGame()');
        // $('.result .btn img').attr('src', 'img/retrybtn.png');
        $('.result .btn .b2').attr('onclick', "go('form')");
        gameText();
        go('result');
        if (this.ct) {
            clearInterval(this.ct)
        }
    },
    win: function () {
        if (this.ct) {
            clearInterval(this.ct)
        }
        $('.result').removeClass('lose').addClass('win');
        $('.result .text img').attr('src', 'img/wintext.png');
        $('.result .text img').attr('onclick', 'startGame()');
        // $('.result .btn img').attr('src', 'img/resultbtn.png');
        $('.result .btn .b2').attr('onclick', "go('form')");
        gameText();
        go('result');
        var arr = $('.li.off').removeClass('off');
        var str = '';
        for (var i = 0, len = arr.length; i < len; i ++) {
            str += arr[i].outerHTML;
        }
        $('.prize .content').html(str);
    }
};
var gameText = function () {
    var htmltext,
        redtext,
        title,
        url,
        pic;
    
    
    htmltext = "表现的这么不好，<br>哪敢派你上阵？";
    title = "#逐乐蓝天 E动之旅#小伙伴们，和东风标致3008一起28天、穿越11个城市，还等什么？告别雾霾，逐乐蓝天吧！马上报名戳链接："
    
    title = encodeURIComponent(title);
    url = encodeURIComponent("http://mobi.mconnect.cn/peugeot3008");
    pic = encodeURIComponent("http://mobi.mconnect.cn/peugeot3008/img/wb.jpg");
    shareObj = {
        "qweibo": "http://v.t.qq.com/share/share.php?title="+title+"&url="+url+"&pic="+pic,
        "renren": "http://share.renren.com/share/buttonshare?title="+title+"&link="+url+"&pic="+pic,
        "weibo": "http://v.t.sina.com.cn/share/share.php?title="+title+"&url="+url+"&pic="+pic,
        "douban":"http://www.douban.com/share/service?bm=&image="+pic+"&href="+url+"&updated=&name="+title+"",
        "qzone": "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&title="+title+"&pic="+pic
    };
};

var dataForWeixin={
    appId:  "",
    img:    "http://mobi.mconnect.cn/peugeot3008/img/001.jpg",// "http://weixinniang-static.stor.sinaapp.com/durexsaylove/wxshare.jpg",
    url:    location.href,
    title:  "逐乐蓝天“E动”之旅",
    desc:   "28天、穿越11个城市，跨越0-6000海拔，搭载E动..." || location.href || "For protection, click the condoms now.",
    fakeid: "",
};
(function(){
    var onBridgeReady=function(){
        // 发送给好友; 
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid":        dataForWeixin.appId,
                "img_url":      dataForWeixin.img,
                "img_width":    "120",
                "img_height":   "120",
                "link":             dataForWeixin.url,
                "desc":             dataForWeixin.desc,
                "title":            dataForWeixin.title
            }, function(res){});
        });
        // 分享到朋友圈;
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            WeixinJSBridge.invoke('shareTimeline',{
            "img_url":dataForWeixin.img,
            "img_width":"120",
            "img_height":"120",
            "link":dataForWeixin.url,
            "desc":dataForWeixin.desc,
            "title":dataForWeixin.desc || dataForWeixin.title
            }, function(res){});
        });
        // 分享到微博;
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            WeixinJSBridge.invoke('shareWeibo',{
            "content":dataForWeixin.title+' '+dataForWeixin.url,
            "url":dataForWeixin.url
            }, function(res){});
        });
        // 分享到Facebook
        WeixinJSBridge.on('menu:share:facebook', function(argv){
            WeixinJSBridge.invoke('shareFB',{
            "img_url":dataForWeixin.img,
            "img_width":"120",
            "img_height":"120",
            "link":dataForWeixin.url,
            "desc":dataForWeixin.desc,
            "title":dataForWeixin.title
            }, function(res){});
        });
    };
    console.log(dataForWeixin.img)
    if(document.addEventListener){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if(document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
    }
})();