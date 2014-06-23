# @codekit-prepend "js/vendor/Zepto.min.js"
# @codekit-prepend "coffee/plugs.coffee"


$(document).ready ->
	gico.fBindSelect $ 'select'
	submit()
userback = ->
	console.log _user
	$("[name=username]").val _user.truename
	$("[name=mobile]").val _user.mobile
	$("[name=uid]").val _user.id


submit = ->
	$('[name=submit]').click ->
		return alert '姓名不能为空' if $('[name=username]').val().length <=0
		# return alert '请选择性别' if $('[name=sex]').val().length <=0
		return alert '手机号码不能为空' if $('[name=mobile]').val().length <=0
		return alert '手机号码必须是11位数字' if $('[name=mobile]').val().length isnt 11 
		# return alert '邮箱地址不能为空' if $('[name=email]').val().length <=0
		# reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
		# return alert '邮箱格式不正确' if not reg.test $('[name=email]').val() 2580
		# return alert '请选择欲购车时间' if $('[name=buytime]').val().length <=0
		# return alert '请选择感兴趣车型' if $('[name=cartype]').val().length <=0
		# return alert '请选择感兴趣车系' if $('[name=hope]').val().length <=0
		# return alert '请选择省份' if $('[name=province]').val() is "省份"
		# return alert '请选择城市' if $('[name=city]').val() is "城市"
		# return alert '请选择经销商' if $('[name=dealer]').val() is "经销商"
		# return alert '请选择车系' if $('[name=type]').val() is "选择车系"
		# return alert '请选择车型' if $('[name=cartype]').val() is "选择车型"
		# return alert '请选择欲购车时间' if $('[name=buytime]').val() is "欲购车时间"
		# console.log $('[name=register]').serializeArray()
		$.ajax
			url: $('[name=register]').attr "action"
			type: 'POST'
			data: $('[name=register]').serializeArray()
			dataType: 'json',
			success: (msg)->
				console.log msg
				if msg.recode is 200
					alert '预约成功'
				else
					alert msg.reason
		return false