<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Παράδειγμα Μαθήματος • <?php echo $pagetitle; ?></title>
	<link href="css/default.css" rel="stylesheet" type="text/css">
<?php if(isset($headinclude)) echo "\t" . $headinclude; ?>
</head>

<body id="<?php echo 'page-' . THIS_SCRIPT; ?>">
<ul id="menu">
	<li id="nav-index"><a href="index.php">Αρχική</a></li>
	<li id="nav-example"><a href="example.php">Το Πρόβλημα</a></li>
	<li id="nav-cart"><a href="cart.php">Καλάθι Αγορών</a></li>
</ul>

<div id="header">
	<h1><a href="index.php">Παράδειγμα Μαθήματος</a></h1>
</div>

<div id="page">
