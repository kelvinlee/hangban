# 基础类库
fs = require 'fs'
path = require 'path'
url = require 'url'
# Ut = require('../lib/util')
helper = require "../lib/helper"
EventProxy = require('eventproxy')

# 
user = require '../model/user'
active = require '../model/active'

exports.before = (req,res,next)->
	_s = new Date().getTime()
	if req.cookies.user? and res.locals.userid? and req.cookies.user isnt ""
		res.locals.men_user = "active"
		next()
	else
		res.redirect '/sign/in'
	console.log "跳转使用:"+(new Date().getTime()-_s)/1000+"s"
exports.api = (req,res,next)->
	re = new helper.recode()
	if res.locals.userid?
		user.getUser res.locals.userid,(err,results)->
			re = results[0]
			re.password = ""
			res.send re
	else
		res.send re

exports.lots = (req,res,next)->
	ep = EventProxy.create 'limits',"user",(limits,user)->
		res.render 'sign-lots',{user:user,limits:limits}
	user.getUser res.locals.userid,(err,results)->
		ep.emit "user",results[0]
	active.limits res.locals.userid,(err,results)->
		console.log err,results
		ep.emit "limits",results

		# res.render 'sign-lots',{user:results[0]}


exports.regs = (req,res,next)->
	ep = EventProxy.create "active","user", (active,user)->
		res.render 'sign-regs',{user:user,active:active}
	user.getUser res.locals.userid,(err,results)->
		ep.emit "user",results[0]
	user.getUserActive res.locals.userid,(err,results)->
		ep.emit "active",results
		

exports.info = (req,res,next)->
	user.getUser res.locals.userid,(err,results)->

		res.render 'sign-info',{user:results[0]}

exports.cars = (req,res,next)->
	user.getUser res.locals.userid,(err,results)->
		
		res.render 'sign-cars',{user:results[0]}

exports.carspost = (req,res,next)->
	data = {}
	data.create_at = new Date()
	data.uid = res.locals.userid
	data.content = req.body.content

	re = new helper.recode()

	user.newcars data,(err,results)->


exports.infopost = (req,res,next)->
	re = new helper.recode()
	data = {}
	data.truename = req.body.truename
	data.sex = if req.body.sex is "1" then "男" else "女"
	data.adr = req.body.adr
	data.province = req.body.province
	data.city = req.body.city
	console.log req.body,data
	user.updateUserInfo res.locals.userid,data,(err,results)->
		console.log err,results
		res.redirect "/user/regs"

exports.center = (req,res,next)->
	console.log "用户中心id:",res.locals.userid
	# active.create_active 'reg_test', (err,results)->
	# 	console.log err,results
	# active.check_table 'reg_hangban', (err,results)->
	# 	console.log err,results

	user.getUser res.locals.userid,(err,results)->


		res.render 'sign-center',{user:results[0]}
