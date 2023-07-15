<?php
	if($_REQUEST['email']) {
		$email = strtolower($_REQUEST['email']);
		$uri = 'http://gravatar.com/avatar/' . md5($email) . '?d=';
		$sets = array('identicon', 'monsterid', 'wavatar');
	}
?><!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<title>Quickly find the Gravatar that corresponds to a given email</title>

<meta name="description" content="Quickly find the Gravatar that corresponds to a given email">

<style type="text/css">
	* {
		margin:0;
		padding:0;
		font-family:Helvetica, Arial, sans-serif;
	}
	
	body {
		font-size:2em;
		width:24em;
		margin:2em auto;
	}
	
	h1 {
		color:#ccc;
		font-size:2em;
		letter-spacing:-.05em;
		line-height:.9;
		text-align:right;
		float:left;
		width:4.5em;
		padding:0 .5em 1em 0;
	}
	
	h2, label {
		font-size:1em;
		font-weight:normal;
	}
	
	h2, #copyright {
		margin-top:1em;	
	}
	
	a {
		color:inherit;
		font-weight:inherit;
		text-decoration:none;
	}
	
	a:hover {
		color:#f16;	
		text-decoration:underline;
	}
	
	input, button {
		font-size:inherit;
	}
	
	input {
		padding:6px 3em 6px 6px;
		color:#333;
		border: 5px solid #ccc;
		width:10em;
	}
	
	input:focus {
		border-color:#f16;	
	}
	
	button {
		color:#f16;
		background:transparent;
		position:relative;
		margin-left:-3.3em;
		border:none;
		-moz-border-radius:5px;
		-webkit-border-radius:5px;
	}
	
	button:hover, button:active, button:focus {
		background: #f16;
		color:white;
	}
	
	button:active {
		top:1px;
		left:1px;
	}
	
	img.gravatar {
		background:white;
		padding:2px;
		border:10px solid #ddd;
		margin:.2em;
	}
	
	img.gravatar:hover {
		border-color:#f16;	
	}
	
	#why, #copyright {
		color:#999;	
	}
	
	#why {
		list-style:none;
		font-size:70%;
	}
	
	#why li:before {
		content:"\2714  ";
		color:#f16;
	}
	
	#copyright {
		font-size:50%;
		font-weight:bold;
	}
	
</style>
</head>

<body>

<h1>Quickly find the <a href="http://gravatar.com">Gravatar</a> that cor&shy;res&shy;ponds to a given email</h1>

<form action="" method="get">
	<label>
		Enter email:
		<input id="email" name="email" value="<?php echo $email; ?>">
	</label>
	<button type="submit">&#x2714; Go</button>
</form>

<?php
	if($email) {
		echo '<h2>Corresponding Gravatars:</h2>';
		
		foreach($sets as $set) {
			echo "<img src='$uri$set' class='gravatar' alt='$set Gravatar for $email'>";
		}
	}
?>

<h2>Why?</h2>
<ul id="why">
	<li>Quickly check out your own <a href="http://gravatar.com">Gravatar</a></li>
	<li>Check if someone used the email you think they did in a blog comment</li>
</ul>

<p id="copyright">By <a href="http://leaverou.me/2009/12/quickly-find-the-gravatar-that-corresponds-to-a-given-email/">Lea Verou</a></p>

</body>
</html>