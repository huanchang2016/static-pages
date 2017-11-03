$(function(){
// 子菜单 宽度，定位设置
	// var subNavs = $(".nav-list li>ul.subNav");
	// console.log(subNavs);
	// for(let j=0,len=subNavs.length;j<len;j++){
	// 	let _liWidth = 0;
	// 	let _fWidth = $(subNavs).eq(j).outerWidth();
	// 	let _lis = $(subNavs).eq(j).find('li');
	// 	for(let i=0,l=_lis.length; i<l; i++){
	// 		console.log($(_lis).eq(i).outerWidth());
	// 		_liWidth = _liWidth + ($(_lis).eq(i).outerWidth() + 40);
	// 	}
	// 	$(subNavs).eq(j).css({
	// 		width: _liWidth,
	// 		left: -(_liWidth - _fWidth)/2
	// 	});
	// }
	

	$(".nav-list>li").hover(function(){
		$(this).addClass("nav-active").find('.subNav').show();	
	}, function(){
		$(this).removeClass("nav-active").find('.subNav').hide();
	});

	$(".subNav li a").click(function(){
		console.log($(this).html());
	});

	// 子菜单 宽度，定位设置
	var _liWidth = 0;
	

	// banner 轮播动画效果
	var $lis = $(".banner-list li"),
	len = $lis.length,
	currentIndex = 0,
	nextIndex = 1,
	_html = '',
	_time = null;

	// 创建小圆点span
	for(var i=0;i<len;i++){
		_html += "<span>"+ (i + 1) +"</span>";
	}

	$(".circle").eq(0).html(_html);

	$(".circle span").eq(0).addClass("b-active").end()
	.on("click",function(){
		if($(this).index() === currentIndex)
			return;
		nextIndex = $(this).index();
		move();
	});
	
	// 设置自动的淡入淡出轮播效果
	$(".b-box").hover(function(){
		clearInterval(_time);
	},function(){
		_time = setInterval(move,3000);
	}).trigger("mouseleave");// trigger()，表示触发某事件。

	// 淡入淡出的轮播函数move（）
	function move(){
		$lis.eq(currentIndex).fadeOut(1500);
		$lis.eq(nextIndex).fadeIn(1500);
		

		// 改变小圆点样式
		$(".circle span").eq(nextIndex).addClass("b-active")
		.siblings().removeClass("b-active");
		currentIndex = nextIndex;
		nextIndex++;
		if(nextIndex > len){
			nextIndex = 0;
		}
	}

	// 主内容左侧tabs
	$(".l-title span").hover(function(){
		var _tabs = $(this).parents('.tabs').find('.l-tab');
		var _i = $(this).index();
		$(_tabs).hide();
		$(_tabs).eq(_i).show();
	});

// 互动 轮播

	var lis = $(".c-slider li"),
	liWidth = $(lis[0]).width(),
	len = lis.length,
	_index = 1,
	firstNode = lis[0].cloneNode(true); // 克隆第一个节点

	// 将克隆的第一个节点添加到最后
	$(".c-box")[0].appendChild(firstNode);
	len += 1;
	// 设置 ul.c-box 的宽度
	$(".c-box")[0].style.width = (liWidth * len) + "px";

	// 自动轮播
	setInterval(function(){
		var _left = -1 * _index * liWidth;
		_index++;				
		animate($(".c-box")[0], {left:_left}, function(){
			// 运动结束，执行函数
			// 判断是否显示到最后一张图片
			if (_index === len){
				$(".c-box")[0].style.left = 0;
				_index = 1;
			}
		});	
	}, 3000);


	// 运动函数
// element : 待实现运动动画的元素
// options : 运动属性的配置对象
// speed : 运动时间
// fn : 函数，运动动画执行结束后，还需要再执行的函数
function animate(element, options, speed, fn) {
	if (typeof speed === "function"  || typeof speed === "undefined"){
		fn = speed;
		speed = 400;
	}

	// 先取消在 element 元素上的运动计时器
	clearInterval(element.timer);

	// 存放各属性起始值的对象
	var startPosition = {};
	for (var attr in options) {
		startPosition[attr] = parseFloat(css(element, attr));
	}
	var startTime = +new Date(); // 记录开始运动的时间
	// 启动计时器，实现运动效果
	element.timer = setInterval(function(){
		var elapse = Math.min(+new Date() - startTime, speed); // 运动时间差
		// 循环为每个属性值赋新计算值
		// 线性运动公式：(终值-初值) / 总时间 * 运动耗时 + 初值
		for (var attr in options) {
			var val = (options[attr] - startPosition[attr]) / speed * elapse + startPosition[attr];
			element.style[attr] = val + (attr === "opacity" ? "" : "px");
			if (attr === "opacity")
				element.style.filter = "alpha(opacity="+ (val * 100) +")";
		}
		if (elapse === speed){ // 到达运动总时间，则停止计时器
			clearInterval(element.timer);
			// 运动执行结束后需要继续执行的函数
			fn && fn();
		}
	}, 30);
}

// 处理获取节点元素的额属性值的兼容
	function css(obj, attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
	}

})