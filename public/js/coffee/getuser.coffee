_user = {}
window.onload = ->
	$.ajax
		url: '/api/user'
		type: 'GET'
		dataType: 'json',
		success: (msg)->
			if msg.recode? and msg.recode is 200
			else
				_user = msg
				userback() if userback?


