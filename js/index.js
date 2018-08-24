$(function() {

	// 美化多选复合框
	$('.dowebok :input').labelauty();

	// banner
	var swiper = new Swiper('.swiper-container');

	// 类型展示
	$(".Regional").click(function() {
		if($('.Dropdown1').hasClass('Dropdowntop')) {
			$('.Dropdown1').removeClass('Dropdowntop');
			$(this).removeClass('current');
			$('.screening').attr('style', ' ');
		} else {
			$('.Dropdown1').addClass('Dropdowntop');
			$(this).addClass('current');
			$(".meishi").removeClass('current');
			$(".Brand").removeClass('current');
			$(".Sort").removeClass('current');
			$('.screening').attr('style', 'position: fixed;top:0;');
		}
	});
	// 行业展示
	$(".Sort").click(function() {
		if($('.Dropdown2').hasClass('Dropdowntop')) {
			$('.Dropdown2').removeClass('Dropdowntop');
			$(this).removeClass('current');
			$('.screening').attr('style', ' ');
		} else {
			$('.Dropdown2').addClass('Dropdowntop');
			$(this).addClass('current');
			$(".Regional").removeClass('current');
			$(".Brand").removeClass('current');
			$('.screening').attr('style', 'position: fixed;top:0;');
		}
	});

	// 地区展示
	$(".Brand").click(function() {
		if($('.Dropdown3').hasClass('Dropdowntop')) {
			$('.Dropdown3').removeClass('Dropdowntop');
			$(this).removeClass('current');
			$('.screening').attr('style', ' ');
		} else {
			$('.Dropdown3').addClass('Dropdowntop');
			$(this).addClass('current');
			$(".Regional").removeClass('current');
			$(".Sort").removeClass('current');
			$('.screening').attr('style', 'position: fixed;top:0;');
		}
	});

	// 类型判断页面是否有弹出
	$(".Regional").click(function() {
		if($('.Dropdown3').hasClass('Dropdowntop')) {
			$('.Dropdown3').removeClass('Dropdowntop');
		};
	});
	$(".Regional").click(function() {
		if($('.Dropdown2').hasClass('Dropdowntop')) {
			$('.Dropdown2').removeClass('Dropdowntop');
		};
	});

	// 行业判断页面是否有弹出
	$(".Sort").click(function() {
		if($('.Dropdown3').hasClass('Dropdowntop')) {
			$('.Dropdown3').removeClass('Dropdowntop');
		};
	});
	$(".Sort").click(function() {
		if($('.Dropdown1').hasClass('Dropdowntop')) {
			$('.Dropdown1').removeClass('Dropdowntop');
		};
	});

	// 地区判断页面是否有弹出
	$(".Brand").click(function() {
		if($('.Dropdown2').hasClass('Dropdowntop')) {
			$('.Dropdown2').removeClass('Dropdowntop');
		};
	});
	$(".Brand").click(function() {
		if($('.Dropdown1').hasClass('Dropdowntop')) {
			$('.Dropdown1').removeClass('Dropdowntop');
		};

	});
});

// 打卡弹窗
$(function() {
	var is_first = getCookie("is_first");
	if(is_first != 1) {
		showNewUser();
		var time = getTodayOtherTime(); //每天一次
		setCookie("is_first", 1, time); //3600 * 24 有效期一天
	} else {
		hideNewUser();
	}
})

function showNewUser() {
	var document_height = $(document).height();
	var window_height = $(window).height();
	var height = document_height > window_height ? document_height : window_height;
	$("#overlay").css({
		"height": height,
		"display": "block"
	})
	$("#new_user").show();
}

function hideNewUser() {
	$("#new_user").hide();
	$("#overlay").css({
		"display": "none"
	})
}
//设置cookies函数
function setCookie(name, value, time) { //name:cookie键名，value:cookie键值,和时间S
	var exp = new Date();
	exp.setTime(exp.getTime() + time * 1000); //有效期1小时 
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//取cookies函数 
function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if(arr != null)
		return unescape(arr[2]);
	return null;
}

//删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//从当前时间到明日0点的时间戳
function getTodayOtherTime() {
	var today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
	//明日0点时间戳
	var tomorrow_0 = today.getTime() / 1000 + (24 * 3600);
	var current_time = Math.round(new Date().getTime() / 1000);
	var expire = tomorrow_0 - current_time;
	return expire;
}