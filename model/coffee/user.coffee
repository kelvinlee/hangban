mysql = require './mysql-class'
helper = require '../lib/helper'


exports.getmobile = (mobile,callback)->
	mysql.row_select
		tbname:"user"
		where: "`mobile` = '#{mobile}'"
	, callback

exports.usersnumber = (callback)->
	mysql.row_count 'user',null,callback

exports.login = (mobile,password,callback)->
	# this.query "select * from user where mobile = ? and password = ?", mobile,password , callback
	mysql.row_select
		tbname:"user"
		where: "`mobile` = '#{mobile}' and `password` = '#{password}'"
	, callback
exports.getUserActive = (id,callback)->
	sql = "select active.* from useractive left join active on useractive.aid = active.id where useractive.uid = #{id} order by useractive.id desc"
	mysql.query sql,callback

exports.getUser = (id,callback)->
	mysql.row_select
		tbname:"user"
		where: "`id`='#{id}'"
		limit:1
	, callback

exports.updateUserInfo = (id,data,callback)->
	data = helper.arstr data
	mysql.row_update "user",data,"`id`='#{id}'",callback
		
exports.check = (mobile,callback)->
	mysql.row_select
		tbname:"user"
		where: "`mobile`='#{mobile}'"
exports.reg = (options,callback)->
	mysql.row_insert 'user',options,callback
