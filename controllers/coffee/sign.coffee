# 基础类库
fs = require 'fs'
path = require 'path'
url = require 'url'

config = require('../config').config
helper = require '../lib/helper'
# model
user = require '../model/user'


exports.default = (req,res,next)->
	res.locals.men_home = ""
	res.locals.men_reco = ""
	res.locals.men_user = ""
	next()
exports.before = (req,res,next)->
	# res.locals.men_home = ""
	# res.locals.men_reco = ""
	res.locals.men_user = "active"
	next()

exports.userinfo = (req,res,next)->
	# req.cookies.user = "im kelvin."
	# console.log req.cookies.user
	# res.cookie "user",""
	# console.log req.cookies.user
	if req.cookies.user? and req.cookies.user isnt ""
		# console.log req.cookies.user
		cookie_user = helper.decrypt req.cookies.user,config.secret
		cookie_user = cookie_user.split "\t"
		res.locals.userid = cookie_user[0]
		res.locals.username = cookie_user[1]
		res.locals.usermobile = cookie_user[2]
	# console.log "next"
	next()


exports.in = (req,res,next)->
	console.log "登录"
	# user.userinfo 1, (err,results)->
	# 	console.log "what?",err,results
	# user.usersnumber (err,rows)->
	# 	console.log "rows?",err,rows

	res.render 'sign-in'
	# res.send "登录"

exports.up = (req,res,next)->
	console.log "注册"
	cookie_user = helper.encrypt "1\tuser",config.secret
	# console.log user
	# console.log helper.decrypt cookie_user,config.secret
	# reg = {}
	# reg.username = "a1270989"
	# reg.password = "9872234"
	# reg.truename = "哈哈" 
	# reg.mobile = "18610508726"
	# reg.regdate = new Date()
	# reg.logindate = new Date()
	# user.reg reg, (err,results)->
	# 	# results.insertId
	# 	console.log "注册:",err,results

	# re = new helper.recode()
	# res.send re
	res.render 'sign-up'
	# res.send "注册"



exports.out = (req,res,next)->
	re = new helper.recode()
	res.cookie 'user',""
	# res.send re
	res.redirect '/sign/in'
	console.log "退出"

exports.uppost = (req,res,next)->
	console.log "注册提交"
	re = new helper.recode()
	if req.body.mobile.length isnt 11
		re.recode = 201
		re.reason = "手机号格式不正确"
	if req.body.password isnt req.body.secpassword
		re.recode = 202
		re.reason = "两次密码不相同"
	if re.recode isnt 200
		res.send re
		return ""
	data = {}
	data.mobile = req.body.mobile
	data.password = req.body.password

	user.reg data,(err,results)->
		# console.log err,results
		cookie_user = helper.encrypt "#{results.insertId}\t\t#{data.mobile}",config.secret
		res.cookie 'user',cookie_user
		res.cookie 'id',results.insertId
		res.send re

exports.post = (req,res,next)->
	console.log "登录提交",req.body,req.params,res.body
	re = new helper.recode()
	user.login req.body.mobile,req.body.password, (err,results)->
		# console.log err,results
		if results.length > 0
			cookie_user = helper.encrypt "#{results[0].id}\t#{results[0].username}\t#{results[0].mobile}",config.secret
			res.cookie 'user',cookie_user
			res.cookie 'id',results[0].id
			res.send re
		else
			re.recode = 201
			re.reason = "用户名或密码错误"
			res.send re
