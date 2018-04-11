;(function($){
	$.fn.xCarousel = function(options){
		// this指向$(.box元素)
		// console.log(this)
		let defaults = {
			width:800,
			height:320,
			index:0,
			duration:3000,
			autoPlay:true,
			type:'vertical',//horizontal,fade
			seamless:false,
			page:true,
			// imgs:[],保存图片路径
		}

		return this.each(function(){
			// 这里的this指向

			let $self = $(this);

			// let opt = Object.assign({},defaults,options);
			let opt = $.extend(true,{},defaults,options);//深复制

			if(opt.imgs){

			opt.len = opt.imgs.length;
			}


			let $ul;
			let $page_span;

			// 上一张图处索引值
			let lastIndex = opt.index;


			// 获取/创建元素
			// 绑定事件
			let init = ()=>{
				// 应用插件样式
				$self.addClass('xcarousel');
				$self.width(opt.width);
				$self.height(opt.height);

				//设置左右滚动箭头
				let $l_r = $.map(opt.imgLR,function(url){
					let $img = $('<img/>').attr('src',url);
					return $img;
				});
				$self.parent().append($l_r);

				// if(opt.lis){
				// 	let $ul = $('<ul/>');
				// 	let $res = $.map(opt.lis,function(con){
				// 		let $li = $('<li/>');
				// 		let $h3 = $('<h3/>');
				// 		$h3.text(con).appendTo($li);
				// 		return $li;
				// 	})
				// 	$ul.append($res);
				// 	$ul.appendTo($self.parent().find('.hs_lis'));
				// }

				$ul = $('<ul/>');

				let $res = $.map(opt.imgs,function(url){
					let $li = $('<li/>');
					let $a = $('<a/>');
					let $img = $('<img/>');
					$a.attr('href','#').append($img.attr('src',url)).appendTo($li);

					return $li;
				});//[$li,$li,$li]


				$ul.append($res);

				$ul.appendTo($self);


				//显示分页
				$page_span = $('<div/>').addClass('page');
					

				for(let i=0;i<opt.len;i++){
					let $span = $('<span/>');
					$span.text(i+1);
					// if(i===0){
					// 	$span.addClass('active');
					// }
					$page_span.append($span).appendTo($(this));
				}
				$page_span.children('span')[0].className = 'active';
				let $ulLen;
				// 水平滚动必须设置ul的宽度
				if(opt.type === 'horizontal'){
					$($ul.children('li')[0]).clone().appendTo($ul);
					$ulLen = $ul.children('li').length;
					$ul.width(opt.width*$ulLen);
					$ul.addClass('clearfix');
					$ul.addClass('horizontal');

				}

				// 淡入淡出必须设置定位
				else if(opt.type === 'fade'){
					if($self.children('.hs_ul')){
						$ul.addClass('fade');
						$ul.css({
							width:opt.width,
							height:opt.height
						});

					$ul.children('li').eq(opt.index).siblings('li').css('opacity',0);
					}
					$ul.addClass('fade');
					$ul.css({
						width:opt.width,
						height:opt.height
					});

					$ul.children('li').eq(opt.index).siblings('li').css('opacity',0);
				}

				// 移入移出
				$self.on('mouseenter',()=>{
					clearInterval($self.timer);
				}).on('mouseleave',()=>{
					clearInterval($self.timer);
					move();
				})

				// 触摸页码
				.on('mouseenter','.page span',function(e){
					clearInterval($self.timer);
					$ul.stop();
					opt.index = e.target.innerText-1;
					show();

				});

				//点击左箭头向左滑动
				$self.parent().on('mousedown','>img:nth-of-type(1)',function(){
					clearInterval($self.timer);
					$ul.stop();
					opt.index = opt.index-1;
					show();
				})

				//点击右箭头向右滑动
				$self.parent().on('mousedown','>img:nth-of-type(2)',function(){
					clearInterval($self.timer);
					$ul.stop();
					opt.index = opt.index+1;
					show();
				});

				$self.parent().on('mouseup','>img',function(){
					clearInterval($self.timer);
					move();
				})
				move();

			}

			// 运动
			let move = ()=>{
				$self.timer = setInterval(()=>{
					opt.index++;

					show();
				},opt.duration);
			};


			let show = function(){
				if(opt.index >= opt.len+1){
					$ul.css('left',0);
					opt.index = 1;
				}else if(opt.index < 0){
					opt.index = opt.len
				}

				// $page_span[0].children[opt.index].className = 'active';

				for(let i=0;i<opt.len;i++){
					$page_span[0].children[i].className = '';
					if(opt.index === opt.len){
					$page_span[0].children[0].className = 'active';
					}else{
					$page_span[0].children[opt.index].className = 'active';
					}
				}

				let obj = {};
				if(opt.type === 'vertical'){
					obj.top = -opt.height*opt.index;
					$ul.animate(obj)
				}else if(opt.type === 'horizontal'){
					obj.left = -opt.width*opt.index;
					$ul.animate(obj,200)
				}else if(opt.type === 'fade'){
					// 改变li的opacity
					$ul.children('li').eq(opt.index).animate({opacity:1},function(){
						if(lastIndex>=opt.len){
							lastIndex = 0;
						}
						lastIndex = opt.index;
					});
					$ul.children('li').eq(lastIndex).animate({opacity:0},function(){
						if(opt.index >= opt.len){
							opt.index = 0;
						lastIndex = opt.index;
						}
					});

				}
				

			}

			init();
		});

		// return this;
	}

	$.fn.extend({
		xPopover(){},
		xAjax(){},
		xAjax(){},
		xAjax(){},
		xAjax(){}
	})

})(jQuery);
