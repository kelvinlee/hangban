// Generated by CoffeeScript 1.7.1
var config, fs, helper, path, url, user;

fs = require('fs');

path = require('path');

url = require('url');

config = require('../config').config;

helper = require('../lib/helper');

user = require('../model/user');

exports["default"] = function(req, res, next) {
  res.locals.men_home = "";
  res.locals.men_reco = "";
  res.locals.men_user = "";
  return next();
};

exports.before = function(req, res, next) {
  res.locals.men_user = "active";
  return next();
};

exports.userinfo = function(req, res, next) {
  var cookie_user;
  if ((req.cookies.user != null) && req.cookies.user !== "") {
    cookie_user = helper.decrypt(req.cookies.user, config.secret);
    cookie_user = cookie_user.split("\t");
    res.locals.userid = cookie_user[0];
    res.locals.username = cookie_user[1];
    res.locals.usermobile = cookie_user[2];
  }
  return next();
};

exports["in"] = function(req, res, next) {
  var _s;
  console.log("登录");
  _s = new Date().getTime();
  res.render('sign-in');
  return console.log("加载使用:" + (new Date().getTime() - _s) / 1000 + "s");
};

exports.up = function(req, res, next) {
  console.log("注册");
  return res.render('sign-up');
};

exports.out = function(req, res, next) {
  var re;
  console.log("退出");
  re = new helper.recode();
  res.cookie('user', "");
  return res.redirect('/sign/in');
};

exports.uppost = function(req, res, next) {
  var data, re;
  console.log("注册提交");
  re = new helper.recode();
  if (req.body.mobile.length !== 11) {
    re.recode = 201;
    re.reason = "手机号格式不正确";
  }
  if (req.body.password !== req.body.secpassword) {
    re.recode = 202;
    re.reason = "两次密码不相同";
  }
  if (re.recode !== 200) {
    res.send(re);
    return "";
  }
  data = {};
  data.mobile = req.body.mobile;
  data.password = req.body.password;
  return user.getmobile(data.mobile, function(err, m) {
    if (m.length > 0) {
      re.recode = 201;
      re.reason = "此手机号已经注册过了";
      return res.send(re);
    } else {
      return user.reg(data, function(err, results) {
        var cookie_user;
        cookie_user = helper.encrypt("" + results.insertId + "\t\t" + data.mobile, config.secret);
        res.cookie('user', cookie_user);
        res.cookie('id', results.insertId);
        return res.send(re);
      });
    }
  });
};

exports.post = function(req, res, next) {
  var re;
  console.log("登录提交", req.body, req.params, res.body);
  re = new helper.recode();
  return user.login(req.body.mobile, req.body.password, function(err, results) {
    var cookie_user;
    if (results.length > 0) {
      cookie_user = helper.encrypt("" + results[0].id + "\t" + results[0].username + "\t" + results[0].mobile, config.secret);
      res.cookie('user', cookie_user);
      res.cookie('id', results[0].id);
      return res.send(re);
    } else {
      re.recode = 201;
      re.reason = "用户名或密码错误";
      return res.send(re);
    }
  });
};
