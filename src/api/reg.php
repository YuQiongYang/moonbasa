<?php
	
	require('connect.php');
	$account = isset($_GET['account'])? $_GET['account'] : null;
	$password = isset($_GET['password'])? $_GET['password'] : null;
	$type = isset($_GET['type']) ? $_GET['type'] : null;

	//查找数据库判断用户名是否存在
	$sql = "select phone from reg where phone = '$account'";

	$result = $conn->query($sql);
	if($result->num_rows>0){
		echo "error";
	}else{
		if($type === 'reg'){

		$password = md5($password);

		$sql = "insert into reg(phone,password) values ('$account','$password')";
		$res = $conn->query($sql);

		if($res){
			echo "success";
		}else{
			echo "error";
		}
	}else{
			echo "success";
		}
	}

?>