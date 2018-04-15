<?php
	
	require('connect.php');

	$page = isset($_GET['page']) ? $_GET['page'] : 1;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 10;
	$type = isset($_GET['type'])?$_GET['type'] : null;

	if($type === 'getdata'){
		$sql = "select * from lists";

	$result = $conn->query($sql);

	$row = $result->fetch_all(MYSQLI_ASSOC);

	// 格式化数据
	$res = array(
		"total" => count($row),
		"data" => array_slice($row,$qty*($page-1),$qty),
		"qty" => $qty*1,
		"page" => $page*1
	);

	echo json_encode($res,JSON_UNESCAPED_UNICODE);
	};


	if($type === 'asc'){
		$sql = 'select * from lists ORDER BY sellPrice DESC';

		$result = $conn->query($sql);

		$row = $result->fetch_all(MYSQLI_ASSOC);

		// 格式化数据
		$res = array(
			"total" => count($row),
			"data" => array_slice($row,$qty*($page-1),$qty),
			"qty" => $qty*1,
			"page" => $page*1
		);

		echo json_encode($res,JSON_UNESCAPED_UNICODE);

	}

	if($type === 'des'){
		$sql = 'select * from lists ORDER BY sellPrice';

		$result = $conn->query($sql);

		$row = $result->fetch_all(MYSQLI_ASSOC);

		// 格式化数据
		$res = array(
			"total" => count($row),
			"data" => array_slice($row,$qty*($page-1),$qty),
			"qty" => $qty*1,
			"page" => $page*1
		);

		echo json_encode($res,JSON_UNESCAPED_UNICODE);

	}



	
?>