var videoList =  [
    '<iframe src="http://player.youku.com/embed/XNzI4NjQ5OTYw" frameborder=0 allowfullscreen></iframe>'
];


$$(function () {
    $$.load('img/[1,2,3,4,5,6,7,8,9,14,17,16,15,58].png;' +
            'img/[bg].jpg;img/[45,11,26].jpg', hideLoadingScene);
    $$.load('js/weixinbridge.js');
    $.$('#home-up').css({y: '-100%'});
    $.$('#home-down').css({y: '100%'});
});

function showLoadingScene( callback ) {
    $$.ui.showloadbar('#loadding-scene', {css:{opacity: '0', zIndex: ++maxz},rmcls:'HIDE',aniplay:{opacity: 1, time: 300, callback:callback} } );
}
function hideLoadingScene() {
    $$.ui.hideloadbar('#loadding-scene', {anistop:null,addcls:'HIDE'});
}

function footermenuTap(e) {
    var type = e && e.isstr ? e : $$.matchof(e.target.className, /type(\d+)/, 1);
    switch (type) {
        case '0':
            var sc = e.target.parent('.SCENE');
            if( sc && (sc.id == 'ade-pop-scene' || sc.id == 'ade-inset-scene' ) ){
                closeScene(e.target);
            }else{
                showScene2();
            }
            break;
        case '1':
            showScene2();
            break;
        case '2':
            showScene5();
            break;
        case '3':
            showRegScene();
            break;
        case '4':
            showScene3(e);
            break;
    }
}
function closeScene(scene) {
    if (!scene.hascls('SCENE'))
        scene = scene.parent('.SCENE');
    if (scene)
        scene.aniplay({opacity: 0, time: 400}, $$.hide);
}


var maxz = 0;
function changeScene(ishome, tar, callback) {
    tar = $$(tar);
    if (!tar)
        return;
    if (ishome) {
        $.$('#home-menu').display(none)
        showScene2MenuisOpen = false;
        $.$('#home-scene').css({display: block, zIndex: ++maxz});
        tar.css({display: 'block', zIndex: maxz - 1});
        $.$('#home-bg').aniplay({opacity: 0, time: 300});
        $.$('#home-up').aniplay({y: '-100%', time: 400});
        $.$('#home-down').aniplay({y: '100%', time: 400}, function () {
            tar.css({zIndex: ++maxz});
            if (callback && callback.isfn)
                callback();
        });
    } else {
        tar.css({display: block, opacity: '0', zIndex:++maxz}).aniplay({opacity: 1, time: 400}, callback);
    }
}


function showScene2() {
    $.$('#home-scene').css({display: block, zIndex: ++maxz});
    $.$('#home-bg').css({opacity: 0});
    $.$('#home-menu').display(none);
    $.timeout(function () {
        $.$('#home-bg').aniplay({opacity: 1, time: 500});
        $('#home-up,#home-down').aniplay({y: '0', time: 500}, function () {
            this.aniplay();
        });
    });
}
var showScene2MenuisOpen = false;
function showScene2Menu(clos) {
    if (clos === true || showScene2MenuisOpen) {
        showScene2MenuisOpen = false;
        $.$('#home-up').aniplay({y: '0', time: 200});
        $.$('#home-down').aniplay({y: '0', time: 200});
        $.$('#home-menu').aniplay({opacity: '0', time: 200, zIndex: '0'}, $$.hide);
    } else {
        showScene2MenuisOpen = true;
        $.$('#home-up').aniplay({y: '-6em', time: 300});
        $.$('#home-down').aniplay({y: '6em', time: 300});
        $.$('#home-menu').css({opacity: 0, display: block}).aniplay({opacity: '1', time: 300}, function () {
            this.css({zIndex: 10});
        });
    }
}
function rs7SceneTap(e) {
    var btn = $$.matchof(e.target.className, /btn(\d)/, 1);
    var pops = this.find('.pop .item'),
        curpop = this.find('.pop .item.SELED'),
        tarpop, dir = 1;
    switch (btn) {
        case '1':
            tarpop = pops[0];
            break;
        case '2':
            tarpop = pops[1];
            break;
        case '3':
            tarpop = pops[2];
            break;
        case '4':
            tarpop = pops[3];
            break;
        case '7':
            showScene3(e);
            return;
        case '8':
            showScene4(e);
            return;
        case '0':
            tarpop = curpop.prev() || pops[3];
            break;
        case '9':
            dir = -1;
            tarpop = curpop.next() || pops[0];
            break;
    }
    if (curpop == tarpop)
        return;
    if (curpop) {
        curpop.rmcls('SELED').aniplay({x: -1 * dir * window.innerWidth + 'px', opacity: 0, time: 300}, $$.hide);
    }
    if (tarpop) {
        tarpop.css({x: dir * window.innerWidth, display: block}).aniplay({x: 0, opacity: 1, time: 300}).addcls('SELED');
    }
}
function showScene3(e, isr8) {
    showLoadingScene();
    $$.load( isr8 ? 'img/|22,23,24,25|.png' : 'img/|18,19,20,21|.png', function () {
        hideLoadingScene();
        var s = $.$('#rs7-scene'), pop = $.$('#rs7-pop'), r8 = $.$('#r8-pic');
        if( isr8 ){
            s.rmcls('rs7').addcls('r8');
        }else{
            s.rmcls('r8').addcls('rs7');
        }
        pop.html( $$.str2clone( $$.html("[.P.item[img.W?src='img/+++',.btn.btn0,.btn.btn9]]").replace('+++',!isr8?'|18,19,20,21|.png':'|24,23,22,25|.png')).join('\n') );
        if( e && e.target.parent('#rs7-scene') ){
            if( !isr8 ){
                if( !r8.ishide() )
                    r8.aniplay({opacity:0, time:300}, $$.hide);
            }else if( r8.ishide() )
                r8.css({opacity:0,display:block}).aniplay({opacity:1, time:300});
        }else{
            if( !isr8 )
                $.$('#r8-pic').display(none);
            else
                $.$('#r8-pic').display(block);
            changeScene(e && e.target.parent('#home-scene'), '#rs7-scene');
        }
    });
}
function showScene4(e) {
    showScene3(e, true);
}
function showScene5(e) {
    changeScene(e && this.parent('#home-scene'), '#ade-scene');
}


function adeSceneTap(e, tar, i, par) {
    console.log(i);
    switch (i) {
        case 0: showAdeInsetScene('img/42.jpg'); return;
        case 1: showAdeInsetScene('img/43.jpg', '<div class="btn" style="top:24em;left:8em;height:5em;width:16em;" tap="showAdePopScene(\'img/99.jpg\')"></div>'); return;
        case 2: showAdeInsetScene('img/48.jpg', '<div class="btn" style="top:18em;right:0em;height:5em;width:16em;" tap="show98_97"></div>'); return;
        case 3: showAdeInsetScene('img/47.jpg'); return;
        case 4: showAdeInsetScene('img/49.jpg'); return;
        case 5: showAdeInsetScene('img/51.jpg'); return;
        case 6: showAdeInsetScene('img/50.jpg'); return;
        case 7: showTestScene(); return;
        case 8: showRS7RegScene();return;
        case 9: showAdeInsetScene('img/46.jpg', '<video style="top:70em;left:3.9em;width:24.1em;height:15.7em;" class="P" src="video/v.mp4"></video>');return;
        case 10: showVideoScene(); return;
        case 11: showPicScene(); return;
    }
    showAdeInsetScene('img/100.jpg');
}

function showAdeInsetScene(pic, content, callback) {
    showLoadingScene();
    var fn = function () {
        if( pic ){
            $.$('#ade-inset-bg').display().src = pic;
        }else{
            $.$('#ade-inset-bg').display(none).src = '';
        }
        $.$('#ade-inset-content').html( content || '' );
        setTimeout(function(){
            hideLoadingScene();
            changeScene(false, '#ade-inset-scene', callback);
            $.$('#ade-inset-scroll').mscroll.scrollto(0, 0);
        }, 500);
    };
    if( pic ){
        $.load(pic, fn);
    }else{
        fn();
    }

}
function showAdePopScene(pic, content) {
    showLoadingScene();
    $$.load(pic, function () {
        $.$('#ade-pop-bg').src = pic;
        $.$('#ade-pop-content').html( content || '' );
        setTimeout(function(){
            hideLoadingScene();
            changeScene(false, '#ade-pop-scene');
            $.$('#ade-pop-scroll').mscroll.scrollto(0, 0);
        }, 500);
    });
}

function showTestScene(){
    testAsk = [];
    showLoadingScene();
    $.load('img/|60,6_1,6_2,6_3,6_4,6_5,6_6,6_7,6_8,6_9,6_10,6_11,6_12|.jpg', function(){
        var html =  '<div id="test-scene" tap="testSceneTap"><img src="img/60.jpg" class="W">';
            html += '<div id="test-scene-content"><img id="test-scene-content-pic" src="img/6_1.jpg"><div class="A btn"></div><div class="B btn"></div></div>';
            html += '<div class="pic-empty"></div></div>';
        var html = $.html(html);
        showAdeInsetScene('', html);
    })
}
var testAsk = [];
function testSceneTap(e){
    if( testAsk.length == 6 )
        return;
    var tar = e.target;
    if( tar.hascls('btn') ){
        if( tar.hascls('A') ){
            testAsk.push('A')
        }else if(tar.hascls('B')){
            testAsk.push('B')
        }else{
            return;
        }
        if( testAsk.length < 6 ){
            $('#test-scene-content-pic').src = 'img/6_'+(testAsk.length+1)+'.jpg';
        }else if( testAsk.length == 6 ){
            $('#test-scene-content-pic').src = 'img/6_'+Math.rand(7,12)+'.jpg'
//            switch ( testAsk.join('') ){
//                case 'AA':
//                    $('#test-scene-content-pic').src = 'img/63.jpg';
//                    break;
//                case 'AB':
//                    $('#test-scene-content-pic').src = 'img/64.jpg';
//                    break;
//                case 'BA':
//                    $('#test-scene-content-pic').src = 'img/65.jpg';
//                    break;
//                case 'BB':
//                    $('#test-scene-content-pic').src = 'img/66.jpg';
//                    break;
//            }
        }
    }



}

function showVideoScene(){
    var html ='<div><div class="pic-empty"></div><img src="img/70.png" style="display:block;width: 60%;margin:0 2em 2em;"><br>';
    var list = videoList;
    for(var i=0; i<list.length; i++){
        html += '<div class="video-group">'+list[i]+'</div>';
    }
    html += '<div class="pic-empty"></div></div>';
    var html = $.html(html);
    showAdeInsetScene('',html);
}
function showPicScene(){
    var html ='<div id="picSceneContent" tap="picSceneTap"><div class="pic-empty"></div><img src="img/80.png" style="display:block;width: 60%;margin:0 2em 2em;"><[';
    for(var i=1; i<10; i++){
        html += '.pic-group.BOX[.BOXS[img.W?src="img/8_'+i+'.jpg"],.BOXS[img.W?src="img/8_'+(++i)+'.jpg"]],';
    }
    html += ']><div class="pic-empty"></div></div>';
    var html = $.html(html);
    showAdeInsetScene('',html);
}
function picSceneTap(e){
    var lastpic = $('#picSceneContent img.SELED');
    var img = e.target;
    if( lastpic ){
        lastpic.aniplay( {x:0, scale:1, time:300}, function(){this.rmcls('SELED')} );
        if( img == lastpic.get() )
            return;
    }
    if( img.nodeName == 'IMG' ){
        var src = img.src,
            p   = img.position();
        var scale = (window.innerWidth-20)/ p.width,
            height = p.height*scale;
        var y = (window.innerHeight-height)/2-p.y;
        img.addcls('SELED').aniplay( {x: -p.x+10, y:y, scale:scale, time:300} );
    }
}
function show98_97(e, i){
    if( i ){
        var pic = i==98?'img/98.jpg':'img/97.jpg';
        $$.load(pic, function () {
            $.$('#ade-pop-bg').src = pic;
        });
    }else{
        showAdePopScene('img/97.jpg','<div class="btn" style="top:4em;left:0em;height:5em;width:15em;" tap="show98_97(null, 97)"></div><div class="btn" style="top:4em;right:0em;height:5em;width:16em;" tap="show98_97(null, 98)"></div>');
    }
}
function showRegScene(e) {
    var code = $.cookie('reg-code');
    if( code ){
        showAdeInsetScene('img/44.jpg','<div class="code P" style="top:9em;right:1em;height:5em;">'+code+'</div>');
    }else{
        var html = '<div id="reg-box" class="P reg-box">'+
            '<[input.I.BB?name=name;placeholder=姓名,'+
            '.BOX.sex@menu[.BOXS.SELED@item?name=sex;value=man:先生,.BOXS@item?name=sex;value=woman:女士],'+
            'input.I.BB?name=mobile;placeholder=电话,'+
            'select.I.BB?name=selactivity;onchange="seledActivity(this)"[option?value=:意向参与活动类别,option:|驾乘体验,运动车体验,安全驾驶培训,冰雪体验|],'+
            'select.I.BB#activityplace?name=activityplace[option?value=:意向参与站点城市,option?value=:请先选择意向参与活动类别],'+
            'select.I.BB?name=mode[option?value=:意向车系,option:|A1,A1 Sportback,A1中国限量版,A3 Sportback,A3 Limousine,A4L,A4 allroad quattro,A5 Sportback,A5 Sportback风尚版,A5 Coupé,A5 Coupe风尚版,A5 Cabriolet,A5 Cabriolet风尚版,S5 Sportback,A5 Coupé,S5 Cabriolet,A5 Coupé,RS5 Cabriolet,A6L,A6 hybird,S6,A7 Sportback,S7 Sportback,RS7 Sportback,A8L,A8L W12,A8L hybird,S8,Q3,Q5,Q5 hybird,SQ5,Q7,TT Coupé,TT Coupé特别版,TT Roadster,TTS Coupé,TTS Roadster,R8 Coupé,R8 中国专享型,R8 Spyder,RS5 Coupé,RS5 Cabriolet,RS7 Sportback,任意一款|],'+
            '.BOX[select.I.BOXS#province@provice?target="#city",select.I.BOXS#city@city?target="#dealer";callback=setDealer],'+
            'select.I.BB#dealer[option?value=:经销商选择],'+
            '.text?tap="this.checkcls(SELED)";name=agree;value=true:本人同意一汽-大众奥迪把我的数据用于其它营销、调查和统计目的，并允许一汽-大众奥迪及特许经销商与我联系。,'+
            "I#reg-submit-btn?src='img/52.png';onclick=subimtRegest()"+
            ']>'+
            '</div>';
        var html = $.html(html);
        showAdeInsetScene('img/53.jpg',html, function(){
            area.checkRole('#reg-box');
            $$.ui.checkrole('#reg-box');
            $('input[name="mobile"]').attr('pattern', '[0-9]*');
        });
    }
}
function seledActivity( obj ){
    var options = '<opation>意向参与站点城市</opation>';
    switch (obj.value){
        case '驾乘体验':
            options += '<option>'+'5月17-5月18 苏州,5月29-6月2 天津,5月31-6月1 义乌,6月4-6月8 杭州,6月11-6月15 石家庄,6月14-6月15 温州,6月20-6月22 长沙,6月21-6月23 青岛,6月27-6月29 武汉,7月4-7月6 南京,7月5-7月6 温州,7月12-7月15 长春,7月12-7月13 贵阳,7月18-7月20 成都,7月25-7月27 兰州,8月初 上海,8月2 富阳,8月9-8月10 珠海,8月12-8月17 沈阳,8月22-8月24 上海,8月29-8月31 昆明,9月16-9月20 北京,9月18-9月21 大连,9月19-9月21 鄂尔多斯,9月27-9月28 宿迁,10月1-10月5 太原,10月16-10月19 重庆,10月17-10月19 常州,10月24-10月25 西安,11月19-11月20 全国总决赛,其它'.split(',').join('</opation><option>')+'</option>';
            break;
        case '运动车体验':
            options += '<option>'+'6月13-6月14 北京（课程一）,6月28-6月29 上海（课程一）,7月12 珠海（课程一）,7月13 珠海（课程一）,9月28 北京（课程一）,9月29 北京（课程一）,11月5 上海（课程一）,11月6 上海（课程一）,10月13-10月19 珠海（课程二）,11月5-11月10 上海（课程二）'.split(',').join('</opation><option>')+'</option>';
            break;
        case '安全驾驶培训':
            options += '<option>'+'6月17 北京,7月2 上海,10月3 北京,11月10 上海,其他'.split(',').join('</opation><option>')+'</option>';
            break;
        case '冰雪体验':
            options += '<option>其他</option>';
            break;
    }
    $('#activityplace').innerHTML = options;
}



function showRS7RegScene(){
    var html = '<div class="btn" style="top:16em;right:0em;height:5em;width:16em;" tap="showAdePopScene(\'img/95.jpg\')"></div>';
    html += '<div id="reg-rs7-box" class="P reg-box">'+
        '<[input.I.BB?name=name;placeholder=姓名,'+
        '.BOX.sex@menu[.BOXS.SELED@item?name=sex;value=man:先生,.BOXS@item?name=sex;value=woman:女士],'+
        'input.I.BB?name=mobile;placeholder=电话,'+
        ".BOX[select.I.BOXS#province2@provice?name=province;target='#city2',select.I.BOXS#city2@city?name=city;target='#dealer2';callback=setDealer],"+
        'select.I.BB?name=plan[option?value=:欲购车时间,option:|3个月内,4至6个月,7个月到一年内,一年以上,不确定|],'+
        'select.I.BB#dealer2?name=dealer[option?value=:经销商选择],'+
        '.text?tap="this.checkcls(SELED)";name=agree;value=true:本人同意一汽-大众奥迪把我的数据用于其它营销、调查和统计目的，并允许一汽-大众奥迪及特许经销商与我联系。,'+
        "I#reg-submit-btn?src='img/52.png';onclick=subimtRS7Regest()"+
        ']>'+
        '</div><iframe style="width:21em;height:13.5em;top:98em;left:5.5em;" class="P" src="http://player.youku.com/embed/XNzI4NjQ5OTYw" frameborder=0 allowfullscreen></iframe>';

    var html = $.html(html);
    showAdeInsetScene('img/96.jpg',html, function(){
        area.checkRole('#reg-rs7-box');
        $.ui.checkrole('#reg-rs7-box');
        $('input[name="mobile"]').attr('pattern', '[0-9]*');
    });
}
function setDealer(city, province, tar) {
    var option = dealer.dealerOption(city, province);
    if (tar && option) {
        for (var i = 0; i < tar.length; i++) {
            var elm = tar[i];
            elm.setAttribute('province', province);
            elm.setAttribute('city', city);
            elm.innerHTML  = '<option value="">经销商选择</option>' + option;
            elm.options[0].selected = true;
        }
    }
}
var subimtRegestblock = false;
function subimtRegest() {
    if (subimtRegestblock)
        return;
    var vals = $$.ui.getval('#reg-box');
    if( !vals.agree ){
        alert("请同意一汽-大众奥迪收集您的数据");
        return false;
    }
    // if( !$.strcheck(vals.name, 'name') ) {
    //     alert("请输入姓名");
    //     return false;
    // }
    // if (!$$.strcheck(vals.mobile, 'phone')) {
    //     alert("请正确输入手机号码");
    //     return false;
    // }
    if ( !vals.province) {
        alert("请正确选择省份");
        return false;
    }
    if ( !vals.city) {
        alert("请正确选择城市");
        return false;
    }
    if ( !vals.dealer) {
        alert("请正确选择经销商");
        return false;
    }
    subimtRegestblock = true;
    showLoadingScene();
    vals.type = 'ade';
    vals.username = vals.name;
    console.log(vals);
    $.ajax({
      url: "/active/join/6",
      type: 'POST',
      data: vals,
      dataType: 'json',
      success: function(msg) {
        console.log(msg);
        if (msg.recode === 200) {
          return alert('预约成功');
        } else {
          return alert(msg.reason);
        }
      }
    });
    // $.subimt('/active/join/6', vals, function(r){
    //     subimtRegestblock = false;
    //     hideLoadingScene();
    //     if(r.recode == 200 ){
    //         // $.cookie('reg-code',r.code,100);
    //         // showAdeInsetScene('img/44.jpg','<div class="code P" style="top:9em;right:1em;height:5em;">'+r.code+'</div>');
    //         // closeScene($('#reg-scene'));
    //         alert("注册成功");
    //     }else{
    //         alert(r.msg);
    //     }
    // }, this)
}
var subimtRS7Regestblock = false;
function subimtRS7Regest() {
    if (subimtRS7Regestblock)
        return;
    var vals = $$.ui.getval('#reg-rs7-box');
    if( !vals.agree ){
        alert("请同意一汽-大众奥迪收集您的数据");
        return false;
    }
    if( !$.strcheck(vals.name, 'name') ) {
        alert("请输入姓名");
        return false;
    }
    if (!$$.strcheck(vals.mobile, 'phone')) {
        alert("请正确输入手机号码");
        return false;
    }
    if ( !vals.province) {
        alert("请正确选择省份");
        return false;
    }
    if ( !vals.city) {
        alert("请正确选择城市");
        return false;
    }
    subimtRS7Regestblock = true;
    showLoadingScene();
    vals.type = 'RS7';
    $.subimt('regist.php', vals, function(r){
        hideLoadingScene();
        if(r.state == 'ok' ){
            $('#reg-rs7-box').aniplay({opacity:'0.5', time:300});
        }else{
            alert(r.msg);
        }
    }, this)
}

function scrollfn(e) {
}