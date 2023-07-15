
		<li>
			<span class="title"><strong><?php echo $quantity; ?></strong>  <?php echo $products[$item]; ?>.</span>
<?php for($i = 0; $i < $quantity; $i++): ?>
			<img src="images/product<?php echo $item; ?>.png" alt="<?php echo $products[$item]; ?>" class="cart-items" id="item_<?php echo $item; ?>_<?php echo $i; ?>">
<?php endfor; ?>
		</li>
