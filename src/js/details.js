require(['config'], function() {
	require(['jquery', 'xcarousel', 'xzoom', 'common'], function($) {

		jQuery(function($) {

			let good_id = location.search.slice(1);
			$.ajax({
				url: "../data/likeGoods.json",
				success: function(data) {
					let data_arr = data.RECORDS;
					if (good_id) {
						data_arr.id = good_id;
						//对应id号的商品信息
						var goods = data_arr[data_arr.id - 1];
						let $img = $('<img/>').attr('src', '../' + goods.likeImg).appendTo($('.big'));

						let $ul_small = $('<ul/>').addClass('clearfix');

						let smallimg = goods.smallimg.split(',');
						let $res = $.map(smallimg, function(url) {
							let $img = $('<img/>');
							let $li = $('<li/>');
							$img.attr('src', '../' + url).appendTo($li);
							$li.on('mouseenter', $img, function() {
								let $imgAll = $ul_small.children('li').children('img');
								$imgAll.css('border', 'none');
								$img.css('border', '1px solid #000');
								$('.big').children('img').width(385).attr('src', $img[0].src);
							})

							// $li.on('mouseleave',$img,function(){
							// 	$img.css('border','none');
							// })
							return $li;
						});
						$ul_small.append($res).appendTo($('.d_img'));

						// //放大镜
						// $('.big').xZoom({

						// })



						//获取数据详情
						let $d_con = $('.d_con');
						$('.title').text(goods.likeName);

						$('<span/>').text(goods.sellPrice).appendTo($('.sellPrice'));
						if (goods.price != null) {
							$('<span/>').html('<del>' + '￥' + goods.price + '<del/>').appendTo($('.sellPrice'));
							let count = (goods.sellPrice / goods.price).toFixed(2) * 10;
							$('.sellPrice').append($('<span/>').text(count + '折').append($('<span/>')));
						}

						if (goods.color != null) {
							let goodsColor = goods.color.split(',');
							let $ul_color = $('<ul/>');
							$ul_color.addClass('clearfix');
							let $res = $.map(goodsColor, function(data) {
								let $span = $('<span/>').text(data);
								let $li = $('<li/>').append($span);
								$li.on('click', 'span', function() {
									let $spanAll = $ul_color.children('li').children('span');
									$spanAll.removeClass();
									$spanAll.css('border', '2px solid #ccc');
									$span.css('border', '2px solid  #e50065');
									$span.addClass('active');
								})
								return $li;
							});
							$ul_color.append($res).appendTo($('.color'));
						}

						//设置size
						if (goods.barSize != null) {
							let barSize = goods.barSize.split(',');
							let $ulBar = $('<ul/>');
							$ulBar.addClass('clearfix');
							let $res = $.map(barSize, function(data) {
								let $span = $('<span/>').text(data);
								let $li = $('<li/>').append($span);
								$li.on('click', 'span', function() {
									let $spanAll = $ulBar.children('li').children('span');
									$spanAll.removeClass();
									$spanAll.css('border', '1px solid #ccc');
									$span.css('border', '1px solid  #e50065')
									$span.addClass('active');
								})
								return $li;

							})
							$ulBar.append($res).appendTo($('.size'));
						}

						if (goods.size != null) {
							let size = goods.size.split(',');
							let $ulSize = $('<ul/>');
							$ulSize.addClass('clearfix');
							let $res = $.map(size, function(data) {
								let $span = $('<span/>').text(data);
								let $li = $('<li/>').append($span);
								$li.on('click', 'span', function() {
									let $spanAll = $ulSize.children('li').children('span');
									$spanAll.removeClass();
									$spanAll.css('border', '1px solid #ccc');
									$span.css('border', '1px solid  #e50065')
									$span.addClass('active');
								})
								return $li;

							})
							$ulSize.append($res).appendTo($('.size'));

						}

						//增加或减少数量
						// $('.num').on('click','i',function(){
						// 	if($('.add')){
						// 		$('.num').children('span')[1].children[0].innerText = currRes++ +1;
						// 		console.log(currRes)
						// 	}
						// });

						let currRes = Number($('.num').children('span')[1].children[0].innerText);
						$('.add').on('click',function(){
							$('.num').children('span')[1].children[0].innerText = currRes++ +1;
						})

						$('.reduce').on('click',function(){
							if(currRes<=1){
								currRes =1;
							}else{
							$('.num').children('span')[1].children[0].innerText = currRes-- -1;
							}

						})


						//读取cookie
						let goodslist = Cookie.get('moon') || [];
						if (typeof goodslist === 'string') {
							goodslist = JSON.parse(goodslist);
						}

						$('.buy').on('click', 'a', function() {
							let good_id = goods.id;
							//获取尺码
							let size = $('.size').find('li').children('span');
							let currSize;
							for (let i = 0; i < size.length; i++) {
								if (size[i].className === 'active') {
									currSize = $(size[i]).text();
								} else {
									currSize = $(size[0]).text();
								}
							}

							//获取颜色

							let color = $('.color').find('li').children('span');
							let currColor;
							for (let i = 0; i < color.length; i++) {
								if (color[i].className === 'active') {
									currColor = $(color[i]).text();
								} else {
									currColor = $(color[0]).text();
								}
							}
							let idx;
							let has = goodslist.some(function(g, i) {
								idx = i;
								return g.guid === good_id;
							});

							if (has) {
								goodslist[idx].qty += currRes;
								goodslist[idx].color = currColor;
								goodslist[idx].size = currSize;
							} else {

								let moon = {
									guid: good_id,
									name : goods.likeName,
									price: goods.sellPrice,
									size : currSize,
									imgurl:goods.likeImg,
									color: currColor,
									qty: currRes
								}

								goodslist.push(moon);
							}	
								console.log(goodslist);

							document.cookie = 'moon=' + JSON.stringify(goodslist);

						});

						//点击购物车
							$('.cart').on('click',function(){
								$('.buy_cart').show();
								$('.back').show();
							});

						//点击继续购物
							$('.reShop').on('click',function(){
								$('.buy_cart').hide();
								$('.back').hide();
							});

						//点击立即购买
							$('.b_n').on('click',function(){
								$(this).attr('href','../html/shopping_cart.html');
							});

						//点击去结账
							$('.checkout').on('click',function(){
								$(this).attr('href','../html/shopping_cart.html')
							})
					}



				}
			});

		});

	});

});