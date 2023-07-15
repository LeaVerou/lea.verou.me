<?php

require_once 'global.php';

session_start();

$products = array(
	1 => 'Cow Tux',
	2 => 'Viking Tux',
	3 => 'Darth Tux',
	4 => 'Ninja Tux'
);

switch($_POST['action']) {
	case 'add':
		add();
		exit;

	case 'remove':
		remove();
		exit;

	case 'clear':
		empty_cart();
		exit;
}

function add() {
	$parts = explode('_', $_POST['id']);
	$id = (int) $parts[1];

	$_SESSION['cart'][$id]++;

	print_cart();
}

function print_cart() {
	global $products;

	if(is_array($_SESSION['cart']) and sizeof($_SESSION['cart']) > 0)	{
		foreach($_SESSION['cart'] as $item => $quantity) {
			include 'templates/cart_item.php';
		}
	}
	else {
		echo "To καλάθι αγορών σας είναι άδειο.";
	}
}

function remove() {
	$parts = explode('_', $_POST['id']);

	$id = (int)$parts[1];

	if(--$_SESSION['cart'][$id] == 0) {
		unset($_SESSION['cart'][$id]);
	}

	print_cart();
}

function empty_cart() {
	if(is_array($_SESSION['cart']))	{
		foreach($_SESSION['cart'] as $item => $quantity) {
			for($i = 0; $i < $quantity; $i++) {
				if(--$_SESSION['cart'][$item] == 0) {
					unset($_SESSION['cart'][$item]);
				}
			}
		}
	}

	print_cart();
}

// If we went so far, we want the index page printed
$pagetitle = 'Καλάθι Αγορών';
$headinclude = '
	<link href="css/cart.css" rel="stylesheet" type="text/css">

	<script src="javascript/prototype.js" type="text/javascript"></script>
	<script src="javascript/effects.js" type="text/javascript"></script>
	<script src="javascript/dragdrop.js" type="text/javascript"></script>
	<script src="javascript/controls.js" type="text/javascript"></script>
	<script src="javascript/cart.js" type="text/javascript"></script>
';

include_once 'templates/header.php';
?>

<h2>Καλάθι Αγορών</h2>

<p>Σύρατε (Drag) τα προϊόντα που επιθυμείτε να αγοράσετε στο Καλάθι Αγορών</p>
<div class="products-container">
	<img alt="Cow Tux" class="products" id="product_1" src="images/product1.png">
	<img alt="Viking Tux" class="products" id="product_2" src="images/product2.png">
	<img alt="Darth Tux" class="products" id="product_3" src="images/product3.png">
	<img alt="Ninja Tux" class="products" id="product_4" src="images/product4.png">
</div>

<h3>Το καλάθι αγορών σας:</h3>
<div id="cart-container">
	<ul id="cart" class="cart">
		<?php print_cart(); ?>
	</ul>

	<div id="wastebin">
		<p>Αφήστε (Drop) εδώ τα προϊόντα για τα οποία θέλετε να ακυρώσετε την παραγγελία).</p>
		<img src="images/trash.png" alt="Κάδος">
	</div>
</div>

<div class="cart-footer">
	<button type="button" id="clear-cart">Άδειασμα καλαθιού</button>
	<img src="images/indicator.gif" alt="Indicator" id="indicator" style="display:none;">
</div>

<?php include 'templates/footer.php'; ?>
