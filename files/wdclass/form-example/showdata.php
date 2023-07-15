<!doctype html>
<head>
	<title>Show submitted form data</title>
</head>
<body>
<h1>Show submitted form data</h1>
<?php
// Just displays the submitted data

if(is_array($_POST)) {
	echo '<h2>POST:</h2>';
	echo '<pre>' . print_r($_POST, true) . '</pre>';
}

if(is_array($_GET)) {
	echo '<h2>GET:</h2>';
	echo '<pre>' . print_r($_GET, true) . '</pre>';
}

if(is_array($_FILES)) {
	echo '<h2>FILES:</h2>';
	echo '<pre>' . print_r($_FILES, true) . '</pre>';
}


?>
</body>