$(function(){
	$(".nav-list>li").hover(function(){
		$(this).addClass("nav-active").find('.subNav').show();
	}, function(){
		$(this).removeClass("nav-active").find('.subNav').hide();
	});

	$(".subNav li a").click(function(){
		console.log($(this).html());
	})


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
		_time = setInterval(move,2000);
	}).trigger("mouseleave");// trigger()，表示触发某事件。

	// 淡入淡出的轮播函数move（）
	function move(){
		$lis.eq(currentIndex).fadeOut(1000);
		$lis.eq(nextIndex).fadeIn(1000);
		

		// 改变小圆点样式
		$(".circle span").eq(nextIndex).addClass("b-active")
					   .siblings().removeClass("b-active");
		currentIndex = nextIndex;
		nextIndex++;
		if(nextIndex === len){
			nextIndex = 0;
		}
	}
})