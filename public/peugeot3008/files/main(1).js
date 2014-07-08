var up = [$('.body .i2')[0], $('.body .i1')[0], $('.result')[0], $('.resultnext')[0], $('.game-end')[0], $('.game-end')[0], $('.game2next .next2')[0], $('.game2next .next1')[0]];
var down = $('.down');
$(document).ready(function () {
    // Game2Start();
    for (var i = 0, len = up.length; i < len; i++) {
        up[i].addEventListener('touchstart', globalTouchHandler, false);
        up[i].addEventListener('touchmove', globalTouchHandler, false);
        up[i].addEventListener('touchend', globalTouchHandler, false);
    }

    // for (var i = 0, len = down.length; i < len; i++) {
    //     down[i][0].addEventListener('touchstart', globalTouchHandler, false);
    //     down[i][0].addEventListener('touchmove', globalTouchHandler, false);
    //     down[i][0].addEventListener('touchend', globalTouchHandler, false);
    // }
    // game.reStart();
    $('body>div').removeClass('none');
    $('.down').removeClass('none');
    $('.pageup').removeClass('none');
    // setTimeout(function () {
    //     $('.finger').removeClass('none');
    //     $('.finger .line').removeClass('none');
    // }, 1000);
    fullSel(_p, $('.sel-prov'), '省份');

    $('.sel-prov').on('change', fullCity);
    $('.sel-city').on('change', fullCompany);
    $('.label').on('click', boxTap);

    $('.box .sex').on('click', selsex);

    $('.share-btn').delegate('.b', 'click', winopen);
    // $('.result .b1, .game-end .b1, .last-page .text .b1').on('click', toggleShare);
    // $('.goods .content').delegate('.li', 'click', tapGoods);
    // $('.game .car').delegate('div', 'click', tapInGoods);

    // $('.pageup').delegate('.i', 'click', tapDown);
});
var windowReload = function () {
    window.location.reload();
};
var tapInGoods = function () {
    var el = $(this);
    var score = parseInt(el.attr('data-s')),
        index = parseInt(el.attr('data-i'));
    tapGoods.i--;
    if (!el.hasClass('visible-hide')) {
        

        el.addClass('visible-hide');
        game.score -= score;
        $('.game .content .g'+index).removeClass('off');
        el.removeClass('zindex'+tapGoods.i);
    } 
    $('.game .score').html(game.score+'%');
};
var currZ = '';
window.ondevicemotion = function (e) {
    if (!$('.game2next').hasClass('hide2')) { return; }
    if (currZ == '') {
        currZ = parseInt(e.accelerationIncludingGravity.z);
    }
    // $('.xxxx').html(e.accelerationIncludingGravity.z)
    if (-7 < parseInt(e.accelerationIncludingGravity.z)) {
        if (!$('.next1').hasClass('top')) {
            $('.next1').addClass('top');
        }
        
    } else {
        if ($('.next1').hasClass('top')) {
            $('.next1').removeClass('top');
        }
    }
}
window.onscroll = function () {
    var winS = $(window).scrollTop();
    var domH = $('.last-page').height();
    var winH = $('body').height();
    var num;
    // console.log(val);

    num = domH-winH-winS;
    num2 = 5200;

    if (num < 160) {
        num2 = 15+(num*0.3)
    }
    if (num < 480 && num > 160) {
        num2 = 60+((num-160)*1.37)
        num2 = num2>1500 ? 1500 : num2;
    }
    if (num < 820 && num > 480) {
        num2 = 520+((num-480)*1.3)
        num2 = num2>1100 ? 1100 : num2;
    }
    if (num < 1380 && num > 820) {
        num2 = 1100+((num-820)*0.67)
        num2 = num2>1474 ? 1474 : num2;
    }
    if (num < 1750 && num > 1380) {
        num2 = 1440+((num-1380)*4.7)
        num2 = num2>3196 ? 3196 : num2;
    }
    if (num < 2030 && num > 1750) {
        num2 = 3196+((num-1750)*5)
        num2 = num2>4600 ? 4600 : num2;
    }
    if (num < 2765 && num > 2030) {
        num2 = 4600+((num-2030)*0.16)
        num2 = num2>4718 ? 4718 : num2;
        num2 = num2<4600 ? 4600 : num2;
    }
    if (num < 3150 && num > 2765) {
        num2 = 4718-((num-2765)*2.77)
        num2 = num2>4718 ? 4718 : num2;
        num2 = num2<3650 ? 3650 : num2;
    }
    if (num < 3650 && num > 3150) {
        num2 = 3650+((num-3150)*4.0)
        num2 = num2>5200 ? 5200 : num2;
        num2 = num2<3650 ? 3650 : num2;
    }
    // console.log(num2)
    $('.mark span').html(parseInt(num2)+'m')
}
var openLastpage = function () {
    go('last-page');
    window.scrollTo(0, 5000);
};
var g1next = function () {
    g1next.ct = setTimeout(function () {
        $('.game .ul')[0].scrollLeft += 10;
        if ($('.game .ul')[0].scrollLeft >= $('.game .ul')[0].scrollWidth-$('.game .ul').width()) {
            clearTimeout(g1next.ct);
            return;
        }
        g1next();
    }, 40)
};
var g1pre = function () {
    g1pre.ct = setTimeout(function () {
        $('.game .ul')[0].scrollLeft -= 10;
        if ($('.game .ul')[0].scrollLeft <= 10) {
            clearTimeout(g1pre.ct);
            return;
        }
        g1pre()
    }, 40)
};
var winopen = function (e) {
    e.stopPropagation();
    e.preventDefault();
    var str = e.target.getAttribute('data-link');
    if (str == "weixin") {
        if (typeof WeixinJSBridge == "undefined") {
            alert('请在微信中打开')
        } else {
            go('wx', 1);
        }
        return;
    }
    window.open(shareObj[str], "_blank"); 
};
var game2End = function (bool) {
    if (bool == "win") {
        $('.game-end .text img').attr('src', 'img/wintext2.png');
        $('.game-end .btn img').attr('src', 'img/resultbtn.png');
        $('.game-end .btn .b2').attr('onclick', "go('form')");
    } else {
        $('.game-end .text img').attr('src', 'img/losetext2.png');
        $('.game-end .btn img').attr('src', 'img/retrybtn.png');
        $('.game-end .btn .b2').attr('onclick', "reStartGame2()");
    }
    gameText();
    go('game-end');
}
var toggleShare = function () {
    var page = $(this).attr('data-p')
    var e = $("."+page+" .share-btn");
    if (e.hasClass('act')) {
        e.removeClass('act');
    } else {
        e.addClass('act');
    }
};

function checkTel(tel) {
   var mobile = /^1[3|5|8]\d{9}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
   return mobile.test(tel) || phone.test(tel);
}
var submitForm = function (e) {
    if ($('.label input')[0].checked) {
        if (!$('.sel-dealer').val() || $('.sel-dealer').val()=="经销商") {
            alert('“经销商*”不能为空！');
            return;
        }
    }
    if (!checkTel($('.mobile').val())) {
        alert('手机号格式不正确');
        return;
    }
    if (!$('.name').val() || $('.name').val()=="请选择") {
        alert('“姓名*”不能为空！');
        return;
    }
    if (!$('.mobile').val() || $('.mobile').val()=="请选择") {
        alert('“手机号*”不能为空！');
        return;
    }
    if (!$('.sel-prov').val() || $('.sel-prov').val()=="省份") {
        alert('“省份*”不能为空！');
        return;
    }
    if (!$('.sel-city').val() || $('.sel-city').val()=="城市") {
        alert('“城市*”不能为空！');
        return;
    }
    // if (!$('.sel-dealer').val() || $('.sel-dealer').val()=="经销商") {
    //     alert('“经销商*”不能为空！');
    //     return;
    // }
    var str = "username="+$('.name').val()+"&mobile="+$('.mobile').val()+"&sex="+$('input[name="sex"]').val()+"&province="+$('.sel-prov').val()+"&city="+$('.sel-city').val()+"&dealer="+$('.sel-dealer').val()+"&ystl="+($('.checkbox')[0].checked?'是':'否')
    $.ajax({
        url: "/active/join/5",
        type: "POST",
        data: $('[name=reg]').serializeArray(),
        dataType: 'json', 
        success: function(msg){
            if (msg.recode === 200) {
              return alert('预约成功');
            } else {
              return alert(msg.reason);
            }
        }
    });
    // go();
    
};
var selsex = function () {
    var arr = $('.box .sex'),
        dom = $(this);
    $('.box .sex').removeClass('act')
    dom.addClass('act');
    if (dom.html() == "先生") {
        $('.sex-b')[0].checked = true;
    }
    if (dom.html() == "女士") {
        $('.sex-g')[0].checked = true;
    }
};

var fullSel = function (arr, dom, str) {
    var a = arr;
    var html = '<option>'+(str?str:'请选择')+'</option>';
    for (var i = 0, len = a.length; i < len; i ++) {
        if ($.isArray(a[i])) {
            html += '<option value='+a[i][1]+'>'+a[i][0]+'</option>';
        } else {
            html += '<option>'+a[i]+'</option>';                        
        }
    }
    dom.html(html);
};

var currProvince = null;
var fullCity = function (e) {
    var obj,
        str = $(this).val(),
        arr = [];

    if (!_pc[str]) { return; }
    
    currProvince = str;
    obj = _pc[str];
    for (var i in obj) {
        arr.push(i);
    }
    fullSel(arr, $('.sel-city'), '城市');
};
var fullCompany = function (e) {
    var city, arr;
    if (!_pc[currProvince]) { return; }
    city = $(this).val();
    if (!_pc[currProvince][city]) { return; }
    arr = _pc[currProvince][city];
    fullSel(arr, $('.sel-dealer'), '经销商');
};
var boxTap = function (e) {
    var bool;
    bool = $('input', this)[0].checked;
    console.log(bool)

    if (bool) {
        $(this).addClass('act');
        $('.sel-dealer').css('background-color', '#fff');
    } else {
        $(this).removeClass('act');
        $('.sel-dealer').css('background-color', '#ccc');
    }
};

var globalTouch = {};
function globalTouchHandler (e) {
    var e = e || window.event;
        
    if (e.touches.length <= 1) {
        switch(e.type){
            case 'touchstart':
            if (/ B/.test(e.target.className)) {
                return;
            }
            console.log(e.target.tagName)
            e.stopPropagation();
            e.preventDefault();
            var el=e.target
            if(!(e.target instanceof Element)) el=el.parentNode;
            globalTouch.startDOM=el;
            globalTouch.x=e.touches[0].clientX;
            globalTouch.y=e.touches[0].clientY;
            globalTouch.dx=0;
            globalTouch.dy=0;
            globalTouch.touches=e.touches;
            // addClass(el,'hover');
            break;

            case 'touchmove':
            globalTouch.dx=e.touches[0].clientX-globalTouch.x;
            globalTouch.dy=e.touches[0].clientY-globalTouch.y;
            var touches=e.touches;
            globalTouch.touches=e.touches;  
            break;

            case 'touchend':
            
            var el=e.target
            if (globalTouch.dy < -10 || globalTouch.dy > 10) {
                checkMove(globalTouch.dx, globalTouch.dy, el);
            } 

            globalTouch.dx = null;
            globalTouch.dy = null;
            // removeClass(el,'hover');
            break;
        }
    }
    if (e.touches.length > 1) {
        // window.top.location.reload();
    }
}
var checkMove = function (dx, dy, e) {
    //上滑
    if (dy < -20) {
        // changeImg('next');
        upPage(e);
    }

    // 下滑
    if (dy > 20) {
        downPage(e);
    }
};
var tapDown = function () {
    var el = $(this);
    var attr = el.attr('data-p');
    console.log(el)
    if (/i2/.test(attr)) {
        $('.body .info').addClass('h0');
    }
    if (/i1/.test(attr)) {
        startGame();
        $('.body .info').removeClass('h0');
    }
    if (/result/.test(attr)) {
        go('resultnext');
    }
    if (/resultnext/.test(attr)) {
        go('game2');
    }
    if (/game-end/.test(attr)) {

        go('game2next');
    }
    if (/next2/.test(attr)) {

        $('.game2next').addClass('hide2');

        setTimeout(function(){
            
            $('.game2next .next2').addClass('opacity');
        },1400);
        setTimeout(function(){
            $('.game2next .next1').css('z-index', '1');
            $('.game2next .next2').css('z-index', '0');
        },1600);
    }
    if (/next1/.test(attr)) {
        $('.game2next .next1').addClass('top');
    }
};
var upPage = function (e) {
    console.log(e.outerHTML)
    console.log(e.parentNode)
    var parent1 = e.parentNode;
    var parent2 = e.parentNode.parentNode;
    var parent3 = e.parentNode.parentNode.parentNode;
    if (/i2/.test(e.className) || /i2/.test(parent.className) || /i2/.test(parent2.className)) {
        $('.body .info').addClass('h0');
    }
    if (/i1/.test(e.className) || /i1/.test(parent.className) || /i1/.test(parent2.className)) {
        startGame();
        // $('.body .info').removeClass('h0');
    }
    if (/result/.test(e.className) || /result/.test(parent.className) || /result/.test(parent2.className)) {
        go('resultnext');
    }
    if (/resultnext/.test(e.className) || /resultnext/.test(parent.className) || /resultnext/.test(parent2.className)) {
        go('game2');
    }
    if (/game-end/.test(e.className) || /game-end/.test(parent.className) || /game-end/.test(parent2.className)) {

        go('game2next');
    }
    if (/next2/.test(e.className) || /next2/.test(parent.className) || /next2/.test(parent2.className)) {

        $('.game2next').addClass('hide2');

        setTimeout(function(){
            
            $('.game2next .next2').addClass('opacity');
        },1400);
        setTimeout(function(){
            $('.game2next .next1').css('z-index', '1');
            $('.game2next .next2').css('z-index', '0');
        },1600);
    }
    if (/next1/.test(e.className) || /next1/.test(parent.className) || /next1/.test(parent2.className)) {
        $('.game2next .next1').addClass('top');
    }
};
var downPage = function (e) {
    console.log(e.outerHTML)
    console.log(e.parentNode)
    var parent1 = e.parentNode;
    var parent2 = e.parentNode.parentNode;
    var parent3 = e.parentNode.parentNode.parentNode;
    // if (/i2/.test(e.className) || /i2/.test(parent.className) || /i2/.test(parent2.className)) {
    //     $('.body .info').addClass('h0');
    // }


    if (/i1/.test(e.className) || /i1/.test(parent.className) || /i1/.test(parent2.className)) {
        // startGame();
        $('.body .info').removeClass('h0');
    }
    if (/result/.test(e.className) || /result/.test(parent.className) || /result/.test(parent2.className)) {
        // $('.body .info').addClass('h0');
        go('body');
    }
    if (/resultnext/.test(e.className) || /resultnext/.test(parent.className) || /resultnext/.test(parent2.className)) {
        go('result');
    }
    if (/game-end/.test(e.className) || /game-end/.test(parent.className) || /game-end/.test(parent2.className)) {
        go('resultnext');
    }
    if (/next2/.test(e.className) || /next2/.test(parent.className) || /next2/.test(parent2.className)) {
        go('game-end');
    }



        // $('.game2next').addClass('hide2');

        // setTimeout(function(){
            
        //     $('.game2next .next2').addClass('opacity');
        // },1400);
        // setTimeout(function(){
        //     $('.game2next .next1').css('z-index', '1');
        //     $('.game2next .next2').css('z-index', '0');
        // },1600);
    
    // if (/next1/.test(e.className) || /next1/.test(parent.className) || /next1/.test(parent2.className)) {
    //     $('.game2next .next1').addClass('top');
    // }
};

var page = $('body>div');
var currPage = ['body'];
var go = function (str, bool) {
    console.log(currPage)
    
    if (!bool) {
        page.addClass('hide');
    }
    if (!str) {
        $('.'+currPage[currPage.length-2]).removeClass('hide');
        currPage.push(currPage[currPage.length-2]);
        window.scrollTo(0,1);
        return;
    }
    $('.'+str).removeClass('hide');
    currPage.push(str);
    window.scrollTo(0,1);
    // goControl(str);
};