# 基础类库
fs = require 'fs'
path = require 'path'
url = require 'url'
EventProxy = require('eventproxy')
# Ut = require('../lib/util')
helper = require "../lib/helper"
active = require "../model/active"
user = require "../model/user"
Showdown = require 'showdown'
converter = new Showdown.converter()

exports.before = (req,res,next)->

exports.art = (req,res,next)->
	res.locals.men_reco = "active"
	active.getArt req.params.art_id,(err,results)->
		art = results[0]
		art.content = converter.makeHtml art.content
		res.render 'art',{art:results[0]}

exports.limitinfo = (req,res,next)->
	res.locals.men_home = "active"
	ep = EventProxy.create "banner","limit","user", (banner,limit,user)->
		res.render 'home-limit-info',{banner:banner,limit:limit,user:user}

	if res.locals.userid?
		user.getUser res.locals.userid,(err,results)->
			ep.emit "user",results[0]
	else
		ep.emit "user",null
	active.getLimit (err,results)->
		ep.emit "limit",results[0]
	active.getBanner (err,results)->
		ep.emit "banner",results


exports.limit = (req,res,next)->
	res.locals.men_home = "active"
	ep = EventProxy.create "banner","limit","user", (banner,limit,user)->
		res.render 'home-limit',{banner:banner,limit:limit,user:user}

	if res.locals.userid?
		user.getUser res.locals.userid,(err,results)->
			ep.emit "user",results[0]
	else
		ep.emit "user",null
	active.getLimit (err,results)->
		ep.emit "limit",results[0]
	active.getBanner (err,results)->
		ep.emit "banner",results

exports.limitpost = (req,res,next)->
	# req.params.limit_id
	re = new helper.recode()
	data = {}
	data.lid = req.params.limit_id
	data.truename = req.body.username
	data.mobile = req.body.mobile
	data.province = req.body.province
	data.city = req.body.city
	data.create_at = new Date()

	data.uid = req.body.userid if req.body.userid?


	if not data.lid?
		re.recode = 201
		re.reason = "活动不存在"
	if not data.truename?
		re.recode = 202
		re.reason = "用户名不能为空"
	if not data.mobile?
		re.recode = 203
		re.reason = "手机号码不能为空"

	return res.send re if re.recode isnt 200
	if data.lid? and data.uid?
		active.checklimit data.lid,data.uid,(err,results)->
			if results.length>0
				res.send re
			else
				active.newlimit data,(err,results)->
					res.send re
	else
		active.newlimit data,(err,results)->
			res.send re
	# res.send re



exports.homepage = (req,res,next)->
	# console.log req.cookies.user
	res.locals.men_home = "active"
	ep = EventProxy.create "banner","active","users", (banner,active,users)->
		res.render 'homepage',{banner:banner,active:active,users:users}

	active.getActives (err,results)->
		ep.emit "active",results
	active.getUsers 'note',(err,users)->
		if users?
			for a in users
				a.newtime = helper.format_date(new Date(a.create_at),true)
				reg = /(\d{3})\d{4}(\d{4})/
				a.mobile = a.mobile.replace reg,"$1****$2"
			ep.emit "users",users
		else
			ep.emit "users",[]
	active.getBanner (err,results)->
		ep.emit "banner",results

	# res.send "haha"

exports.active = (req,res,next)->

exports.recommend = (req,res,next)->
	# console.log req.cookies.user
	res.locals.men_reco = "active"
	ep = EventProxy.create "banner","art", (banner,art)->
		res.render 'recommend',{banner:banner,art:art}

	active.getArts (err,results)->
		ep.emit "art",results
	active.getBannertj (err,results)->
		ep.emit "banner",results