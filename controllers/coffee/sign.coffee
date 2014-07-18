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
	_s = new Date().getTime()
	res.render 'sign-in'
	console.log "加载使用:"+(new Date().getTime()-_s)/1000+"s"

exports.up = (req,res,next)->
	console.log "注册"
	res.render 'sign-up'



exports.out = (req,res,next)->
	console.log "退出"
	re = new helper.recode()
	res.cookie 'user',""
	# res.send re
	res.redirect '/sign/in'
	

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
	user.getmobile data.mobile,(err,m)->
		if m.length>0
			re.recode = 201
			re.reason = "此手机号已经注册过了"
			res.send re
		else
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
