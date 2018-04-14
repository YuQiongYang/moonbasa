require(['config'], function() {
	require(['jquery', 'common'], function($) {
		jQuery(function($) {

			let $login = $('.login_header').children('a');
			$login.on('click',function(){
				$login.attr('href','../html/login.html');
			});

			let $form =$('.form');
			let $phone = $('.phone');
			let $vercode = $('.vercode');
			let $code = $('.code');
			let $psd = $('.psd');
			let $conpsd = $('.conpsd');

			let $commit = $('.commit');
			let $change = $('.change');

			$change.click(function(){
			$code.text(randomNumber(1000,9999));

			})
			$code.text(randomNumber(1000,9999));



			unfocus($phone,/^1[3-8]\d{9}$/i,'请输入手机号','请输入正确的手机号',judgeDB);
			unfocus($vercode,/^\d{4}$/i,'请输入验证码！','验证码错误',judgeCode);
			unfocus($psd,/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,'请输入8-20位字母或数字','密码请设为8-20位字母和数字！');
			unfocus($conpsd,/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,'请再次输入密码','两次输入的密码不一致！',judgePsd);
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



	
			$commit.click(function(){
				if(!$phone.val()){
					$phone.addClass('has-error');
					$phone[0].nextElementSibling.innerText= '请输入手机号';
					
				}else{
					unfocus($phone,/^1[3-8]\d{9}$/i,'请输入手机号','请输入正确的手机号',judgeDB);

				}
				if(!$vercode.val()){
					$vercode.addClass('has-error');
					$vercode[0].nextElementSibling.innerText= '请输入验证码！';

				}else{
					unfocus($vercode,/^\d{4}$/i,'请输入验证码！','验证码错误',judgeCode);
					
				}
				if(!$psd.val()){
					$psd.addClass('has-error');
					$psd[0].nextElementSibling.innerText= '请输入8-20位字母或数字';

				}else{
				unfocus($psd,/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,'请输入8-20位字母或数字','密码请设为8-20位字母和数字！');
					

				}
				if(!$conpsd.val()){
					$conpsd.addClass('has-error');
					$conpsd[0].nextElementSibling.innerText= '请再次输入密码';

				}else{
			unfocus($conpsd,/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,'请再次输入密码','两次输入的密码不一致！',judgePsd);
					

				}

				let _account = $phone.val();
				let _password = $conpsd.val();

				$.ajax({
					url:'../api/reg.php',
					data:{
						account:_account,
						password:_password,
						type:'reg'
					},
					success:function(data){
						$commit.attr('href','../index.html')
					}
				})
			})
	


			//判断两次密码
			function judgePsd(){
				if($conpsd.val() != $psd.val()){
					$conpsd[0].nextElementSibling.innerText= '两次输入的密码不一致！';
				}else{
					$conpsd.removeClass('has-error');
					$conpsd[0].nextElementSibling.innerText= '';

				}
			}	

			//判断验证码
			function judgeCode(){
				if($vercode.val() != $code.text()){
					$vercode.removeClass('has-success');
					$vercode.addClass('has-error');
					$vercode[0].nextElementSibling.innerText= '验证码错误！';
					$code.text(randomNumber(1000,9999));
				}else{
					$vercode.addClass('has-success');
					$vercode.removeClass('has-error');
					$vercode[0].nextElementSibling.innerText= '';

				}
			}	

			//判断数据库是否存在相同用户
			function judgeDB(){
				let _account = $phone.val();
				$.ajax({
					url:'../api/reg.php',
					data:{
						account : _account
					},
					success:function(datas){
						if(datas === 'success'){
						$phone.addClass('has-success');
						$phone.removeClass('has-error');
						$phone[0].nextElementSibling.innerText= '';
						}else if(datas === 'error'){
						$phone.removeClass('has-success');
						$phone.addClass('has-error');
						$phone[0].nextElementSibling.innerText= '该号码已经被注册';
						}
					}
					
					
				})
			}

			
			
		
			

		});

	});

});