<?php
	
	require('connect.php');
	$account = isset($_GET['account'])? $_GET['account'] : null;
	$password = isset($_GET['password'])? $_GET['password'] : null;
	$type = isset($_GET['type']) ? $_GET['type'] : null;

	$password = md5($password);
	//查找数据库判断用户名是否存在
	$sql = "select phone,password from reg where phone = '$account' and password = '$password'";

	$result = $conn->query($sql);
	if($result->num_rows>0){
		echo "success";
	}else{
		echo "error";
	}

?>