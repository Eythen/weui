/**
 * 滑动删除插件
 * Created by Administrator on 17/2/17.
 */

;
(function(win, doc) {
	$.fn.slide2del = function(options) {
		var opt = $.extend(true, {
			offset: 0,
			sItemClass: "session-box",
			sDelBtnClass: "del-btn"
		}, options);
		if(opt.sItemClass.indexOf(".") >= 0) {
			opt.sItemClass = opt.sItemClass.substring(1);
		}
		if(opt.sDelBtnClass.indexOf(".") >= 0) {
			opt.sDelBtnClass = opt.sDelBtnClass.substring(1);
		}
		opt.offset = $('.' + opt.sDelBtnClass).width();
		return $(this).each(function() {
			var offset = opt.offset;
			//创建一个新的hammer对象并且在初始化时指定要处理的dom元素
			var _this = $(this).get(0);
			$(this).on('touchend', function(e) {
				var target = $(e.target);
				if(!target.hasClass(opt.sItemClass)) {
					target = target.parents('.' + opt.sItemClass);
				}
				var isShow = $(this).attr("isShow");
//				if(isShow != "true") {
//					console.log("鼠标抬起:", isShow, target);
//					target.animate({
//						left: 0
//					}, 300);
//				}
			}).on('click', function() {
				var isShow = $(this).attr("isShow");
				if(isShow != "true") {
					return false;
				}
				if(opt.itemClickHandler) {
					var result = opt.itemClickHandler.call(this, $(this));
					if(result != false) {
						$(this).slide2del_hideDel();
					}
				} else {
					$(this).slide2del_hideDel();
				}
			}).on('click', '.' + opt.sDelBtnClass, function(e) {
				var target = $(e.target);
				if(!target.hasClass(opt.sItemClass)) {
					target = target.parents('.' + opt.sItemClass);
				}
				opt.delHandler && opt.delHandler(target, $(this));
				target.css({
					left: 0,
					'transition': 'left 300ms',
					'-webkit-transition': 'left 300ms'
				}).attr("isShow", false);
			});
			$(this).__proto__.slide2del_hideDel = function() {
				$(this).css({
					left: 0,
					'transition': 'left 300ms',
					'-webkit-transition': 'left 300ms'
				}).attr("isShow", false);
			};
			var hammertime = new Hammer(_this);
			var lastAngle = null;
			//添加事件
			hammertime.on("pan", function(e) {
				var dx = e.deltaX;
				/*if(lastAngle!=null){
				    if(Math.abs(180 - Math.abs(e.angle))>45){
				        return false;
				    }
				}*/
				lastAngle = e.angle;
				var target = $(e.target);
				if(!target.hasClass(opt.sItemClass)) {
					target = target.parents('.' + opt.sItemClass);
				}
				var isShow = target.attr("isShow");
				var hiding = target.attr("hiding");
				if(hiding) {
					return false;
				}
				if(dx < 0 && isShow != "true") {
					target.siblings('.' + opt.sItemClass).css({
						left: 0,
						'transition': 'left 300ms',
						'-webkit-transition': 'left 300ms'
					}).attr('isShow', false);
					if(Math.abs(dx) > offset) {
						target.css({
							left: -Math.floor(offset),
							'transition': 'none',
							'-webkit-transition': 'none'
						}).attr('isShow', true);
					} else {
						target.css({
							left: Math.floor(dx),
							'transition': 'none',
							'-webkit-transition': 'none'
						});
					}
				} else if(dx > 0) {
					if(dx >= offset / 4) {
						target.slide2del_hideDel();
					}
				}
			});
		});
	};
})(window, document);