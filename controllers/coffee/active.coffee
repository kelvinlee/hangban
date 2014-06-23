# 基础类库
fs = require 'fs'
path = require 'path'
url = require 'url'
# Ut = require('../lib/util')
helper = require '../lib/helper'
# 
user = require '../model/user'
active = require '../model/active'

exports.before = (req,res,next)->
	# if req.cookies.user? and res.locals.userid?
	# 	next()
	# else
	# 	res.redirect '/sign/in'

exports.joina = (req,res,next)->
	re = new helper.recode()

	data = {}
	data.username = req.body.username
	data.mobile = req.body.mobile
	data.email = req.body.email
	data.province = req.body.prolander
	data.city = req.body.city
	data.dealer = req.body.dealer
	data.sex = req.body.sex
	data.buytime = req.body.buytime
	data.cartype = req.body.cartype
	data.hascar = req.body.hascar
	data.passport = req.body.passport
	data.create_at = new Date()

	if not data.username?
		re.recode = 201
		re.reason = "用户名不能为空"
	if not data.mobile?
		re.recode = 202
		re.reason = "手机号码不能为空"
	if data.mobile.length isnt 11
		re.recode = 203
		re.reason = "手机号码格式不正确"
	# if not data.prolander?
	# 	re.recode = 203
	# 	re.reason = "请选择省份"
	# if not data.city?
	# 	re.recode = 204
	# 	re.reason = "请选择城市"


	aid = req.params.active_id
	
	console.log data


	if re.recode isnt 200
		res.send re
	# else
	# 	res.send re
	# return ''
	uid = req.body.uid
	if uid?
		active.checkac aid,uid,(err,resu)->
			if resu.length > 0
				re.recode = 301
				re.reason = "您已经参与过此活动了"
				res.send re
			else
				active.joinactive aid,uid,data,(err,results)->
					console.log "u:",err,results
					res.send re
		return ''
	else
		active.joinactivenou aid,data,(err,results)->
			console.log "a:",err,results
	res.send re
	
exports.homepage = (req,res,next)->
	# 活动主页.

	res.render 'active-info'
exports.active = (req,res,next)->
	# console.log req.param("active_id")
	res.locals.men_home = "active"
	active.getactive req.params.active_id, (err,results)->
		# console.log err,results
		res.render 'active-info',{active:results[0]}
		active.viewed req.params.active_id

exports.new = (req,res,next)->
	# 添加新活动
	res.render 'active-up'

exports.newpost = (req,res,next)->
	re = new helper.recode()
	# data = {}
	# data.ename = "maiteng"
	# data.name = "迈腾活动"
	# data.description = "活动说明"
	# data.url = "/img/active.jpg"
	# data.href = "/"
	# data.order = 1
	# # neworhot new is 1 hot is 2, normal is 0
	# data.neworhot = 1
	# data.lotext = "哥本哈根机票"
	# data.stardate = new Date().getTime()
	# data.enddate = (new Date().getTime())+3*24*60*60*1000
	# data.create_at = new Date()
	# active.newactive data,(err,results)->
	# 	console.log err,results
	res.send re