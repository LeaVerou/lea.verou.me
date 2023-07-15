<?php

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 1);

require_once 'CSSImage_class.php';

if(!isset($_REQUEST['astext'])) {
	header('Content-type: image/png', true, 200);
}

CssImage::fontFace(array(
	'font-family' => 'Georgia',
	'src' => 'georgia.ttf'
));

CssImage::fontFace(array(
	'font-family' => 'Georgia',
	'src' => 'georgiab.ttf',
	'font-weight' => 'bold'
));

CssImage::fontFace(array(
	'font-family' => 'Georgia',
	'src' => 'georgiai.ttf',
	'font-style' => 'italic'
));

CssImage::fontFace(array(
	'font-family' => 'Georgia',
	'src' => 'georgiaz.ttf',
	'font-weight' => 'bold',
	'font-style' => 'italic'
));

$text = "Lorem <b>ipsum</b> dolor <i>sit</i> amet";



$box = new CssImage($text, array(
	'width' => 200,
	'height' => 100,
	'padding' => '10px 20px',
	'font-size' => 20,
	'line-height' => 24,
	'font-style' => 'italic',
	'text-shadow' => '2px 2px #ccc',
	'background-color' => '#f5f5f5',
	'border' => '10px solid black',
	'border-radius' => '20px'
));

$img = $box->img;

// Serve the file
imagepng($img);

// Free up memory
imagedestroy($img);


?>
