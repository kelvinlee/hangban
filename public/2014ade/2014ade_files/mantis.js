function Mantis() {
    "use strict"
    for (var i = 0, len = Mantis._MantisCheckList.length; i < len; i++) {
        var fn = Mantis._MantisCheckList[i];
        if ((fn && fn.isfn)) {
            var ret = fn.apply(Mantis, arguments);
            if (ret)
                return ret;
        }
    }
}
function MantisElm(nodelist) {
    "use strict"
    if (nodelist && nodelist.length) {
        this.length = nodelist.length;
        for (var i = 0; i < this.length; i++) {
            this[i] = nodelist[i];
        }
    } else {
        return false;
    }
    return this;
}
String.prototype.isstr = true;
String.prototype.trim  = function (re) {
    if ((re && re.isstr)) {
        re = new RegExp('^' + re + '+|' + re + '+$', 'g');
    }
    return this.replace((re ? re : /^\s+|\s+$/g), '');
}
String.prototype.has = function (re) {
    if ((re && re.isstr))
        return this.indexOf(re) != -1;
    return re.test(this);
}
String.prototype.ellipsis = function (limit) {
    return this.length > limit ? this.substr(0, limit) + '...' : this;
}
Function.prototype.isfn = true;
Number.prototype.isnum = true;


if( typeof($) == 'undefined' )
    var $ = Mantis;
var $$ = Mantis;

//function log() {
//    if (console && Mantis.info.os != 'android')
//        console.log.apply(console, arguments);
//    else {
//        var logb = documet.getElementById('___logbox');
//        if (!logb) {
//            logb.document.createElement('div');
//            logb.style.cssText = 'position:fixed;bottom:0;left:0;right:0;padding:10px;backgrond-color:rgba(0,0,0,.5);color:#fff;';
//            documet.body.appendChild(logb);
//        }
//        logb.innerHTML += [].join.call(arguments, ' ') + '<br/>';
//    }
////    alert.call(window, arguments[0]);
//}


(function ($) {






/* **********************************************
     Begin md5.js
********************************************** */

// MD5
var md5 = (function() {
	var _hexcase = 0,
		_b64pad = "",
		_chrsz = 8;
	var md5 = function(s, type) {
		type = (type && typeof(md5[type]) != 'undefined') ? type : 'hex';
		return s ? md5[type](s) : '';
	}

		function core_md5(a, b) {
			a[b >> 5] |= 128 << b % 32, a[(b + 64 >>> 9 << 4) + 14] = b;
			for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; a.length > g; g += 16) {
				var h = c,
					i = d,
					j = e,
					k = f;
				c = md5_ff(c, d, e, f, a[g + 0], 7, -680876936), f = md5_ff(f, c, d, e, a[g + 1], 12, -389564586), e = md5_ff(e, f, c, d, a[g + 2], 17, 606105819), d = md5_ff(d, e, f, c, a[g + 3], 22, -1044525330), c = md5_ff(c, d, e, f, a[g + 4], 7, -176418897), f = md5_ff(f, c, d, e, a[g + 5], 12, 1200080426), e = md5_ff(e, f, c, d, a[g + 6], 17, -1473231341), d = md5_ff(d, e, f, c, a[g + 7], 22, -45705983), c = md5_ff(c, d, e, f, a[g + 8], 7, 1770035416), f = md5_ff(f, c, d, e, a[g + 9], 12, -1958414417), e = md5_ff(e, f, c, d, a[g + 10], 17, -42063), d = md5_ff(d, e, f, c, a[g + 11], 22, -1990404162), c = md5_ff(c, d, e, f, a[g + 12], 7, 1804603682), f = md5_ff(f, c, d, e, a[g + 13], 12, -40341101), e = md5_ff(e, f, c, d, a[g + 14], 17, -1502002290), d = md5_ff(d, e, f, c, a[g + 15], 22, 1236535329), c = md5_gg(c, d, e, f, a[g + 1], 5, -165796510), f = md5_gg(f, c, d, e, a[g + 6], 9, -1069501632), e = md5_gg(e, f, c, d, a[g + 11], 14, 643717713), d = md5_gg(d, e, f, c, a[g + 0], 20, -373897302), c = md5_gg(c, d, e, f, a[g + 5], 5, -701558691), f = md5_gg(f, c, d, e, a[g + 10], 9, 38016083), e = md5_gg(e, f, c, d, a[g + 15], 14, -660478335), d = md5_gg(d, e, f, c, a[g + 4], 20, -405537848), c = md5_gg(c, d, e, f, a[g + 9], 5, 568446438), f = md5_gg(f, c, d, e, a[g + 14], 9, -1019803690), e = md5_gg(e, f, c, d, a[g + 3], 14, -187363961), d = md5_gg(d, e, f, c, a[g + 8], 20, 1163531501), c = md5_gg(c, d, e, f, a[g + 13], 5, -1444681467), f = md5_gg(f, c, d, e, a[g + 2], 9, -51403784), e = md5_gg(e, f, c, d, a[g + 7], 14, 1735328473), d = md5_gg(d, e, f, c, a[g + 12], 20, -1926607734), c = md5_hh(c, d, e, f, a[g + 5], 4, -378558), f = md5_hh(f, c, d, e, a[g + 8], 11, -2022574463), e = md5_hh(e, f, c, d, a[g + 11], 16, 1839030562), d = md5_hh(d, e, f, c, a[g + 14], 23, -35309556), c = md5_hh(c, d, e, f, a[g + 1], 4, -1530992060), f = md5_hh(f, c, d, e, a[g + 4], 11, 1272893353), e = md5_hh(e, f, c, d, a[g + 7], 16, -155497632), d = md5_hh(d, e, f, c, a[g + 10], 23, -1094730640), c = md5_hh(c, d, e, f, a[g + 13], 4, 681279174), f = md5_hh(f, c, d, e, a[g + 0], 11, -358537222), e = md5_hh(e, f, c, d, a[g + 3], 16, -722521979), d = md5_hh(d, e, f, c, a[g + 6], 23, 76029189), c = md5_hh(c, d, e, f, a[g + 9], 4, -640364487), f = md5_hh(f, c, d, e, a[g + 12], 11, -421815835), e = md5_hh(e, f, c, d, a[g + 15], 16, 530742520), d = md5_hh(d, e, f, c, a[g + 2], 23, -995338651), c = md5_ii(c, d, e, f, a[g + 0], 6, -198630844), f = md5_ii(f, c, d, e, a[g + 7], 10, 1126891415), e = md5_ii(e, f, c, d, a[g + 14], 15, -1416354905), d = md5_ii(d, e, f, c, a[g + 5], 21, -57434055), c = md5_ii(c, d, e, f, a[g + 12], 6, 1700485571), f = md5_ii(f, c, d, e, a[g + 3], 10, -1894986606), e = md5_ii(e, f, c, d, a[g + 10], 15, -1051523), d = md5_ii(d, e, f, c, a[g + 1], 21, -2054922799), c = md5_ii(c, d, e, f, a[g + 8], 6, 1873313359), f = md5_ii(f, c, d, e, a[g + 15], 10, -30611744), e = md5_ii(e, f, c, d, a[g + 6], 15, -1560198380), d = md5_ii(d, e, f, c, a[g + 13], 21, 1309151649), c = md5_ii(c, d, e, f, a[g + 4], 6, -145523070), f = md5_ii(f, c, d, e, a[g + 11], 10, -1120210379), e = md5_ii(e, f, c, d, a[g + 2], 15, 718787259), d = md5_ii(d, e, f, c, a[g + 9], 21, -343485551), c = safe_add(c, h), d = safe_add(d, i), e = safe_add(e, j), f = safe_add(f, k)
			}
			return [c, d, e, f]
		}

		function md5_cmn(a, b, c, d, e, f) {
			return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
		}

		function md5_ff(a, b, c, d, e, f, g) {
			return md5_cmn(b & c | ~b & d, a, b, e, f, g)
		}

		function md5_gg(a, b, c, d, e, f, g) {
			return md5_cmn(b & d | c & ~d, a, b, e, f, g)
		}

		function md5_hh(a, b, c, d, e, f, g) {
			return md5_cmn(b ^ c ^ d, a, b, e, f, g)
		}

		function md5_ii(a, b, c, d, e, f, g) {
			return md5_cmn(c ^ (b | ~d), a, b, e, f, g)
		}

		function core_hmac_md5(a, b) {
			var c = str2binl(a);
			c.length > 16 && (c = core_md5(c, a.length * _chrsz));
			for (var d = Array(16), e = Array(16), f = 0; 16 > f; f++) d[f] = 909522486 ^ c[f], e[f] = 1549556828 ^ c[f];
			var g = core_md5(d.concat(str2binl(b)), 512 + b.length * _chrsz);
			return core_md5(e.concat(g), 640)
		}

		function safe_add(a, b) {
			var c = (65535 & a) + (65535 & b),
				d = (a >> 16) + (b >> 16) + (c >> 16);
			return d << 16 | 65535 & c
		}

		function bit_rol(a, b) {
			return a << b | a >>> 32 - b
		}

		function str2binl(a) {
			for (var b = [], c = (1 << _chrsz) - 1, d = 0; a.length * _chrsz > d; d += _chrsz) b[d >> 5] |= (a.charCodeAt(d / _chrsz) & c) << d % 32;
			return b
		}

		function binl2str(a) {
			for (var b = "", c = (1 << _chrsz) - 1, d = 0; 32 * a.length > d; d += _chrsz) b += String.fromCharCode(a[d >> 5] >>> d % 32 & c);
			return b
		}

		function binl2hex(a) {
			for (var b = _hexcase ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; 4 * a.length > d; d++) c += b.charAt(15 & a[d >> 2] >> 8 * (d % 4) + 4) + b.charAt(15 & a[d >> 2] >> 8 * (d % 4));
			return c
		}

		function binl2b64(a) {
			for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = "", d = 0; 4 * a.length > d; d += 3)
				for (var e = (255 & a[d >> 2] >> 8 * (d % 4)) << 16 | (255 & a[d + 1 >> 2] >> 8 * ((d + 1) % 4)) << 8 | 255 & a[d + 2 >> 2] >> 8 * ((d + 2) % 4), f = 0; 4 > f; f++) c += 8 * d + 6 * f > 32 * a.length ? _b64pad : b.charAt(63 & e >> 6 * (3 - f));
			return c
		}
	md5.hex = function(s) {
		return binl2hex(core_md5(str2binl(s), s.length * _chrsz));
	}
	md5.b64 = function(s) {
		return binl2b64(core_md5(str2binl(s), s.length * _chrsz));
	}
	md5.str = function(s) {
		return binl2str(core_md5(str2binl(s), s.length * _chrsz));
	}
	md5.hex_hmac = function(key, data) {
		return binl2hex(core_hmac_md5(key, data));
	}
	md5.b64_hmac = function(key, data) {
		return binl2b64(core_hmac_md5(key, data));
	}
	md5.str_hmac = function(key, data) {
		return binl2str(core_hmac_md5(key, data));
	}
	return md5;
})();

/* **********************************************
     Begin base.js
********************************************** */

    // Mantis privacy var
    var _MantisElmPrototype = MantisElm.prototype,
        _MantisCall = function (fn) { $._MantisCheckList.push(fn);},
        _re = {
            trim: /^\s+|\s+$/g,
            isTp: /\s([a-z|A-Z]+)/,

            isTag: /^\s*<(\w+|!)[^>]*>/i,
            sgT: /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
            r2s: /(\s|,){2,}/g,

            isImg: /\.(jpg|jpeg|png|gif)/i,

            url: /=(https?:\/\/[^&]+)/g,
            domain: /(\w+):\/\/([\w\.-]+)/,
            v2s: /\$([^\$]+)\$/g,

            vendor: /^(?:webkit|ms|moz)(\w)/i,
            rpvendor: /^(?:webkit|ms|moz)/i,
            noCSSKey: /^(?:scale|rotate|fn|x|y|callback|duration)$/,

            noVN: /[^\w_\$]/,
            fN: /function\s+(\w+)/i
        };


    $._MantisCheckList = []; // 注册给 Mantis 的方法

    $.info = {};
    $.__arr = [];
    $.__fn = function () {};
    var __hasOwnProperty = $.info.hasOwnProperty;

    $.help = function () { //显示介绍
        var n1 = 100, n2 = 20, n3 = 20;
        var fnlist = [], attrlist = {};
        for (var n in $$) {
            if (/^(?:ajax|ui|dom)$/.test(n)) continue;
            if (n.substr(0, 1) != '_') {
                if ($$[n].isfn) {
                    fnlist.push($.strfill(n, ' ', n2) + $.help.fn($$[n]));
                } else {
                    attrlist[n] = $$[n];
                }
            }
        }
        console.log($.strfill('Attribute ', '-', n1));
        for (var i in attrlist) {
            console.log('\t' + $.strfill(i, ' ', n3) + '= ', attrlist[i]);
        }
        fnlist = fnlist.sort();
        console.log($.strfill('Function ', '-', n1) + '\n\t' + fnlist.join('\n\t'));

        var elmlist = [], _elmpro = _MantisElmPrototype;
        for (var n in _elmpro) {
            if (n.substr(0, 1) != '_') {
                if (_elmpro[n].isfn) {
                    elmlist.push($.strfill(n, ' ', n2) + $.help.fn(_elmpro[n]));
                }
            }
        }
        elmlist = elmlist.sort();
        console.log($.strfill('Mantis obj ', '-', n1) + '\n\t' + elmlist.join('\n\t'));

        console.log($.strfill('Event ', '-', n1));
        var _eventpro = $.event;
        for (var n in _eventpro) {
            if (n.substr(0, 1) != '_') {
                console.log('\t' + $.strfill(n, ' ', n3-1)+(_eventpro[n].isfn?'':' = '), _eventpro[n].isfn ? $.help.fn(_eventpro[n]) :_eventpro[n] );
            }
        }

        var uilist = [], _uipro = $.ui;
        for (var n in _uipro) {
            if (n.substr(0, 1) != '_') {
                if (_uipro[n].isfn) {
                    uilist.push($.strfill(n, ' ', n2) + $.help.fn(_uipro[n]));
                }
            }
        }
        uilist = uilist.sort();
        console.log($.strfill('Mantis UI ', '-', n1) + '\n\t' + uilist.join('\n\t'));

    }
    $.help.fn = function (fn) { //返回函数参数及注释
        var str = $.strfill($.matchof(fn.toString(), /\([^\)]*\)/, 0), ' ', 40),
            note = $.matchof(fn.toString(), /\{\s*(\/\/.*?\n|".*?"|\/\*.+?\*\/)/, 1);
        str += note ? '\t\t\t' + note.trim() : '';
        return str;
    }




    $.matchof = function (str, re, index) { //获取匹配的值
        index = index || 0;
        var res = str.match(re);
        if (res) {
            return res[index >= 0 ? index : res.length - index ];
        }
        return false;
    };
    $.ellipsis = function (str, limit) { //截取字符串
        return str.length > limit ? str.substr(0, limit) + '...' : str;
    };

    $.istype = function (obj, typename) { //返回变量类型，【typename】检查是否相符
        var t = $.matchof(Object.prototype.toString.call(obj), _re.isTp, 1).toLowerCase();
        if (t == 'object') {
            try {
                if (!(obj.constructor && !__hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"))) {
                    t = 'json';
                }
            } catch (e) {
            }
        } else if (t.indexOf('element') != -1) {
            t = 'node';
        } else if (obj instanceof MantisElm) {
            t = 'mantis';
        }
        return typename ? t == typename : t;
    };
    $.isset = function (obj) { //判断变量是否有值
        return typeof(obj) != 'undefined' && obj != null;
    };
    $.isempty = function (obj) { //判读变量是否为空，0 非空
        if( typeof(obj) == 'number')
            return false;
        if ( !obj )
            return true;
        if (typeof(obj.length) == 'number')
            return !obj.length;
        for (var i in obj) {
            return false;
        }
        return true;
    }
    $.json = function (str, isattr) { //字串转 json
        if ((str && str.isstr)) {
            try {
                return JSON.parse(isattr ? str.replace(/`/g, '"') : str);
            } catch (e) {
                if( str.indexOf('`') != -1 )
                    str = str.replace(/`/g, '"');
                str = str.replace(/(\{|,)([\w-]+):/g, '$1"$2":');
                try {
                    return JSON.parse(str);
                } catch (e) {
                    return false;
                }
            }
        }
        return false;
    };

    $.str = function (obj) { //将变量转成字符串
        var t = $.istype(obj);
        if (t == 'array' || t == 'json') {
            return JSON.stringify(obj);
        } else if (t == 'string' || t == 'number') {
            return obj;
        }
        return '';
    };
    $.str2spawn = function (s) { //根据 [1,2,3] 中的内容几何倍繁殖字符串
        var v = [], r = [], t = s.replace(/\[([^\]]+)\]/g, function ($0, $1) {
            v.push($1.split(','));
            return '$'
        });
        if (v.length) {
            for (var j = 0; j < v.length; j++) {
                if (!r.length) {
                    for (var k = 0; k < v[j].length; k++) {
                        r.push(t.replace('$', v[j][k]));
                    }
                } else {
                    var rr = [];
                    for (var k = 0; k < v[j].length; k++) {
                        for (var l = 0; l < r.length; l++) {
                            rr.push(r[l].replace('$', v[j][k]));
                        }
                    }
                    r = rr;
                }
            }
            return r;
        } else {
            return [s];
        }
    }
    $.str2clone = function _str2arr2(str) { //根据 |1,2,3| 中的内容克隆字符串
        var v = [], r = [], t = str.replace(/\|([^\|]+)\|/g, function ($0, $1) {
            v.push($1.split(','));
            return '$'
        });
        if (v.length) {
            for (var j = 0; j < v.length; j++) {
                if (!r.length) {
                    for (var k = 0; k < v[j].length; k++) {
                        r.push(t.replace('$', v[j][k]));
                    }
                } else {
                    for (var k = 0; k < v[j].length; k++) {
                        if (r[k])
                            r[k] = r[k].replace('$', v[j][k]);

                    }
                }
            }
            return r;
        } else {
            return [str];
        }
    }
    $.strfill = function (str, fillstr, len) { //填充字符串 (fillstr 为数值时为复制字符串)
        if (fillstr.isnum) {
            while (fillstr--) {
                str += str;
            }
        } else if (len && str.length < len) {
            len = len - str.length;
            while (len--) {
                str += fillstr;
            }
        }
        return str;
    }
    $.str2const = function( str ){ //将字符串转为常量
        var arr = str.split(',');
        for(var i=0; i<arr.length; i++){
            if( arr[i].indexOf(':') != -1 ){
                var a = arr[i].split(':');
                window[a[0]] = a[1];
            }else{
                window[arr[i]] = arr[i];
            }
        }
    }
    $.strcheck = function (val, type) { //检查字符格式是否与类型相符
        if (val && val.isstr) {
            var len = val.length;
            switch (type) {
                case "id":
                    return !(2 > len || len > 60 || /[^\w]/g.test(val));
                case "zh":
                    return val && !/[^\u4E00-\u9FA5]/g.test(val);
                case "name":
                    return !(2 > len || len > 30 || /[^\-\s\&\w\u4E00-\u9FA5]/g.test(val));
                case "pw":
                    return !(2 > len || len > 30);
                case "url":
                    return !(4 > len || len > 200 || /[^\;\/\%\=:\w\.&\?\+\-]/g.test(val));
                case "email":
                    return /^[\w%\.+-]{3,30}@[\w\.-]{3,20}\.[a-z]{2,6}$/g.test(val);
                case "phone":
                    return /^\d{5,11}$/g.test(val);
                case "mobile":
                    return /^[086]*1[3-9]\d{9}$/g.test(val);
                case "desc":
                    return !(4 > len || len > 255 || /[<>]/g.test(val));
                case "comment":
                    return !(4 > len || len > 510 || /[<>]/g.test(val));
                case "num":
                    return !(1 > len || /[^0-9]/g.test(val));
                case "date":
                    return /[0-9]{4}([\- .\/])(?:0?[1-9]|10|11|12)\1(?:[12][0-9]|3[01]|0?[1-9])(?:[^\d]|$)/.test(val);
                default:
                    return !(/[^\w\@\u4E00-\u9FA5]/g.test(val));
            }
        }
        return false;
    }
    $.value = function(){
        var len=arguments.length
        for(var i= 0; i<len; i++ ){
            if( arguments[i] || typeof(arguments[i])=='number' )
                return arguments[i];
        }
        return arguments[len-1];
    }
    $.xml = function (str) { //解析XML
        return (new DOMParser).parseFromString(str, "text/xml");
    };
    $.fn = function (fn) { //返函数
        if (fn) {
            if ((fn && fn.isfn)) return fn;
            if ((fn && fn.isstr)) {
                if (/[^\w_\$]/.test(fn)) {
                    try {
                        eval('fn = function(){' + fn + '}');
                        return fn;
                    } catch (e) {
                    }
                } else if (window[fn] && (window[fn] && window[fn].isfn)) return window[fn];
            }
        }
        return false;
    };
    $.fname = function (fn) { //返函数名
        return fn.name || $.matchof(fn.toString(), _re.fN, 1) || 'fn_' + md5(fn.toString());
    };
    $.clone = function (obj) { //克隆变量
        if (null == obj || "object" != typeof obj) return obj;
        var t = $.istype(obj);
        switch (t) {
            case 'date':
                return new Date(obj.getTime());
            case 'array':
            case 'json':
                var copy = t == 'array' ? [] : {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = $.clone(obj[attr]);
                }
                return copy;
            case 'node':
                return obj.cloneNode(true);
            case 'nodelist':
                var r = new $._elm();
                r.length = obj.length;
                for (var i = 0; i < r.length; i++) {
                    r[i] = obj[i].cloneNode(true);
                }
                return r;

        }
        return obj;
    };
    $.keys = function (obj) { //返回 json 中的键名
        if (Object.keys)
            return Object.keys(obj);
        var ret = [];
        for (var key in obj) {
            ret.push(key);
        }
        return ret;
    };
    $.uniq = function (arr) { //去除 array 或 json 的重复
        return arr.filter(function (item, idx, that) {
            return that.indexOf(item) == idx;
        });
    };
    $.filter = function (obj, fn) { //过滤 array 或 json，回调函数返回 false 将过滤掉
        return Array.prototype.filter.call(obj, fn);
    };
    $.extend = function (obj) { //将复制多个变量合成为一个
        var copy = $.clone(obj);
        for (var i = 1, len = arguments.length; i < len; i++) {
            var arg = arguments[i];
            if (arg && typeof(arg) == 'object') {
                if ($.istype(arg) == 'array') {
                    var n = 0;
                    for (var key in copy) {
                        if (n < arg.length)
                            break;
                        copy[key] = $.clone(arg[n++]);
                    }
                } else {
                    for (var key in arg) {
                        copy[key] = $.clone(arg[key]);
                    }
                }
            }
        }
        return copy;
    };
    $.concat = function (obj) { //合并变量
        for (var i = 1, len = arguments.length; i < len; i++) {
            var arg = arguments[i];
            for (var key in arg) {
                obj[key] = arg[key];
            }
        }
        return obj;
    };
    $.intersects = function( obj ){
        if( $.istype(obj, 'array') ){
            var temp = obj;
            for (var i = 1, len = arguments.length; i < len; i++) {
                var arg = arguments[i], v, temp2 = [];
                for ( var j=0; j< temp.length; j++) {
                    if( arg.indexOf(temp[j]) != -1 ){
                        temp2.push( temp[j] );
                    }
                }
                temp = temp2;
            }
            return temp;
        }else{
            var keyss = [], len = arguments.length, temp = {};
            for (var i = 0; i < len; i++) {
                keyss.push($.keys(arguments[i]) );
            }
            keyss = $.intersects.apply($, keyss);
            for(var i=0; i<keyss.length; i++){
                temp[keyss[i]] = arguments[len-1][keyss[i]];
            }
            return temp;
        }
    }
    $.set = function (obj) { //修改变量
        for (var i = 1, len = arguments.length; i < len; i++) {
            var arg = arguments[i];
            for (var key in obj) {
                if ($.isset(arg[key]))
                    obj[key] = arg[key];
            }
        }
        return obj;
    };
    $.slice = function (obj, at, len) { //拆分数组类的对象
        return Array.prototype.slice.call(obj, at, len);
    };
    //    $.find = function (obj, val, key) { //查找2维数组
    //
    //    };
    $.timeout = function( callback, time, arg ){ //定时器
        if( !time ){
            if( callback.isfn || (callback = $.fn(callback)) ){
                var go = function(){
                    callback.apply(this, arg);
                }
                return $.requestAnimationFrame ? $.requestAnimationFrame(go) : setTimeout(go, 20);
            }
        }else{
            return (new timeout('timeout', callback, time, arg)).go();
        }
    }
    $.interval = function( callback, time, arg ){ //定时器
        return (new timeout('interval', callback, tim, arg)).go();
    }
    $.timeclear = function( tim ){ //删除定时器
        if( tim.hander && tim.clear ){
            tim.clear();
        }else{
            clearTimeout(tim);
            clearInterval(tim);
        }
    }
    $.timer  = function(type, callback, time, arg){//定时器
        return new timeout(type, callback, time, arg);
    };

    function timeout( type, callback, time, arg){
        if( type&&type.isfn){
            arg = time;
            time = callback;
            callback = type;
            type = 'timeout';
        }
        this.type      = type;
        this.hander    = 0;
        this.time      = time || 0;
        this.arg       = arg;
        this.callback  = callback;
        return this;
    }
    timeout.prototype.go  = function(){
        var that = this;
        this.clear();
        if( this.type == 'interval' ){
            this.hander = setInterval(function(){
                that.callback.apply( this, that.arg );
            }, this.time);
        }else{
            this.hander = setTimeout(function(){
                that.callback.apply( this, that.arg );
                that.hander = 0;
            }, this.time);
        }
        return this;
    }
    timeout.prototype.clear = function(){
        if( this.hander )
            if( this.type == 'interval' )
                clearInterval(this.hander);
            else
                clearTimeout(this.hander);
        this.hander = 0;
        return this;
    }

/* **********************************************
     Begin date.js
********************************************** */

Date.prototype.Y = Date.prototype.getFullYear;
Date.prototype.y = function(y){return typeof(y)=='number' && this.setFullYear(y) ? this : this.getYear();}
Date.prototype.m = function(m){return typeof(m)=='number' && this.setMonth(m-1) ? this : this.getMonth()+1;};
Date.prototype.M = function(){return Date.xx(this.m());};
Date.prototype.d = function(d){return typeof(d)=='number' && this.setDate(d) ? this : this.getDate();};
Date.prototype.D = function(){return Date.xx(this.d());};
Date.prototype.w = Date.prototype.getDay;
Date.prototype.h = function(d){return typeof(d)=='number' && this.setHours(d) ? this : this.getHours();};
Date.prototype.i = function(d){return typeof(d)=='number' && this.setMinutes(d) ? this : this.getMinutes();};
Date.prototype.s = function(d){return typeof(d)=='number' && this.setSeconds(d) ? this : this.getSeconds();};
Date.prototype.ds = function(){return Date.countDays(this.m(),this.Y());};
Date.prototype.ymd = function(){
	if( arguments.length ){
		var d = Date.ymd2obj.apply(Date, arguments);
		return d.set(d);
	}
	return this.Y()*10000+this.m()*100+this.d();
}
Date.prototype.ymdObj = function(){
	var ret = {y:this.Y(), m:this.m(), d:this.d(), w:this.w(), h:this.h(),i:this.i(),s:this.s()};
	ret.ymd = ret.y*10000+ret.m*100+ret.d;
	ret.timestamp = this.getTime();
	return ret;
}
Date.prototype.YMD = function(format){
	format = format.replace('Y', this.Y());
	format = format.replace('y', this.y());
	format = format.replace('M', this.M());
	format = format.replace('m', this.m());
	format = format.replace('D', this.D());
	format = format.replace('d', this.d());
	format = format.replace('W', Date.zh(this.w()));
	format = format.replace('h', this.h());
	format = format.replace('H', Date.xx(this.h()));
	format = format.replace('i', this.i());
	format = format.replace('I', Date.xx(this.i()));
	format = format.replace('s', this.s());
	format = format.replace('S', Date.xx(this.s()));
	return format;
}
Date.prototype.set  =  function( v ){
	if( arguments.length==1 && typeof(v) == 'number' )
		this.setTime(v);
	else{
		var d = Date.ymd2obj.apply(Date, arguments);
		this.setTime( d.timestamp );
	}
	return this;
}
Date.create = function(f){
	if( !arguments.length )
		return new Date();
	else if( arguments.length ==1 && typeof(f) == 'number' )
		return new Date(Date.num2sec(f));
	else{
		f = Date.ymd2obj.apply(Date, arguments);
		if( f )
			return new Date( f.timestamp );
	}
	return false;
}
Date.num2sec = function( num ){
	if(typeof(num) == 'number' ){
		if( num < 40000 ){
			return num*86400000;
		}
		var nums = (num+'');
		if( nums.length%2 )
			return num;
	}else{
		nums = num;
	}
	var	y = 1*nums.substr(0,4),
		m = 1*nums.substr(4,2),
		d = 1*nums.substr(6,2),
		h = 1*nums.substr(8,2),
		i = 1*nums.substr(10,2),
		s = 1*nums.substr(12,2);
	if( typeof(num) == 'number' && nums.length>=13 && ( m&&m>12 || d&&d>31 || h&&h>24 || i&&i>60 || s&&s>60 ) ){
		return num;
	}
	var d = new Date(y, m-1, d, h, i, s);
	return d.getTime();
}
Date.ymd2obj = function( f ){
	if( !f )
		f = new Date();
	if( f instanceof Date )
		return f.ymdObj();
	var def = {y:0,m:1,d:1,h:0,i:0,s:0};
	if( arguments.length > 1 ){
		extend(def,slice(arguments));
	}else{
		if( typeof(f) =='object' ){
			extend(def,f);
		}else if( typeof(f)=='number' || /^\d$/.test(f) ){
			return Date.create(f).ymdObj();
		}else{
			ymd = f.replace(/\D+/g,'.').split('.');
			for(var i=0,len=ymd.length; i<len; i++){
				ymd[i] = 1*ymd[i]
			}
			extend(def,ymd);
		}
	}
	if( def.y ){
		return (new Date(def.y, def.m-1, def.d, def.h, def.i, def.s)).ymdObj();
	}
	return false;
}
Date.ymd = function(){
	var ymd = Date.ymd2obj.apply(Date,arguments);
	return ymd.y*10000+ymd.m*100+ymd.d;
}
Date.ymd2d = function(){
	return (Date.ymd2sec.apply(Date,arguments)/86400000)>>0;
}
Date.s2d = function(s){
    return (s>10000000000 ? s : s*1000)/86400000>>0;
}
Date.ymd2sec = function(){
	var ymd = Date.ymd2obj.apply(Date, arguments);
	return ymd.timestamp;
}
Date.xx = function(n){
	return n<10 ? '0'+n : n;
}
Date.countDays = function(m, y){ return m==2 ? ((y||this.Y())%4?28:29) : 30+(m<=7?m%2:(m+1)%2);};
Date.zh = function(n){
	switch(n) {
		case 0: return '日';
		case 1: return '一';
		case 2: return '二';
		case 3: return '三';
		case 4: return '四';
		case 5: return '五';
		case 6: return '六';
		case 7: return '七';
		case 8: return '八';
		case 9: return '九';
		case 10: return '十';
		default:
			if( !n || n <= 10 || n >= 100)
				return '?';
			var t = Math.floor(n/10), s = n-t*10;
			return (t==1?'':this.zh(t))+'十'+this.zh(s);
	}
}
Date.time = function(){
    return Math.floor(Date.now()/1000);
}
function date(format, d){
	d = Date.create(d);
	return d.YMD(format);
}




/* **********************************************
     Begin math.js
********************************************** */

(function($$){
    Math.deg2rad = Math.PI / 180;
    Math.rad2deg = 180 / Math.PI;
    Math.rnd = function(num, r){
        r = Math.pow(10, r&&r<5?r:5);
        return ((num*r+(num<0?-0.5:0.5))>>0)/r
    }
    Math.angle = function(p1, p2){
        if(p1.length && p.length == 2)
            p2 = p1[1], p1 = p1[0];
        var x = Math.abs(p1.x - p2.x);
        var y = Math.abs(p1.y - p2.y);
        var z = Math.sqrt(x*x + y*y);
        var a = Math.asin(y / z) / Math.PI*180;
        if( p1.x <= p2.x ){
            if( p1.y > p2.y ){
                return -a-90;
            }else{
                return -90+a;
            }
        }else{
            if( p1.y > p2.y ){
                return 180-a;
            }else{
                return 90-a;
            }
        }
    }
    Math.distance = function(p1, p2){
        if(p1.length && p.length == 2)
            p2 = p1[1], p1 = p1[0];
        return Math.abs(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2))) >> 0;
    }
    Math.momentum = function(delta, time, maxDistUpper, maxDistLower, size) {
        var deceleration = 0.002,
            speed = Math.abs(delta) / time,
            newDist = (speed * speed) / (2 * deceleration),
            newTime = 0,
            outsideDist = 0;
        // Proportinally reduce speed if we are outside of the boundaries
        if (delta > 0 && newDist > maxDistUpper) {
            outsideDist = size / (6 / (newDist / speed * deceleration));
            maxDistUpper = maxDistUpper + outsideDist;
            speed = speed * maxDistUpper / newDist;
            newDist = maxDistUpper;
        } else if (delta < 0 && newDist > maxDistLower) {
            outsideDist = size / (6 / (newDist / speed * deceleration));
            maxDistLower = maxDistLower + outsideDist;
            speed = speed * maxDistLower / newDist;
            newDist = maxDistLower;
        }
        newDist = newDist * (delta < 0 ? -1 : 1);
        newTime = speed / deceleration;
        return {
            delta: newDist,
            time: newTime >> 0
        };
    }

    var _randTemp = [];
    Math.rand = function(min , max){
        if( typeof min == 'object'){
            var index = [] , temp = min, isarr = $$.istype( temp, 'array');
            index = isarr ? temp : $$.keys(temp);
            num = Math.rand( 0 , index.length-1 );
            if( max ){
                var limit = typeof max == 'number' ? max : index.length-1, loop = 1;
                if( limit >= index.length )
                    limit = index.length-1;
                if( limit != 0 ){
                    while( loop-- ){
                        for( var i in _randTemp ){
                            if( index[num] == _randTemp[i] ){
                                num = Math.rand( 0 , index.length-1 );
                                loop = 1;
                                break;
                            }
                        }
                    }
                    if( _randTemp.length >= limit )
                        _randTemp = [];
                    _randTemp.push( index[num] );
                }
            }
            return isarr ? temp[num] : temp[ index[num] ];
        }else if( typeof min == 'number'){
            return typeof max == 'number' ? Math.floor( Math.random()*(max-min+1) ) + min : Math.rand( 0 , min );
        }else{
            _randTemp = [];
            return Math.rand( 0 , 10 );
        }
    }
})(Mantis);


/* **********************************************
     Begin config.js
********************************************** */

/**
 * Created by wl on 14-5-21.
 */
;(function($$){
    "use strict"
    var mantisTag = document.querySelector('script[src*="mantis"]');
    $$.config = {
        host          : mantisTag.src.replace(/\/[^\/]+$/,'/'),
        plugin        : $$.json(mantisTag.getAttribute('plugin'), true),
        viewport      : mantisTag.getAttribute('viewport'),
        viewportscale : mantisTag.getAttribute('viewportscale'),
        uiunit        : mantisTag.getAttribute('uiunit'),
        maxwidth      : mantisTag.getAttribute('maxwidth'),
        noscroll      : mantisTag.getAttribute('noscroll'),
        framework     : mantisTag.getAttribute('framework') || 'web'
    }
})(Mantis);



/* **********************************************
     Begin callback.js
********************************************** */

function MantisCallbacks(doclear, waittime){
    "use strict"
    this.stack = [];
    this.lasttime = 0;
    this.maxlevel = 0;
    this.minlevel = 0;
    this.__clear = doclear;
    this.__wait  = waittime;
    this.__waittimer = null;
    return this;
}
$$.callbacks  = function(doclear, waittime){
    return (new MantisCallbacks(doclear, waittime));
}
;(function(c){
    "use strict"
    c.add    = function( fn, opt ){
        var opt = $$.concat({fn:fn, id:null, level:10, clear:this.__clear, wait:this.__wait, arg:[], time:Date.now()}, (typeof(opt)=='object'?opt:$$.slice(arguments, 1)) );
        if( this.get( opt.id || fn ) )
            return this;
        if( !opt.id )
            opt.id = $$.fname(fn);
        this.stack.push( opt );
        this.sort();
        return this;
    }
    c.rm     = function( id ){
        if( !id ){
            this.stack = [];
            return this;
        }
        if( (id&&id.isfn) )
            id = $$.fname(id);
        for( var i = this.stack.length-1; i >= 0; i-- ){
            if( id == this.stack[i].id ) {
                this.stack.splice(i, 1);
                break;
            }
        }
        return this;
    }
    c.get    = function( id ){
        if( (id &&id .isfn) )
            id = $$.fname(id);
        for( var i = this.stack.length-1; i >= 0; i-- ){
            if( id == this.stack[i].id ) {
                return this.stack[i];
            }
        }
        return false;
    }
    c.sort   = function( r ){
        this.stack.sort(function(a, b) {
            return (a.level - b.level || b.time - a.time)*(r?-1:1);
        });
        c.minlevel = this.stack[0].level;
        c.maxlevel = this.stack[this.stack.length-1].level;
        return this;
    }
    c.level  = function( id, level){
        this.get(id).level = level;
        return this.sort();
    }
    c.__bomb = function( opt, arg ){
        if( !opt )
            return;
        var that = this;
        clearTimeout(opt.__waittimer);
        opt.__waittimer = null;
        if( opt.wait ){
            clearTimeout(opt.tim);
            opt.tim = setTimeout(function(){
                opt.tim = null;
                opt.fn.apply(this, arg );
                if( opt.clear )
                    that.rm(opt.id);
            }, opt.wait);
        }else{
            clearTimeout(opt.tim);
            opt.tim = null;
            opt.fn.apply(this, arg );
            if( opt.clear )
                that.rm(opt.id);
        }
    }
    c.bomb   = function(arg, id, wait ){
        if( typeof id == 'number' )
            wait = id, id = null;
        var that = this;
        if( wait ) {
            if(!this.__waittimer){
//                this.__waittimer = setTimeout(function(){
//                    that.bomb(arg, id );
//                },wait || this.__wait);
            }
            return this;
        }else if( id ){
            this.__bomb( this.get(id), arg );
            return this;
        }else{
            for (var i = this.stack.length - 1; i >= 0; i--) {
                this.__bomb( this.stack[i], arg );
            }
            return this;
        }
    }
    c.isempty = function(){
        return !this.stack.length;
    }
})(MantisCallbacks.prototype);

/* **********************************************
     Begin info.js
********************************************** */

;(function($$){
    "use strict"
    var dom = document,
    $$_dom = {
        head: document.getElementsByTagName('head')[0],
        '*' : dom.createElement('div'),
        '**': dom.getElementsByTagName('div'),
        style : document.createElement("style"),
        body : document.getElementsByTagName('body')[0],
        __isReady : false
    }
    $$_dom.nodeProtot =  Node.prototype || $$_dom['*'].constructor;
    $$_dom.nodeListProtot = NodeList.prototype || $$_dom['**'].constructor;
    $$_dom.nodeProtot.matchSelector = $$_dom['*'].matchesSelector || $$_dom['*'].mozMatchesSelector || $$_dom['*'].webkitMatchesSelector || $$_dom['*'].msMatchesSelector;
    $$_dom.nodeListProtot.nodeType  = -1;
    MantisElm.prototype.nodeType    = -1;

    $$_dom.style.setAttribute("type", "text/css");
    $$_dom.head.appendChild($$_dom.style);

    $$_dom.onready    = function(callback, del) {
        if ($$_dom.__isReady && !del) return callback();
        if (!del) $$_dom.__isReady = dom.readyState == "complete" || dom.readyState == "loaded" || dom.readyState == "interactive";
        if ($$_dom.__isReady && !del) {
            setTimeout(callback, 50);
        } else {
            var en = $$.config.framework == 'phonegap' ? 'deviceready' : 'DOMContentLoaded';
            dom[del ? 'removeEventListener' : 'addEventListener'](en, callback, false);
        }
    };

    $$_dom.onresize   = function(callback, del) {
        var resize = typeof(window['onresize']) != 'undefined' ? 'resize' : 'orientationchange';
        if (del) {
            window.removeEventListener(resize, callback, false);
        } else {
            window.addEventListener(resize, callback, false);
        }
    };

    $$.dom = $$_dom;
    $$_dom.onready(function(){
        $$_dom.body = $$.$( $$.config.body || 'body');
    })

    var info = $$.info;
    var _ua   = (navigator ? navigator['userAgent'] : '').toLowerCase().replace(/mozilla[^\s]+/i, '').replace(/(\w+)(\W+)([\d\._]+)/ig, '$1-$3'),
        _uare = {
        ios : /(?:ipad|iphone|ipod).*os-([\d\._]+)/i,
        android : /android-([\d\._]+)/i,
        desktop:/(?!mobile)/i,
        wphone:/(?:windows phone) OS-([\d\._]+)/i,
        msie:/msid-([\d\._]+)/i,
        chrome:/chrome-([\d\._]+)/i
    };
    _uare.ipad = _uare.iphone = _uare.ipod = _uare.ios;
    info.is = function( r ){
        var m = r.match(/([a-z]*) ?([<>=]*)([\d\.-]*)/i);
        var ret = false, v;
        if(m.length ){
            if( _uare[m[1]] ){
                ret = _uare[m[1]].test(_ua);
                v = RegExp.$1;
                if(m[3]){
                    if( !m[2] ){
                        return m[3] == v;
                    }
                    eval('ret=('+parseFloat(v)+m[2]+parseFloat(m[3])+');');
                }
                return ret;
            }else{
                if( m[3] )
                    return false;
                return _ua.indexOf(m[1]) != -1;
            }
        }
        return ua.indexOf(r) != -1;
    }
    info.cop = info.is('iphone') && window.screen.height>560;
    info.hasTouch = typeof(window['ontouchstart']) != 'undefined';
    info.ieTouch =  typeof(window['onmspointerdown']) != 'undefined';
    info.eventListener = typeof(window['addEventListener']) != 'undefined';
    info.attachEvent = typeof(window['attachEvent']) != 'undefined';

    $$.cookie = function(name, value, time) {
        var cookie = document.cookie;
        if ( (name&&name.isstr) ) {
            if (value) {
                if (time) {
                    var date = new Date();
                    date.setTime(date.getTime() + 864e5 * time), time = date.toGMTString();
                }
                var c = name + "=" + encodeURIComponent($$.str(value));
                time && (c += "; expires=" + time);
                arguments[3] && (c += "; domain=" + arguments[3]),
                    arguments[4] && (c += "; path=" + arguments[4]),
                    arguments[5] && (c += "; secure");
                return document.cookie = c, true;
            }
            var val = $$.matchof(cookie,"(?:^|;)\\s*" + name.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1") + "=([^;]*)", 1);
                val = val ? decodeURIComponent(val) : false;
            return val ? $$.json(val) || val : false;
        } else if (typeof(name) == 'object') {
            time = value;
            var c = ''
            time && (c += "; expires=" + time);
            arguments[2] && (c += "; domain=" + arguments[2]),
                arguments[3] && (c += "; path=" + arguments[3]),
                arguments[4] && (c += "; secure");
            for (var k in name) {
                document.cookie = k + '=' + encodeURIComponent($$.str(name[k])) + c;
            }
            return true;
        }
        var data = {};
        value = cookie.replace(/\s/g, "").split(";");
        for (var i = 0; value.length > i; i++) {
            var val = value[i].split("=");
            val[1] && (data[val[0]] = decodeURIComponent($$.json(val[1])));
        }
        return data;
    };
    $$.localData = function(name, value) {
        if ( !$$.isset(localStorage) )
            return false;
        if ( (name&&name.isstr) ) {
            if (value == 'del') {
                return localStorage.removeItem(name), true;
            } else if (value) {
                return localStorage.setItem(name, $$.str(value)), true;
            }
            return $$.json(localStorage.getItem(name));
        } else if (typeof(name) == 'object') {
            for (var k in name) {
                localStorage.setItem(k, $$.str(name[k]));
            }
            return true;
        }
        return localStorage;
    };
})(Mantis);


/* **********************************************
     Begin html.js
********************************************** */

;(function($$){
    "use strict"
    $$.html = function( code ){

        if( code && code.nodeType ){





        }


        if( code.isstr && /(?:<\[|&lt;\[)/.test(code) ){
            var h = [];
            code = code.replace(/\n|\t+/g,'').replace(/(?:<\[|&lt;\[).*?(?:\]>|\]&gt;)/g, function($0){
                var key = '<'+md5($0)+'>';
                h.push(key);
                h.push($0);
                return key;
            });
            if(h && h.length){
                for(var j=0; j< h.length; j++){
                    code = code.replace(h[j], $$.html.parse( h[++j].replace(/(^(?:<|&lt;))|((>|&gt;)$)/g, '')));
                }
            }
            return code;
        }
        return $$.html.parse.apply(this, arguments);
    }

    $$.html.parse = function(code , deftag) {
        "use strict"
        var f = code;
        if( (f&&f.isstr) ){
            if( !(f = $$.html.str2arr(f)) )
                return code;
        }
        deftag = deftag || 'div';
        var html = '', tags = $$.html.tags, attr = $$.html.attr, singleTag = $$.html.singleTag, scope = {},
            $var = function($0, $1){
                if($1){
                    if( scope[$1] )
                        return scope[$1];
                    if(window[$1])
                        return window[$1].isfn ? window[$1]() : window[$1];
                }
                return $0;
            };
        for(var i=0, len = f.length; i<len; i++){
            var ff = f[i];
            if( (ff&&ff.isstr) ){
                var tag = deftag, att = {}, attstr = '', text='', x= 0, ss = {}, ssk = 0, tm = '';
                ff = ff.replace(/'/g,'"').replace(/\`/g,"'").replace(/^\w+/g,
                    function($0){ tag = tags[$0] || $0; return '';}
                );
                ff = ff.replace(/(['"])([^'"]+)\1/g,
                    function($0, $1, $2){ var k = '!'+(ssk++); ss[k] = $2; return k; }
                );
                ff = ff.replace(/(#|\.|:|@|\?|\*|\$)([^#\.:@\?\*]+)/g, function($0, $1, $2){
                    switch( $1 ) {
                        case '$':
                            var m = $2.match(/(\w+)=(.*)/);

                            if(m){
                                scope[m[1]] = m[2];
                                return '';
                            }
                            return $0;
                        case '#':
                            att['id'] = (ss[$2]||$2);
                            return '';
                        case '.':
                            att['class'] = (att['class'] ? att['class']+' ':'')+(ss[$2]||$2);
                            return '';
                        case '?':
                            var arr = $2.split(';')
                            for(var i=0,len=arr.length; i<len; i++){
                                var kv = arr[i].split('=');
                                att[kv[0]] = (att[kv[0]] ? att[kv[0]]+' ':'')+(ss[kv[1]]||kv[1]);
                            }
                            return '';
                        case '*':
                            x = $$.json((ss[$2]||$2).replace('(','["').replace(')','"]').replace(/;/g,'","'));
                            return '';
                        case '@':
                            att['role'] = (ss[$2]||$2);
                            return '';
                        case ':':
                            text = (ss[$2]||$2);
                            return '';
                    }
                }).replace(/(\s|,){2,}/g,' ');
                if( !ff && !text && $$.isempty(att) ){
                    continue;
                }
                attstr = attr(att)+ff;
                if( singleTag.indexOf(tag)!=-1 ){
                    tag = '<'+tag+' '+attstr+(text?' value="'+text+'"':'')+'/>'
                }else{
                    tag= '<'+tag+' '+attstr+'>'+text+(typeof(f[i+1])=='object'?$$.html(f[++i]):'')+'</'+tag+'>';
                }
                if( x ){
                    if( typeof(x)=='number' ){
                        for(var i=1; i<=x; i++){
                            tm += tag.replace(/{(\w+)\}/g, $var).replace(/\$/g, i);
                        }
                    }else if(x.length){
                        for(var i=0; i<x.length; i++){
                            tm += tag.replace(/{(\w+)\}/g, $var).replace(/\$/g, x[i]);
                        }
                    }
                }else{
                    tm += tag.replace(/\{(\w+)\}/g, $var);
                }
                html += $$.str2clone(tm).join('');
            }else{
                html += '<'+deftag+'>'+$$.html(ff)+'</div>';
            }
        }
        return html;
    }
    $$.html.str2arr = function( s ){
        var f = s.replace(/'/g,"`").replace(/"/g,"'").replace(/\[\s+/g, '[').replace(/\s+\]/g,']');
        f = f.replace(/(\[|,)\s*([^,\[\]]+)/g, '$1"$2",').replace(/,+\]/g,']').replace(/(\s|,){2,}/g,'$1');
        f = f.replace(/\|.*?\|/g, function($0){return $0.replace(/"|'/g,'')}).replace(/\{.*?\}/g, function($0){return $0.replace(/"|'/g,'')})
        var r = $$.json(f);
        if( typeof r != 'object' )
            return false;
        return r;
    }
    $$.html.tags = {'I':'img','S':'span','D':'div','T':'table','1':'h1','2':'h2','3':'h3','4':'h4','5':'h5','6':'h6'};
    $$.html.singleTag = 'area|br|col|embed|hr|img|input|link|meta|param'.split('|');
    $$.html.attr = function(att){
        var temp = [];
        for(var k in att){
            temp.push( k+'="'+att[k]+'"' );
        }
        return temp.join(' ');
    }

    $$.dom.onready(function(){
        var m = $$.$$('.MHTML');
        if(!m)
            return;
        for(var i= 0; i< m.length; i++){
            m[i].innerHTML = $$.html(m[i].innerHTML);
        }
        m.rmcls('MHTML');






    });


})(Mantis);

/* **********************************************
     Begin dom.js
********************************************** */

;(function($){
    "use strict"
    var dom = document;

    var _resizeCallback = $.callbacks(false),
        _readyCallback  = $.callbacks(true);
    $.resize     = function(){ _resizeCallback.add.apply(_resizeCallback, arguments); };
    $.ready      = function() { _readyCallback.add.apply(_readyCallback, arguments); };
    var _readytiming;
    $.dom.onready(function() {
        _readytiming = setInterval(function(){
            if(document.body && $.load.len()==0 ){
                clearInterval(_readytiming);
                $.isReady = true;
                _readyCallback.bomb();
            }
        },50);
    });
    $.dom.onresize(function(){  _resizeCallback.bomb(50); });
    _MantisCall(function( fn ){
        if( (fn &&fn .isfn) ){
            $.ready(fn);
            return this;
        }
    });

    var
    _divElm    = $.dom['*'],
    _elm       = {};
    _elm.tr    = dom.createElement('tbody');
    _elm.tbody = _elm.thead = _elm.tfoot = dom.createElement('table');
    _elm.td    = _elm.th = dom.createElement('tr');

    $.$$ = function(selector, context, outer) {
        if( !selector || !selector.isstr )
            return selector;
        if (_re.isTag.test(selector)) {
            return $.createElement(selector);
        }
        var dom = document;
        if( context&&context.isstr )
            context = $.$(context);
        if (context && context.nodeType) {
            if (context.nodeType == 1) {
                dom = context;
            } else if (context.nodeType == -1 && context.length) {
                var len = context.length,
                    ret = [];
                for (var i = 0; i < len; i++) {
                    if (outer && context[i].matchSelector(selector)) {
                        ret.push(context[i]);
                    }
                    ret = ret.concat(context[i].querySelectorAll(selector).slice());
                }
                return ret.length ? new MantisElm( ret ) : false;
            }
        }
        var ret = dom.querySelectorAll(selector);
        return ret.length ? ret : false;
    }
    $.$ = function (selector, context) {
        if( !selector || !selector.isstr )
            return selector;
        if (_re.isTag.test(selector)) {
            return $.createElement(selector);
        }
        if( context&&context.isstr )
            context = $.$(context);
        if (context && context.nodeType) {
            if (context.nodeType == 1) {
                return context.querySelector(selector);
            } else if (context.nodeType == -1 && context.length) {
                return context[0].querySelector(selector);
            }
        }
        return document.querySelector(selector) || false;
    }
    $.createElement = function (html) {
        if ( (html&&html.isstr) ) {
            if( !_re.isTag.test(html) )
                html = $.html(html);
            html = html.replace( _re.sgT, "<$1></$2>");
            var name = _re.isTag.test(html) && RegExp.$1;
            var ret = [], container = _elm[name] || _divElm;
            container.innerHTML = '' + html;
            var nodes = container.childNodes;
            for (var i = nodes.length - 1; i >= 0; i--) {
                var nodeType = nodes[i].nodeType;
                if (nodeType == 8 || (nodeType == 3 && !/[^\s]/.test(nodes[i].textContent))) {} else {
                    ret.unshift(nodes[i]);
                }
                container.removeChild(nodes[i]);
            }
            return ret.length ? new MantisElm( ret ) : false;
        } else if ( html.nodeType ) {
            return html;
        }
    }
    _MantisCall(function( obj ){
        if( typeof obj == 'object' ){
            if( obj instanceof MantisElm)
                return obj;
            if( obj.nodeType == 1 )
                return new MantisElm([obj]);
            return obj;
        }
        return /^#[\w-]+$/.test(obj) ? $.$.apply($$, arguments ) : $.$$.apply($$, arguments );
    });

    $.rm = function(){/*回调删除*/ this.rm();};
    $.hide = function(){/*回调隐藏*/ this.css({display:'none'});};

    $.elmExtend = function(name, fn){ //扩展 html 对象
        if( typeof(name)=='object' ){
            for(var k in name ){
                $.dom.nodeProtot[k]       = name[k];
                $.dom.nodeListProtot[k]   = name[k];
                _MantisElmPrototype[k] = name[k];
            }
        }else{
            $.dom.nodeProtot[name]       = fn;
            $.dom.nodeListProtot[name]   = fn;
            _MantisElmPrototype[name] = fn;
        }
    }


})(Mantis);

/* **********************************************
     Begin dom.elmfn.js
********************************************** */

Mantis.elmExtend(
    {
        '$'    :function() { /*返回Mantie对象*/ return this.nodeType == -1 ? this : new MantisElm([this]); },
        'get'  : function(i){ return this.nodeType == -1 ? this[i||0] : this; },
        'find'     :function(selector) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            return $.$$(selector, that);
        },
        'findWrap' :function(selector) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;

            while (that.nodeName != 'HTML') {
                if (that.matchSelector(selector)) {
                    return that;
                }
                that = that.parentNode;
            }
            return false;
        },
        'child'    :function( index ) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;

            if( that.children ){
                if( typeof index == 'number' )
                    return that.children[index];
                return new MantisElm(that.children);
            }
            var ret = [], childs = that.childNodes;
            for (var i = 0; i < childs.length; i++) {
                if ((childs[i] && childs[i].nodeType == 1)) ret.push(childs[i]);
            }
            if( typeof index == 'number' )
                return that.children[index];
            return new MantisElm(ret);
        },
        'parent'   :function(selector) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;

            var parentp = getComputedStyle(that,null)['position'] || that.style['position'];
            parentp = parentp=='static' || parentp=='relative' ? '' : /relative||position/i ;
            that = that.parentNode;
            while (that.nodeName != 'HTML') {
                if(selector == 'offset'){
                    if(that.nodeName == 'BODY')
                        return that;
                    if( !parentp || parentp.test( that.css('position') ) ){
                        return that;
                    }
                }else if (that.matchSelector(selector)) {
                    return that;
                }
                that = that.parentNode;
            }
            return false;
        },
        'next'     :function(selector) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            that = that['nextSibling'];
            while( that && that.nodeType && that.nodeType == 3 )
                that = that['nextSibling'];
            if (selector) {
                var ret = [];
                while (that) {
                    if (that.matchSelector(selector)) {
                        ret.push(that);
                    }
                    that = that['nextSibling'];
                    while( that && that.nodeType && that.nodeType == 3 )
                        that = that['nextSibling'];
                }
                return new MantisElm( ret );
            }
            return that;
        },
        'prev'     :function(selector) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            that = that.previousSibling;
            while( that && that.nodeType && that.nodeType == 3 )
                that = that.previousSibling;
            if (selector) {
                var ret = [];
                while (that) {
                    if (that.matchSelector(selector)) {
                        ret.push(that);
                    }
                    that = that['previousSibling'];
                    while( that && that.nodeType && that.nodeType == 3 )
                        that = that['previousSibling'];
                }
                return new MantisElm( ret );
            }
            return that;
        },
        'rm'       :function(selector) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                if (!selector){
                    if(that.parentNode){
                        that.parentNode.removeChild(that);
                    }
                }else{
                    var temp = that.find(selector);
                    if(temp) temp.rm();
                }
                //--
            };
            return this;
        },
        'append'   :function(tar) {
            var par = this.nodeType == -1 ? this[0] : this;
            var _tar = $$(tar);
            if( !_tar ){
                if( tar&&tar.isstr)
                    par.innerHTML += tar;
                return this;
            }
            var isNodeList=_tar&&_tar.nodeType==-1, _i=0, that=isNodeList?_tar[_i]:_tar;
            while ( !_i || (isNodeList&&(that=_tar[_i])) ){_i++;
                //-- code block
                par.appendChild(that);
                //--
            };
            $.event.load(par);
            return this;
        },
        'prepend'  :function(tar) {
            var par = this.nodeType == -1 ? this[0] : this;
            tar = $$(tar);
            if( !tar || !tar.length ) return this;
            var isNodeList=tar.nodeType==-1,_i=0,that=isNodeList?tar[_i]:tar;
            while ( !_i || (isNodeList&&(that=tar[_i])) ){_i++;
                //-- code block
                par.insertBefore(that, par.firstChild);
                //--
            };
            $.event.load(par);
            return this;
        },
        'appendto' :function(tar) {
            $$(tar).append(this);
            return this;
        },
        'html'     :function(html) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            if (arguments.length==0)
                return that.innerHTML;
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                //-- code block
                that.innerHTML = html
                $.event.load(that);
                //--
            };
            return this;
        },
        'css'      :function(name, val, int) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            var css = {}, returnVal = false;
            if( typeof(name) == 'object' ){
                css = name;
            }else if( val ){
                css[name] = val;
            }else{
                if( _re.istransform.indexOf(name) != -1 ){
                    val = $.matrix(that);
                    return val[name];
                }else{
                    name = $.csskey(name);
                    var ret =  getComputedStyle(that, null)[name] || that.style[name];
                    return !/\W/.test(ret) && parseFloat(ret) ? parseFloat(ret) : ret || 0;
                }
            }
            var sty = $.csstext(css, null, false, true, false, true),
                ismatrix = !$.matrix_isempty(css);
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                if( ismatrix ){
                    sty[$.cssk.transform] = $.matrix_css( $.matrix_f($.matrix(that), css ) );
                }
                var style = that.style;
                for(var i in sty ){
                    style[i] = sty[i];
                }
            };
            return this;
        },
        'attr'     :function(name, val, data) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            if (!val)
                return that ? ($.isset(that[name]) || data ? that[name] : that.getAttribute(name)) : false;
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                $.isset(that[name]) || data ? that[name] = val : that.setAttribute(name, val);
                //--
            };
            return this;
        },
        'addattr'  :function(name, val) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            var val = val.replace(_re.r2s, ' ').trim(), arrtRes = {};
            this.rmattr(name, val, arrtRes);
            if (val) {
                while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                    //-- code block
                    var attr = arrtRes[_i-1] || '';
                    attr = (attr + ' ' + val).trim();
                    $.isset(that[name]) ? (that[name] = attr) : (that.setAttribute(name, attr));
                    //--
                };
            }
            return this;
        },
        'rmattr'   :function(name, val, attrRes) {

            var isNodeList=this.nodeType==-1, _i=0, that = isNodeList?this[_i]:this;
            var valRE = val ? val.replace(_re.r2s, ' ').trim().split(' ') : '';
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                //-- code block
                if (valRE) {
                    var attr = that[name] ? that[name] : that.getAttribute(name);
                    if (!attr) {
                        if (attrRes) attrRes[_i-1] = '';
                        continue;
                    }
                    attr = attr.split(' ');
                    for (var j = valRE.length - 1; j >= 0; j--) {
                        var x = attr.indexOf(valRE[j]);
                        if (x >= 0) attr.splice(x, 1);
                    }
                    attr = attr.join(' ').replace(_re.r2s, ' ').trim();
                    if (attrRes) attrRes[_i-1] = attr;
                    if (!attrRes) that[name] ? that[name] = attr : that.setAttribute(name, attr);
                } else if (!attrRes) that[name] ? that[name] = '' : that.removeAttribute(name);
                //--
            };
            return this;
        },
        'cls'      :function(cls) {
            this.attr('className', cls);
            return this;
        },
        'addcls'   :function(cls) {
            this.addattr('className', cls);
            return this;
        },
        'rmcls'    :function(cls) {
            this.rmattr('className', cls);
            return this;
        },
        'hascls'   :function(cls) {
            var that = this.nodeType == -1 ? this[0] : this;
            if ( (cls&&cls.isstr) )
                cls = new RegExp('(?:^|\\s)(?:' + cls.trim().replace(/\s+/g, '|') + ')(?:\\s|$)');
            return cls.test(' '+that.className+' ');
        },
        'checkcls' :function(cls) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                //-- code block
                that.hascls(cls) ? that.rmcls(cls) : that.addcls(cls);
                //--
            };
            return this;
        },
        'position' :function(pos) {
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            if(arguments.length == 0 || pos.isstr){
                var docElem = document.documentElement;
                var rect = that.getBoundingClientRect(),  ret = {};
                ret.position = that.css('position');
                ret.y = rect.top+window.pageYOffset - docElem.clientTop;
                ret.x = rect.left+window.pageXOffset - docElem.clientLeft;
                ret.width = rect.width;
                ret.height = rect.height;
                ret.W = that.scrollWidth;
                ret.H = that.scrollHeight;
                ret.w = ret.width || ret.W;
                ret.h = ret.height || ret.H;
                ret.left = that.offsetLeft;
                ret.top = that.offsetTop;
                return pos&&pos.isstr ? ret[pos] : ret;
            }
            if(arguments.length==2){
                pos = {left:arguments[0],top:arguments[1]};
            }
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                //-- code block
                that.css(pos);
                //--
            };
            return this;
        },
        'positionby':function(tar) {
            var isNodeList = this.nodeType == -1, i = 0,
                that = isNodeList ? this[i] : this;
            tar = !tar ? that.parentNode : ( (tar&&tar.isstr) ? that.findWrap(tar) : tar);
            tar = tar.length ? tar[0] : tar;
            tar.id = tar.id || 'positionByParent';
            var pos = that.position(), par = that.parentNode, parpos;
            while (tar.id != par.id && par.nodeName!='BODY') {
                parpos = par.position();
                pos.top += parpos.top;
                pos.left += parpos.left;
                par = par.parentNode;
            };
            tar.id = tar.id == 'positionByParent' ? '' : tar.id;
            return pos;
        },
        'forEach'  :function(callback){
            if( this.length )
                Array.prototype.forEach.call(this, callback);
            else if( (callback&&callback.isfn) ){
                callback.call(this, this, 0);
            }
        },
        'slice'    :function(){
            if(this.nodeType == -1)
                return new MantisElm(Array.prototype.slice.apple(this,arguments));
            return this;
        },
        'indexOf'  :Array.prototype.indexOf,

        'display'  : function(val){
            return this.css({display:val||'block'});
        },
        "ishide"   : function(){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            var s = getComputedStyle(that, null);
            return s['display'] == 'none' || s['visibility'] == 'hidden'
        },
        "auto"     : function(operate){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                for( var f in operate ){
                    if( that[f] && that[f].isfn ){
                        if( $.istype(operate[f], 'array') )
                            that[f].apply(that, operate[f]);
                        else
                            that[f](operate[f]);
                    }
                }
                //--
            };
            return this;
        },
        timeout : function(callback, tim){
            var that = this;
            if( !tim ){
                return $.requestAnimationFrame(function(){callback.call(that);});
            }else{
                return setTimeout(function(){callback.call(that);}, tim);
            }
        }
// --------------------------------
    }
);

/* **********************************************
     Begin ajax.js
********************************************** */

;(function($$){
    "use strict"
    var
    _urlInfoa = document.createElement('a'),
    _ajaxOption = {
        url         : location.href,
        data        : '',
        type        : 'GET',
        async       : true,
        crossDomain : null,
        headers     : {'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8"},
        success     : $$.__fn,
        error       : $$.__fn,
        complete    : $$.__fn,
        timeout     : 0
    };

    $$.url       = function(url) {
        var a = _urlInfoa
        a.href = url;
        var info = {
            url       : a.href,
            protocol  : a.protocol,
            origin    : a.origin,
            port      : a.port || '80',
            pathname  : a.pathname,
            search    : a.search,
            param     : $$.url.get(a.search),
            host    : a.origin.replace(a.protocol+'//',''),
            file      : ''
        }
        url = info.pathname.split('/');
        var file = url[url.length-1];
        if( file && file.has('.') )
            info.file = file;
        return info;
    };
    $$.url.get   = function(name, url) {
        if( !_re.v2s.test(name) ) {
            url = name;
            name = null;
        }
        url = decodeURIComponent((url ? '?' + (url.indexOf('?') >= 0 ? url.split('?')[1] : url) : null) || window.location.search);
        if ( (name&&name.isstr) ) return $$.matchof(url, name + "=([^&]+)&?", 1);
        if (url.length > 3) {
            for (var e, c = {}, d = url.replace(/\s/g, "").substr(1).split("&"), f = 0; d.length > f; f++) e = d[f].split("="), e[1] && (c[e[0]] = e[1]);
            return c;
        }
        return "";
    };
    $$.url.str2arr = function( f , mode){
        var is1 = f.indexOf('[')!=-1,
            is2 = f.indexOf('|')!=-1,
            ret = [], ret2 = [];
        f = f.isstr ? f.trim(';').split(';') : f;
        if( mode ){
            if( is2 ){
                for(var i=0; i<f.length; i++){ret = ret.concat( $$.str2clone(f[i])); }
            }else{
                ret = f;
            }
            if( is1 ){
                for(var i=0; i< ret.length; i++){ret2 = ret2.concat($$.str2spawn(ret[i]));}
            }else{
                ret2 = ret;
            }
        }else{
            if( is1 ){
                for(var i=0; i< f.length; i++){ret = ret.concat($$.str2spawn(f[i]));}
            }else{
                ret = f;
            }
            if( is2 ){
                for(var i=0; i<ret.length; i++){ret2 = ret2.concat($$.str2clone(ret[i]));}
            }else{
                ret2 = ret;
            }
        }
        return ret2
    }
    $$.url.json2param = function( json, prefix ){
        if( !json || json.isstr )
            return json;
        var ret = [];
        for( var p in json ){
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = json[p];
            ret.push( typeof(v)=='object' ? this.json2urlparam(v, k) : k+"="+encodeURIComponent(v));
        }
        return ret.join("&");
    }

    $$.ajax = function( opts, callback ){
        var mxhr = $$.ajax.init(opts, callback);
        if( !mxhr )
            return false;
        var xhr = mxhr.xhr;
        xhr.onreadystatechange = function() {
            if( (mxhr.change &&mxhr.change .isfn) )
                mxhr.change.apply(this,arguments);
            var mime = mxhr.datatype;
            if (this.readyState === 4) {
                this.onreadystatechange = null;
                clearTimeout(mxhr.abortTimeout);
                var result, error = false, text = this.responseText.trim(), status = this.status;
                if ((status >= 200 && status < 300) || status === 0 && mxhr.protocol == 'file:') {
                    switch (mime){
                        case 'json':
                            try {
                                result = JSON.parse(text);
                            } catch (e) {
                                error = e;
                            }
                            break;
                        case 'script':
                            var tag = document.createElement('script');
                            tag.type = 'text/javascript';
                            tag.text = text;
                            $$.dom.head.appendChild(tag);
                            result = tag;
                            break;
                        case 'xml':
                            result = this.responseXML;
                            break;
                        case 'css':
                            if( mxhr.url.indexOf('mstyle.css') != -1 ){
                                result = $$.css(text);
                            }else{
                                result = $$.stylesheet(text);
                            }
                            break;
                        default :
                            result = text;
                            break;
                    }
                    if (status === 0 && result.length === 0)
                        error = true;
                    error ? mxhr.error.call(mxhr, xhr, 'parsererror', error) : mxhr.success.call(mxhr, result, 'success', xhr);
                } else {
                    if( mime == 'script' ){
                        $$.script( mxhr.url, mxhr.success, mxhr.error );
                        return;
                    }
                    error = true;
                    mxhr.error.call(mxhr, xhr, 'error');
                }
                mxhr.complete.call(mxhr, result, error , xhr);
            }
        };
        if (mxhr.timeout > 0) {
            mxhr.abortTimeout = setTimeout(function() {
                xhr.onreadystatechange = null;
                xhr.abort();
                mxhr.error.call(mxhr, xhr, 'timeout');
                mxhr.complete.call(mxhr, null, 'timeout' , xhr);
            }, mxhr.timeout);
        }
        mxhr.send();
        return mxhr;

    }

    var _jsonpCallbackID = 0;
    $$.jsonp = function(url, data, callback){
        var callname = 'jsonp_callback_'+(_jsonpCallbackID++);
        if( data&&data.isfn ){
            callback = data;
            data = {};
        }else{
            data = data || {}
        }
        data.callback = callname;
        url += (url.has("?")?'&':'?')+$$.url.json2param(data);
        window[callname] = function(r){
            delete window[callname];
            if( callback&&callback.isfn )
                callback(r);
        }
        $$.script(url, null, function(){
            if( callback&&callback.isfn )
                callback();
        });
    }

    $$.get = function(url, data, complete, dataType){
        if (typeof(data) === "function") complete = data, data = {};
        return $$.ajax({
            url: url,
            data: data,
            datatype: dataType,
            complete: complete
        });
    }
    $$.post = function(url, data, complete, dataType){
        if (typeof(data) === "function") complete = data, data = {};
        return $$.ajax({
            url      : url,
            type     : "POST",
            data     : data,
            datatype : dataType,
            complete  : complete
        });
    }
    $$.getjson = function(url, data, complete){
        if (typeof(data) === "function") complete = data, data = {};
        return $$.ajax({
            url: url,
            type: data ? 'POST' : 'GET',
            data: data,
            complete: complete,
            datatype: "json"
        });
    }
    $$.script  = function( url, callback, errcall ){
        var script = document.createElement('script');
        script.onload = function( e ){
            if( callback&&callback.isfn )
                callback();
        }
        script.onerror = function(){
            if( errcall&&errcall.isfn )
                errcall();
            if( callback&&callback.isfn )
                callback();
        }
        script.type = 'text/javascript';
        script.src = url;
        $$.dom.head.appendChild(script);
    }

    $$.subimt = function(url, data, success, dealer) {
        if( data&&data.isfn ) {
            dealer = success, success = data, data = {};
        }
        $$.post(url, data, function(r) {
            var ret = $$.json(r);
            if (!ret || typeof ret != 'object')
                ret = {
                    'state': 'ret-err',
                    'data': r,
                    'msg': '返回异常'
                };
            if( typeof success == 'function' ) success.call(dealer, ret);
        })
    }

    var _assetList = {}, _assetCallbackList = [];
    function getAsset( url, name ) {
        var asset;
        if ( typeof url == 'object' ) {
            for (var k in url) {
                asset = { key: k, url: url[k] };
                break;
            }
            if (!asset) return false;
        } else {
            asset = {  key: (name&&name.isstr) ? name : md5(url), url: url };
        }

        asset.type = 'script';
        if( /\.css/.test(asset.url) )
            asset.type = 'css';
        else if( _re.isImg.test(asset.url) )
            asset.type = 'image';

        var existing = _assetList[asset.key];
        if (!existing || existing.url !== asset.url)
            _assetList[asset.key] = asset;
        return asset.key;
    };
    function loadAssetStart(assetKey) {
        switch ( _assetList[assetKey].state ) {
            case 4:
            case 'LOADED':
                loadAssetEnd(assetKey);
                return true;
            case 3:
            case 'LOADING':
                return false;
        }
        loadAsset(assetKey);
    };
    function loadAsset(assetKey){
        var asset = _assetList[assetKey];
        asset.state = 'LOADING';
        var cb = function(){
            loadAssetEnd(assetKey);
        }
        switch (asset.type){
            case 'css':
                $$.ajax({ url:asset.url, datatype:'css', success : cb });
                return;
            case 'script':
                $$.ajax({ url:asset.url, datatype:'script', success : cb });
                return;
            case 'image':
                var img = new Image();
                img.onload = function(){
                    setTimeout(cb, 100);
                }
                img.src = asset.url;
                return;
            default :
                return;
        }
    };
    function loadAssetEnd(assetKey) {
        var asset = _assetList[assetKey];
        asset.state = 'LOADED';
        for (var i = _assetCallbackList.length - 1; i >= 0; i--) {
            if (loadAssetChick(_assetCallbackList[i].list)) {
                var o = _assetCallbackList[i];
                _assetCallbackList.splice(i, 1);
                if ( (o['callback'] &&o['callback'] .isfn) )
                    o['callback'].apply(null, o.list);
            }
        }
    }
    function loadAssetChick( assetKeyList ) {
        if ( assetKeyList ) {
            for (var key in assetKeyList) {
                if (_assetList[assetKeyList[key]].state !== 'LOADED') return false;
            }
        } else {
            for (var key in _assetList) {
                if (_assetList[key].state !== 'LOADED') return false;
            }
        }
        return true;
    }
    $$.load = function( ){
        var arguLen = arguments.length, list, assetKeyList = [];
        var callback = arguments[arguments.length - 1] || null;
        callback = (callback &&callback .isfn) ? callback : null;
        if ( arguments[0].isstr ) {
            list = arguLen==1||(arguLen==2&&callback) ? $$.url.str2arr(arguments[0]) : $$.slice(arguments, 0, callback ? -1 : undefined);
        } else {
            list = arguments[0];
        }
        for( var i= 0, len=list.length; i<len; i++ ){
            var assetKey = getAsset( list[i] );
            if ( !assetKey ) return;
            assetKeyList.push( assetKey );
        }
        _assetCallbackList.push({ list: assetKeyList, callback: callback });
        for( var i=0; i<assetKeyList.length; i++)
            loadAssetStart( assetKeyList[i] );
        return this;
    }
    $$.load.len = function(){
        return _assetCallbackList.length;
    }


    $$.ajax.xhr = function(  ){
        try {
            this.xhr = new window.XMLHttpRequest();
        }catch(e) {
            console.log(e);
            return false;
        }
        return this;
    }
    $$.ajax.xhr.prototype.setRequestHeader = function(name, val){
        if( typeof name == 'object' ) {
            $$.concat( this.headers, name);
            for (var k in name)
                this.xhr.setRequestHeader(k, name[k]);
        }else {
            this.xhr.setRequestHeader(name, val);
            this.headers[name] = val;
        }
        return this;
    }
    $$.ajax.xhr.prototype.send = function(data){
        this.xhr.send(data || this.data);
        return this;
    }
    $$.ajax.init = function(opts, callback ){
        var mxhr = new $$.ajax.xhr();

        if( !mxhr )
            return false;
        $$.concat(mxhr, _ajaxOption, opts, $$.url( opts.url ) );
        mxhr.data = $$.url.json2param(mxhr.data);
        mxhr.type = mxhr.type.toUpperCase();
        if( mxhr.type == 'GET' && mxhr.data ){

            mxhr.url += (mxhr.url.has("?")?'&':'?')+mxhr.data;
            mxhr.data = '';
        }
        $$.concat( mxhr.headers, {'Accept':$$.ajax.accepttype(mxhr.datatype)});
        if( mxhr.crossDomain == null ){
            mxhr.crossDomain = mxhr.protocol!=location.protocol && mxhr.host != location.host;
        }
        if( !mxhr.crossDomain )
            $$.concat( mxhr.headers, {'X-Requested-With': 'XMLHttpRequest'});
        if( (callback &&callback .isfn) )
            mxhr.complete = callback;

        var xhr = mxhr.xhr;
        xhr.open(mxhr.type, mxhr.url, mxhr.async);
        if (mxhr.crossDomain)
            xhr.withCredentials = true;
        mxhr.setRequestHeader( mxhr.headers );
        if (mxhr.contentType)
            mxhr.setRequestHeader( 'Content-Type', opts.contentType );
        return mxhr;
    }
    $$.ajax.accepttype = function(type){
        switch (type) {
            case "css":
                return 'text/css';
            case "script":
                return 'text/javascript, application/javascript';
            case "json":
                return 'application/json';
            case "xml":
                return 'application/xml, text/xml';
            case "html":
                return 'text/html';
            case "text":
                return 'text/plain';
            default:
                return "text/html";
        }
    }

})(Mantis);

/* **********************************************
     Begin style.js
********************************************** */

;(function($){
    "use strict"
    var
    _stylepro = $.dom['*'].style,
    _cssk     = {},
    _styk     = {},
    _cssv     = ('webkitTransition' in _stylepro) ? 'webkit' : ('mozTransition' in _stylepro ? 'moz' : ('msTransition' in _stylepro ? 'ms' : '') ),
    _styv     = _cssv ? '-'+_cssv+'-' : '',
    _cssf     = function(k){return k.substr(0, 1).toUpperCase()+k.substr(1)},
    _styf     = function(k){return k.replace(/[A-Z]/g, function($0){return '-'+$0.toLowerCase();})},
    _cssu     = {},
    _csspro   = [],
    _unit     = {"":/zindex|scale|opacity|flex|perspective|count/i, "ms":/duration/i, "deg":/rotate|skew/i};

    ;(function(c, s, cv, sv, u){
        var a = 'alignmentBaseline,background,backgroundAttachment,backgroundClip,backgroundColor,backgroundImage,backgroundOrigin,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundRepeat,backgroundRepeatX,backgroundRepeatY,backgroundSize,baselineShift,border,borderBottom,borderBottomColor,borderBottomLeftRadius,borderBottomRightRadius,borderBottomStyle,borderBottomWidth,borderCollapse,borderColor,borderImage,borderImageOutset,borderImageRepeat,borderImageSlice,borderImageSource,borderImageWidth,borderLeft,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRadius,borderRight,borderRightColor,borderRightStyle,borderRightWidth,borderSpacing,borderStyle,borderTop,borderTopColor,borderTopLeftRadius,borderTopRightRadius,borderTopStyle,borderTopWidth,borderWidth,bottom,boxShadow,boxSizing,bufferedRendering,captionSide,clear,clip,clipPath,clipRule,color,colorInterpolation,colorInterpolationFilters,colorProfile,colorRendering,content,counterIncrement,counterReset,cursor,direction,display,dominantBaseline,emptyCells,enableBackground,fill,fillOpacity,fillRule,filter,float,floodColor,floodOpacity,font,fontFamily,fontSize,fontStretch,fontStyle,fontVariant,fontWeight,glyphOrientationHorizontal,glyphOrientationVertical,height,imageRendering,kerning,left,letterSpacing,lightingColor,lineHeight,listStyle,listStyleImage,listStylePosition,listStyleType,margin,marginBottom,marginLeft,marginRight,marginTop,marker,markerEnd,markerMid,markerStart,mask,maskType,maxHeight,maxWidth,minHeight,minWidth,opacity,orphans,outline,outlineColor,outlineOffset,outlineStyle,outlineWidth,overflow,overflowWrap,overflowX,overflowY,padding,paddingBottom,paddingLeft,paddingRight,paddingTop,page,pageBreakAfter,pageBreakBefore,pageBreakInside,pointerEvents,position,quotes,resize,right,shapeRendering,size,speak,src,stopColor,stopOpacity,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,tabSize,tableLayout,textAlign,textAnchor,textDecoration,textIndent,textLineThrough,textLineThroughColor,textLineThroughMode,textLineThroughStyle,textLineThroughWidth,textOverflow,textOverline,textOverlineColor,textOverlineMode,textOverlineStyle,textOverlineWidth,textRendering,textShadow,textTransform,textUnderline,textUnderlineColor,textUnderlineMode,textUnderlineStyle,textUnderlineWidth,top,transition,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,unicodeBidi,unicodeRange,vectorEffect,verticalAlign,visibility,alignContent,alignItems,alignSelf,animation,animationDelay,animationDirection,animationDuration,animationFillMode,animationIterationCount,animationName,animationPlayState,animationTimingFunction,appearance,aspectRatio,backfaceVisibility,backgroundClip,backgroundComposite,backgroundOrigin,backgroundSize,borderAfter,borderAfterColor,borderAfterStyle,borderAfterWidth,borderBefore,borderBeforeColor,borderBeforeStyle,borderBeforeWidth,borderEnd,borderEndColor,borderEndStyle,borderEndWidth,borderFit,borderHorizontalSpacing,borderImage,borderRadius,borderStart,borderStartColor,borderStartStyle,borderStartWidth,borderVerticalSpacing,boxAlign,boxDecorationBreak,boxDirection,boxFlex,boxFlexGroup,boxLines,boxOrdinalGroup,boxOrient,boxPack,boxReflect,boxShadow,clipPath,colorCorrection,columnAxis,columnBreakAfter,columnBreakBefore,columnBreakInside,columnCount,columnGap,columnProgression,columnRule,columnRuleColor,columnRuleStyle,columnRuleWidth,columnSpan,columnWidth,columns,cursorVisibility,dashboardRegion,filter,flex,flexBasis,flexDirection,flexFlow,flexGrow,flexShrink,flexWrap,flowFrom,flowInto,fontFeatureSettings,fontKerning,fontSizeDelta,fontSmoothing,fontVariantLigatures,gridAfter,gridAutoColumns,gridAutoFlow,gridAutoRows,gridBefore,gridColumn,gridColumns,gridEnd,gridRow,gridRows,gridStart,highlight,hyphenateCharacter,hyphenateLimitAfter,hyphenateLimitBefore,hyphenateLimitLines,hyphens,justifyContent,lineAlign,lineBoxContain,lineBreak,lineClamp,lineGrid,lineSnap,locale,logicalHeight,logicalWidth,marginAfter,marginAfterCollapse,marginBefore,marginBeforeCollapse,marginBottomCollapse,marginCollapse,marginEnd,marginStart,marginTopCollapse,marquee,marqueeDirection,marqueeIncrement,marqueeRepetition,marqueeSpeed,marqueeStyle,mask,maskBoxImage,maskBoxImageOutset,maskBoxImageRepeat,maskBoxImageSlice,maskBoxImageSource,maskBoxImageWidth,maskClip,maskComposite,maskImage,maskOrigin,maskPosition,maskPositionX,maskPositionY,maskRepeat,maskRepeatX,maskRepeatY,maskSize,maxLogicalHeight,maxLogicalWidth,minLogicalHeight,minLogicalWidth,nbspMode,order,paddingAfter,paddingBefore,paddingEnd,paddingStart,perspective,perspectiveOrigin,perspectiveOriginX,perspectiveOriginY,printColorAdjust,regionBreakAfter,regionBreakBefore,regionBreakInside,regionFragment,rtlOrdering,rubyPosition,svgShadow,textCombine,textDecorationsInEffect,textEmphasis,textEmphasisColor,textEmphasisPosition,textEmphasisStyle,textFillColor,textOrientation,textSecurity,textStroke,textStrokeColor,textStrokeWidth,transform,transformOrigin,transformOriginX,transformOriginY,transformOriginZ,transformStyle,transition,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,userDrag,userModify,userSelect,writingMode,whiteSpace,widows,width,wordBreak,wordSpacing,wordWrap,writingMode,zIndex,zoom,length,cssText'.split(',');
        for( var i=0; i<a.length; i++ ){
            if(!a[i])
                continue;
            var v = a[i] in _stylepro ? a[i] : cv+_cssf(a[i]);
                v = v    in _stylepro ? v : '';
            if( v ){
                var k1 = a[i].toLowerCase(),
                    k2 = a[i],
                    k3 = _styf(a[i]);
                c[k1] = v;
                s[k1] = v == a[i] ? k3 : sv+k3;
                if( k1 != k2 ){
                    c[k2] = v;
                    s[k2] = s[k1];
                }
                c[k3] = v;
                s[k3] = s[k1];
                _csspro.push(v);
            }
        }
    })(_cssk, _styk, _cssv, _styv, _cssu);
    _cssk.userselect = _cssk[$.info.is('msie') ? 'touchAction' : 'userSelect'];
    _cssk.anitype    = _cssk.transitionTimingFunction;
    _cssk.filter     = _cssv+(_cssv?'Filter':'filter');
    _styk.filter     = _styv+'filter';

    _re.istransform = 'scale,scaleX,scaleY,scaleZ,x,y,z,skew,skewX,rotate,rotateX,rotateY,perspective'.split(',');
    _re.isanimation = 'name|duration|delay|direction|timingFunction|time|type|count|direction|mode'.split('|');
    $.cssvendor    = _cssv;
    $.stylevendor  = _styv;
    $.cssk         = _cssk;
    $.csskk        = _csspro;
    $.stylek       = _styk;
    $.csskey       = function(key) { //格式化 css 属性名
        var v = _cssk[key] || _cssk[key.toLowerCase()] || _cssk[_styf(key)];
        if( !v ){
            v = key in _stylepro ? key : '';
            if( v )
                _cssk[key] = v;
        }
        return v;
    };
    $.stylekey     = function(key){ //格式化 style 属性名
        var v =  _styk[key] || _styk[key.toLowerCase()] || _styk[_styf(key)];
        if( !v ){
            v = _styf($.csskey(key));
            if( v )
                _styk[key] = v;
        }
        return v;
    };
    $.cssunit      = function(v, k) {
        if( !v || v.isstr ) return v||'0';
        var unit = _cssu[k];
        if( typeof unit == 'string' )
            return v+unit;
        for(var u in _unit ){
            if( _unit[u].test(k) ){
                _cssu[k] = u;
                return v+u;
            }
        }
        return v+'px';
    };

    $.css      = function( c , isstyle, tostr ) { //
        if( (c&&c.isstr) ){
            if( /\.css$/.test(c) ){
                $.load( c );
                return;
            }else if( c.indexOf('}') != -1 ){
                return $.stylesheet( styleSheetparse(c) );
            }
        }
        return $.csscheck(c);
    };
    $.csscheck = function( c ){ //格式化 style 样式
        var ret = $.csstext( c, null, false, true);
        return ret;
    }
    $.csstext  = function( text, css, tostr, csskeytype, noanim, nomatrix ){ //返回 csstext 格式数据，css 为合并属性
        text = text || {};
        if( typeof css == 'boolean')
            tostr  = css,css = null;
        else if( !css )
            tostr  = $.isset(tostr) ? tostr : typeof text == 'object';
        if( typeof text == 'object' && text.nodeType )
            text   = text.style.cssText;
        if( (text&&text.isstr) )
            text = csstext2cssjson(text);
        else
            text = $.clone(text);
        var ret = {}, key = (csskeytype ? $.csskey : $.stylekey), unit = $.cssunit;
        for( var k in text ){
            var kk = key( k );
            if( kk ){
                ret[ kk ] = unit( text[k] , kk);
                delete text[k];
            }
        }
        if( !nomatrix ){
            var matrix = $.matrix( text );
            if( matrix )
                ret[ key('transform') ] = matrix;
        }
        if( !noanim )
            $.concat(ret, cssanimation$transition(text, !!matrix) );
        if( css )
            $.concat(ret, css );
        if( tostr ){
            var str = ''
            for(var k in ret ){
                str += k+':'+ret[k]+';';
            }
            return str;
        }
        return ret;
    }
    $.stylesheet = function( text ){ //新建 style 标签
        if(text){
            var tag = document.createElement('style');
            tag.type = 'text/css';
            if ( tag.hasOwnProperty('styleSheet') )
                tag.styleSheet.cssText = text;
            else
                tag.appendChild(document.createTextNode(text));
            $.dom.head.appendChild(tag);
            return tag;
        }
    }
    $.keyframes = function( name, keyfrm ){ //生成 keyframes 动画
        if( $.istype(keyfrm, 'array') ){
            var key = 0, len = keyfrm.length-1, step = 100/len, temp = {};
            for(var i=0; i<len; i++){
                temp[ Math.round(key+step*i)+'%' ] = keyfrm[i];
            }
            temp[ '100%' ] = keyfrm[len];
            keyfrm = temp;
        }
        var str = '@'+ $.stylevendor+'keyframes '+name+' {\n';
        for(var key in keyfrm ){
            str += '\t'+key+' {'+ $.csstext(keyfrm[key], null, true, false, true, false)+'}\n';
        }
        str += '}';


        return str;

    }

    function csstext2cssjson( text ){
        text = text.replace(/^\{?\s*|;*\s*\}?$/g,'').replace(/\s*(?:\:|;)\s*(?!\/)/g, ';').split(';');
        var r = {};
        for (var i = 0, len = text.length; i < len; i++) {
            if (text[i] && text[i+1])
                r[text[i]] = text[++i];
        }
        return r;
    }
    function cssanimation$transition( css, istransition){
        var v = istransition ? 'transition' : 'animation', ret = {};
        for( var k in css){
            var val = css[k];
            if( /^(?:name|duration|delay|direction|timingFunction)$/i.test(k) ){
                ret[ $.csskey(v+k) ] = $.cssunit(val, k);
            }else if( k == 'time'  ){
                ret[ _cssk[v+'Duration'] ] = val + (val.isnum ? (val<10?'s':'ms') : '');
            }else if( k == 'type' ){
                ret[ _cssk[v+'TimingFunction'] ] = val;
            }else if( k == 'count' ){
                ret[ _cssk[v+'IterationCount'] ] = val+'';
            }else if( k == 'direction' ){
                ret[ _cssk[v+'Direction'] ] = val;
            }else if( k == 'mode' ){
                ret[ _cssk[v+'FillMode'] ] = val;
            }
        }
        return ret;
    }
    $._css2animation = cssanimation$transition;

    $.matrix = function(context) {
        if( !context.nodeType ){
            return $.matrix_css( context );
        }
        var that = context.nodeType == -1 ? context[0] : context;
        that._matrix = matrix_p( getComputedStyle(that, null)[$.cssk.transform], that._matrix );
        return that._matrix;
    };
    $.matrix_xyz = function( context, x, y, z, inc){//只修改 xyz
        if( context.nodeType ){
            var that = context.nodeType == -1 ? context[0] : context;
            context = getComputedStyle(that, null)[_cssk.transform];
        }
        var txm  = matrix_xyz(context == 'none' ? null : context, x, y, z, inc);
        if( arguments.length > 1 )
            return (txm.length==16 ? 'matrix3d(':'matrix(')+txm.join(',')+')';
        return txm;
    };
    $.matrix_css = function( m ){ // 将 matrix 数据转换成 transform
        if( $.matrix_isempty(m) ){
            return '';
        }
        var mm = $.matrix_f(m);
        var tx = '';
        var x = mm.x + (mm.x&&mm.x.isnum ? 'px' : ''),
            y = mm.y + (mm.y&&mm.y.isnum ? 'px' : ''),
            z = mm.z + (mm.z&&mm.z.isnum ? 'px' : '');
        tx = 'translate3D('+x+','+y+','+z+')';
        tx += matrix_k(mm.scale, ' scale', '', 1);
        tx += matrix_k(mm.rotate, ' rotate', 'deg', 0);
        tx += matrix_k(mm.skew, ' skew', 'deg', 0);
        return tx;
    }
    $.matrix_isempty = function ( m ){
        var f = _re.istransform;
        for(var i=0; i< f.length; i++){
            if( m.hasOwnProperty(f[i]) )
                return false;
        }
        return true;
    }
    $.matrix_f = function( m, m2, m3 ){ //返回标准的 matrix json 数据， 可合并多个值
        if( arguments.length > 1 ){
            m = $.clone(m);
            for(var i=1; i<arguments.length; i++ ){
                if( !$.matrix_isempty(arguments[i]) ){
                    m = matrix_f(m, arguments[i]);
                }
            }
        }else {
            m = matrix_f(m);
        }
        return m;
    }

    function matrix_f( m, m2 ){
        m = m || {};
        m2 = m2 || {};
        var numv = $.value;
        m.scale  = numv(m2.scale, m.scale);
        m.rotate = numv(m2.rotate, m.rotate);
        m.skew   = numv(m2.skew, m.skew);
        var f = {
            x      : numv(m2.x, m.x, 0),
            y      : numv(m2.y, m.y, 0),
            z      : numv(m2.z, m.z, 0),
            scale  : m.scale  && typeof(m.scale)=='object'  ? m.scale  : [numv(m2.scaleX ,m2.scale ,m.scaleX ,m.scale ,1), numv(m2.scaleY ,m2.scale ,m.scaleY ,m.scale ,1)],
            rotate : m.rotate && typeof(m.rotate)=='object' ? m.rotate : [numv(m2.rotateX,m2.rotate,m.rotateX,m.rotate,0), numv(m2.rotateY,m2.rotate,m.rotateY,m.rotate,0), numv(m2.rotateZ,m2.rotate,m.rotateZ,m.rotate,0)],
            skew   : m.skew   && typeof(m.skew)=='object'   ? m.skew   : [numv(m2.skewX  ,m2.skew  ,m.skewX  ,m.skew  ,0), numv(m2.skewY  ,m2.skew  ,m.skewY  ,m.skew  ,0)],
            matrix : m2.matrix || m.matrix || []
        }
        return f;
    }

    function matrix_k( a, k, u, d ){
        d = d || 0;
        if( a[0] == a[1] && (!a[2]||a[1]==a[2]) ){
            if( a[0] == d )
                return '';
            else
                return k+'('+a[0]+u+')';
        }else{
            return k+'x('+a[0]+u+')'+(a[1]?k+'y('+a[1]+u+')':'')+(a[2]?k+'z('+a[2]+u+')':'');
        }
    }
    function matrix_c(m, m2, inx){
        for( var i=0; i<inx.length; i++ ){
            if( Math.rnd(m[inx[i]]) != Math.rnd(m2[inx[i]]) ){
                return false;
            }
        }
        return true;
    }
    function matrix_xyz(tx, x, y, z, inc){
        var txm = (tx||'1,0,0,1,0,0').replace(/matrix3d\(|matrix\(|\)|\s+/ig, '').split(','),
            t3d = txm.length == 16;
        var i = txm.length;
        while (--i > -1) {
            txm[i] = Math.rnd(txm[i]*1, 3);
        }
        if( typeof(x)=='number' ){
            txm[ t3d ? 12 : 4] = inc ? txm[ t3d ? 12 : 4]+x:x;
        }
        if( typeof(y)=='number' ){
            txm[ t3d ? 13 : 5] = inc ? txm[ t3d ? 13 : 5]+y:y;
        }
        if( typeof(z)=='number' && t3d){
            txm[ 14 ] = inc ? txm[ 14 ]+z:z;
        }
        return txm;
    }
    function matrix_p( tx, tm, zo){
        var m = $.matrix_f( tm );
        if( !tx || tx == 'none' )
            return m;
        var _RAD2DEG = Math.rad2deg;
        var txm = matrix_xyz(tx),
            invX = (m.scaleX < 0),
            min = 0.00005,
            minAngle = 179.99,
            minPI = minAngle * Math.deg2rad;
        var rnd = 100000;
        if( txm.length == 16 ){

            var a11 = txm[0],  a21 = txm[1],  a31 = txm[2],  a41 = txm[3],
                a12 = txm[4],  a22 = txm[5],  a32 = txm[6],  a42 = txm[7],
                a13 = txm[8],  a23 = txm[9],  a33 = txm[10], a43 = txm[11],
                a14 = txm[12], a24 = txm[13], a34 = txm[14], a44 = txm[15];

            if( !matrix_c(m.matrix, txm, [1,2,3,4,6,7,8,9,11,15]) ){
                var angle, xFlip, yFlip, zFlip, t1, t2, t3, cos, sin,
                    rotatey = 0, rotatex = 0, rotatez = 0;
                if (zo) {
                    a34 = -zo;
                    a14 = a13*a34-a14;
                    a24 = a23*a34-a24;
                    a34 = a33*a34+zo-a34;
                }
                var rz = Math.round( Math.atan2(a12, a11)* _RAD2DEG );
                if( rz ){
                    rotatez = -rz;
                    angle = -Math.atan2(a12, a11);
                    if (angle) {
                        cos = Math.cos(-angle);
                        sin = Math.sin(-angle);
                        t1 = a11*cos+a12*sin;
                        t2 = a21*cos+a22*sin;
                        t3 = a31*cos+a32*sin;
                        a12 = a11*-sin+a12*cos;
                        a22 = a21*-sin+a22*cos;
                        a32 = a31*-sin+a32*cos;
                        a11 = t1;
                        a21 = t2; 
                        a31 = t3;
                    }
                }
                angle = Math.atan2(a13, a11);
                rotatey = angle * _RAD2DEG;
                if (angle) {
                    cos = Math.cos(-angle);
                    sin = Math.sin(-angle);
                    t1 = a11*cos-a13*sin;
                    t2 = a21*cos-a23*sin;
                    t3 = a31*cos-a33*sin;
                    a23 = a21*sin+a23*cos;
                    a33 = a31*sin+a33*cos;
                    a43 = a41*sin+a43*cos;
                    a11 = t1;
                    a21 = t2;
                    a31 = t3;
                }
                angle = Math.atan2(a32, a33);
                rotatex = angle * _RAD2DEG;
                if (angle) {
                    cos = Math.cos(-angle);
                    sin = Math.sin(-angle);
                    t1  = a12*cos+a13*sin;
                    t2  = a22*cos+a23*sin;
                    t3  = a32*cos+a33*sin;
                    a13 = a12*-sin+a13*cos;
                    a23 = a22*-sin+a23*cos;
                    a33 = a32*-sin+a33*cos;
                    a43 = a42*-sin+a43*cos;
                    a12 = t1;
                    a22 = t2;
                    a32 = t3;
                }
                m.rotate = rotatex||rotatey ? [Math.round(rotatex), Math.round(rotatey), Math.round(rotatez)] : Math.round(rotatez);
                m.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
            }
            var scalex = Math.rnd(Math.sqrt(a11 * a11 + a21 * a21),2),
                scaley = Math.rnd(Math.sqrt(a22 * a22 + a23 * a23),2),
                scalez = Math.rnd(Math.sqrt(a32 * a32 + a33 * a33),2);
            m.scale = [scalex, scaley, scalez];
            m.x = a14;
            m.y = a24;
            m.z = a34;
        }else if( txm.length ){
            var k = (txm.length >= 6),
            a = k ? txm[0] : 1,
            b = txm[1] || 0,
            c = txm[2] || 0,
            d = k ? txm[3] : 1;
            m.x = txm[4] || 0;
            m.y = txm[5] || 0;
            m.scale = [Math.sqrt(a * a + b * b), Math.sqrt(d * d + c * c)];
            if( !matrix_c(m.matrix, txm, [1,2]) ){
                //a c x
                //b d y
                var scalex = m.scale[0],
                    scaley = m.scale[1],
                    rotate = (a || b) ? Math.round(Math.atan2(b, a) * _RAD2DEG) : m.rotate[0] || 0,
                    skewx = (c || d) ? Math.round(Math.atan2(c, d) * _RAD2DEG + rotate) : m.skew[0] || 0;
                if (Math.abs(skewx) > 90 && Math.abs(skewx) < 270) {
                    if ( invX ) {
                        scalex *= -1;
                        skewx += (rotate <= 0) ? 180 : -180;
                        rotate += (rotate <= 0) ? 180 : -180;
                    } else {
                        scaley *= -1;
                        skewx += (skewx <= 0) ? 180 : -180;
                    }
                    m.scale = [scalex, scaley];
                }
                m.rotate =  Math.round(rotate);
                m.skew =  Math.round(skewx);
            }
        }
        for( var i in m){
            if( m[i].isnum ){
                if (m[i] < min) if (m[i] > -min)
                    m[i] = 0;
                else
                    m[i] = Math.rnd( m[i] );
            }else{
                for( var j in m[i] ){
                    if (m[i][j] < min) if (m[i][j] > -min)
                        m[i][j] = 0;
                    else
                        m[i][j] = Math.rnd( m[i][j] );
                }
            }
        } 
        m.matrix = txm;
        return m;
    }

    var _styleVarSpace = {
        wheight : window.innerHeight+'px',
        wwidth  : window.innerWidth+'px',
        swidth : window.screen.width+'px',
        sheight : window.screen.height+'px'
    };
    function styleSheetparse( text ){
        text = text.replace(/(\{|:|;)\s+/g, '$1').replace(/\s{2,}|\t+/g, ' ').replace(/\n/g, '').replace(/\?/g, $.stylevendor);
        var space = {}, re = [/\$(\w+)(?:\s*(=)\s*([^\;]+);)?/g],
            parseVar = function($0,$1,$2,$3){
                if( $2 ){
                    if( /[^\w]/g.test($3) ){
                        if($3.indexOf('$') != -1 )
                            $3 = $3.replace(re[0], parseVar);
                        eval('space["'+$1+'"] = '+$3);
                    }else
                        space[$1] = $3;
                    return '';
                }
                return $.isset(space[$1]) ? space[$1] : ( $.isset(_styleVarSpace[$1]) ? (_styleVarSpace[$1].isfn ?_styleVarSpace[$1](): _styleVarSpace[$1]) : '' );
            };
        text = text.replace(re[0], parseVar);

        text = text.replace(/@keyframes\s*([\w,-]+)\s*\{([\w\W\s]+)\}\s*\}/g, function($0, $1, $2){
            return '@'+$.stylevendor+'keyframes '+$1+'{}\n'+$2+'\n@'+$1+'@keyframes{}';
        });
        text = text.replace(/\}\s*/g, '\n').replace(/(\]|\[)\s*/g, '$1\n');

        var l = text.split('\n'), ret = {}, keyorder = [], parent = [], _parentv = '';
        for(var i= 0, len= l.length; i<len; i++){
            var r = l[i].split('{');
            if( !r || r.length < 2 ){
                if( l[i].indexOf('[') != -1 ){
                    parent.push(l[i].replace(/\s*\[/, ''));
                    _parentv = parent.join(' ')+' ';
                }else if( l[i].indexOf(']') != -1 ){
                    parent.pop();
                    _parentv = parent.join(' ');
                }
                continue;
            }
            var k = _parentv+r[0], v = $.csstext(r[1]);
            if( k.indexOf('<<') != -1 ){
                var ks = k.replace(/\s*<<\s*/g,'<<').split('<<');
                k = ks[0];
                for( var j= 1, klen=ks.length; j<klen; j++){
                    if( ret[ks[j]] )
                        v = $.extend(ret[ks[j]], v);
                }
            }
            if( ret[k] )
                $.concat(ret[k], v);
            else{
                ret[k] = v;
                keyorder.push(k);
            }
        }
        var csstext = '';
        for(var i= 0, len= keyorder.length; i<len; i++){
            csstext += keyorder[i]+'{'+$.csstext(ret[keyorder[i]], true)+'}\n';
        }
        csstext = csstext.replace(/keyframes\s*([\w,-]+)\s*\{\}/g, 'keyframes $1 {').replace(/@([\w,-]+)@keyframes{}/g,'}');
        return csstext;
    }
})(Mantis);

/* **********************************************
     Begin event.js
********************************************** */

;(function($$){
    var info = $$.info;
    var _on_off = false, _on_off_timer = $$.timer(function(){_on_off=false;});
    var _single      = ["tap", "touch", "double-tap", "hold-tap", "swipe", "swiping", "swipe-left", "swipe-right", "swipe-up", "swipe-down", "move", "draw"],
        _multicast   = ["tow-tap", "rotate", "rotating", "rotate-left", "rotate-right", "pinch", "pinching", "pinch-in", "pinch-out"],
        _meventtype  =  !info.hasTouch ? _single : _single.concat(_multicast),
        _gplugin         = {},
        _preventBubble   = false,
        _meventinfo      = {},
        _isNoFocusRE     = /input|select|textarea/i,
        _eventListCache  = [];
    $$.event = {
        "type"   : _meventinfo,
        "on_off" : function( off ){ //开关事件响应
            _on_off_timer.clear();
            if( off === 1 ){
                _on_off = false;
            }else if(off === 0 ){
                _on_off = true;
            }else if( off&&off.isnum ){
                _on_off = true;
                _on_off_timer.time = off;
                _on_off_timer.go();
            }else
            return _on_off;
        },
        "plugin" : function(name, meventtype , fn){ //扩展事件
            if( arguments.length == 0)
                return _meventinfo
            _gplugin[name] = fn;
            _meventtype.push(name);
            _meventinfo[name] = initGOpt(meventtype);
        },
        "load"   : function(context){ //加载 DOM 中的事件
            var meventtypeSelector   = '['+_meventtype.join('],[')+']';
            var nodes = $$.$$(meventtypeSelector, context);
            for(var i=0, len = nodes.length; i<len; i++){
                var elm = nodes[i];
                for (var k in _meventtype) {
                    var meventtype = _meventtype[k];
                    if( elm.getAttribute(meventtype) ){
                        elm.on(meventtype, {});
                    }
                }
            }
        }
    }

    $$.eventkey = function(key) {
        return $$.eventkey[key] || key
    };
    $$.eventkey.animationEnd    = $$.cssvendor ? $$.cssvendor+'AnimationEnd' : 'animationEnd';
    $$.eventkey.transitionEnd   = $$.cssvendor ? $$.cssvendor+'TransitionEnd' : 'transitionEnd';
    $$.eventkey.animationStart  = $$.cssvendor ? $$.cssvendor+'AnimationStart' : 'animationStart';
    $$.eventkey.transitionStart = $$.cssvendor ? $$.cssvendor+'TransitionStart' : 'transitionStart';
    $$.eventkey.touchstart  = info.hasTouch ? 'touchstart'  : (info.ieTouch ? 'mspointerdown'   : 'mousedown');
    $$.eventkey.touchmove   = info.hasTouch ? 'touchmove'   : (info.ieTouch ? 'mspointermove'   : 'mousemove');
    $$.eventkey.touchend    = info.hasTouch ? 'touchend'    : (info.ieTouch ? 'mspointerup'     : 'mouseup');
    $$.eventkey.touchcancel = info.hasTouch ? 'touchcancel' : (info.ieTouch ? 'mspointercancel' : 'mousecancel');

    var _onmotioncallback = $$.callbacks(false), _onorientationcallback = $$.callbacks(false);
    $$.onmotion = function(callback, opt){
        if( !callback )
            return _onmotioncallback;
        if( opt == 'rm')
            _onmotioncallback.rm(callback);
        else
            _onmotioncallback.add(callback, opt);
        if( _onmotioncallback.isempty() ){
            window.ondevicemotion = null;
        }else{
            window.ondevicemotion = function(e){
                if( !_onmotioncallback.isempty() ){
                    if( Date.now() - _onmotioncallback.lasttime < $$.onmotion.interval )
                        return;
                    _onmotioncallback.lasttime = Date.now();
                    _onmotioncallback.bomb([e.accelerationIncludingGravity, e]);
                }else{
                    window.ondevicemotion = _devicemotionOn = null;
                }
            }
        }
    }
    $$.unmotion = function(callback){
        _onmotioncallback.rm(callback);
    }
    $$.onmotion.interval = 80;
    $$.onorientation = function(callback, opt){
        if( !callback )
            return _onorientationcallback;
        if( opt == 'rm')
            _onorientationcallback.rm(callback);
        else
            _onorientationcallback.add(callback, opt);
        if( _onorientationcallback.isempty() ){
            window.ondeviceorientation = null;
        }else{
            window.ondeviceorientation = function(e){
                if( !_onorientationcallback.isempty() ){
                    if( Date.now() - _onorientationcallback.lasttime < $$.onorientation.interval )
                        return;
                    _onorientationcallback.lasttime = Date.now();
                    _onorientationcallback.bomb([{alpha: e.alpha, beta: e.beta, gamma: e.gamma}, e]);
                }else{
                    window.ondeviceorientation = _devicemotionOn = null;
                }
            }
        }
    }
    $$.unorientation = function(callback){
        _onorientationcallback.rm(callback);
    }
    $$.onorientation.interval = 50;

    function _bindEventCallback(e) {
        var fn = this.meventcallback[e.type];
        if( (fn &&fn .isfn) ){
            fn.call(this, e);
        }
    }
    $$.elmExtend(
        {
            bind   : function( name, fn ){
                var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
                name = $$.eventkey[name] || name;
                while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                    // --
                    that.addEventListener(name, fn, false);
                    //--
                };
                return this;
            },
            unbind : function( name, fn ){
                var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
                    name = $$.eventkey[name] || name;
                while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                    // --
                    that.removeEventListener(name, fn, false);
                    //--
                };
                return this;
            },
            on     : function(name, opt, callback) {
                var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
                if( (opt&&opt.isfn) )
                    callback = opt, opt = {};
                var ismeventtype = _meventtype.indexOf(name) != -1;
                if( name && arguments.length==1  )
                    return that.meventcallback[name];
                while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                    //-- code block
                    if( !that.meventcallback ){
                        that.meventcallback = {};
                        if( ismeventtype ){
                            that.bind($$.eventkey.touchstart, eventInit);
                        }else{
                            that.bind(name, _bindEventCallback);
                        }
                    }
                    if( !that.meventoptions ){
                        that.meventoptions = {}
                    }
                    var o = $$.extend({}, opt, $$.json( that.getAttribute('event-opt'), true)),
                        fn = callback || o.callback || $$.fn( that.getAttribute(name) );
                    that.meventoptions[name] = o;
                    if( (_gplugin[name]&&_gplugin[name].isfn) ){
                        that.meventcallback[name] = _gplugin[name];
                        o['callback'] = fn;
                        _gplugin[name].call(that, {phase:'init', meopt:o, that:that, meventtype:name } );
                    }else if(fn){
                        that.meventcallback[name] = fn;
                    }
                    //--
                };
                return this;
            },
            un     : function(name, callback) {
                var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
                var ismeventtype = _meventtype.indexOf(name) != -1;
                while ( !i || (isNodeList&&(that=--isNodeList?this[i]:this)) ) { i++;
                    //-- code block
                    if( !name ) {
                        that.meventcallback = {};
                    }else
                        delete that.meventcallback[name];
                    var keys = $$.keys(that.meventcallback);
                    if( keys.length == 0 ) {
                        if( ismeventtype )
                            that.unbind($$.eventkey.touchstart, eventInit);
                        else
                            that.unbind(name, _bindEventCallback);
                    }
                    //--
                };
                return this;
            }
        }
    );
    $$(function() {
        document.body.bind($$.eventkey.touchmove, eventMove);
        document.body.bind($$.eventkey.touchend, eventEnd);
        document.body[$$.eventkey.touchcancel] = eventCancel;
        setTimeout($$.event.load, 100);
    });
    function initGOpt( meventtype ){
        var opt = {"isScroll":false,"isTap":false,"isSwip":false,"isRotat":false,"isPinch":false,"isDraw":false};
        (opt.isScroll = !meventtype.indexOf('scroll')) ||
        (opt.isTap    = (meventtype.indexOf('tap')!=-1)) ||
        (opt.isSwip   = !meventtype.indexOf('swip')) ||
        (opt.isRotat  = !meventtype.indexOf('rotat'))||
        (opt.isPinch  = !meventtype.indexOf('Pinch')) ||
        (opt.isDraw   = meventtype == 'draw');
        opt.isMoveTypes = (opt.isScroll || opt.isTap || /^(?:touch|swiping|move|draw|rotating|pinching)$/.test(meventtype));
        opt.isDirType = /left|right|up|down|in|out/.test(meventtype);
        opt.isStartBack = opt.isScroll || /^(?:touch|move|draw|rotating|pinching)$/.test(meventtype);
        opt.isMoveBack = (opt.isMoveTypes && (opt.isScroll || meventtype=='move'|| meventtype =='touch'));
        opt.isDirBack = (opt.isScroll || opt.isSwip || meventtype=='move' || meventtype=='touch');
        opt.isPreventDef = (opt.isTap || opt.isDirBack ||  meventtype=='draw' || opt.isRotat || opt.isPinch);
        opt.isPreventBubble = false;//opt.isTap;
        opt.isPreventSink = false;
        opt.isSingle      = _single.indexOf(meventtype)!=-1;
        opt.isMulticast   = _multicast.indexOf(meventtype)!=-1;
        opt.isX   = /-x|left|right/.test(meventtype);
        opt.isY   = /-y|up|down/.test(meventtype);
        opt.clas = meventtype.replace('ing','e').split('-')[0];
        return opt;
    }
    for( var i=_meventtype.length-1; i>=0; i-- ){
        _meventinfo[_meventtype[i]] = initGOpt(_meventtype[i]);
    }
    function eventInit(e) {
        if( _on_off )
            return false;
        e = e || window.event;
        if( this.meventcallback && !_preventBubble ) {
            for (var meventtype in this.meventcallback) {
                if ( typeof(this.meventcallback[meventtype]) != 'function' ) {
                    delete this.meventcallback[meventtype];
                    continue;
                }
                var meopt = this.meventoptions[meventtype] || null;
                var opt = {
                    "release"       : function(){ return eventRelease(this) },
                    "meopt"         : meopt,
                    "target"        : e.target,
                    "that"          : this,
                    "phase"         : 'start',
                    "meventtype"    : meventtype,
                    "action"        : '',
                    "callback"      : this.meventcallback[meventtype],
                    "startTime"     : e.timeStamp,
                    "endTime"       : 0,
                    "preventDef"    : _meventinfo[meventtype].isPreventDef,
                    "preventBubble" : _meventinfo[meventtype].isPreventBubble,
                    "preventSink"   : _meventinfo[meventtype].isPreventSink,
                    "shift"         : 0
                };
                $$.concat( opt, meopt);
                eventStart.call(this, e, meventtype, opt);
                _preventBubble = _preventBubble || opt.preventBubble;
            }
            return _preventBubble ? eventStop(e) : true;
        }else if( _preventBubble ){
            if( !_isNoFocusRE.test(e.target.nodeName) )
                return false;
        }
    }
    function eventStart(e, meventtype, opt) {
        if(!(opt.start=eventPos(e, meventtype, 'start'))) return false;
        _preventBubble = opt.preventBubble;
        switch (meventtype) {
            case 'hold-tap':
                opt.hold_tap_timer = setTimeout(function() {
                    eventCallback(opt, e);
                }, opt['holdtime'] || 200);
                break;
            default:
                var minfo = _meventinfo[meventtype];
                if ( minfo.isRotat ){
                    opt.initAngle = Math.angle(opt.start);
                }else if ( minfo.isPinch ) {
                    opt.initDistance = Math.distance(opt.start);
                } else if (meventtype == 'draw') {
                    opt.drawpath = [opt.start[0]];
                }
                if( minfo.isStartBack && eventCallback(opt,e)===false ) {
                    eventStop(e);
                }
                break;
        }

        if( _meventinfo[meventtype].isTap && opt.preventDef ){
            e.preventDefault();
        }
        if( !_meventinfo[meventtype].isTap && opt.preventBubble ){
            e.stopPropagation();
        }
        opt.moveCache = opt.start;

        if(opt.preventSink)
            _eventListCache = [opt];
        else
            _eventListCache.push(opt);

    }
    function eventMove(e) {
        if( _on_off )
            return false;
        e = e || window.event;
        if (!_eventListCache.length) {
            $$.config.noscroll && eventStop(e);
            _preventBubble = false;
            return;
        }
        for (var i = 0; i < _eventListCache.length; i++) {
            var opt = _eventListCache[i];
            if(!opt) continue;
            var minfo = _meventinfo[opt.meventtype];
            opt['preventDef'] && eventStop(e);
            if ( minfo.isMoveTypes || minfo.isMulticast ) {
                if(!(opt.move = eventPos(e, opt.meventtype))) continue;
                opt.phase = 'move';
                if (!getGestureType(opt) ) {
                    if (opt['hold_tap_timer']) clearTimeout(opt.hold_tap_timer);
                    _eventListCache[i] = null;
                    continue;
                }
                if ( minfo.isMoveBack && eventCallback(opt, e) === false) {
                    eventStop(e);
                }
                opt.moveCache = opt.move;
            }
            if( !_preventBubble ){
                _preventBubble = _preventBubble || opt['preventBubble'];
                if(_preventBubble){
                    _eventListCache.splice(i+1);
                    break;
                }
            }
        }
    }
    function eventEnd(e) {
        if( _on_off )
            return false;
        e = e || window.event;
        if (!_eventListCache.length){
            $$.info.noScroll && eventStop(e);
            _preventBubble = false;
            return;
        }
        while (_eventListCache.length) {
            var opt = _eventListCache.shift();
            if (!opt) continue;
            var minfo = _meventinfo[opt.meventtype];
            opt.phase     = 'end';
            opt.endTarget = e.target;
            opt.end       = eventPos(e, opt.meventtype);
            opt.action    = getGestureType(opt);
            if (!opt.action) continue;
            opt.endTime = e.timeStamp || Date.now();
            if(opt.meventtype == "double-tap"){
                var preTime = opt.target['doubletaptimer'];
                opt.target.doubletaptimer = opt['endTime'];
                if ( !preTime || opt['endTime'] - preTime > (opt['doubletime'] || 600)){
                    continue;
                }
            }else if(opt.meventtype == "hold-tap"){
                if (opt.hold_tap_timer) clearTimeout(opt.hold_tap_timer);
                continue;
            }
            if (eventCallback(opt, e) === false) {
                eventStop(e);
            }
            if( !_preventBubble ){
                _preventBubble = _preventBubble || opt['preventBubble'];
                if(_preventBubble){
                    _eventListCache = [];
                    break;
                }
            }
        }
        _preventBubble = false;
    }
    function eventCancel(e) {
        _preventBubble = false;
        _eventListCache = [];
        eventStop(e);
    }
    function eventRelease(e){
        for( var i=0, len = _eventListCache.length; i<len; i++ ){
            if( _eventListCache[i].that == e.that && _eventListCache[i].meventtype == e.meventtype ){
                _eventListCache.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function eventStop(e, bubble){
        if(e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
        if( bubble ){
            if(e.stopPropagation)
                e.stopPropagation();
            e.cancelBubble = false;
        }
        return false;
    }
    function eventPos(e, meventtype, phase) {
        var touch = e.changedTouches || [{}];
        if ( _meventinfo[meventtype].isMulticast && touch.length) {
            if (phase != 'start' && touch.length != 2) return null;
            var ret = [];
            for (var i = 0; i < touch.length; i++) {
                ret.push({
                    x:  touch[i].pageX,
                    y:  touch[i].pageY,
                    cx: touch[i].clientX,
                    cy: touch[i].clientY
                });
            }
            return ret;
        } else {
            return [{
                x: e.pageX    || touch[0].pageX,
                y: e.pageY    || touch[0].pageY,
                cx: e.clientX || touch[0].clientX,
                cy: e.clientY || touch[0].clientY
            }];
        }
    }
    function eventCallback(opt, e) {
        var that = opt.that,
            callback = that.meventcallback[opt.meventtype];
        if (!opt.phase || !callback) return;
        e = e ? $$.concat(e, opt) : opt;
        return callback.call(that, e);
    }
    function getGestureType(opt) {
        var minfo = _meventinfo[opt.meventtype];
        if ( minfo.isDraw ) {
            opt.drawpath.push( opt[opt.phase][0] );
            return opt.phase;
        }
        if (opt.phase == 'move' &&  opt.move.length == 1 && minfo.isMoveBack ) {
            opt.shift = {x: opt.move[0].x - opt.moveCache[0].x, y: opt.move[0].y - opt.moveCache[0].y };
            return opt.meventtype + 'ing';
        }
        var p1 = opt.phase == 'end' || minfo.isTap || minfo.isSwip ? opt.start : opt.moveCache,
            p2 = opt.phase == 'end' ? opt.end : opt.move,
            retType = false;
        if ( opt.phase != 'end' && (!p1 || !p2)) return 0;
        if ( minfo.isTap ) return isTap(opt, p1, p2);
        if ( minfo.isRotat ) {
            var dir = isRotatDirection(opt, p2);
            if (!dir) return 0;
            retType = 'rotate-' + dir;
            if (opt.phase == 'move') return retType;
        } else if ( minfo.isPinch ) {
            var dir = isPinchDistance(opt, p2);
            if (!dir) return 0;
            retType = 'pinch-' + dir;
            if (opt.phase == 'move') return retType;
        } else if (p1.length == 1 && minfo.isDirBack) {
            retType = minfo.clas + '-' + isDirection(p1[0].x, p1[0].y, p2[0].x, p2[0].y, opt);
        }
        return (minfo.isDirType && retType != opt.meventtype) ? false : retType;
    }
    function isRotatDirection(opt, p) {
        if (opt.phase != 'end' && p.length != 2) return false;
        var dir = 'tap';
        opt.shift = 0;
        if (p && p.length == 2) {
            opt.angle = Math.angle(p);
            if (!opt.angle) return opt['lastRotateDir'] || 'tap';
            if (!opt.initAngle) {
                opt.initAngle = opt.angle;
                return 'tap';
            }
            opt.shift = opt.angle - opt.initAngle;
            if (Math.abs(opt.shift) >= (opt['rotateshift'] || 20)) dir = opt.shift > 0 ? 'left' : opt.shift < 0 ? 'right' : 'tap';
            if (dir != 'tap') opt.lastRotateDir = dir;
        }
        return opt.phase == 'end' ? (opt['lastRotateDir'] || 'tap') : dir;
    }
    function isPinchDistance(opt, p) {
        if (opt.phase != 'end' && p.length != 2) return false;
        var dir = 'tap';
        opt.shift = 0;
        if (p && p.length == 2) {
            var distance = Math.distance(p);
            opt.initAngle = Math.angle(p);
            if (opt.initAngle) {
                opt.pinchDir = opt.initAngle > 70 && opt.initAngle < 110 ? 'y' : 'x';
            } else {
                opt.pinchDir = '';
            } if (distance) {
                if (!opt.initDistance) {
                    opt.initDistance = distance;
                }
                opt.shift = distance - (opt.phase == 'end' ? opt.initDistance : (opt.distance || opt.initDistance));
                if (Math.abs(opt.shift) >= (opt['pinchshift'] || 20)) dir = opt.shift > 0 ? 'out' : opt.shift < 0 ? 'in' : 'tap';
                if (dir != 'tap') opt.lastPinchDir = dir;
            }
            opt.distance = distance;
        }
        return opt.phase == 'end' ? (opt['lastPinchDir'] || 'tap') : dir;
    }
    function isTap(opt, p1, p2) {
        var retType = '';
        var i = opt.meventtype == 'tow-tap' ? 2 : 1;
        while (i--) {
            if ((retType || (p1.length == i + 1 && p2.length == i + 1)) && isDirection(p1[i].cx, p1[i].cy, p2[i].cx, p2[i].cy, opt) == 'tap') retType = retType || opt.meventtype;
            else return false;
        }
        return retType || false;
    }
    function isDirection(x1, y1, x2, y2, ret) {
        var dir = 'tap',
            xDelta = Math.abs(x1 - x2),
            yDelta = Math.abs(y1 - y2);
        ret = ret || {};
        if (xDelta >= yDelta) {
            ret.shift = xDelta;
            dir = x1 - x2 > 0 ? 'left' : 'right';
        } else {
            ret.shift = yDelta;
            dir = y1 - y2 > 0 ? 'up' : 'down';
        }
        return ret.shift < (ret['moveshift'] || 30) ? 'tap' : dir;
    }





    function mScrollPlugin( e ){
        var o = this.mscroll;
        switch (e.phase){
            case 'init':
                mscrollInit(this, e.meventtype, e.meopt );
                return this;
            case 'start':
                o.refresh();
                o.pause = false;
                e.preventDef = o.enabled;
                o.stop();
                o.moved = false;
                if (!o.enabled) return;
                this.anitime(0);
                var p = $$.matrix(this);
                o.startX = p.x;
                o.startY = p.y;
                o.point = e.start[0];
                o.isScrollTo = false;
                o.docallback( e , 'start');
                break;
            case 'move':
                if( !o.readyRefresh )
                    o.refresh();
                if (!o.enabled || o.pause ) return;
                var p = $$.matrix(this);
                var deltaX = e.shift.x, deltaY = e.shift.y, newX = newY = 0, timestamp = e.timeStamp || Date.now();
                if( o._scrollX ){
                    newX = o.startX+ (e.move[0].x-e.start[0].x);
                    if (newX > 0 || newX < o.maxX)
                        newX = o.bounce ? p.x + (deltaX / 2) : newX >= 0 || o.maxX >= 0 ? 0 : o.maxX;
                }
                if( o._scrollY ){
                    newY = o.startY+ (e.move[0].y-e.start[0].y);//p.y + deltaY;
                    if (newY > 0 || newY < o.maxY)
                        newY = o.bounce ? p.y + (deltaY / 2) : newY >= 0 || o.maxY >= 0 ? 0 : o.maxY;
                }
                o.moved = true;
                o.setpos( newX, newY);
                o.pause = o.docallback( e , 'move') === false;
                break;
            case 'end':
                if (!o.enabled) return;
                var ret = o.docallback( e, 'end' );
                if ( ret === false ) return false;
                if (!o.moved ) {
//                    if ( _isNoFocusRE.test( e.target.nodeName ) ) {
//                        var point = e.changedTouches[0] || e,
//                            ev = document.createEvent('MouseEvents');
//                        ev.initMouseEvent('click', true, true, e.view, 1, point.screenX, point.screenY, point.clientX, point.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
//                        ev._fake = true;
//                        e.target.dispatchEvent(ev);
//                    }
                    o.checkPos(200, e);
                    return;
                }
                var p = $$.matrix(this);
                var momentumX = false, momentumY = false,
                    duration = (e.endTime || Date.now()) - e.startTime,
                    newPosX = p.x,
                    newPosY = p.y;
                if (duration < 300 && o.momentum && ret !== true) {
                    if( o._scrollX ){
                        momentumX = newPosX ? Math.momentum(p.x-o.startX, duration, -p.x, o.scrollerW-o.wrapperW+p.x, o.bounce ? o.wrapperW : 0) : momentumX;
                        if(momentumX){
                            newPosX += momentumX.delta;
                            if ((p.x > 0 && newPosX > 0) || (p.x < o.maxX && newPosX < o.maxX))
                                momentumX = false;
                        }
                    }
                    if( o._scrollY ){
                        momentumY = newPosY ? Math.momentum(p.y-o.startY, duration, -p.y, (o.maxY < 0 ? o.scrollerH - o.wrapperH + p.y : 0), o.bounce ? o.wrapperH : 0) : momentumY;
                        if(momentumY){
                            newPosY += momentumY.delta;
                            if ((p.y > 0 && newPosY > 0) || (p.y < o.maxY && newPosY < o.maxY))
                                momentumY = false;
                        }
                    }
                }
                if (momentumX || momentumY ) {
                    var newDuration = Math.max( Math.max(momentumX.time||0, momentumY.time||0), 30 );
                    o.scrollto(newPosX>>0, newPosY>>0, newDuration, true);
                    return;
                }
                o.checkPos(200, e);
                break;
        }
    }
    function mscrollInit(tar, meventtype, opt, callback ){
        opt = opt || {};
        opt.scrollX = meventtype=='mscroll-x' ? !(opt.scrollY = false) : ( meventtype=='mscroll-y' ? !(opt.scrollY = true) : (opt.scrollY = true) );
        tar.mscroll = new mscrollFn(tar, meventtype, opt);
        tar.parentNode.addcls('MSCROLLBOX');
        tar.addcls('MSCROLLER');
        tar.mscroll.refresh( );
        tar.mscroll.setpos( tar.mscroll.minX, tar.mscroll.minY );
        return tar;
    }
    function mscrollFn( tar, meventtype, opt ){
        this.scrollX      = true;
        this.scrollY      = true;
        this.topOffset    = 0;
        this.leftOffset   = 0;
        this.rightOffset    = 0;
        this.bottomOffset   = 0;
        this.bounce       = true;
        this.momentum     = true;
        this.enabled      = true;
        this.pause        = false;
        this.innerSize    = false;
        this.matrix       = $$.matrix( tar );
        this.callback     = $$.__fn;
        $$.set(this, opt);
        this._scrollX     = true;
        this._scrollY     = true;
        this.steps        = [];
        this.that         = tar;
        this.meventtype   = meventtype;
        this.moved        = false;
        return this;
    }
    mscrollFn.prototype.refresh    = function( reback ){
        var that = this.that,
            parent = that.parentNode;
        if( parent ){
            this.wrapperW   = parent.clientWidth  >>0;
            this.wrapperH   = parent.clientHeight >>0;
            this.minX = -this.leftOffset || 0;
            this.minY = -this.topOffset || 0;
            this.scrollerW  = (!this.innerSize ? Math.max(that.scrollWidth, that.offsetWidth) : that.offsetWidth) >> 0;
            this.scrollerH  = (!this.innerSize ?  Math.max(that.scrollHeight, that.offsetHeight) : that.offsetHeight) >> 0;
            this.maxX = this.wrapperW - this.scrollerW - this.rightOffset+(this.minX>0?this.minX:0);
            this.maxY = this.wrapperH - this.scrollerH - this.bottomOffset+(this.minY>0?this.minY:0);
            this.readyRefresh = true;
        }else{
            this.readyRefresh = false;
        }
        this._scrollX   = this.scrollX && (this.maxX<=0 || this.bounce);
        this._scrollY   = this.scrollY && (this.maxY<=0 || this.bounce);
        if ( reback )
            this.checkPos( 200 );
        return this;
    }
    mscrollFn.prototype.setpos     = function(x, y){
        var that = this.that, o = this;
        x = this._scrollX ? x : this.matrix.x;
        y = this._scrollY ? y : this.matrix.y;
        that.anipos(x, y);
        return this;
    }
    mscrollFn.prototype.scrollto   = function(x, y, time, callback, isevent){
        this.stop();
        var step = x;
        if( typeof(step)=='object' ){
            if( $$.istype(step,'json') ){
                step = [step];
                callback = y;
            }else if( step.nodeType ){
                step = [{
                    x : -step.offsetLeft,
                    y : -step.offsetTop,
                    time: y || 0
                }]
                callback = time;
            }else{
                return;
            }
        }else{
            step = [{x: x, y: y, time: time}];
        }
        if( typeof(callback) == 'boolean' )
            isevent = callback, callback = null;
        for (var i = 0, l = step.length; i < l; i++) {
            this.steps.push({
                x: step[i].x,
                y: step[i].y,
                time: step[i].time || 0,
                scrollto: !isevent
            });
        }
        this.aniloop(callback);
        return this;
    }
    mscrollFn.prototype.aniloop    = function(callback){
        var that = this.that;
        var step;
        if ( !this.steps.length ) {
            if(!this.isScrollTo)
                this.checkPos( 400, callback );
            return;
        }
        step = this.steps.shift();
        this.moved = true;
        that.anitime( step.time );
        this.setpos(step.x, step.y);
        this.isScrollTo = step.scrollto || false;
        if (step.time)
            that.aniend( mscrollFn.aniloop );
        else if( !this.isScrollTo )
            this.checkPos( 0, callback );
        return this;
    }
    mscrollFn.prototype.checkPos   = function(time, isevent){
        var that = this.that, o = this,
            p = $$.matrix(that);
        var resetX = p.x>this.minX || this.maxX >= 0 ? this.minX : p.x < this.maxX ? this.maxX : p.x,
            resetY = p.y>this.minY || this.maxY >= 0 ? this.minY : p.y < this.maxY ? this.maxY : p.y,
            bounce = (resetX == 0 && resetY == 0) || (resetX == this.maxX && resetY == this.maxY);
        if (resetX == p.x && resetY == p.y) {
            if ( isevent ) {
                this.docallback(null, 'stop');
            }
            that.anitime(0);
            return;
        }
        if (bounce && isevent) {
            if ( this.docallback(null, 'bounce')=== false ) {
                return this;
            }
        }
        this.scrollto(resetX, resetY, time || 0, this.callback);
        return this;
    }
    mscrollFn.prototype.stop       = function(){
        this.that.anistop();
        this.steps = [];
        return this;
    }
    mscrollFn.prototype.docallback = function(e, phase){
        e = e || {};
        e.phase = phase;
        return this.callback.call(this.that, e);
    }
    mscrollFn.aniloop = function(){
        this.mscroll.aniloop()
    }

    $$.event.plugin('mscroll', 'move', mScrollPlugin);
    $$.event.plugin('mscroll-x', 'move', mScrollPlugin);
    $$.event.plugin('mscroll-y', 'move', mScrollPlugin);

})(Mantis);

/* **********************************************
     Begin ani.js
********************************************** */

;(function($){
    "use strict"
    var _ischrome = $.info.is('chrome');
    $.requestAnimationFrame = function(c){
        if (window.requestAnimationFrame)
            return window.requestAnimationFrame(c);
        if (window.webkitRequestAnimationFrame)
            return window.webkitRequestAnimationFrame(c);
        if (window.mozRequestAnimationFrame)
            return window.mozRequestAnimationFrame(c);
        if (window.msRequestAnimationFrame)
            return window.msRequestAnimationFrame(c);
        return setTimeout(c, 17);
    };
    $.cancelAnimationFrame = function(h){
        if (window.cancelRequestAnimationFrame)
            return window.cancelRequestAnimationFrame(h);
        if (window.webkitCancelAnimationFrame)
            return window.webkitCancelAnimationFrame(h);
        if (window.webkitCancelRequestAnimationFrame)
            return window.webkitCancelRequestAnimationFrame(h);
        if (window.mozCancelRequestAnimationFrame)
            return window.mozCancelRequestAnimationFrame(h);
        if (window.msCancelRequestAnimationFrame)
            return window.msCancelRequestAnimationFrame(h);
        clearTimeout(h);
    };

    function _aniEndHandler(e) {
        var anim = e.type;
        this.unbind(anim, _aniEndHandler);
        var callback = this.aniEndCallback;
        delete this['aniEndCallback'];
        if ( (callback &&callback .isfn) ) {
            callback.call(this, e);
        }
    }
    function _aniStartHandler(e) {
        var anim = e.type;
        this.unbind(anim, _aniStartHandler);
        var callback = this.aniStartCallback;
        delete this['aniStartCallback'];
        if ( (callback &&callback .isfn) ) {
            callback.call(this, e);
        }
    }

    var _aniPassStyle = /repeat|duration|position|text|float|style|visibility|display/i,
        _aniPassStyleVal = /\d|left|right|bottom|top|center/i,
        _aniChromePassStyle = /left|right|bottom|top/i,
        _cssnumvalre         = /^([+\-]*)([\d\.]+)([a-zA-Z\%]*)$/,
        _loopStepUpdateList = [],
        _tweenStepUpdateList = [];

    function _aniStepLoop() {
        if (this._aniStepLooping) return;
        var steps = this._aniSteps;
        if (steps.length) {
            if( steps[0].wait ){
                var that = this;
                setTimeout(function(){
                    _aniStepLoop.call(that);
                }, steps[0].wait);
                steps[0].wait = 0;
                return;
            }
            var step = steps.shift(), computedStyle = getComputedStyle(this, null),
                css = step.css, style = this.style;
            this._aniOnStep = step;
            this._aniStepLooping = true;
            if( (step.start &&step.start .isfn) ){
                step.start.call(this, e);
            }
            for( var k in css ){
                if( css[k].isstr ){
                    var m = css[k].match(_cssnumvalre);
                    if( m && m[1] ){
                        var v = parseFloat(computedStyle[k]);
                        v = m[1] == '-' ? v-parseFloat(m[2]) : v+parseFloat(m[2]);
                        css[k] = m[3] ? v + m[3] : $.cssunit(v, k);
                    }
                }
            }
            if( !$.matrix_isempty(css) ){
                css[$.cssk.transform] = $.matrix_css($.matrix_f( $.matrix(this), css ));
            }
            style[$.cssk.anitype]  = step.type;
            style[$.cssk.transitionDuration] = step.duration+'ms';
            if(step.duration > 0 && !this._aniHasEnd ){
                this.bind($.eventkey.transitionEnd, _aniStepLoopBack);
                this._aniHasEnd = true;
            }
            var a = $.csstext(style.cssText, false);
            for( var k in css ){
                if( !a[k] ){a[k] = computedStyle[k];}
                style[k] = css[k];
            }
            var b = $.csstext(style.cssText, false);
            step.check = _aniCreatStyleCheck.call(this, a, b);
            if( step.duration <= 0 || !step.check.length){
                _aniStepLoopBack.call(this);
            }else if( (step.update &&step.update .isfn) ){
                _loopStepUpdate.add(this);
            }
        }else{
            this._aniOnStep = null;
            _aniStepLoopBack.call(this);
        }
    }
    function _aniStepLoopBack(e) {
        var step = this._aniOnStep;
        if( e && step && step.check ){
            var i = step.check.indexOf(e.propertyName);
            if( i != -1 )
                step.check.splice(i, 1);
            if( step.check.length )
                return;
        }
        this._aniStepLooping = false;
        this._aniOnStep = null;
        if( step ){
            this.style[$.cssk.transitionduration] = '0ms';
            _loopStepUpdate.rm(this);
            if( (step.callback &&step.callback .isfn) ){
                step.callback.call(this, e);
            }
            _aniStepLoop.call(this);
        }
    }
    function _loopStepUpdate() {
        if( _loopStepUpdateList.length ){
            for( var i= _loopStepUpdateList.length -1 ; i>=0; i-- ){
                var that = _loopStepUpdateList[i];
                if( !that || !that._aniOnStep || !that._aniOnStep.update ){
                    _loopStepUpdateList.splice(i, 1);
                    continue;
                }
                that._aniOnStep.update.call(that, {type:'aniUpdate', target:that});
            }
            $.requestAnimationFrame(_loopStepUpdate);
        }
    }
    _loopStepUpdate.add  = function( that ){
        _loopStepUpdateList.push(that);
        if( _loopStepUpdateList.length >= 1 ){
            $.requestAnimationFrame(_loopStepUpdate);
        }
    }
    _loopStepUpdate.rm   = function( that ){
        var i = _loopStepUpdateList.indexOf(that);
        if( i > -1 ){
            _loopStepUpdateList.splice(i,1);
            if( _loopStepUpdateList.length == 0 )
                _loopStepUpdateList = [];
        }
    }
    function _tweenStepUpdate(){
        if( _tweenStepUpdateList.length ){
            for( var i= _tweenStepUpdateList.length -1 ; i>=0; i-- ){
                var that = _tweenStepUpdateList[i];
                if( !that || !that._aniOnStep || !that._aniOnStep.tween  ){
                    _tweenStepUpdateList.splice(i, 1);
                    continue;
                }
                var step = that._aniOnStep, tween = step.tween, nt = Date.now();
                for( var j=tween.length-1; j>=0; j-- ){
                    var t = tween[j];
                    var v = t.start+t.v*(nt-t.st);
                    if( t.d ? v > t.end : v <= t.end ){
                        tween.splice(j, 1);
                        v = t.end;
                    }
                    that.style[t.key] = v+ t.px;
                }
                if( !tween.length ){
                    _tweenStepUpdateList.splice(i, 1);
                    _aniStepLoopBack.call(this);
                }else if( step.update ){
                    step.update.call(that, {type:'aniUpdate', target:that});
                }
            }
            $.requestAnimationFrame(_tweenStepUpdate);
        }
    }
    _tweenStepUpdate.add = function( that ){
        _tweenStepUpdateList.push(that);
        if( _tweenStepUpdateList.length >= 1 ){
            $.requestAnimationFrame(_tweenStepUpdate);
        }
    }
    _tweenStepUpdate.rm  = function( that ){
        var i = _tweenStepUpdateList.indexOf(that);
        if( i > -1 ){
            _tweenStepUpdateList.splice(i,1);
            if( _tweenStepUpdateList.length == 0 )
                _tweenStepUpdateList = [];
        }
    }

    function _aniCreatStyleCheck(a, b){
        var check = [], computedStyle = getComputedStyle(this, null);
        for( var k in b ){
            if(_aniPassStyle.test(k) || !_aniPassStyleVal.test(b[k]))
                continue;
            if( !a[k] || a[k] != b[k]  ){
                switch(k){
                    case 'padding':case 'margin':
                        check.push(k+'-left',k+'-right',k+'-top',k+'-bottom');
                        break;
                    case 'border':
                        var av = (a[k]||'').split(' '),
                            bv = b[k].split(' ');
                        if( av[0] != bv[0] )
                            check.push(k+'-left-width',k+'-right-width',k+'-top-width',k+'-bottom-width');
                        if( av[2] != bv[2] )
                            check.push(k+'-left-color',k+'-right-color',k+'-top-color',k+'-bottom-color');
                        break;
                    default:
                        check.push(k);
                        break;
                }
            }
        }
        return check;
    }
    function _aniCreatLoopStep( opt, duration, callback ){
        var elm = $.dom['*'];
        opt = $.clone (opt);
        if( $.istype(opt) != 'array' ){
            opt = [opt];
        }
        if( (duration&&duration.isfn) ){
            callback = duration;
            duration = 0;
        }
        if( callback )
            opt[opt.length-1].callback = callback;
        for(var i=0; i<opt.length; i++){
            var o = opt[i];
            opt[i] = {
                css : $.csstext(o, null, false, true, true),
                type : o.type || 'ease-in',
                duration:(o.time ||o.duration || duration || 0),
                start : (o.start || null),
                started : false,
                tween : o.tween || false,
                update : (o.update || null),
                callback:(o.callback || null),
                wait : o.wait || 0
            };
        }
        return opt;
    }
    function _aniCreatTween( step, filter ){
        filter = filter instanceof RegExp ? filter : false;
        var css = step.css, duration = step.duration, p,
            computedStyle = getComputedStyle(this, null), tween = [];
        for( var k in css ){
            if( !filter || filter.test(k) ){
                var  m  = css[k].match(_cssnumvalre)
                if( !m )
                    continue;
                var kk = $.csskey(k),
                    t  = {
                        key : kk,
                        start: parseFloat(computedStyle[kk]),
                        end  : parseFloat(m[2]),
                        px   : m[3],
                        st  : Date.now()
                    };
                    if( m[3] == '%' ){
                        if( !p )
                            p = this.parent('offset');
                        t.start = (t.start/(/top|bottom|height/.test(kk) ? p.offsetHeight : p.offsetWidth ))*100;
                    }
                t.v = (t.end - t.start)/duration;
                t.d = t.end > t.start;
                tween.push(t);
                delete css[k];
            }
        }

        if( tween.length )
            step.tween = tween;
        return tween.length;
    }

    $.elmExtend({
        'anitime': function(tim, anim){
            return this.css( (anim ? 'animationDuration' : 'transitionDuration'), tim+'ms');
        },
        'aniorigin': function(x, y){
            return this.css('transformOrigin', x+' '+y);
        },
        'anitype' : function(type, anim){
            return this.css(anim ? 'animationTimingFunction' : 'transitionTimingFunction', type);
        },

        'aniplay' : function(opt, duration, callback){
            if( opt )
                this.ani(opt, duration, callback);
            var anistate = $.csskey('animationPlayState'), _this = this;
            $.requestAnimationFrame(function(){
                var isNodeList=_this.nodeType==-1,_i=0,that=isNodeList?_this[_i]:_this;
                while ( !_i || (isNodeList&&(that=_this[_i])) ){_i++;
                    if( !this._aniOnStep && that._aniSteps && that._aniSteps.length && !that._aniStepLooping ){
                        _aniStepLoop.call(that);
                    }else if( this._aniOnStep ){
                        _aniStepLoopBack.call(that);
                    }else{
                        that.anistop();
                        that._aniStepLooping = false;
                        that._aniOnStep = null;
                        that.style[$.cssk.duration] = '0ms';
                        _loopStepUpdate.rm(that);
                        _aniStepLoop.call(that);
                    }
                };
            });
            return this;
        },
        'anipause':function(anim){
            this.anistop(anim, true )
        },
        'anistop' : function(anim, ispause ){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            var aniend = $.eventkey( anim ? 'animationEnd' : 'transitionEnd'),
                aniduration = $.csskey(anim ? 'animationDuration' : 'transitionDuration'),
                anistate = $.csskey('animationPlayState');
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                var style = that.style;
                if( that._aniStepLooping ){
                    _loopStepUpdate.rm(that);
                    _tweenStepUpdate.rm(that);
                    that.unbind( $.eventkey.transitionEnd, _aniStepLoopBack);
                    that._aniHasEnd = false;
                    that._aniStepLooping = false;
                }
                if( !ispause ){
                    that.unbind( aniend, that.aniEndCallback);
                    that.unbind( aniend, _aniEndHandler);
                    delete that['aniEndCallback'];
                    that._aniSteps = [];
                }else if( that._aniOnStep ){
                    that._aniSteps.unshift(that._aniOnStep);
                }
                that._aniOnStep = null;
                var css = $.csstext( style.cssText ),
                    computedStyle = getComputedStyle(that, null);
                for( var i in css ){
                    style[i] = $.cssunit(computedStyle[$.csskey(i)], i) || css[i];
                }
                style[anistate] = 'paused';
                style[aniduration] = '0ms';
                // --
            };
            return this;
        },
        'aniover' : function(){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            while ( !_i || (isNodeList&&(that=this[_i])) ) {_i++;
                _aniStepLoopBack.call(that);
            }
            return this;
        },

        'aniend'    : function(callback, anim, keep){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            anim = $.eventkey( anim ? 'animationEnd' : 'transitionEnd' );
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --

                if( keep ){
                    that.bind(anim, callback);
                }else{
                    that.aniEndCallback = callback;
                    that.bind(anim, _aniEndHandler);
                }
                //--
            };
            return this;
        },
        'anistart'  : function(callback, anim, keep){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            anim = $.eventkey( anim ? 'animationStart' : 'transitionStart' );
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                if( keep ){
                    that.bind(anim, callback);
                }else{
                    that.aniStartCallback = callback;
                    that.bind(anim, _aniStartHandler);
                }
                //--
            };
            return this;
        },
        'aniunend'  : function(anim){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            anim = $.eventkey( anim ? 'animationEnd' : 'transitionEnd' );
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                that.unbind(anim, that.aniEndCallback);
                that.unbind(anim, _aniEndHandler);
                delete that['aniEndCallback'];
                //--
            };
            return this;
        },
        'aniunstart': function(anim){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            anim = $.eventkey( anim ? 'animationStart' : 'transitionStart' );
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                that.unbind(anim, that.aniStartCallback);
                that.unbind(anim, _aniStartHandler);
                delete that['aniStartCallback'];
                //--
            };
            return this;
        },

        'anipos'    : function(x, y, increment){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            if( !arguments.length ){
                return $.matrix(that);
            }
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                that.style[$.cssk.transform] = $.matrix_xyz(that, x, y, 0, increment);
                // --
            };
            return this;
        },
        'anikeyframes' : function( keyframes, duration, callback, keep ){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            var aniset = {};
            if( duration&&duration.isfn ){
                keep     = callback;
                callback = duration;
                duration = 300;
            }
            if( keyframes.isstr ){
                aniset[$.cssk.animationName] = keyframes;
                aniset[$.cssk.animationDuration] = duration+'ms';
            }else{
                aniset = $._css2animation(keyframes);
            }
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                var style = that.style;
                style[$.cssk.animationplaystate] = 'paused';
                for(var i in aniset ){
                    style[i] = aniset[i];
                }
                that.aniEndCallback = function(){
                    if( !keep )
                        this.style[$.cssk.animationname] = 'none';
                    if( callback && callback.isfn ){
                        callback.call(this);
                    }
                }
                that.bind($$.eventkey.animationEnd, _aniEndHandler);
                //--
            };
            isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            $.requestAnimationFrame(function(){
                if( !isNodeList ){
                    that.style[$.cssk.animationplaystate] = 'running';
                }else{
                    while ( !_i || (isNodeList&&(that=this[_i])) ) {_i++;
                        that.style[$.cssk.animationplaystate] = 'running';
                    }
                }
            })
            return this;
        },
        'ani'       : function(opt, duration, callback){
            var isNodeList=this.nodeType==-1,_i=0,that=isNodeList?this[_i]:this;
            opt = _aniCreatLoopStep(opt, duration, callback);
            while ( !_i || (isNodeList&&(that=this[_i])) ){_i++;
                // --
                that.style[$.cssk.transitionProperty] = 'all';
                if(!that._aniSteps){
                    that._aniSteps = $.clone(opt);
                }else{
                    that._aniSteps = that._aniSteps.concat( $.clone(opt) );
                }
                //--
            };
            return this;
        }
    });

})(Mantis);

/* **********************************************
     Begin ui.js
********************************************** */

;
(function ($) {
    "use strict"
    var _loadbartimer;

    var staging = {
        timeline  : {
            onready : $.__fn
        },
        loadlist  : {
            init    : '',
                onready :'',
        },
        loadstart : $.__fn,
        loadend   : $.__fn,
        scene     : {
            show      : {},
            create    : {},
            hide      : {}
        }
    };

    $.ui = {
        "staging" : staging,
        "checkrole"  : function( context ){
            $.ui.menu($$('[role="menu"]',context));
        },

        "showloadbar": function (context, operate) { //提供显示加载条的方法
            context = $$(context)
            if (context.ishide()) {
                clearTimeout(_loadbartimer);
                _loadbartimer = setTimeout(function () {
                    if (operate) {
                        context.auto(operate);
                    } else {
                        context.display(block);
                    }
                }, 200);
            }
            return context;
        },
        "hideloadbar": function (context, operate) { //提供隐藏加载条的方法
            context = $$(context);
            clearTimeout(_loadbartimer);
            if (!context.ishide()) {
                if (operate) {
                    context.auto(operate);
                } else {
                    context.display(none);
                }
            }
            return context;
        },

        "sceneID" : [],
        "scene" : function(id, html, parent, defstyle ){
            if( $.ui.sceneID.indexOf(id) != -1 ){
                var scene = $.$('#'+id);
            }else{
                var scene = $.createElement( html ).get();
                scene.id = id;
                $.ui.sceneID.push( id );
                scene.show = function(){
                    if( staging.scene.show[this.id] ){
                        staging.scene.show[this.id].call(this);
                    }else{
                        this.display();
                    }
                };
                scene.hide = function(){
                    if( staging.scene.hide[this.id] ){
                        staging.scene.hide[this.id].call(this);
                    }else{
                        this.display();
                    }
                };
            }
            scene.css({visibility:'hidden'}).addcls('SCENE');
            parent = parent ? $.$(parent) : $.dom.body;
            if( parent != scene.parentNode )
                parent.appendChild( scene );
            if( defstyle )
                scene.css(defstyle);
            $.requestAnimationFrame(function(){
                scene.css( {visibility:'visible'} );
                if( staging.scene.create[id] ){
                    staging.scene.create[id].call(scene);
                }
            });
            return scene;
        },

        "menu": function (context, opt) {
            if ((opt && opt.isfn)) {
                opt = {callback: opt};
            }
            opt = opt || {};
            var tar = $$(context)
            if (tar)
                tar.attr('role', 'menu').attr('uimenuopt', opt, true).on('tap', $.ui.menuTap);
            return tar;
        },
        "menuTap": function (e) {
            var tab = (e.nodeType ? e : e.target).findWrap('[role="item"]');
            if (tab) {
                var tabG = tab.findWrap('[role="menu"]');
                var opt = tabG.uimenuopt || {};

                var callback = opt.callback || $.fn(tabG.attr('callback'));
                if (tabG) {
                    var tabs = tabG.find('[role="item"]');
                    if (callback && callback.call(tabG, e, tab, tabs.indexOf(tab), tabs) === false) {
                        return;
                    }
                    tabs.rmcls('SELED');
                    tab.addcls('SELED');
                }
            }
        },
        "slider": function (context, opt, content) {
            if ((opt && opt.isfn)) {
                opt = {callback: opt};
            }
            var tar = $$(context);
            tar = tar.nodeType == -1 ? tar[0] : tar;
            tar = tar.attr('role', 'mslider').on('move', sliderEvent);
            if (content) {

            }
            tar.mslider = new mslider(tar, opt);
            return tar;
        },
        "getval": function (context) { //获取表单中的名称与值，返回 json
            var ret = {}, list = [];
            context = $.$$(context);
            for (var i = 0; i < context.length; i++) {
                var elm = context[i];
                if (/input|select|textarea/i.test(elm.nodeName))
                    list.push(elm);
                else
                    list = $.$$('input,textarea,select,.SELED[value]', elm);
                for (var j = 0; j < list.length; j++) {
                    var inp = list[j];
                    if (!/button|submit/i.test(inp.getAttribute("type"))) {
                        var id = inp.getAttribute("id") || inp.getAttribute("name") || "id" + i,
                            islist = -1 != id.indexOf("[]"),
                            val = (inp.value||inp.getAttribute('value')||'').trim();
                        id = islist ? id.replace("[]", "") : id, "string" == typeof val && "file" != inp.getAttribute("type") && (val = val.replace(/^\s*|\s*$/g, "")), ret[id] ? "object" == typeof ret[id] ? ret[id].push("checkbox" == inp.getAttribute("type") ? inp.checked : "radio" == inp.getAttribute("type") ? inp.checked ? val : "" : val) : "radio" == inp.getAttribute("type") ? ret[id] = inp.checked ? val : ret[id] : (ret[id] = [ret[id]], ret[id].push("checkbox" == inp.getAttribute("type") ? inp.checked : val)) : ret[id] = islist ? ["checkbox" == inp.getAttribute("type") ? inp.checked : "radio" == inp.getAttribute("type") ? inp.checked ? val : "" : val] : "checkbox" == inp.getAttribute("type") ? inp.checked : "radio" == inp.getAttribute("type") ? inp.checked ? val : "" : val;
                    }
                }
            }
            return ret;
        }
    }


    function mslider(that, opt) {
        this.that = that;
        this.opt = opt;
        this.auto = opt.autoshow;
        this.child = null;
        this.at = 0;

        this.pause = false;
        this.__isauto = false;
        this.refresh();
        return this;
    }

    mslider.prototype.refresh = function () {
        var opt = this.opt;
        this.child = this.that.find('[role="item"]');
        this.that.addcls('MSLIDERBOX');
        this.child.addcls('MSLIDERITEM item').css({x: 0, y: 0});
        if (opt.width)
            this.child.css({'width': opt.width});
        if (opt.height)
            this.child.css({'height': opt.height});
        if (opt.xheight)
            this.child.css({'height': this.child[0].offsetWidth * opt.xheight});
        if (opt.xwidth)
            this.child.css({'width': this.child[0].offsetHeight * opt.xwidth});
        this.that.css({width: this.child[0].offsetWidth, height: this.child[0].offsetHeight});

        var point = '';
        for (var i = 0, len = this.child.length; i < len; i++) {
            point += '<div class="MSLIDERPOINT"></div>';
        }
        this.pointbox = this.that.find('.MSLIDERPOINTBOX')[0] || $.createElement('<div class="MSLIDERPOINTBOX"></div>')[0];
        this.pointbox.innerHTML = point;
        this.that.append(this.pointbox);
        this.point = this.pointbox.child();
        this.slideto(this.at, true);
        if (this.auto) {
            this.autoshow();
        }
        return this;
    }
    mslider.prototype.autoshow = function (t) {
        t = t || (this.opt.autoshow.isnum ? this.opt.autoshow : 3000);
        if (this.__autoshowtim) {
            clearTimeout(this.__autoshowtim);
        }
        var that = this;
        this.__autoshowtim = setTimeout(
            function () {
                if (that.pause)
                    return;
                that.__isauto = true;
                if (sliderEvent.call(that.that, 'ready') !== false) {
                    sliderCheck.call(that.that, 'left');
                }
            }, t);
    }
    mslider.prototype.slideto = function (to, notani) {
        if (to.nodeType) {
            to = this.child.indexOf(to.nodeType == -1 ? to[0] : to);
        }
        var c = this.child[to];
        if (c) {
            if (notani) {
                this.child.rmcls('SELED').addcls('HIDE')[to].rmcls('HIDE').addcls('SELED');
                this.point.rmcls('SELED')[to].addcls('SELED');
                this.at = to;
            } else {

            }
        }
        return this;
    }
    mslider.prototype.slideleft = function () {
        if (sliderEvent.call(this.that, 'ready') !== false) {
            sliderCheck.call(this.that, 'left');
        }
    }
    mslider.prototype.slideright = function () {
        if (sliderEvent.call(this.that, 'ready') !== false) {
            sliderCheck.call(this.that, 'right');
        }
    }
    function sliderCheck(dir) {
        var mslider = this.mslider, opt = mslider.opt, len = mslider.child.length,
            i = mslider.at, width = this.offsetWidth, duration = opt.time || 400;
        var c = {x: 0, y: 0, time: duration, type: 'linear', callback: sliderCallback},
            l = {x: -width, y: 0, time: duration, type: 'linear', callback: sliderCallbackHide},
            r = {x: width, y: 0, time: duration, type: 'linear', callback: sliderCallbackHide};
        mslider.__issliding = true;
        switch (dir) {
            case 'left':
                if (mslider.rightElm) {
                    mslider.at = i + 1 >= len ? 0 : i + 1;
                    mslider.rightElm.aniplay(c);
                    mslider.centerElm.aniplay(l);
                    mslider.leftElm && mslider.leftElm.aniplay(l);
                    break;
                }
            case 'right':
                if (mslider.leftElm) {
                    mslider.at = i - 1 < 0 ? len - 1 : i - 1;
                    mslider.leftElm.aniplay(c);
                    mslider.centerElm.aniplay(r);
                    mslider.rightElm && mslider.rightElm.aniplay(r);
                    break;
                }
            default:
                mslider.centerElm.aniplay(c);
                mslider.leftElm && mslider.leftElm.aniplay(l);
                mslider.rightElm && mslider.rightElm.aniplay(r);
                break;
        }
        mslider.centerElm = mslider.leftElm = mslider.rightElm = null;
        mslider.point.rmcls('SELED');
        mslider.point[mslider.at].addcls('SELED');
    }

    function sliderCheckPos(mslider) {
        var width = mslider.that.offsetWidth;
        mslider.child.anistop().rmcls('SELED');
        var x = mslider.centerElm.anipos().x;
        for (var i = 0, len = mslider.child.length; i < len; i++) {
            if (mslider.child[i] != mslider.centerElm)
                mslider.child[i].addcls('HIDE')
        }
        if (mslider.leftElm) {
            mslider.leftElm.anipos(-width + x, 0).rmcls('HIDE');
        }
        if (mslider.rightElm) {
            mslider.rightElm.anipos(width + x, 0).rmcls('HIDE');
        }
    }

    function sliderCallback() {
        var mslider = this.parent('[role="mslider"]').mslider;
        mslider.pause = false;
        if (mslider.auto) {
            mslider.autoshow();
        }
        this.anistop().addcls('SELED');
    }

    function sliderCallbackHide() {
        this.anistop().addcls('HIDE');
    }

    function sliderEvent(e) {
        var mslider = this.mslider, phase = e.isstr ? e : e.phase, opt = mslider.opt;
        switch (phase) {
            case 'start':
                mslider.pause = true;
            case 'ready':
                var len = mslider.child.length, i = mslider.at;
                if (len <= 1) return false;
                mslider.centerElm = mslider.child[i];
                mslider.leftElm = null;
                mslider.rightElm = null;
                if (len == 2) {
                    if (mslider.__isauto) {
                        mslider.rightElm = mslider.child[i ? 0 : 1];
                    } else {
                        if (i)
                            mslider.leftElm = mslider.child[0];
                        else
                            mslider.rightElm = mslider.child[1];
                    }
                } else {
                    mslider.leftElm = mslider.child[(i - 1 < 0) ? (!opt.notloop ? len - 1 : -1) : i - 1];
                    mslider.rightElm = mslider.child[(i + 1 >= len) ? (!opt.notloop ? 0 : -1) : i + 1];
                }
                sliderCheckPos(mslider);
                break;
            case 'move':
                if (Math.abs(e.shift.x) < 5 || opt.fixed)
                    return;
                mslider.leftElm && mslider.leftElm.anipos(e.shift.x, 0, true);
                mslider.rightElm && mslider.rightElm.anipos(e.shift.x, 0, true);
                mslider.centerElm.anipos(e.shift.x, 0, true);
                break;
            case 'end':
                if (mslider.child.length == 2) {
                    if ((e.action == 'move-left' && mslider.at == 1) || (e.action == 'move-right' && mslider.at == 0))
                        e.action = 'tap';
                }
                switch (e.action) {
                    case 'move-left':
                        sliderCheck.call(this, 'left');
                        break;
                    case 'move-right':
                        sliderCheck.call(this, 'right');
                        break;
                    default:
                        sliderCheck.call(this, 'tap');
                        break;
                }
                break;
        }

    }


    var _isandroid = $.info.is('android');
    if ($.config.viewport && _isandroid) {
        var uiw = parseInt($.config.viewport),
            dpr = window.devicePixelRatio,
            dpi = uiw / window.screen.width * dpr * 160;
        var isdpi = $.info.is('android>=4.2');
        document.write('<meta name="viewport" content="width=' + (!isdpi ? uiw + 'px' : 'device-width') + (_isandroid ? ', target-densitydpi=' + (isdpi ? dpi : 'device-dpi') : '') + '"/>');
    } else if (_isandroid) {
        document.write('<meta name="viewport" content="width=device-width,target-densitydpi=device-dpi"/>');
    }
    if (!$.config.viewportscale)
        document.write('<meta name="viewport" content="initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"/>');
    document.write('<meta name="apple-mobile-web-app-capable" content="yes"/>');
    document.write('<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>');
    var maxwidth = parseInt($.config.maxwidth);
    $.uiunit = ((window.innerWidth > maxwidth ? maxwidth : window.innerWidth) / 320) * 10;
    if ($.config.uiunit == 'em') {
        $.css('body,div {font-size:' + $.uiunit + 'px;}');
    }
    $.load($.config.host + 'ui.mstyle.css');

    $.ready(function () {
        $.dom.body.css({visibility: "visible"});
        $.css('body .FRAME,body .SCENE {visibility:visible;}');
        $.ui.checkrole();
    });

})(Mantis);

/* **********************************************
     Begin end.js
********************************************** */

})(Mantis);
Mantis.str2const( 'block,none,visible,hide:hidden,zindex:zIndex,SELED' );