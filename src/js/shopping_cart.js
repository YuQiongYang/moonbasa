require(['config'], function() {
	require(['jquery', 'common'], function($) {
		jQuery(function($) {

				//获取cookie
				let goodslist;
				$('.goods').html();
				render();
				
			function render() {


				goodslist = Cookie.get('moon');
				if (goodslist.length === 0) {
					goodslist = [];
				} else {
					goodslist = JSON.parse(goodslist);

				}

				let cash = 0;


				let $res = $.map(goodslist, function(data) {

					//计算商品金额
					cash = data.qty * data.price;

					let $ul = $('<ul/>').attr('data-id', data.guid);
					$ul.addClass('clearfix')
					let $checkbox = $('<li/>').append($('<input/>').attr({
						type: 'checkbox',
						checked: 'checked'
					}));
					let $img = $('<li/>').append($('<a/>').attr('href', '../html/details.html').append($('<img/>').attr('src', '../' + data.imgurl)));
					let $name = $('<li/>').append($('<a/>').attr('href', '../html/details.html').append(($('<h3/>').text(data.name)).append($('<i/>').text(data.guid).addClass('guid'))),
						$('<span/>').text('尺寸：' + data.size), $('<span/>').text('颜色：' + data.color));
					let $price = $('<li/>').append($('<span/>').text('￥' + data.price));
					let $qty = $('<li/>').append($('<span/>').addClass('shuliang').append(($('<input/>').val(data.qty).addClass('num')), $('<i/>').text('+').addClass('add'), $('<i/>').text('-').addClass('reduce')));
					let $sum = $('<li/>').append($('<span/>').text('￥' + cash).addClass('sum'));
					let $sure_remove = $('<div/>').append($('<p/>').text('你确定要删除此商品？'), $('<a/>').attr('href','#').text('确定'),$('<a/>').attr('href','#').text('取消'),$('<i/>'),$('<i/>')).addClass('sure_remove');
					let $remove = $('<li/>').append($('<a/>').attr('href', '#').text('移除').addClass('remove'),$sure_remove);


					return $ul.append($checkbox, $img, $name, $price, $qty, $sum, $remove);

				})
				$('.goods')[0].innerHTML = '';
				$('.goods').append($res);

				let index;

				//点击add添加商品数量并且写进cookie
				$('.goods').on('click', function(e) {
					let target = e.target;
					var guid = $(target).parent().parent().parent().find('.guid').text();
					let currNum = target.parentNode.children[0].value * 1;
					if (target.className === 'add') {
						target.parentNode.children[0].value++;
						for (let i = 0; i < goodslist.length; i++) {
							if (goodslist[i].guid == guid) {
								goodslist[i].qty = target.parentNode.children[0].value;
								cash = goodslist[i].qty * goodslist[i].price;
								target.parentNode.parentNode.nextSibling.innerText = '￥' + cash;
								jisuan()
							}
						}
						document.cookie = 'moon=' + JSON.stringify(goodslist);
					}

					//点击reduce减少数量并写进cookie
					if (target.className === 'reduce') {
						if (currNum <= 1) {
							currNum = 1;
						} else {
							target.parentNode.children[0].value--;
							for (let i = 0; i < goodslist.length; i++) {
								if (goodslist[i].guid == guid) {
									goodslist[i].qty = target.parentNode.children[0].value;
									cash = goodslist[i].qty * goodslist[i].price;
									target.parentNode.parentNode.nextSibling.innerText = '￥' + cash;
									jisuan();
								}
							}

							document.cookie = 'moon=' + JSON.stringify(goodslist);
						}
					}

					//点击移除删除改商品cookie
					$('.sure_remove').hide();

					if(target.className === 'remove'){
						let $sure_remove = $(target).siblings('.sure_remove');
						$sure_remove.show();
					}

				})


			}
				jisuan();
				function jisuan(){
				//商品数量
				let total = 0;

				//商品总价钱
				let totalMoney =0;

				let $total = $('.num');
				let $totalMoney = $('.sum').text();
				for(let i=0;i<$total.length;i++){
					total += $total[i].value*1;
				}
				$('.discount').text(total+'件');

				let idx;
				for(let i =0;i<goodslist.length;i++){
					idx = i;
					totalMoney = goodslist[idx].qty * goodslist[idx].price;
					console.log(goodslist[idx].qty * goodslist[idx].price)
				}
				
				$('.resNum').text(totalMoney + '元')
					
				}

				$('.sure_remove').on('click',function(e){
					let target = e.target;
					var guid = $(target).parent().parent().parent().find('.guid').text();
					if(target.innerText === '确定'){
						for(var i=0;i<goodslist.length;i++){
			                if(goodslist[i].guid == guid){
			                    goodslist.splice(i,1);
			                    	jisuan();
			                    break;
			                }
			            }
			                document.cookie = 'moon=' + JSON.stringify(goodslist);
			                render();
					}
				})

				

		})
	})
})