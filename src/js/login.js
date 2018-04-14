require(['config'], function() {
	require(['jquery', 'common'], function($) {
		jQuery(function($) {

			let $reg = $('.login_txt');
			let $phone = $('.phone');
			let $psd = $('.psd');
			let $commit = $('.commit');

			$reg.click(function(){
				$reg.attr('href','../html/reg.html')
			})

			$commit.click(function(){
				let _account = $phone.val();
				let _password = $psd.val();
				$.ajax({
					url:'../api/login.php',
					data:{
						account:_account,
						password:_password,
						type:'login'
					},
					success:function(data){
						console.log(data)
						if(data === 'success'){
							$phone.removeClass('has-error');
							$phone.addClass('has-success');
							$psd.removeClass('has-error');
							$psd.addClass('has-success');
							$psd[0].nextElementSibling.innerText='正在为您跳转...';
							$commit.attr('href','../index.html');
							
						}else if(data === 'error'){
							$phone.addClass('has-error');
							$phone.removeClass('has-success');
							$psd.addClass('has-error');
							$psd.removeClass('has-success');
							$psd[0].nextElementSibling.innerText='用户或密码错误';
						}
					}
				})
			})
			//连接php,判断用户是否存在
			function judge(){
				let _account = $phone.val();
				$.ajax({
					url:'../api/reg.php',
					data:{
						account:_account
					},
					success:function(data){
						console.log(data)
						if(data === 'success'){
							$phone.addClass('has-error');
							$phone.removeClass('has-success');
							$phone[0].nextElementSibling.innerText='此号码未注册';
						}
					}
				})
			}

			unfocus($phone,/^1[3-8]\d{9}$/i,'请输入电话号码','手机号错误请重新输入',judge);
			unfocus($psd,/(.*)/,'密码不能为空','')
			function unfocus(ele,reg,normalTips,errorTip,callback){
				ele.blur(function(){
					
						if(!ele.val()){
							ele.addClass('has-error');
							ele[0].nextElementSibling.innerText= normalTips	;	
						}else if(!reg.test(ele.val())){
							ele.removeClass('has-success');
							ele.addClass('has-error');
							ele[0].nextElementSibling.innerText=errorTip	;	
						}else if(ele.val() && reg.test(ele.val())){
							ele.removeClass('has-error');
							ele.addClass('has-success');
							ele[0].nextElementSibling.innerText = '';

								if (callback) {
									callback();



								}
						}
					
				})
			}

		});
	});
});