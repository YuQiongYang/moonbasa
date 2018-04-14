
require(['config'],function(){
	require(['jquery','xcarousel'],function($){

;jQuery(function($){
	
// $('header').load('header.html');
	//登陆注册跳转
	let $login = $('.log');
	let $reg = $('.reg');
	$login.click(function(){
		$login.attr('href','../html/login.html');
	});

	$reg.click(function(){
		console.log(123)
		$reg.attr('href','../html/reg.html');
	})
	
	let $carousel = $('.carousel');
	let $horizontal = $('.horizontal');
	let $img = $horizontal.find('li').eq(0).find('img');
	let imgWidth = $img.width();
	let len = $horizontal.children('li').length;
	$horizontal.width(imgWidth);

	let idx = 0;
	let $page = $('<div/>');
	$page.addClass('page')
	for(let i=0;i<len;i++){
		let $span = $('<span/>');
		$span[0].innerText = i+1;
		if(i===0){
			$span.addClass('active');
		}
		$page.append($span).appendTo($carousel);

	}
	let timer = setInterval(autoPlay,3000);

	$horizontal.mouseenter(()=>{
		clearInterval(timer);
	}).mouseleave(()=>{
		clearInterval(timer);
		timer = setInterval(autoPlay,3000);
	});
	$page.on('mouseenter','span',function(event){
		idx = event.target.innerText-1;
		console.log(idx)
		show();
	})

	function autoPlay(){
		idx++;
		show();
	}
	function show(){
		if(idx>=7){
			idx=0;
		}
		$horizontal.find('li').eq(idx).show().siblings().hide();

		for(let i =0;i<len;i++){
			$page[0].children[i].className='';
		}
		if(idx === len){
			$page[0].children[0].className='active';
		}else{
			$page[0].children[idx].className='active';

		}
	}

	//品牌切换

	let $shop = $('.shop');
	let $shop_img = $('.shop_img')[0];
	let shop_img_lis = $shop_img.children;
	let $shop_lis = $shop.children('li');
	let $lis_a = $shop_lis.children('a');
	let lis_len = $shop_lis.length;

	$lis_a[0].className = 'active';
	$lis_a[0].nextElementSibling.className = 'jt';
	shop_img_lis[0].style.display = 'block';

	for(let i=0;i<lis_len;i++){
	$lis_a[i].onmouseenter = function(){
		let idx;
		for(let i =0;i<lis_len;i++){
			if($lis_a[i]===this){
				idx = i;
			}
			$lis_a[i].className = '';
			$lis_a[i].nextElementSibling.className = '';
			shop_img_lis[i].style.display = 'none';
		}
			$lis_a[i].className = 'active';
			$lis_a[i].nextElementSibling.className = 'jt';
			shop_img_lis[idx].style.display="block";
	}

		
	}


	//热门分类
	let $kind = $('.kind');
	let $kind_lis = $kind.children('li');
	let $kind_lis_len = $kind_lis.length;
	let $allKinds = $('.allKinds')[0];
	let $allKinds_lis = $allKinds.children;
	$kind_lis[0].className = 'active';
	$kind_lis[0].children[1].className = 'jt';
	for(let i =0;i<$kind_lis_len;i++){
		$kind_lis[i].onmouseenter = function(){
			let idx;
			for(let i=0;i<$kind_lis_len;i++){
				if($kind_lis[i]===this){
				idx = i;
				}
		$kind_lis[i].className = '';
		$kind_lis[i].children[1].className = '';
		$allKinds_lis[i].style.display = 'none';

			}
		$kind_lis[i].className = 'active';
		$kind_lis[i].children[1].className = 'jt';
		$allKinds_lis[idx].style.display = 'block';
		// console.log($allKinds_lis[idx])
		}

	};

	//轮播图
	// console.log($('.xcarousel'));
	$('.xcarousel').xCarousel({
		width:1185,
		height:665,
		type:'horizontal',
		imgs:['img/n1.jpg','img/n2.jpg','img/n3.jpg','img/n4.jpg','img/n5.jpg','img/n6.jpg','img/n7.jpg'],
		imgLR:['img/Black_l.png','img/Black_r.png']
	});

	$('.hs_con').xCarousel({
		width:1200,
		height:450,
		type:'fade',
		lis:['欧美时尚','日韩潮流','原创设计','时尚内衣','商务男装'],
		imgs:['img/hs_1up.png','img/hs_2up.png','img/hs_3up.png','img/hs_4up.png','img/hs_5up.png']
	});



	//ajax请求生成数据
	let $likeGoods = $('.likeGoods');
	$.ajax({
		url:"../data/likeGoods.json",
		success:function(data){
			let data_arr = data.RECORDS;
			let $ul = $('<ul/>');
			$ul.addClass('clearfix');

			let params = '';
			for(let i=0;i<data_arr.length;i++){
				let $li = $('<li/>').attr('data-id',i+1);
				let $a = $('<a/>');
				$a.attr('href','#');
				let $na_pri = $('<div/>').addClass('na_pri').addClass('clearfix');
				let $img = $('<img/>').attr('src',data_arr[i].likeImg).appendTo($a);
				let $p = $('<p/>').text(data_arr[i].likeName).appendTo($na_pri);
				let $span = $('<span/>').text('￥'+data_arr[i].sellPrice).appendTo($na_pri);
				if(data_arr[i].price === null){
					let $old_spr= $('<i/>').appendTo($span);
				}else{
				let $old_spr= $('<i/>').html('<del>'+'￥'+data_arr[i].price+'<del/>').appendTo($span);

				}
				$a.append($na_pri);
			//传参

			$a.on('click',function(){

				$a.attr('href','../html/details.html?'+ data_arr[i].id);
			})
				
				$li.append($a).appendTo($ul);
			}
			$likeGoods.append($ul);


		}
	})

});
	});
	
});