mysql = require './mysql-class'


exports.getLimit = (callback)->
	mysql.row_select
		tbname:"limit"
		limit:1
	,callback

getactive = (id,callback)->
	mysql.row_select
		tbname:"active"
		where: "`id`='#{id}'"
		limit:1
	,callback
exports.getactive = getactive

exports.getUsers = (tbname,callback)->
	mysql.row_select
		tbname:tbname
		limit:5
	,callback

exports.viewed = (id)->
	mysql.row_update "active","`views`=views+1","`id`='#{id}'", (err,results)->
		console.log err,results
regsed = (id)->
	mysql.row_update "active","`regs`=regs+1","`id`='#{id}'", (err,results)->
		console.log err,results
exports.regsed = regsed

exports.create_active = (newtbname,callback)->
	mysql.copy_table 'regdemo',newtbname,callback

exports.check_table = (tbname,callback)->
	mysql.check_table tbname,callback

exports.getActives = (callback)->
	mysql.row_select
		tbname:"active"
		where: ""
		limit:20
		order:"order asc"
	, callback
exports.getBanner = (callback)->
	mysql.row_select
		tbname:"banner"
		where: "(`stardate` >= '#{new Date().getTime()}' and `enddate` <= '#{new Date().getTime()}') or forever = 1"
		order:"order"
	, callback
exports.getBannertj = (callback)->
	mysql.row_select
		tbname:"banner_tj"
		where: "(`stardate` >= '#{new Date().getTime()}' and `enddate` <= '#{new Date().getTime()}') or forever = 1"
		order:"order"
	, callback

exports.limits = (uid,callback)->
	sql = "select a.* from `limit` as a left join `limit_reg` as b on a.id = b.lid where b.uid='#{uid}' order by b.create_at desc"
	mysql.query sql,callback

exports.checklimit = (lid,uid,callback)->
	mysql.row_select 
		tbname :"limit_reg"
		where:"`lid`='#{lid}' and `uid`='#{uid}'"
	,callback
exports.newlimit = (data,callback)->
	mysql.row_insert "limit_reg",data,callback

exports.newactive = (data,callback)->
	mysql.row_insert "active",data,callback

exports.checkac = (aid,uid,callback)->
	mysql.row_select
		tbname:"useractive"
		where: "`aid`='#{aid}' and `uid`='#{uid}'"
		limit: 1
	,callback

exports.joinactive = (aid,uid,data,callback)->
	getactive aid,(err,results)->
		regsed aid
		mysql.row_insert "useractive",{aid:aid,uid:uid,create_at:new Date()},(err,resu)->
			mysql.row_insert "regdemo_"+results[0].ename,data,callback
exports.joinactivenou = (aid,data,callback)->
	getactive aid,(err,results)->
		regsed aid
	# mysql.row_insert "useractive",{aid:aid,uid:uid,create_at:new Date()},(err,results)->
		mysql.row_insert "regdemo_"+results[0].ename,data,callback


# for art
exports.getArts = (callback)->
	mysql.row_select
		tbname:"art"
		limit:20
		order:"order"
	,callback
exports.getArt = (id,callback)->
	mysql.row_select
		tbname:"art"
		where : "`id`='#{id}'"
	,callback
exports.newart = (data,callback)->
	mysql.row_insert "art",data,callback

