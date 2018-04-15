require(['config'], function() {
	require(['jquery', 'common'], function($) {
		jQuery(function($) {
			// $('header').load('../html/header.html');


			//ajax请求数据加载商品
			let $goods = $('.goods');
			let goods;

			function render(data) {
				goods = JSON.parse(data);
				let arr = goods.data;

				let $ul = $('<ul/>').addClass('clearfix');
				let $res = $.map(arr, function(item) {
					return $('<li/>').attr('data-id', item.id).append($('<a/>').addClass('goodslist').attr('href', '#').append($('<img/>').attr('src', '../' + item.likeImg),
						$('<div/>').append($('<span/>').text('￥' + item.sellPrice), $('<i/>').addClass('old'),
							$('<p/>').text(item.likeName))), $('<a/>').attr('href', "#").text(item.brand));
				});
				$('.goods').html('');
				$ul.append($res).appendTo('.goods');

				$ul.on('click', '.goodslist', function() {
					let guid = $(this).parent()[0].dataset.id;
					$(this).attr('href', '../html/goods.html?' + guid);

				});


			}

			$.ajax({
				url: '../api/lists.php',
				data: {
					qty: 50,
					type: 'getdata'
				},
				success: function(data) {

					render(data);


					//创建分页
					let pageLen = Math.ceil(goods.total / goods.qty);


					for (let i = 0; i < pageLen; i++) {

						$('.page').append($('<span/>').text(i + 1));
						// 高亮分页
						if (i === goods.page - 1) {
							$('.page')[0].children[0].className = 'active';
						}

					}

				}
			})

			//排序
			$('.com').click(function() {
				$.ajax({
						url: '../api/lists.php',
						data: {
							qty: 50,
							type: 'getdata'
						},
						success :function(data) {
							render(data)
						}

						})
				});

			$('.low').click(function() {
				$.ajax({
						url: '../api/lists.php',
						data: {
							qty: 50,
							type: 'des'
						},
						success :function(data) {
							render(data)
						}

						})
				});
			$('.high').click(function() {
				$.ajax({
						url: '../api/lists.php',
						data: {
							qty: 50,
							type: 'asc'
						},
						success:function(data) {
							render(data)

						}
				})
			});


			$('.page').on('click', 'span', function() {

				let num = this.innerText;
				$('.page').children('span').removeClass('active');
				$(this).addClass('active');
				$.ajax({
					url: '../api/lists.php',
					data: {
						qty: 50,
						page: num,
						type:'getdata'
					},
					success: function(data) {
						render(data);
					}
				});


			})


		})
	})
})