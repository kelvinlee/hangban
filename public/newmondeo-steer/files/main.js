$(document).ready(function () {
    // init();
    var arr;
    resizeObj();
    fullSel(_p, $('.sel-prov'), 1);
    $('.sel-prov').on('change', fullCity);

    $('.end .link').delegate('.l', 'tap', winopen);
    $('.end .next').on('tap', nextLi);
    $('.end .pre').on('tap', preLi);
    arr = location.href.match(/#.*/);
    console.log();
    if (arr && arr[0] == '#form') {
        go('form');
    }
    if (arr && arr[0] == '#retry') {
        reTry();
    }
});
var checkWx = function () {
    if (typeof WeixinJSBridge == "undefined") {
        alert('请在微信中打开')
    } else {
        window.open('http://ford2014.qq.com/forward/wxLogin1', "_blank");
    }
    
};
var nextLi = function (e) {
    e.stopPropagation();
    e.preventDefault();
    var liW = $('.end .content').width(),
        lis = $('.end .li'),
        ul = $('.end .ul'),
        i = parseInt(ul.attr('data-i'));
    if (i >= lis.length-1) {
        return;
    }
    i += 1;
    ul.attr('data-i', i);
    ul.css('-webkit-transform', 'translate3d(-'+100*i+'%, 0, 0)')

};
var preLi = function (e) {
    e.stopPropagation();
    e.preventDefault();
    var liW = $('.end .content').width(),
        lis = $('.end .li'),
        ul = $('.end .ul'),
        i = parseInt(ul.attr('data-i'));
    if (i <= 0) {
        return;
    }
    i -= 1;
    ul.attr('data-i', i);
    ul.css('-webkit-transform', 'translate3d(-'+100*i+'%, 0, 0)');
};
var winopen = function (e) {
    e.stopPropagation();
    e.preventDefault();
    window.open(shareObj[e.target.getAttribute('data-link')], "_blank"); 
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
        return;
    }
    $('.'+str).removeClass('hide');
    currPage.push(str);
    window.scrollTo(0,1);
    if (str == 'game') {


    }
    if (str == 'start') {
        $('body').addClass('height100');
        init();
    }
    if (str == 'end') {
        $('body').removeClass('height100')
    }
}
var fullSel = function (arr, dom, bool) {
    var a = arr;
    var html = bool==1 ? '<option>请选择</option>' : '';
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
    fullSel(arr, $('.sel-city'));
};
var fullCompany = function () {
    var prov = $('.sel-prov').val();
    var city = $('.sel-city').val();
    var arr;
    if (!_pc[prov]) { return; }
    // cars();
    if (!_pc[prov][city]) { return; }
    arr = _pc[prov][city];
    fullSel(arr, $('.sel-company'));
};
function checkTel(tel) {
   var mobile = /^1[3|5|8]\d{9}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
   return mobile.test(tel) || phone.test(tel);
}
var submitBtn = function () {
    if (!checkTel($('.mobile').val())) {
        alert('手机号格式不正确');
        return;
    }
    if (!$('.name').val()) {
        alert('“姓名”不能为空！');
        return;
    }
    if (!$('.sel-sex').val() || $('.sel-sex').val()=="称谓") {
        alert('“称谓”不能为空！');
        return;
    }
    if (!$('.sel-cars').val() || $('.sel-cars').val()=="选择车型") {
        alert('“选择车型”不能为空！');
        return;
    }
    if (!$('.mobile').val()) {
        alert('“手机号”不能为空！');
        return;
    }
    // if (!$('.sel-plan').val() || $('.sel-plan').val()=="请选择") {
    //     alert('“你的购车计划时间*”不能为空！');
    //     return;
    // }
    if (!$('.sel-prov').val() || $('.sel-prov').val()=="请选择") {
        alert('“您所在的省份*”不能为空！');
        return;
    }
    if (!$('.sel-city').val() || $('.sel-city').val()=="请选择") {
        alert('“您所在的城市*”不能为空！');
        return;
    }
    // if (!$('.sel-company').val() || $('.sel-company').val()=="请选择") {
    //     alert('“离你最近的经销商*”不能为空！');
    //     return;
    // }
    // if (!$('.sel-bool').val() || $('.sel-bool').val()=="未选择") {
    //     alert('“您是否需要与经销商联系*”不能为空！');
    //     return;
    // }
    console.log($('[name=register]').serializeArray());
    $.ajax({
        url: "/active/join/7",
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
    
};