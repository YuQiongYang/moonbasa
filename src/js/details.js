require(['config'],function(){
	require(['jquery','xcarousel'],function($){

		jQuery(function($){

			let good_id = location.search.slice(1);
			$.ajax({
				url:"../data/likeGoods.json",
				success:function(data){
					let data_arr = data.RECORDS;
					if(good_id){
						data_arr.id = good_id;
						//对应id号的商品信息
						let goods = data_arr[data_arr.id-1];
						let $img = $('<img/>').attr('src','../'+goods.likeImg).appendTo($('.big'));
						
						let $ul_small = $('<ul/>').addClass('clearfix');
						
							let smallimg = goods.smallimg.split(',');
							let $res = $.map(smallimg,function(url){
								let $img = $('<img/>');
								let $li = $('<li/>');
								$img.attr('src','../'+url).appendTo($li);
								$li.on('mouseenter',$img,function(){
									$img.css('border','none');
									$img.css('border','1px solid #000');
									$('.big').children('img').width(385).attr('src',$img[0].src);
								})

								$li.on('mouseleave',$img,function(){
									$img.css('border','none');
								})
								return $li;
							});
							$ul_small.append($res).appendTo($('.d_img'));

						//获取数据详情
						let $d_con = $('.d_con');
						$('.title').text(goods.likeName);

						$('<span/>').text(goods.sellPrice).appendTo($('.sellPrice'));
						if(goods.price != null){
							$('<span/>').html('<del>'+'￥'+goods.price+'<del/>').appendTo($('.sellPrice'));
							let count = (goods.sellPrice/goods.price).toFixed(2)*10;
							$('.sellPrice').append($('<span/>').text(count + '折').append($('<span/>')));
						}

						if(goods.color != null){
							let goodsColor = goods.color.split(',');
							let $ul_color = $('<ul/>');
							$ul_color.addClass = 'clearfix';
							let $res = $.map(goodsColor,function(data){
								let $li = $('<li/>').text(data);
								return $li;
							});
							$ul_color.append($res).appendTo($('.color'));
						}
					}
				}
			})

		})

});
	
});