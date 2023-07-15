<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-7">
<title>CSSImage</title>
<link href="cssimage.css" rel="stylesheet" type="text/css">
</head>

<body>
<h2>What is it?</h2>
<p>
	CSSImage lets any developer with a basic PHP understanding to easily create rich dynamic graphics using
	the same CSS properties they are already familiar with from the client side.
</p>

<h2>Usage example</h2>
<pre><?php 
highlight_string('<?php
// Include the class to the page
require_once \'CSSImage_class.php\';

// Define some fonts
CssImage::fontFace(array(
	\'font-family\' => \'Georgia\',
	\'src\' => \'georgia.ttf\'
));

CssImage::fontFace(array(
	\'font-family\' => \'Georgia\',
	\'src\' => \'georgiab.ttf\',
	\'font-weight\' => \'bold\'
));

CssImage::fontFace(array(
	\'font-family\' => \'Georgia\',
	\'src\' => \'georgiai.ttf\',
	\'font-style\' => \'italic\'
));

CssImage::fontFace(array(
	\'font-family\' => \'Georgia\',
	\'src\' => \'georgiaz.ttf\',
	\'font-weight\' => \'bold\',
	\'font-style\' => \'italic\'
));

// Create the CssImage instance
$box = new CssImage(\'Lorem <b>ipsum</b> dolor <i>sit</i> amet\', array(
	\'width\' => 200,
	\'height\' => 200,
	\'text-shadow\' => \'2px 2px #ccc\'
));

// Output it to the browser
imagepng($box->img);
?>'); ?>
</pre>

<h2>Supported CSS properties</h2>
<table id="supported-properties" class="property-list">
	<thead>
		<tr>
			<th>Property</th>
			<th>Supported values</th>
			<th>Default</th>
			<th>Comments</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>width</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>400</td>
			<td></td>
		</tr>
		<tr>
			<td>height</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>150</td>
			<td></td>
		</tr>
		<tr>
			<td>padding-top</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		<tr>
			<td>padding-right</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		<tr>
			<td>padding-bottom</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		<tr>
			<td>padding-left</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		<tr>
			<td>font-size</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>14</td>
			<td></td>
		</tr>
		<tr>
			<td>line-height</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>15</td>
			<td></td>
		</tr>
		<tr>
			<td>font-family</td>
			<td>String (font name)</td>
			<td>Georgia</td>
			<td>Fonts are defined by <code>CssBox::fontFace()</code></td>
		</tr>
		<tr>
			<td>font-weight</td>
			<td><a href="#values-numeric">Numeric</a> or keyword (<code>'bold'</code> or <code>'normal'</code>)</td>
			<td>400</td>
			<td><code>'bold'</code> is converted to <code>700</code>, <code>'normal'</code> to <code>400</code></td>
		</tr>
		<tr>
			<td>font-style</td>
			<td>keyword (<code>'normal'</code> or <code>'italic'</code>)</td>
			<td>'normal'</td>
			<td></td>
		</tr>
		<tr>
			<td>color</td>
			<td>A <a href="#values-color">supported color format</a></td>
			<td>'black'</td>
			<td></td>
		</tr>
		<tr>
			<td>background-color</td>
			<td>A <a href="#values-color">supported color format</a></td>
			<td>'transparent'</td>
			<td></td>
		</tr>
		<tr>
			<td>background-image</td>
			<td>String (filepath or <code>''</code>/<code>'none'</code> for none)</td>
			<td>''</td>
			<td>Doesn't get clipped to border-radius</td>
		</tr>
		<tr>
			<td>background-position-x</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		<tr>
			<td>background-position-y</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		
		<tr>
			<td>border-color</td>
			<td>A <a href="#values-color">supported color format</a></td>
			<td>'black'</td>
			<td></td>
		</tr>
		<tr>
			<td>border-width</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		<tr>
			<td>border-style</td>
			<td>String (<code>'solid'</code>, <code>'dotted'</code>, <code>'dashed'</code>, <code>'double'</code> or <code>'none'</code>)</td>
			<td>'none'</td>
			<td></td>
		</tr>
		<tr>
			<td>border-radius</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		
		<tr>
			<td>text-shadow-color</td>
			<td>A <a href="#values-color">supported color format</a></td>
			<td>'transparent'</td>
			<td></td>
		</tr>
		<tr>
			<td>text-shadow-offset-x</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		<tr>
			<td>text-shadow-offset-y</td>
			<td><a href="#values-numeric">Numeric</a></td>
			<td>0</td>
			<td></td>
		</tr>
		<tr>
			<td>white-space</td>
			<td>String (<code>'normal'</code>, <code>'nowrap'</code> or <code>'pre'</code>)</td>
			<td>'normal'</td>
			<td></td>
		</tr>
	</tbody>
</table>

<h2>Supported CSS values</h2>

<dl id="supported-values" class="legend">
	<dt id="values-numeric">Numeric</dt>
	<dd>No units are supported. When a numeric value is required, it's always specified in pixels.</dd>
	
	<dt id="values-color">Color</dt>
	<dd>
		A color can be specified in either hex format (for example <code>'#ca9'</code> or <code>'#FF14D8'</code>) or 
		as an array of red, green, blue and optionally alpha values (for example <code>array(255, 180, 0)</code> or <code>array(30, 150, 240, .35)</code>).
		A few named colors are also supported (currently white, black and transparent).
	</dd>
</dl>

<h2>Supported Shorthands</h2>
<table id="supported-shorthands" class="property-list">
	<thead>
		<tr>
			<th>Property</th>
			<th>Stands for</th>
			<th>Shorthand type</th>
		</tr>
	</thead>
	<tbody>		
		<tr>
			<td>padding</td>
			<td>padding-top, padding-right, padding-bottom, padding-left</td>
			<td><a href="#shorthand-type-numeric">Numeric</a></td>
		</tr>
		<tr>
			<td>background-position</td>
			<td>background-position-x, background-position-y</td>
			<td><a href="#shorthand-type-numeric">Numeric</a></td>
		</tr>
		<tr>
			<td>text-shadow-offset</td>
			<td>text-shadow-offset-x, text-shadow-offset-y</td>
			<td><a href="#shorthand-type-numeric">Numeric</a></td>
		</tr>
		<tr>
			<td>background</td>
			<td>background-color, background-image, background-position-x, background-position-y</td>
			<td><a href="#shorthand-type-concat">Concatenated</a></td>
		</tr>
		<tr>
			<td>border</td>
			<td>border-width, border-style, border-color</td>
			<td><a href="#shorthand-type-concat">Concatenated</a></td>
		</tr>
		<tr>
			<td>text-shadow</td>
			<td>text-shadow-offset-x, text-shadow-offset-y, text-shadow-color</td>
			<td><a href="#shorthand-type-concat">Concatenated</a></td>
		</tr>
	</tbody>
</table>

<h2>Supported shorthand types</h2>
<dl id="supported-shorthand-types" class="legend">
	<dt id="shorthand-type-numeric">Numeric</dt>
	<dd>
		This type of shorthand is used only for numeric properties, like padding.
		1-4 whitespace delimited values are provided.
		If only one value is provided, all properties are set to that one. 
		If 2 values are provided, The 3rd is set to the 1st one and the 4th to the 2nd.
		If 3 values are provided, the 4th value is the same as the 2nd.
		Example: <code>'padding' => '0 20 10'</code> sets <code>padding-top</code> to 0, <code>padding-right</code>
		and <code>padding-left</code> to 20 and <code>padding-bottom</code> to 10 pixels.
	</dd>
	
	<dt id="shorthand-type-concat">Concatenated</dt>
	<dd>
		This type of shorthand expects the values for the properties it represents in a specific order (in contrast to the 
		specification, where for most shorthands like this, the order is not significant). 
		If some of them are not present, they are left intact (in contrast to the CSS specification, 
		where they are explicitly set to their default)
	</dd>
</dl>
</body>
</html>
