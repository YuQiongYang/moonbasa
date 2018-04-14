<?php

	//连接数据库
	$severname = "localhost";
	$username = "root";
	$password = "";
	$dbname = "yuqiong";

	//创建连接
		$conn = new mysqli($severname,$username,$password,$dbname);
		$conn->set_charset('utf8');
?>