# @codekit-prepend "js/vendor/Zepto.min.js"
# @codekit-prepend "coffee/plugs.coffee"

isScrolling_move = false


readygo = (evt)->
	# console.log evt
	closeAll()
	# $("#goback").attr 'href',document.referrer if document.referrer?
	# $("#goback").attr 'href',document.referrer
	# console.log document.referrer
	document.querySelector('#mySlider').addEventListener('slide', myFunction) if $("#mySlider").length>0
	checkForm()
	createForm()
	checkTimes()

$(document).ready ->
	readygo()
	# window.addEventListener('push', readygo)
window.addEventListener "load", ->
	setTimeout -> 
		window.scrollTo 0,1
document.addEventListener 'WeixinJSBridgeReady', ->
	WeixinJSBridge.call 'hideToolbar'


# for times 
checkTimes = ->
	$("[data-time]").each ->
		test = new Date $(this).data 'time'
		if test > new Date()
			# console.log "run:",test
			now = new Date().getTime()
			test = test.getTime()
			day = Math.floor((test-now)/1000/60/60/24)
			hour = Math.floor((test-now)/1000/60/60-day*24)
			mint = Math.floor((test-now)/1000/60)-day*24*60-hour*60
			miao = Math.floor((test-now)/1000)-day*24*60*60-hour*60*60-mint*60
			# console.log day,hour,mint,miao
			$(".day span",this).text day
			$(".hour span",this).text hour
			$(".mint span",this).text mint
			$(".miao span",this).text miao
			window.location.reload() if day is 0 and hour is 0 and mint is 0 and miao is 0
			setTimeout checkTimes,1000
		else
			$(".day span",this).text "0"
			$(".hour span",this).text "0"
			$(".mint span",this).text "0"
			$(".miao span",this).text "0"
		# else
			# console.log "not run:",test
ressubmit = (id)->
	$.ajax
		type:"post"
		dataType:"json"
		url: '/limit/lot/'+id
		success: (msg)->
			if msg.recode is 200
				alert "恭喜你抢购成功"
			else
				alert msg.reason



createForm = ->
	gico.fBindSelect $ 'select'
limitposts = (id)->
	$.ajax
		type:"post"
		dataType:"json"
		url:$("[name=limitpost]").attr 'action'
		data:$("[name=limitpost]").serializeArray()
		success: (msg)->
			if msg.recode is 200
				window.location.href = "/home/limit/"+id
			else
				alert msg.reason

loginsubmit = ->
	console.log $("[name=login]").serializeArray()
	$.ajax
		type:"post"
		dataType:"json"
		url:"/sign/in"
		data:$("[name=login]").serializeArray()
		success: (msg)->
			if msg.recode is 200
				window.location.href = "/user/regs"
			else
				alert msg.reason
signup = ->
	$.ajax
		type:"post"
		dataType:"json"
		url:"/sign/up"
		data:$("[name=reg]").serializeArray()
		success: (msg)->
			if msg.recode is 200
				window.location.href = "/user/regs"
			else
				alert msg.reason
showsecondbar = (o)->
	if $("#secondbar").is ".showthis"
		$("#secondbar").removeClass 'showthis'
		$(o).removeClass 'active'
		$(".tab-label",o).text '更多'
	else
		$("#secondbar").addClass 'showthis'
		$(o).addClass 'active'
		$(".tab-label",o).text '收起'
myFunction = (evt)->
	# console.log evt.detail.slideNumber
	$("#mySlider .slide-point span").removeClass 'on'
	$("#mySlider .slide-point span").eq(evt.detail.slideNumber).addClass 'on'

closeAll = ->
	$(".pop,.model").removeClass 'active'
signpop = ->
	$("#nologin").addClass 'active'
	$("#nologin").click (e)->
		if not ($(e.target).is(".popbody") || $(e.target).parents(".popbody").length>0)
			$("#nologin").removeClass 'active'
gotopage = (url,animate = true, anit = "slide-in")->
	# console.log isScrolling_move
	if isScrolling_move
		isScrolling_move = false
		return ''

	# alert "go to nextpage" 
	window.location.href = url;

checkForm = ->
	if $("form input").length > 0
		$("input[type=checkbox]").each (i)->
			$div = $('<div>').addClass 'checkbox-parent '+$(this).attr 'class'
			$i = $ '<i>'
			$(this).before $div
			$div.addClass($(this).attr('class')).append $ this
			$div.addClass 'on' if $(this).is ':checked'
			$div.append $i 
			$(this).change ->
				$o = $(this)
				setTimeout ->
					if $o.is ':checked'
						$o.parent().addClass 'on'
					else
						$o.parent().removeClass 'on'
				,10

hidecancel = ->
	$("#cancel").removeClass 'active'
showcancel = (o,id)->
	$("#cancel").addClass 'active'
	$("#cancel").click (e)->
		if not ($(e.target).is(".popbody") || $(e.target).parents(".popbody").length>0)
			$("#cancel").removeClass 'active'

editadr = (id)->
	$("#adrctrl").addClass 'active'
	$("#adrctrl").click (e)->
		if not ($(e.target).is(".popbody") || $(e.target).parents(".popbody").length>0)
			$("#adrctrl").removeClass 'active'

hideAll = ->
	$(".pop").removeClass 'active'


showactivetable = ()->
	$("#activetable").addClass 'active'
	$("#activetable").click (e)->
		if not ($(e.target).is(".popbody") || $(e.target).parents(".popbody").length>0)
			$("#activetable").removeClass 'active'