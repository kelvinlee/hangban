var _default, stage, gamimg, endCount;

var Line = (function() {
  function Line(args) {
    var max, min;
    this.args = args;
    this.parent = new createjs.Container();
    this.parent.alpha = args.alpha || 1;
    max = 3;
    min = 1;
    this.r = this.getrandom(max, min);
    this.initialize();
  }
  Line.prototype.initialize = function() {
    switch (this.r) {
      case 1:
        this.createLeft();
        break;
      case 2:
        this.createRight();
        break;
      case 3:
        this.createCenter();
        break;
      default:
        console.log("none");
    }
    return this;
  };
  Line.prototype.createLeft = function() {
    var iconw;
    this.iconw = preload.getResult("ice").width;
    this.iconh = preload.getResult("ice").height;
    iconw = this.iconw;
    for (var i = 0, len = 10; i < len; i++) {
        this.parent.addChild(this.clone(iconw*i));
    }
    
    this.parent.height = 48;
    this.parent.width = 380;
    // this.bg = new createjs.Shape();
    // var g = this.bg.graphics.beginFill("#000").drawRoundRect(0, 0, 380, 48, 5);
    // g.closePath();
    // return this.parent.addChild(this.icon);
  };
  Line.prototype.createRight = function() {
    var iconw;
    this.iconw = preload.getResult("ice").width;
    this.iconh = preload.getResult("ice").height;
    iconw = this.iconw;
    for (var i = 0, len = 10; i < len; i++) {
        this.parent.addChild(this.clone(380-iconw*(i+1)));
    }
    this.parent.x = 640 - 380;
    this.parent.height = 48;
    this.parent.width = 380;
    // this.bg = new createjs.Shape();
    // var g = this.bg.graphics.beginFill("#000").drawRoundRect(0, 0, 380, 48, 5);
    // g.closePath();
    // return this.parent.addChild(this.icon);
  };
  Line.prototype.createCenter = function() {
    var iconw;
    this.iconw = preload.getResult("ice").width;
    this.iconh = preload.getResult("ice").height;
    iconw = this.iconw;
    for (var i = 0, len = 6; i < len; i++) {
        this.parent.addChild(this.clone(iconw*i));
        this.parent.addChild(this.clone(640-iconw*(i+1)));
    }
    this.parent.height = 48;
    this.parent.width = 640;
  };

  Line.prototype.clone = function(x) {
    var icon = new createjs.Bitmap(preload.getResult("ice"));
    icon.x = x || 0;
    icon.y = 0;
    return icon;
  };
  Line.prototype.getrandom = function(max, min) {
    return parseInt(Math.random() * (max - min + 1) + min);
  };
  Line.prototype.hitLine = function(pointx, pointy, hitx, hity) {
    var _x, _y;
    // if (checkHit) { return; }
    if (this.r === 3) {
      return this.checkCenter(pointx, pointy, hity);
    }
    if (pointx > this.parent.x + this.parent.width) {
      return false;
    }
    if (pointx + hitx < this.parent.x) {
      return false;
    }
    if (pointy > this.parent.y + this.parent.height) {
      return false;
    }
    if (pointy + hity < this.parent.y) {
      return false;
    }
    _x = pointx - this.parent.x;
    _y = pointy - this.parent.y;
    switch (this.r) {
      case 1:
        return this.checkLeft(_x, _y, this.iconw, this.iconh, hity);
      case 2:
        return this.checkRight(_x, _y, this.iconw, this.iconh, hity);
    }
  };
  Line.prototype.checkCenter = function(pointx, pointy, hit) {
    var _x, _y;
    if (pointy > this.parent.y + this.parent.height) {
      return false;
    }
    if (pointy + hit < this.parent.y) {
      return false;
    }
    if (pointx > 210 && pointx < 640 - 210 - 58) {
      return false;
    }
    _x = pointx - this.parent.x;
    _y = pointy - this.parent.y;
    console.log(1)
    if (_y <= this.iconh - 2 && _y > this.iconh - hit - 4) {
      return GameOver(640/2-58/2);
    }
  };
  Line.prototype.checkRight = function(_x, _y, iconw, iconh, hit) {
    this.iconw = iconw;
    this.iconh = iconh;
    console.log(2)
    if (_y <= this.iconh - 2 && _y > this.iconh - hit - 4) {
      return GameOver(210/2-58/2);
    }
  };
  Line.prototype.checkLeft = function(_x, _y, iconw, iconh, hit) {
    this.iconw = iconw;
    this.iconh = iconh;
    console.log(3)
    if (_y <= this.iconh - 2 && _y > this.iconh - hit - 4) {
      return GameOver(640-210/2-58/2);
    }
  };
  return Line;
})();

var Box = (function() {
  var p;
  function Box(args) {
    this.args = args;
    this.parents = new createjs.Container();
    this.initialize();
  }

  // p = Box.prototype = new createjs.Container();

  Box.prototype.initialize = function() {
    this.img = preload.getResult("box");
    this.init();

  }

  Box.prototype.init = function() {
    this.parent = new createjs.Bitmap(this.img);
    // console.log(this.box)
    this.parent.width = preload.getResult("box").width;
    this.parent.height = preload.getResult("box").height;
    // console.log(preload.getResult("box").width, preload.getResult("box").height)
    this.parent.x = parseInt(640-this.parent.width)*Math.random() + this.parent.width/2;
    this.parents.addChild(this.parent);
    // console.log(this.parents)

  }

  Box.prototype.hitBox = function(ox, oy, ow, oh) {
    // console.log(this.parent.x, this.parent.y);
    var box = this.parent;
    var boxX = box.x;
    var boxY = box.y;
    var boxW = box.width;
    var boxH = box.height;
    if (boxX<ox && (boxX+boxW)>ox && boxY<oy && (boxY+boxH)>oy) {
      return getRandomStatus(box);
    }
    if (boxX<(ox+ow) && (boxX+boxW)>(ox+ow) && boxY<oy && (boxY+boxH)>oy) {
      return getRandomStatus(box);
    }
    if (boxX<(ox+ow/2) && (boxX+boxW)>(ox+ow/2) && boxY<(oy+oh/2) && (boxY+boxH)>(oy+oh/2)) {
      return getRandomStatus(box);
    }
    if (boxX<ox && (boxX+boxW)>ox && boxY<(oy+oh) && (boxY+boxH)>(oy+oh)) {
      return getRandomStatus(box);
    }
    if (boxX<(ox+ow) && (boxX+boxW)>(ox+ow) && boxY<(oy+oh) && (boxY+boxH)>(oy+oh)) {
      return getRandomStatus(box);
    }
  }
  return Box;
})();

var car = (function() {
  var p;
  function Car(args) {
    var _ref;
    this.args = args;
    _ref = this.args, this.img = _ref.img, this.light = _ref.light, this.endCount = _ref.endCount;
    this.initialize();

    this.barde = function() {
      return this._barde();
    };
    
    this.setDefault = function() {
      return this._default();
    };
  }

  p = Car.prototype = new createjs.Container();

  Car.prototype.initialize = function() {
    var l1, l2;
    
    this.bar = new createjs.Bitmap(this.img);
    this.args.x = this.args.x + 0;
    this.args.y = this.args.y + 125/2;
    // console.log(this.args.x)
    this.bar.x = this.args.x;
    this.bar.y = this.args.y;
    this.bar.se = 1.1;
    this.bar.sd = 0.9;
    this.bar.big = true;
    this.bar.Mx = this.args.x;
    this.bar.My = this.args.y;
    this.bar.move = false;
    this.bar.canmove = true;
    this.bar.addEventListener('mousedown', this.touchstart);
    this.bar.addEventListener('pressup', this.touchend);
    this.bar.addEventListener('pressmove', this.touchmove);
    
    this.light = new createjs.Bitmap(this.light);
    this.light.x = this.args.lx;
    this.light.y = this.args.ly - 125;
    this.light.alpha = 1;

    this.led = new createjs.Bitmap(preload.getResult('led'));
    this.led.w = preload.getResult('led').width;
    this.led.h = preload.getResult('led').height;
    this.led.x = 100;
    this.led.y = _default.height - this.led.h - 10;
    this.led.alpha = 0.4;

    this.lka = new createjs.Bitmap(preload.getResult('lka'));
    this.lka.w = preload.getResult('lka').width;
    this.lka.h = preload.getResult('lka').height;
    this.lka.x = 240;
    this.lka.y = _default.height - this.lka.h - 18;
    this.lka.alpha = 0.4;

    p.addChild(this.led, this.lka, this.bar, this.light);
    return console.log("index:", p.getChildIndex(this.bar), p.getChildIndex(this.ligth1));
  };

  Car.prototype._barde = function() {
    return this.bar.scaleX = this.bar.scaleY = 1;
  };

  Car.prototype._default = function() {
    this.bar.Mx = this.bar.x - this.args.x;
    this.bar.My = this.bar.y - this.args.y;
    this.bar.move = true;
    return this.bar.canmove = true;
  };


  Car.prototype.touchstart = function(evt) {
    var o,
        light;
    // console.log(evt)
    if (evt.target.canmove) {
      // GameStar();
      o = evt.target;
      l = evt.target.parent.children[3];
      o.move = false;
      return o.offset = {
        x: o.x - evt.stageX,
        y: o.y - evt.stageY,
        lx: l.x - evt.stageX,
        ly: l.y - evt.stageY
      };
    }
  };

  Car.prototype.touchmove = function(evt) {
    var o,
        light;
    if (evt.target.canmove) {
      o = evt.target;
      l = evt.target.parent.children[3];
      o.x = evt.stageX + o.offset.x;
      o.y = evt.stageY + o.offset.y;
      l.x = evt.stageX + o.offset.lx;
      l.y = evt.stageY + o.offset.ly;
    }
  };

  Car.prototype.touchend = function(evt) {
    if (evt.target.canmove) {
      // evt.target.canmove = true;
      return 
      // GameOver();
    }
  };

  Car.prototype.opacity = function () {
    if (!this.opacity.key) {
        return;
    }
    this.bar.alpha += 0.06;
    if (this.bar.alpha > 1) {
        this.bar.alpha = 0.2;
        this.opacity.num++;
    }
    if (this.opacity.num >= 3) {
      this.bar.canmove = true;
    }
    if (this.bar.beginX && this.bar.x > this.bar.beginX) {
      this.bar.x -= 20;
      this.light.x -= 20;
    }
    if (this.bar.beginX && this.bar.x < this.bar.beginX) {
      this.bar.x += 20;
      this.light.x += 20;
    }
    if (this.opacity.num >= 4) {
        this.opacity.key = false;
        this.bar.alpha = 1;
        this.opacity.num = 0;
        return;
    }
  }

  return Car;
})();


manilsit = [
  {
    id: "car",
    src: "img/car.png"
  }, {
    id: "ice",
    src: "img/ice.png"
  }, {
    id: "light",
    src: "img/light.png"
  }, {
    id: "box",
    src: "img/box.png"
  }, {
    id: "lka",
    src: "img/lka.png"
  }, {
    id: "led",
    src: "img/led.png"
  }
];

moveHshow = 300;

_growH = 0.3;

downspeed = 12;

_dom = {};

lines = [];

nolightalpha = 0.2;

boxes = [];

_sp = 0;

thep = {};

again = 0;

championTime = 0;

lightTime = (new Date()).getTime();

endCount = 0;

isInit = false;

gaming = false;

preTime = 0;

loaded = false;

_default = {
  'width': 640,
  'height': 920
};
window.onresize = function () {
  $('canvas').css({"width": window.innerWidth, "height": window.innerHeight})
}
var init = function () {
    if (isInit) {
      return;
    }
    isInit = true;
    window.scrollTo(0, 1);
    h = window.innerHeight * 2;
    // h = document.body.clientHeight * 2;
    w = window.innerWidth * 2;
    // w = document.body.clientWidth * 2;
    if (w > 640) {
      h = (640 / w) * h;
      w = 640;
      // if (h < 800) {
      //   h = 800;
      // }
    }
    console.log(h, w)

    cvs = $("<canvas id='canvas' width='" + w + "' height='" + h + "'>");
    $(".game").append(cvs);
    canvas = document.getElementById("canvas");
    _default.height = h;
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(30);

    linebox = new createjs.Container();//??
    linebox.width = canvas.width;
    linebox.height = canvas.height;
    _dom.linebox = linebox;

    box = new createjs.Container();//??
    box.width = canvas.width;
    box.height = canvas.height;
    _dom.box = box;


    timeText = new createjs.Text('0.00', 'normal 32px Arial', "#fff");
    timeText.maxWidth = 1000;
    timeText.textAlign = "center";
    timeText.lineHeight = 46;
    timeText.x = canvas.width / 2;
    timeText.y = 70;
    timeText.alpha = 0;
    _dom.timeText = timeText;

    stage.addChild(linebox, timeText, box);
    stage.update();
    preload = new createjs.LoadQueue();
    preload.installPlugin(createjs.Sound);
    preload.on('complete', handleComplete, this);
    return preload.loadManifest(manilsit);
    
};
var handleComplete = function () {

    createjs.Ticker.addEventListener("tick", tick);
    FirstGameFrame();
    // addLine();
    // gaming = true;
};
var FirstGameFrame = function () {
    thep = new car({
        img: preload.getResult("car"),
        parent: stage,
        light: preload.getResult("light"),
        endCount: 1,
        lx: (_default.width - preload.getResult("light").width) / 2,
        ly: _default.height - preload.getResult("light").height - 150 + _sp,
        x: (_default.width - preload.getResult("car").width) / 2,
        y: _default.height - preload.getResult("car").height - 150 + _sp
    });
    stage.addChild(thep);
    loaded = true;
    return upload();
};
var GameOver = function(x) {
    gaming = false;
    thep.bar.canmove = false;
    thep.bar.beginX = x;
    endCount += 1;
    endData();
    if (endCount < thep.endCount) {
      preTime = usetime;
      $('.game .alt2').removeClass('hide');
    } else {
      go('end');
    }
};
var shareWidth = function () {
  if (typeof WeixinJSBridge == "undefined") {
    $('.end .absolute').addClass('wx');
  } else {
    $('.end .absolute').removeClass('wx');
  }
    // document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
  
  //   onBridgeReady();
  // alert(WeixinJSBridge)
};
var rankScore;
var endData = function () {
  shareWidth();
  var time = _dom.timeText.text;
  var htmlText,
      title,
      url,
      pic,
      uset;
  uset = parseInt(usetime/10000);
  uset = uset>6 ? 6 : uset;
  switch (uset) {
    case 0:
      htmlText = "这肯定不是你的真正实力，握紧方向盘，重新启动再试一次！GO！";
      title = "我刚才用了"+time.replace('’', '.').replace('”', '秒')+"完成挑战，技术已经无人能及，你敢来挑战吗？";
      break;
    case 1:
      htmlText = "当斗志被唤醒时，这样的成绩你肯定不会满意。高速平稳的驾驶将会带给你更高的分数！";
      title = "我刚才用了"+time.replace('’', '.').replace('”', '秒')+"完成挑战，技术已经无人能及，你敢来挑战吗？";
      break;
    case 2:
      htmlText = "一路驱车向前，这才是你的真正实力。再接再厉，新蒙迪欧LKA系统将助你赢取油卡！";
      title = "我刚才用了"+time.replace('’', '.').replace('”', '秒')+"完成挑战，技术已经无人能及，你敢来挑战吗？";
      break;
    case 3:
      htmlText = "一路驱车向前，这才是你的真正实力。再接再厉，新蒙迪欧LKA系统将助你赢取油卡！";
      title = "我刚才用了"+time.replace('’', '.').replace('”', '秒')+"完成挑战，技术已经无人能及，你敢来挑战吗？";
      break;
    case 4:
      htmlText = "你的驾驶技术已经无人能及，成功分享均有机会赢取油卡，和小伙伴们一较高下吧！";
      title = "我刚才用了"+time.replace('’', '.').replace('”', '秒')+"完成挑战，技术已经无人能及，你敢来挑战吗？";
      break;
    case 5:
      htmlText = "你的驾驶技术已经无人能及，成功分享均有机会赢取油卡，和小伙伴们一较高下吧！";
      title = "我刚才用了"+time.replace('’', '.').replace('”', '秒')+"完成挑战，技术已经无人能及，你敢来挑战吗？";
      break;
    case 6:
      htmlText = "你的驾驶技术已经无人能及，成功分享均有机会赢取油卡，和小伙伴们一较高下吧！";
      title = "我刚才用了"+time.replace('’', '.').replace('”', '秒')+"完成挑战，技术已经无人能及，你敢来挑战吗？";
      break;
    default:
      console.log("none");
  }
  dataForWeixin.desc = title;//.replace('#指尖上的激情#', '');
  title = encodeURIComponent(title);
  url = encodeURIComponent("http://mobi.mconnect.cn/newmondeo-steer");
  pic = encodeURIComponent("http://mobi.mconnect.cn/newmondeo-steer/img/wb.jpg");
  shareObj = {
      "qweibo": "http://v.t.qq.com/share/share.php?title="+title+"&url="+url+"&pic="+pic,
      "renren": "http://share.renren.com/share/buttonshare?title="+title+"&link="+url+"&pic="+pic,
      "weibo": "http://v.t.sina.com.cn/share/share.php?title="+title+"&url="+url+"&pic="+pic,
      "douban":"http://www.douban.com/share/service?bm=&image="+pic+"&href="+url+"&updated=&name="+title+"",
      "qzone": "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&title="+title+"&pic="+pic
  };
  if (usetime > championTime) {
    championTime = usetime;
    rankScore = parseInt(championTime/10);
    document.cookie = "score=" + rankScore + ';';
    $('.best').html('最佳：'+time.replace('’', '.').replace('”', '秒'));
  }
  $('.end .red').html(time.replace('’', '.').replace('”', '秒'));
  $('.end .text').html(htmlText);
};
var upload = function() {
  return stage.update();
};
var addLine = function(first) {
  var newline;
  // moveTimes = 0;
  downspeed += _growH;
  if (downspeed > 35) {
    downspeed = 35;
  }
  newline = new Line({
    id: "line" + lines.length
  });
  newline.parent.y = -newline.parent.height;

  _dom.linebox.addChild(newline.parent);
  // console.log(_dom.linebox.getChildIndex(newline.parent));
  lines.push(newline);
  return upload();
};
var addBox = function(first) {
  var newBox;

  downspeed += _growH;
  if (downspeed > 40) {
    downspeed = 40;
  }
  newBox = new Box({
    id: "box" + boxes.length
  });
  // console.log(newBox)
  newBox.parent.y = -newBox.parent.height-150;

  _dom.box.addChild(newBox.parent);
  // console.log(_dom.linebox.getChildIndex(newline.parent));
  boxes.push(newBox);
  return upload();
};

var removeLine = function(line) {
  var i, _i, _ref, _results;
  _results = [];
  for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    if (lines[i] === line) {
      _dom.linebox.removeChild(lines[i].parent);
      _results.push(delete lines[i]);
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};
var removeBox = function(box) {
  var i, _i, _ref, _results;
  _results = [];
  for (i = _i = 0, _ref = boxes.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    if (boxes[i] === box) {
      _dom.box.removeChild(boxes[i].parent);
      _results.push(delete boxes[i]);
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};
var reStart = function () {
  
  removeAllLine();
  removeAllBox();
  addLine();
  starTime = new Date().getTime();
  _dom.timeText.alpha = 1;
  endCount = 0;
  preTime = 0;
  moveTimes = 0;
  downspeed = 12;
  thep.barde();
  thep.setDefault();
  thep.bar.x = (_default.width - preload.getResult("car").width) / 2;
  thep.bar.y = _default.height - preload.getResult("car").height - 150 + _sp;
  thep.light.x = thep.args.lx;
  thep.light.y = thep.args.ly - 125;
  thep.endCount = 1;
  gaming = true;
  setTimeout(function () {
    addBox();
  }, 300)
  // _Breathing = true;
  return upload();

};
var startGame = function () {
  if ($('.body .car').hasClass('act')) {return;}
  $('audio')[0].play();
  setTimeout(function () {
    $('.body .car').addClass('act');
  }, 1000);
  setTimeout(function () {
    $('.body .car').addClass('move');
  }, 3500);
  setTimeout(function () {
    go('start');
    $('.game .alt2, .game .alt').addClass('hide');
    go321();
  }, 5500);
  setTimeout(function () {
     $('.body .car').removeClass('move').removeClass('act');    
  }, 6000)
};
var reTry = function () {
  go('start');
  $('.game .alt2, .game .alt').addClass('hide');
  go321();
};
var go321 = function () {
  if (!go321.count && go321.count!=0) { go321.count = 5; }
  var str = '<div class="go">'+((go321.count>0)?go321.count:'Go')+'</div>'
  $('.start').html(str);
  go321.count--;
  setTimeout(function () {
    if (go321.count > -1) {
      go321();
    } else {
      checkLoad();
    }
  }, 1000)
};
var checkLoad = function () {
  if (loaded) {
    go321.count = null;
    go('game');
    reStart();
  } else {
    setTimeout (function () {
      checkLoad();
    }, 500);
  }
};
var getRandomStatus = function (box) {
  if (box.alpha == 0) { return; }
  box.alpha = 0;
  var num = parseInt(Math.random()*2);
  console.log(num);
  if (num == 1) {
    thep.lka.alpha = 1;
    endCount = 0;
    thep.endCount = 2;
  }
  if (num == 0) {
    lightTime = (new Date()).getTime()+8000;
  }
};
var removeAllLine = function() {
  var i, _i, _ref;
  console.log("remove all line");
  for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    if (lines[i] != null) {
      _dom.linebox.removeChild(lines[i].parent);
    }
  }
  return lines = [];
};
var removeAllBox = function() {
  var i, _i, _ref;
  console.log("remove all box");
  for (i = _i = 0, _ref = boxes.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    if (boxes[i] != null) {
      _dom.box.removeChild(boxes[i].parent);
    }
  }
  return boxes = [];
};
var continueGame = function () {
    thep.opacity.num = 0;
    thep.opacity.key = true;
    // thep.bar.canmove = true;
    thep.lka.alpha = 0.4;

    $('.game .alt2, .game .alt').addClass('hide');
    setTimeout(function () {
        gaming = true;
        starTime = new Date().getTime();
    }, 3000);
};

var runTime = function() {
  if (gaming) {
    usetime = new Date().getTime() - starTime + preTime;
    return _dom.timeText.text = changeTimeText(Math.round(usetime / 1000 * 100) / 100);
  }
};

var changeTimeText = function(time) {
  var t;
  t = (time + "").replace(".", "’");
  if (/^[0-9]*[1-9][0-9]*$/.test(time)) {
    t + "’0";
  }
  return t + "”";
};
var lineAlpha = function () {
  var len = parseInt(lines.length/5);
  if (len%2 == 0) {
    return false;
  }
  if (len%2 == 1) {
    return true;
  }
};

tick = function(event) {
    thep.opacity();
    stage.update(event);
    if (gaming) {
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line != null) {
          if (lines.length>5 && (new Date()).getTime() > lightTime) {
            line.parent.alpha = nolightalpha;
            thep.light.alpha = 00;
            thep.led.alpha = nolightalpha;
          } else if ((new Date()).getTime() < lightTime) {
            thep.light.alpha = 1;
            line.parent.alpha = 1;
            thep.led.alpha = 1;
          } else {
            thep.light.alpha = 0;
            thep.led.alpha = nolightalpha;
          }
          line.parent.y += downspeed;
          line.hitLine(thep.bar.x, thep.bar.y, 58, 125);
          if (line.parent.y > _default.height - 110) {
            line.parent.alpha = 0;
          }
          if (line.parent.y > 1000) {
            removeLine(line);
          }
        }
      }
      for (_i = 0, _len = boxes.length; _i < _len; _i++) {
        box = boxes[_i];
        if (box != null) {
          box.parent.y += downspeed;
          // console.log(box)
          box.hitBox(thep.bar.x, thep.bar.y, 58, 125);
          if (box.parent.y > 1000) {
            removeBox(box);
          }
        }
      }
      if (lines[lines.length - 1].parent.y > moveHshow) {
        addLine();
        if (lines.length%14 == 0) {
          addBox();
        }
        console.log(lines.length)
      }
      runTime();
    }
};
var dataForWeixin={
    appId:  "",
    img:    "http://mobi.mconnect.cn/newmondeo-steer/img/wxicon.jpg",// "http://weixinniang-static.stor.sinaapp.com/durexsaylove/wxshare.jpg",
    url:    location.href,
    title:  "指尖上的激情",
    desc:   "自由放纵吧，骚年！速度与激情再度引爆！" || location.href || "For protection, click the condoms now.",
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