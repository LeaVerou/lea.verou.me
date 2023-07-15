<?php
error_reporting(E_ALL ^ E_NOTICE);
session_start();

$products = array(1 => 'Cow Tux', 2 => 'Viking Tux', 3 => 'Darth Tux', 4 => 'Ninja Tux');

switch($_POST['action'])
{
    case 'add':
    add();
    break;
    case 'remove':
    remove();
    break;
    case 'clear':
    emptyCart();
    break;
    case 'date':
    getMeADate();
    break;
    default:
    index();
    break;
}

function add()
{
    $parts = explode('_', $_POST['id']);
    $id = (int)$parts[1];
    $_SESSION['cart'][$id] ++;
    doCart();
    return;
}

function doCart()
{
    global $products;
    if(is_array($_SESSION['cart']))
    {
        foreach($_SESSION['cart'] AS $item => $qty) {
?>
 <div>
  <?php for($i = 0; $i < $qty; $i++) { ?>
   <img alt="<?php echo $products[$item]?>" class="cart-items" id="item_<?php echo $item?>_<?php echo $i?>" src="images/product<?php echo $item?>.png" style="position: relative;">
   <script type="text/javascript">new Draggable('item_<?php echo $item?>_<?php echo $i?>', {revert:true})</script>
  <?php } ?>
  <span class="title">
    [ <?php echo $qty ?> ]  <?php echo $products[$item]?>.
   <!-- <?php echo $products[$item]?> (<?php echo $qty ?>) -->
  </span>     
</div>
<?php
        }
    }
    if(empty($_SESSION['cart']))
    {
        echo "To καλάθι αγορών σας είναι άδειο.";
    }
}

function remove()
{
    $parts = explode('_', $_POST['id']);
    $id = (int)$parts[1];
    $_SESSION['cart'][$id] --;
    if($_SESSION['cart'][$id] == 0)
    {
        unset($_SESSION['cart'][$id]);
    }
    doCart();
    return;
}

function emptyCart()
{
    if(is_array($_SESSION['cart']))
    {
       foreach($_SESSION['cart'] AS $item => $qty) {
		for($i = 0; $i < $qty; $i++) {
		    $_SESSION['cart'][$item] --;
		    if($_SESSION['cart'][$item] == 0)
		    {
		        unset($_SESSION['cart'][$item]);
		    }
		}
      }

	    echo " ";
	}
 	return;
}



function index()
{
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=windows-1253" /><title>Καλάθι αγορών</title>
  <meta http-equiv="content-type" content="text/html; charset=windows-1253">
  <link rel="stylesheet" type="text/css" media="screen" href="css/cart.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="css/webstyle.css" />
  <script src="javascript/prototype.js" type="text/javascript"></script>
  <script src="javascript/effects.js" type="text/javascript"></script>
  <script src="javascript/dragdrop.js" type="text/javascript"></script>
  <script src="javascript/controls.js" type="text/javascript"></script>
  <link href="default.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div id="menu">
	<ul>
		<li><a href="index.html">κεντρική σελίδα</a></li>
		<li><a href="example.html">το πρόβλημα</a></li>
		<li class="active"><a href="cart.php">καλάθι αγορών</a></li>
	</ul>
</div>
<!-- end #menu -->
<div id="header">
	<h1><a href="index.html">Παράδειγμα μαθήματος</a></h1>
</div>
<!-- end #header -->
<div id="page">
	<div id="content">
<h1>Καλάθι Αγορών</h1>

<p>Σύρατε (Drag) τα προϊόντα που επιθυμείτε να αγοράσετε στο Καλάθι Αγορών</p>

<div style="margin-bottom: 10px; height: 110px;">

  <img style="position: relative; z-index: 0; opacity: 0.99999; top: 0px; left: 0px;" alt="Cow Tux" class="products" id="product_1" src="images/product1.png">
  <script type="text/javascript">new Draggable('product_1', {revert:true})</script>

  <img style="position: relative; z-index: 0; opacity: 0.99999; top: 0px; left: 0px;" alt="Viking Tux" class="products" id="product_2" src="images/product2.png">
  <script type="text/javascript">new Draggable('product_2', {revert:true})</script>

  <img style="position: relative; z-index: 0; opacity: 0.99999; top: 0px; left: 0px;" alt="Darth Tux" class="products" id="product_3" src="images/product3.png">
  <script type="text/javascript">new Draggable('product_3', {revert:true})</script>

  <img style="position: relative; z-index: 0; opacity: 0.99999; top: 0px; left: 0px;" alt="Ninja Tux" class="products" id="product_4" src="images/product4.png">
  <script type="text/javascript">new Draggable('product_4', {revert:true})</script>

</div>

<h2>Το καλάθι αγορών σας:</h2>

<div id="cartContainer" style="float:none; clear:both; width:600px;">

	<div id="cart" class="cart" style="width:450px; height: 150px; position: relative; float:left;">
	 <div id="items">
	  <?php doCart();?>
	 </div>
	</div>

	 <div id="chosendates" style="width:450px; height: 150px; position: relative; float:left; display:none;">

	 </div>


	<div class="" id="wastebin" style="width:110px; height:150px; float:right;">
	Αφείστε (Drop) εδώ εδώ τα προϊόντα για τα οποία θέλετε να ακυρώσετε την παραγγελία).
	<img src="images/trash.png" alt="Κάδος" style="position:relative; margin-top:8px;">
	</div>

</div>
<div class="orangebox">
			<div style="width:600px; float:none; display:block; clear:both; text-align:left; ">
				<div style="width:450px; float:left; padding-top:8px;">
					<input type="button" class="cmdButton" value="Άδειασμα καλαθιού" onClick="return confirmEmpty();">
				</div>

				<div style="height:40px; width:150px; float:right; padding-top:8px;">
					<p id="indicator" style="margin-top:0px; display: none;">
						<img alt="Indicator" src="images/indicator.gif">
					</p>
				</div>
			<br clear="all" />
			</div>
		</div>




<script type="text/javascript">Droppables.add('cart', {accept:'products', onDrop:function(element){new Ajax.Updater('items', 'cart.php', {onLoading:function(request){Element.show('indicator')}, onComplete:function(request){Element.hide('indicator')}, parameters:'action=add&id=' + encodeURIComponent(element.id), evalScripts:true, asynchronous:true})}, hoverclass:'cart-active'})</script>

<script type="text/javascript">Droppables.add('wastebin', {accept:'cart-items', onDrop:function(element){Element.hide(element); new Ajax.Updater('items', 'cart.php', {onLoading:function(request){Element.show('indicator')}, onComplete:function(request){Element.hide('indicator')}, parameters:'action=remove&id=' + encodeURIComponent(element.id), evalScripts:true, asynchronous:true})}, hoverclass:'wastebin-active'})</script>

<script type="text/javascript">
function confirmEmpty(){
  var answer;
  	answer = confirm("Ετοιμάζεστε να αδειάσετε το καλάθι αγορών. Είστε σίγουρος ότι θέλετε να συνεχίσετε;");
  	if (answer){
 		emptyMyCart();
	}
	return answer;
}

function emptyMyCart(){
new Ajax.Updater('items', 'cart.php', {onLoading:function(request){Element.show('indicator')}, onComplete:function(request){Element.hide('indicator')}, parameters:'action=clear', evalScripts:true, asynchronous:true});
}
</script>




<script type="text/javascript">

function notYet(){
  	alert("This part not yet implemented.");
}


function getDates(){

//run through list and identify who the date is for, and how many dates.  Put it into some form so that it can be passed as parameters.

//new Ajax.Request('process.dates',{method: 'post', parameters: 'date1=3Denise&2Beth', onComplete: ajax_response});
document.getElementById("items").style.display="none";
document.getElementById("wastebin").style.display="none";
document.getElementById("cart").style.display="none";

document.getElementById("chosendates").style.display="block";

new Ajax.Updater('chosendates', 'cart.php', {onLoading:function(request){Element.show('indicator')}, onComplete:function(request){Element.hide('indicator')}, parameters:'action=date', evalScripts:true, asynchronous:true});
}

//function ajax_request(url, data) {
 //   var myAjax = new Ajax.Request(
 //       url,
 //       {method: 'post', parameters: data, onComplete: ajax_response}
 //   );
//}

</script>

</div>



	<div style="clear: both;">&nbsp;</div>
</div>
<!-- end #page -->
<div id="footer">
	<p id="legal">Copyright &copy; 2010 Dragonfly. All Rights Reserved. Designed by <a href="http://www.freecsstemplates.org/">Free CSS Templates</a>.</p>
	<p id="links"><a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></p>
</div>
<!-- end #footer -->
</body>

</html>
<?php
}
?>