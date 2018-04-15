<?php
	require('connect.php');

	$sql = "select * from lists";

	$result = $conn->query($sql);


	$row = $result->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($row,JSON_UNESCAPED_UNICODE);

?>