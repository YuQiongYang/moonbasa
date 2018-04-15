require(['config'], function() {
	require(['jquery', 'common','header'], function($) {
		jQuery(function($) {

				//获取cookie
				let goodslist;
				$('.goods').html();
				let cash = 0;
				render();


				//获取cookie结构渲染进html
			function render() {


				goodslist = Cookie.get('moon');
				if (goodslist.length === 0) {
					goodslist = [];
				} else {
					goodslist = JSON.parse(goodslist);

				}



				let $res = $.map(goodslist, function(data) {

					//计算商品金额
					cash = data.qty * data.price;

					let $ul = $('<ul/>').attr('data-id', data.guid);
					$ul.addClass('clearfix')
					let $checkbox = $('<li/>').append($('<input/>').attr({
						type: 'checkbox',
						checked: 'checked'
					}));
					let $img = $('<li/>').append($('<a/>').attr('href', '../html/details.html?'+data.guid).append($('<img/>').attr('src', '../' + data.imgurl)));
					let $name = $('<li/>').append($('<a/>').attr('href', '../html/details.html?'+data.guid).append(($('<h3/>').text(data.name)).append($('<i/>').text(data.guid).addClass('guid'))),
						$('<span/>').text('尺寸：' + data.size), $('<span/>').text('颜色：' + data.color));
					let $price = $('<li/>').append($('<span/>').text('￥' + data.price));
					let $qty = $('<li/>').append($('<span/>').addClass('shuliang').append(($('<input/>').val(data.qty).addClass('num')), $('<i/>').text('+').addClass('add'), $('<i/>').text('-').addClass('reduce')));
					let $sum = $('<li/>').append($('<span/>').text('￥' ),$('<span/>').text(cash).addClass('sum'));
					let $sure_remove = $('<div/>').append($('<p/>').text('你确定要删除此商品？'), $('<a/>').addClass('sure_del').attr('href','#').text('确定'),$('<a/>').attr('href','#').text('取消'),$('<i/>'),$('<i/>')).addClass('sure_remove');
					let $remove = $('<li/>').append($('<a/>').attr('href', '#').text('移除').addClass('remove'),$sure_remove);


					return $ul.append($checkbox, $img, $name, $price, $qty, $sum, $remove);

				})
				$('.goods')[0].innerHTML = '';
				$('.goods').append($res);
				if($('.goods')[0].innerHTML === ''){
				$('.goods').append($('<span/>').text('您没有添加商品进购物车！去'),$('<a/>').attr('href','../index.html').text('逛逛吧').css('color','#e50163'));
				}
				let index;

				//点击add添加商品数量并且写进cookie
				$('.goods').on('click', function(e) {
					let target = e.target;
					var guid = $(target).parent().parent().parent().find('.guid').text();
					let currNum = target.parentNode.children[0].value * 1;
					if (target.className === 'add') {
						let add_qty = target.parentNode.children[0].value++;
						for (let i = 0; i < goodslist.length; i++) {
							if (goodslist[i].guid == guid) {
								goodslist[i].qty = add_qty+1;
								// console.log(goodslist[i].qty)
								cash = goodslist[i].qty * goodslist[i].price;
								target.parentNode.parentNode.nextSibling.innerText = '￥' + cash;
								jisuan()
							}
						}
						document.cookie = 'moon=' + JSON.stringify(goodslist) + ';path=/';
					}

					//点击reduce减少数量并写进cookie
					if (target.className === 'reduce') {
						if (currNum <= 1) {
							currNum = 1;
						} else {
							let re_qty = target.parentNode.children[0].value--;
							for (let i = 0; i < goodslist.length; i++) {
								if (goodslist[i].guid == guid) {
									// console.log(re_qty-1)
									goodslist[i].qty = re_qty-1;
									cash = goodslist[i].qty * goodslist[i].price;
									target.parentNode.parentNode.nextSibling.innerText = '￥' + cash;
									jisuan();
								}
							}

							document.cookie = 'moon=' + JSON.stringify(goodslist)+';path=/';
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
				let $totalMoney = $('.sum');
				for(let i=0;i<$total.length;i++){
					total += $total[i].value*1;
				for(let j=0;j<goodslist.length;j++){
					console.log(goodslist[i])
					totalMoney+=goodslist[j].price*$total[i].value*1;
					if(goodslist.length===1){
					$('.resNum').text(totalMoney+ '元')
					}else{
						
				$('.resNum').text(totalMoney/2 + '元')
					}
				}
				}
				$('.discount').text(total+'件');

				// console.log(total)
	
					// console.log(cash)
				}

				//利用事件监听删除coookie，并写进html

				$('.goods').on('click','.sure_del',function(){
					let guid = this.parentNode.parentNode.parentNode.dataset.id;
					console.log(guid)
					for(var i=0;i<goodslist.length;i++){
			                if(goodslist[i].guid == guid){
			                    goodslist.splice(i,1);
			                    	jisuan();
			                    break;
			                }
			            }
			                document.cookie = 'moon=' + JSON.stringify(goodslist) + ';path=/';
			                render();
				})

				

				

		})
	})
})