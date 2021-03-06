;(function($){
	// $.prototype.xZoom = function(){}
	$.fn.xZoom = function(options){
		let defaults = {
			width:385,
			height:520,

			// 放大图片的位置
			position:'right',//bottom,left,top

			// 间距
			gap:15


		}


		// this		$(ele)
		return this.each(function(){
			let opt = $.extend({},defaults,options);

			// this		ele
			// 小图容器
			let $small = $(this);
			let $big;
			let $zoom;
			let ratio;

			let zoom = {
				init(){
					// 添加特定类
					$small.addClass('xzoom-small');

					// 小图
					let $smallImg = $small.children('img');

					//存放小图的容器

					let $ul = $small.parent().children('ul');

					let $smallImgs = $ul.find('img');

					// 创建大图容器
					$big = $('<div/>').addClass('xzoom-big');

					let $bigImg = $('<img/>').attr('src',$smallImg.attr('src'));

					$ul.on('mouseenter','img',function(){


					$bigImg = $('<img/>').attr('src',$(this).attr('src'));

					$bigImg.appendTo($big);

					// console.log($(this).attr('src'))
					console.log($big.children('img').attr('src'))
					})


					// 大图
					// console.log($smallImg)
					$bigImg.css('width',1000)
					let left,top;
					if(opt.position === 'right'){
						top = $small.offset().top;
						left = $small.offset().left + $smallImg.outerWidth() + opt.gap;
					}else if(opt.position === 'bottom'){
						left = $small.offset().left;
						top = $small.offset().top + $smallImg.outerHeight() + opt.gap;
					}else if(opt.position === 'left'){
						top = $small.offset().top;
						left = $small.offset().left - opt.gap - opt.width;
					}else if(opt.position === 'top'){
						left = $small.offset().left;
						top = $small.offset().top - opt.height - opt.gap;
					}

					// 设置样式
					$big.css({
						width:opt.width,
						height:opt.height,
						left:left,
						top:top
					})

					$bigImg.appendTo($big);
					$big.appendTo($('section'));

					$zoom = $('<div/>').addClass('zoom');
					$zoom.appendTo($small);

					// 绑定鼠标移入移出事件
					$small.on('mouseenter',function(e){
						zoom.show();

						

						// 图片如果被浏览器缓存则complete属性为true
						if($bigImg[0].complete){
							ratio = $bigImg.width()/$smallImg.width();
							// console.log(ratio)
						}else{
							// 加载完成后执行
							$bigImg[0].onload = function(){
								ratio = $bigImg.width()/$smallImg.width();
							}
							
						}

						// 设置放大镜尺寸
						// 与放大区域成比例
						$zoom.css({
							width:opt.width/ratio,
							height:opt.height/ratio
						});

					}).on('mouseleave',function(){
						zoom.hide();
					}).on('mousemove',function(e){
						// console.log(e.offsetX,e.offsetY);
						let x = e.pageX - $small.offset().left - $zoom.outerWidth()/2;//光标距离事件源对象的偏移量
						let y = e.pageY -$small.offset().top - $zoom.outerHeight()/2;

						// 限制x,y的边缘
						if(x<0){
							x = 0;
						}else if(x > $smallImg.innerWidth()-$zoom.outerWidth()){
							x = $smallImg.innerWidth()-$zoom.outerWidth();
						}

						if(y<0){
							y = 0;
						}else if(y > $smallImg.innerHeight()-$zoom.outerHeight()){
							y = $smallImg.innerHeight()-$zoom.outerHeight();
						}

						$zoom.css({
							left:x,
							top:y
						});

						$bigImg.css({
							left: -x*ratio,
							top: -y*ratio
						});
					})

					// console.log($smallImg.data('big'))

				},
				move(){

				},
				show(){
					$big.fadeIn()
					$zoom.show();
				},
				hide(){
					$big.fadeOut()
					$zoom.hide();
				}
			}


			zoom.init();


		});
	}

	// 系列插件
	// $.fn.extend({

	// })
})(jQuery);