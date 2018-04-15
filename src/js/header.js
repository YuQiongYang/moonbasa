require(['config'], function() {
	require(['jquery', 'xcarousel', 'common'], function($) {

		;
		jQuery(function($) {

			let $login = $('.log');
			let $reg = $('.reg');
			$login.click(function() {
				$login.attr('href', '../html/login.html');
			});

			$reg.click(function() {
				console.log(123)
				$reg.attr('href', '../html/reg.html');
			})

			//进入购物车
			$('.cart').click(function() {
				this.href = '../html/car.html'
			})

			var goodslist;
			header_render();

			function header_render() {
				//读取cookie
				goodslist = Cookie.get('moon') || [];

				if (typeof goodslist === 'string') {
					goodslist = JSON.parse(goodslist);
				}

				let $ul = $('<ul/>').addClass('allGoods');
				let $res = goodslist.map(function(goods) {
					let $li = $('<li/>').attr('data-id', goods.guid).addClass('clearfix');
					return $li.append($('<a/>').attr('href', '../html/goods.html?' + goods.qty).append($('<img/>').attr('src', '../' + goods.imgurl), $('<h3/>').text(goods.name)),
						$('<i/>').text('￥'), $('<span/>').addClass('num').text(goods.qty * 1 * goods.price), $('<span/>').addClass('qty').text('x' + goods.qty),
						$('<a/>').attr('href', '#').addClass('del').text('删除'));
				})
				$('.car').html('');
				$ul.append($res).appendTo($('.car'));
				document.cookie = 'moon=' + JSON.stringify(goodslist) + ';path=/';

				if ($('.car')[0].innerText === '') {
					$('.car').html('您没有添加商品进购物车').css({
						'color': '#e50163',
						'font-size': '24px',
						'text-align': 'center',
						'font-weight': 'blod',
						'line-height': '80px'
					})
				}
			}


			//通过事件委托进行删除
			$('.right').on('click', '.del', function() {
				console.log(this);
				var guid = $(this).parent()[0].dataset.id;
				for (var i = 0; i < goodslist.length; i++) {
					if (goodslist[i].guid == guid) {
						goodslist.splice(i, 1);
						console.log(goodslist)
						break;
					}
				}
				document.cookie = 'moon=' + JSON.stringify(goodslist) + ';path=/';
				header_render();
			})


			//点击nav进入详情页
			$('.nav').on('click','a',function(){
				this.href = '../html/lists.html';
			})



				//吸顶
			 	let timer;//定义全局变量
			 	let $top = $('<span/>').css({'display':'none','width':'80px','height':'60px','background-color':'#58bc58',
			 		'font-size':'16px','color':'#fff','line-height':'60px','text-align':'center','position':'fixed','bottom':'80px','right':'10px'}).text('回到顶层').appendTo($('section'));
			    $(window).scroll( function() {
			        clearTimeout(timer);//必须要有这句
			        if( $(document).scrollTop() > 500 ){
			             $top.css('display','block');   
			        }else{
			               $top.css('display','none');
			        }
			    });

			    $top.click(function(){
			    	let timer = setInterval(function(){
			    	let scrollTop = $(document).scrollTop();
			    	let speed = parseInt(scrollTop/5);

					scrollTop -= speed;

					if(speed <= 10){
						clearInterval(timer);
						scrollTop = 0;
					}

					scrollTo(0,scrollTop);


			    		
			    	},30)

			    })
		})
	})
})