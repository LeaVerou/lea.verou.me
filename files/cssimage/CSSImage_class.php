<?php

/**
 * A class for the creation of HTML-like boxes, styled with CSS
 * @author Lea Verou
 * @version 0.1
 * MIT-style license
 */

class CssRule {
	const CSS_TYPE_NUMERIC = 1;
	const CSS_TYPE_STR = 2;
	const CSS_TYPE_COLOR = 4;
	const CSS_TYPE_URI = 8;

	################################ STATIC PROPERTIES ################################
	/**
	 * Named colors
	 */
	private static $colors = array(
		'white' => array(255, 255, 255),
		'black' => array(0, 0, 1),
		'transparent' => array(0, 0, 0, 127)
	);

	private static $property_types = array(
		'width' => CSS_TYPE_NUMERIC,
		'height' => CSS_TYPE_NUMERIC,

		'padding-top' => CSS_TYPE_NUMERIC,
		'padding-right' => CSS_TYPE_NUMERIC,
		'padding-bottom' => CSS_TYPE_NUMERIC,
		'padding-left' => CSS_TYPE_NUMERIC,

		'font-size' => CSS_TYPE_NUMERIC,
		'line-height' => CSS_TYPE_NUMERIC,
		'font-family' => CSS_TYPE_STR,
		'font-weight' => array('normal', 'bold', CSS_TYPE_NUMERIC),
		'font-style' => array('normal', 'italic'),
		'color' => CSS_TYPE_COLOR,

		'background-color' => CSS_TYPE_COLOR,
		'background-image' => CSS_TYPE_URI,
		'background-position-x' => CSS_TYPE_NUMERIC,
		'background-position-y' => CSS_TYPE_NUMERIC,

		'border-color' => CSS_TYPE_COLOR,
		'border-width' => CSS_TYPE_NUMERIC,
		'border-style' => array('none', 'solid', 'double', 'dotted', 'dashed'),
		'border-radius' => CSS_TYPE_NUMERIC,

		'text-shadow-color' => CSS_TYPE_COLOR,
		'text-shadow-offset-x' => CSS_TYPE_NUMERIC,
		'text-shadow-offset-y' => CSS_TYPE_NUMERIC,

		'white-space' => array('normal', 'nowrap', 'pre')
	);

	/**
	 * Default CSS values
	 */
	private static $default = array(
		'width' => 400,
		'height' => 150,

		'padding-top' => 0,
		'padding-right' => 0,
		'padding-bottom' => 0,
		'padding-left' => 0,

		'font-size' => 14,
		'line-height' => 15,
		'font-family' => 'Georgia',
		'font-weight' => 400,
		'font-style' => 'normal',
		'color' => 'black',

		'background-color' => 'transparent',
		'background-image' => '',
		'background-position-x' => 0,
		'background-position-y' => 0,

		'border-color' => 'black',
		'border-width' => 0,
		'border-style' => 'none',
		'border-radius' => 0,

		'text-shadow-color' => 'transparent',
		'text-shadow-offset-x' => 0,
		'text-shadow-offset-y' => 0,

		'white-space' => 'normal'
	);

	/**
	 * CSS numerical shorthands
	 * Shorthands that consist of concatenated properties of different types (eg 'background') are not
	 * supported yet due to the inherent complexity in determining which value belongs to which property
	 */
	private static $shorthands_numeric = array(
		'padding' => array(
			'padding-top',
			'padding-right',
			'padding-bottom',
			'padding-left'
		),
		'background-position' => array(
			'background-position-x',
			'background-position-y'
		),
		'text-shadow-offset' => array(
			'text-shadow-offset-x',
			'text-shadow-offset-y'
		)
	);

	/**
	 * CSS shorthands that consist of concatenated properties of different types (eg 'background')
	 * Please note that, in contrast with how browsers handle those, here the order is specific for any of them
	 */
	private static $shorthands_concat = array(
		'background' => array(
			'background-color',
			'background-image',
			'background-position-x',
			'background-position-y'
		),
		'border' => array(
			'border-width',
			'border-style',
			'border-color'
		),
		'text-shadow' => array(
			'text-shadow-offset-x',
			'text-shadow-offset-y',
			'text-shadow-color'
		),
		'font' => array(
			'font-style',
			//'font-variant',
			'font-weight',
			'font-size',
			'line-height',
			'font-family'
		)
	);

	############################## NON-STATIC PROPERTIES ##############################
	/**
	 * The CSS for the current rule
	 */
	private $css = array();

	/**
	 * If it inherits from another CSSRule, this is a pointer to it
	 */
	private $parent = null;


	############################## STATIC FUNCTIONS ##############################

	/**
	 * Checks whether a css value is valid for a specific property
	 * If the property requires a URI, and the file cannot be found, it's considered invalid (in contrast to the CSS spec)
	 * @param String $property The CSS property. Must not be a shorthand.
	 * @param mixed $cssvalue The value to test
	 *
	 * @return bool true if the value is valid, false otherwise.
	 */
	public static function isValueValid($property, $cssvalue) {
		$validtypes = self::$property_types[$property];

		if(!$validtypes) {
			throw Exception("The property $property is not supported (yet?). Sorry.");
		}

		if(!is_array($validtypes)) {
			$validtypes = array($validtypes);
		}

		foreach($validtypes as $type) {
			switch($type) {
				case CSS_TYPE_NUMERIC:
					if(preg_match('/[0-9]+(px)?/', trim($cssvalue))) {
						return true;
					}

					break;

				case CSS_TYPE_STR:
					if(is_string($cssvalue)) {
						return true;
					}

					break;

				case CSS_TYPE_COLOR:
					if(is_array($cssvalue) or isset(self::$colors[$cssvalue]) or preg_match('/#[0-9a-f]{3}{1,2}/i', trim($cssvalue))) {
						return true;
					}

					break;

				case CSS_TYPE_URI:
					if(file_exists($cssvalue)) {
						return true;
					}

					break;

				default:
					// Specific keyword
					if($type == $cssvalue) {
						return true;
					}
			}
		}

		// No luck so far? Then sorry pal, it's not valid...
		return false;
	}

	############################## NON-STATIC MEMBERS ##############################

}

class CssImage {
	/**
	 * Named colors
	 */
	private static $colors = array(
		'white' => array(255, 255, 255),
		'black' => array(0, 0, 1),
		'transparent' => array(0, 0, 0, 127)
	);

	/**
	 * An array of all the fonts registered.
	 * Register a font with CssBox::fontFace()
	 */
	private static $fonts = array();

	/**
	 * CSS numerical shorthands
	 * Shorthands that consist of concatenated properties of different types (eg 'background') are not
	 * supported yet due to the inherent complexity in determining which value belongs to which property
	 */
	private static $shorthands_numeric = array(
		'padding' => array(
			'padding-top',
			'padding-right',
			'padding-bottom',
			'padding-left'
		),
		'background-position' => array(
			'background-position-x',
			'background-position-y'
		),
		'text-shadow-offset' => array(
			'text-shadow-offset-x',
			'text-shadow-offset-y'
		)
	);

	/**
	 * CSS shorthands that consist of concatenated properties of different types (eg 'background')
	 * Please note that, in contrast with how browsers handle those, here the order is specific for any of them
	 */
	private static $shorthands_concat = array(
		'background' => array(
			'background-color',
			'background-image',
			'background-position-x',
			'background-position-y'
		),
		'border' => array(
			'border-width',
			'border-style',
			'border-color'
		),
		'text-shadow' => array(
			'text-shadow-offset-x',
			'text-shadow-offset-y',
			'text-shadow-color'
		)
	);

	/**
	 * Default formatting for inline "html" elements
	 * The only properties that are supported here are:
	 * 		# font-weight
	 * 		# font-style
	 * 		# color
	 * 		# font-family
	 * 		#
	 */
	private static $inline = array(
		'b' => array(
			'font-weight' => 700
		),

		'i' => array(
			'font-style' => 'italic'
		)
	);

	/**
	 * Default CSS values
	 * Also shows what's supported ;-)
	 * Deviations from the standard:
	 * 		- No units are supported, everything should be set in pixels
	 * 		- Only #RRGGBB colors are supported (and a small percentage of the named ones, see above)
	 * 		- background-position is broken into background-position-x and background-position-y
	 * 		- text-shadow is broken into text-shadow-color and text-shadow-offset. The latter is broken into text-shadow-offset-x and text-shadow-offset-y
	 * 		- No shorthands are supported (exept the ones defined above, in CssBox::shorthands_numeric)
	 */
	private $css = array(
		'width' => 400,
		'height' => 150,

		'padding-top' => 0,
		'padding-right' => 0,
		'padding-bottom' => 0,
		'padding-left' => 0,

		'font-size' => 14,
		'line-height' => 15,
		'font-family' => 'Georgia',
		'font-weight' => 400,
		'font-style' => 'normal',
		'color' => 'black',

		'background-color' => 'transparent',
		'background-image' => '',
		'background-position-x' => 0,
		'background-position-y' => 0,

		'border-color' => 'black',
		'border-width' => 0,
		'border-style' => 'none',
		'border-radius' => 0,

		'text-shadow-color' => 'transparent',
		'text-shadow-offset-x' => 0,
		'text-shadow-offset-y' => 0,

		'white-space' => 'normal'
	);

	/**
	 * The text contained
	 * Don't get carried away by the catchy name, it only supports the <strong>, <b> and <br> tags
	 */
	private $innerHTML = '';

	/**
	 * Tracks whether the image in the canvas matches the data in this instance (CSS and content)
	 */
	private $uptodate = true;

	/**
	 * The drawing canvas
	 */
	private $img = null;

	/**
	 * Allocated colors for the canvas
	 * Should be cleared on repaint and generally, every time $this->img changes
	 */
	private $allocated_colors = array();

	/**
	 * Holds the number of lines that the element contains
	 * Accounts for lines created due to word-wrapping
	 */
	private $lines = 0;

	/**
	 * Parses a hex color like #RRGGBB to an array(red, green, blue[, alpha])
	 * TODO support other color formats
	 */
	private static function parseColor($colorstr) {
		// Is it already an array?
		if(is_array($colorstr)) {
			// Just convert the alpha, if needed
			if(count($colorstr) > 3) {
				$colorstr[3] = intval(127 - 127 * $colorstr[3]);
			}

			return $colorstr;
		}

		// Is it a color string? (like 'white' or 'black')
		if(isset(self::$colors[$colorstr])) {
			return self::$colors[$colorstr];
		}

		// Convert #RGB colors (3 hex digits) to #RRGGBB colors (6 hex digits)
		if(preg_match('/#[0-9a-f]{3}/i', $colorstr) > 0) {
			$colorstr = preg_replace('/^#(.)(.)(.)$/', '#$1$1$2$2$3$3', $colorstr);
		}

		// Does it match the hex color format?
		if(preg_match('/#[0-9a-f]{6}/i', $colorstr) === 0) {
			return array(0, 0, 0, 127);
		}

		// Convert the value to an integer
		$val = intval(substr($colorstr, 1), 16);

		// Extract red, green & blue values from that integer
		return array(
			$val >> 16,
			$val >> 8 & 255,
			$val & 255,
			0
		);
	}

	/**
	 * Helper function to normalize a css value
	 */
	private static function normalizeCssValue($property, $cssvalue) {
		switch($property) {
			case 'font-weight':
				if(is_numeric($cssvalue)) {
					return $cssvalue;
				}

				$cssvalue = trim($cssvalue);
				return $cssvalue == 'bold'? 700 : 400;

			case 'font-style':
				return ($cssvalue == 'italic' or $cssvalue == 'oblique')? 'italic' : 'normal';

			default:
				return $cssvalue;
		}
	}

	/**
	 * Registers a font to be used (equivalent of the CSS3 @font-face rule)
	 * @param array $font The font data. 'font-family' and 'src' are required. 'font-style' and 'font-weight' are optional.
	 */
	public static function fontFace($font) {
		if(!is_array($font)) {
			throw new Exception('Invalid @font-face declaration. $font should be an array');
		}

		if(!$font['font-family']) {
			throw new Exception('Invalid @font-face declaration. No name provided for the font-family.');
		}

		if(!file_exists($font['src'])){
			throw new Exception('Could not find the file ' . $font['src']);
		}

		// Find the font style
		$stylekey = self::normalizeCssValue('font-weight', $font['font-weight']) . self::normalizeCssValue('font-style', $font['font-style']);

		// Store it
		self::$fonts[$font['font-family']][$stylekey] = $font['src'];
	}

	/**
	 * The constructor
	 */
	function __construct($innerHTML = '', $css = null) {
		if($innerHTML) {
			$this->__set('innerHTML', $innerHTML);
		}

		if($css) {
			$this->__set('css', $css);
		}
	}

	/**
	 * Setters
	 */
	public function __set($name, $value) {
		switch($name) {
			case 'innerHTML':
				if($this->innerHTML !== $value) {
					$this->innerHTML = $value;

					$this->uptodate = !$this->img;
				}

				break;

			case 'css':
				if(!is_array($value)) {
					throw new Exception('CssBox::css expects an array');
				}

				foreach($value as $property => $cssvalue) {
					$this->setCssProperty($property, $cssvalue);
				}

				break;

			default:
				throw new Exception('The property CssBox::' . $name . (isset($this->$name)? ' is read-only or private.' : ' doesn\'t exist'));
		}
	}

	/**
	 * Getters
	 */
	public function __get($name) {
		// Some properties might need the image to be (re)painted
		switch($name) {
			case 'img':
			case 'lines':
				if(!$this->uptodate or !$this->img) {
					$this->paint();
				}
		}

		switch($name) {
			case 'offsetWidth':
			case 'offsetHeight':
				$fname = 'get' + ucfirst($name);
				return $this->$fname();

			default:
				if(!isset($this->$name)) {
					return null;
				}

				return $this->$name;
		}
	}

	private function setCssProperty($property, $cssvalue) {
		if(isset($this->css[$property]) and $cssvalue !== $this->css[$property]) {
			$normalize_func = 'normalize' . str_replace($property, '-','');
			if(method_exists('CssBox', $normalize_func)) {
				$cssvalue = call_user_func('self::' . $normalize_func, $cssvalue);
			}

			$this->css[$property] = $cssvalue;

			$this->uptodate = !$this->img;
		}
		else {
			// Shorthands
			if(isset(self::$shorthands_numeric[$property])) {
				$values = preg_split('/\s+/', trim($cssvalue));

				foreach(self::$shorthands_numeric[$property] as $i => $realproperty) {
					self::setCssProperty($realproperty, intval($values[$i - (count($values) - $i > 0? 0 : 2)]));
				}

				$this->uptodate = !$this->img;
			}
			else if(isset(self::$shorthands_concat[$property])) {
				$values = preg_split('/\s+/', trim($cssvalue));

				foreach(self::$shorthands_concat[$property] as $i => $realproperty) {
					if($i < count($values)) {
						self::setCssProperty($realproperty, $values[$i]);
					}
					else {
						break; // we're done, leave the rest to the defaults
					}
				}

				$this->uptodate = !$this->img;
			}
		}
	}

	/**
	 * Returns the perceived width of the box, which is basically border + padding + width
	 */
	private function getOffsetWidth() {
		return $this->css['border-width']*2 + $this->css['padding-left'] + $this->css['width'] + $this->css['padding-right'];
	}

	/**
	 * Returns the perceived height of the box, which is basically border + padding + height
	 */
	private function getOffsetHeight() {
		return $this->css['border-width']*2 + $this->css['padding-top'] + $this->css['height'] + $this->css['padding-bottom'];
	}

	/**
	 * Allocates a color to be used in the canvas
	 * @param String $cssproperty The name of the CSS property to be looked up
	 * @param Array $css If this is provided, then the color will be looked up from it rather than $this->css
	 * 						and the integer will be returned, instead of being put in $this->allocated_colors
	 * @param Image resource $img Specify this if you're allocating a color for an image != $this->img
	 */
	private function allocateColor($cssproperty, $css = null, $img = null) {
		$values = self::parseColor($css? $css[$cssproperty] : $this->css[$cssproperty]);

		if($img) {
			return imagecolorallocatealpha($img, $values[0], $values[1], $values[2], $values[3]);
		}
		else {
			$this->allocated_colors[$cssproperty] = imagecolorallocatealpha($this->img, $values[0], $values[1], $values[2], $values[3]);
		}
	}

	/**
	 * Draws a rounded rectangle to the canvas
	 * Original from http://gr2.php.net/manual/en/function.imagerectangle.php#65619
	 * (tweaked a bit for brevity)
	 */
	private function roundedrectangle($x1, $y1, $x2, $y2, $radius, $color, $filled = false, $line_style=null, $brush = null) {
		// Normalize radius (it can't be > than half the width/height of the rectangle)
		$radius = max(0, $radius);
		$radius = min($radius, abs($x1 - $x2), abs($y1 - $y2));

		if($filled) {
			imagefilledrectangle($this->img, $x1 + $radius,		$y1, 			$x2 - $radius,		$y2,			$color);
			imagefilledrectangle($this->img, $x1,				$y1 + $radius,	$x1 + $radius-1,	$y2-$radius,	$color);
			imagefilledrectangle($this->img, $x2 - $radius + 1,	$y1 + $radius,	$x2, 				$y2-$radius,	$color);
		}
		else {
			imageline($this->img, $x1+$radius,	$y1, 			$x2-$radius,	$y1,			$color);
			imageline($this->img, $x1+$radius,	$y2, 			$x2-$radius,	$y2,			$color);
			imageline($this->img, $x1,			$y1+$radius,	$x1,			$y2-$radius,	$color);
			imageline($this->img, $x2,			$y1+$radius,	$x2,			$y2-$radius,	$color);
		}

		$arcs = array(
			array($x1+$radius, $y2-$radius),
			array($x1+$radius, $y1+$radius),
			array($x2-$radius, $y1+$radius),
			array($x2-$radius, $y2-$radius)
		);

		if($filled) {
			foreach($arcs as $i => $dim) {
				imagefilledarc($this->img, $dim[0], $dim[1], $radius*2, $radius*2, ($i+1) * 90 , ($i+2) * 90 % 360, $color, IMG_ARC_PIE);
			}
		}
		else {


			/*foreach($arcs as $i => $dim) {
				imagearc($this->img, $dim[0], $dim[1], $radius*2, $radius*2, ($i+1) * 90 , ($i+2) * 90 % 360, $color);
			}*/
		}

	}

	/**
	 * Create a transparent canvas, for various tasks (for border brushes, blurred text-shadows etc)
	 */
	private static function createCanvas($width, $height) {
		$canvas = imagecreatetruecolor($width, $height);

		imagealphablending($canvas, false);
		imagesavealpha($canvas, true);

		imageantialias($canvas, true);

		// imagefill() produced some strange results on some cases (a 3x3 canvas had a black line at the bottom :-S)
		imagefilledrectangle($canvas, 0, 0, $width, $height, IMG_COLOR_TRANSPARENT);

		return $canvas;
	}

	private function process_subcss(&$css = null) {
		if(!is_array($css)) {
			$css = array();
		}

		foreach($css as $property => $cssvalue) {
			$css[$property] = self::normalizeCssValue($property, $cssvalue);
		}

		// Inherit properties of the parent, for those that aren't set in $css
		$css += $this->css;
	}

	/**
	 * Fetch the filename of the required font, depending on the $css passed
	 * TODO Take care of missing fonts
	 */
	private function fetch_font($css = null) {
		$this->process_subcss($css);

		$stylekey = $css['font-weight'] . $css['font-style'];

		return self::$fonts[$css['font-family']][$stylekey];
	}

	/**
	 * Paints an "inline element", like <b> or <i>
	 */
	private function paint_inline_element($word, $x, $y, $css) {
		$this->process_subcss($css);

		// Get the font filename
		$font = $this->fetch_font($css);

		/**
		 * Paint text-shadow
		 * TODO support a blur radius by using a temporary canvas for the shaodw an applying the blur filter to it
		 */
	   if($css['text-shadow-color'] and ($css['text-shadow-offset-x'] or $css['text-shadow-offset-y'])) {
			$this->allocateColor('text-shadow-color', $css);

		   imagettftext($this->img,
					$css['font-size']*.75, 0,
					$x + $css['text-shadow-offset-x'],
					$y + $css['text-shadow-offset-y'],
					$this->allocated_colors['text-shadow-color'],
					$font, $word
				);
		}

		$this->allocateColor('color', $css);

		$ret = imagettftext($this->img,
				$css['font-size']*.75, 0,
				$x,
				$y,
				$this->allocated_colors['color'],
				$font, $word
			);

		return $ret[2];
	}

	/**
	 * Paints the textual contents of this box to it
	 */
	private function paint_text() {
		$style = array();
		$this->lines = 0;

		$totalwidth = $this->css['width'];

		$x = $this->css['padding-left'] + $this->css['border-width'];

		// Reverse engineered from Firefox 3.5, it seems correct in the cases I tried...
		$baseline_initial = round(0.4*$this->css['font-size'] + $this->css['line-height']/2);

		$y = $this->css['padding-top'] + $this->css['border-width'] + $baseline_initial;

		imagesetpixel($this->img, $x, $y, imagecolorallocate($this->img, 255, 0, 0));

		$this->allocateColor('color');

		if($this->innerHTML) {
			if($this->css['white-space'] == 'pre') {
				$lines = preg_split("/<br>|\r?\n|\r/", $this->innerHTML);
			}
			else {
				$lines = explode('<br>', $this->innerHTML);
			}

			foreach($lines as $line) {
				// Reset x to the starting one
				$xcur = $x;

				// This doesn't feel like the proper way to have italic/bold etc text but it works as a temp "hack"
				// In the future, inline elements should be supported and we should append them with CssBox::appendChild()
				// Yeah, it would make it more complicated, but it feels more right...
				$tokens = preg_split('/(<\/?(?:[a-z][a-z0-9_\-]*)>)/i', $line, 0, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);

				foreach($tokens as $token) {
					// Is it an ending tag?
					if(preg_match('/<\/(.*)>/', $token, $matches)) {
						$tagcss = self::$inline[$matches[1]];

						// Is there any CSS associated with this tag?
						if(is_array($tagcss)) {
							foreach($tagcss as $property => $cssvalue) {
								if($style[$property][$cssvalue] > 0) {
									$style[$property][$cssvalue]--;
								}
							}
						}
					}
					// Is it a starting tag?
					else if(preg_match('/<(.*)>/', $token, $matches)) {
						$tagcss = self::$inline[$matches[1]];

						// Is there any CSS associated with this tag?
						if(is_array($tagcss)) {
							foreach($tagcss as $property => $cssvalue) {
								if(!$style[$property][$cssvalue]) {
									$style[$property] = array(
										$cssvalue => 0
									);
								}

								$style[$property][$cssvalue]++;
							}
						}
					}
					// No? Then it must be normal text to be printed...
					else {
						// What CSS should we use?
						$curcss = array();
						foreach($style as $property => $valuearr) {
							$val = key($valuearr);

							if($valuearr[$val]) {
								$curcss[$property] = $val;
							}
						}

						// Get the appropriate font
						$font = $this->fetch_font($curcss);

						if($this->css['white-space'] == 'pre') {
							// No need to replace whitespace here, we want it as-is
							$words = array($token);
						}
						else {
							// We're going to replace any whitespace with a single space, but that's what HTML does anyway
							$words = preg_split('/\s+/', $token);
						}

						foreach($words as $i => $word) {
							if($this->css['white-space'] == 'normal') {
								// Will the result be off the canvas?
								// TODO support soft hyphens (&shy;)
								$bounding_box = imagettfbbox($this->css['font-size']*.75, 0, $font, $word);

								$word_width = $bounding_box[2];

								// If we write the word on the same line, are we going to go beyond limits?
								if($xcur + $word_width > $this->css['width'] + $this->css['padding-left'] + $this->css['border-width']) {
									// Go to the next line
									$xcur = $x;
									$y +=  $this->css['line-height'];
									$this->lines++;
								}
							}

							$whitespace = $i < count($words) - 1? ' ' : '';
							$xcur = $this->paint_inline_element($word . $whitespace, $xcur, $y, $curcss);
						}
					}
				}

				// Go to next line
				$y += $this->css['line-height'];
				$this->lines++;
			}
		}
	}

	/**
	 * Responsible for painting the border
	 * FIXME When border-radius is set, The border isn't aligned very well
	 */
	private function paint_border() {
		if($this->css['border-width'] and $this->css['border-style'] != 'none') {
			$this->allocateColor('border-color');

			$totalwidth = $this->getOffsetWidth();
			$totalheight = $this->getOffsetHeight();

			$border_width = $this->css['border-width'];

			if($this->css['border-style'] == 'double' and $border_width > 2) {
				// If it's <= 2 then it's treated as solid anyway
				$original_border_width = $border_width;
				$border_width = round($border_width/3);
			}

			$brush = self::createCanvas($border_width, $border_width);

			// Why all this fuss? For 2 reasons: 1. Makes the dots looks anti-aliased
			// and 2. When the border width is even, painting it to a canvas at it's size makes it 1px larger

			$dot = self::createCanvas($border_width * 10 + 1, $border_width * 10 + 1);

			$col = $this->allocateColor('border-color', null, $dot);

			imagefilledellipse($dot, $border_width*5, $border_width*5, $border_width*10, $border_width*10, $col);

			imagecopyresampled($brush, $dot, 0, 0, 0, 0, $border_width, $border_width, $border_width*10, $border_width*10);

			$line_style = array(IMG_COLOR_BRUSHED);


			switch($this->css['border-style']) {
				case 'dotted':
					$border_style = array($border_width*1.8);
					break;

				case 'dashed':
					$border_style = array($border_width-1, 1, $border_width-1, 1, $border_width*2.5);
					break;

				case 'double':
				case 'solid':
				default:
					$border_style = array();
			}

			foreach($border_style as $key => $interval) {
				$pushcolor = $key % 2? IMG_COLOR_BRUSHED : IMG_COLOR_TRANSPARENT;

				for($i = 0; $i < $interval; $i++) {
					array_push($line_style, $pushcolor);
				}
			}

			imagesetbrush($this->img, $brush);
			imagesetstyle($this->img, $line_style);


			if($this->css['border-radius']) {


				$x1 = $border_width/2;
				$y1 = $border_width/2;
				$x2 = $totalwidth - $border_width/2;
				$y2 = $totalheight - $border_width/2;

				// Normalize radius (it can't be > than half the width/height of the rectangle)
				$radius = max(0, $this->css['border-radius'] - $border_width/2);
				$radius = min($radius, abs($x1 - $x2), abs($y1 - $y2));

				imageline($this->img, $x1+$radius,	$y1, 			$x2-$radius,	$y1,			$color);
				imageline($this->img, $x1+$radius,	$y2, 			$x2-$radius,	$y2,			$color);
				imageline($this->img, $x1,			$y1+$radius,	$x1,			$y2-$radius,	$color);
				imageline($this->img, $x2,			$y1+$radius,	$x2,			$y2-$radius,	$color);

				$arcs = array(
					array($x1+$radius, $y2-$radius),
					array($x1+$radius, $y1+$radius),
					array($x2-$radius, $y1+$radius),
					array($x2-$radius, $y2-$radius)
				);

				$arcanvas = $this->createCanvas(40*$radius + 10*$border_width, 40*$radius + 10*$border_width);

				imagesetbrush($arcanvas, $dot);
				imagesetstyle($arcanvas, $line_style);

				imageellipse($arcanvas, 40*$radius, 40*$radius, 80*$radius - 10*$border_width, 80*$radius - 10*$border_width, IMG_COLOR_STYLEDBRUSHED);

				imagepng($arcanvas);
				exit;

				imagecopyresampled($this->img, $arcanvas, 0, 0, 0, 0, $radius, $radius, 10*$radius, 10*$radius);
			}
			else {
				imagerectangle($this->img,
						$border_width/2,
						$border_width/2,
						$totalwidth - $border_width/2,
						$totalheight - $border_width/2,
						IMG_COLOR_STYLEDBRUSHED
					);
			}

			if(false and $this->css['border-style'] == 'double' and $original_border_width) {
				// If the border-style is double, then we're not done yet
				// We have to draw another border
				if($this->css['border-radius']) {
					$x1 = $original_border_width - $border_width/2;
					$y1 = original_border_width - $border_width/2;
					$x2 = $totalwidth - $original_border_width + $border_width/2;
					$y2 = totalheight - $original_border_width + $border_width/2;

					// Normalize radius (it can't be > than half the width/height of the rectangle)
					$radius = max(0, $this->css['border-radius'] - $original_border_width + $border_width/2);
					$radius = min($radius, abs($x1 - $x2), abs($y1 - $y2));



						imageline($this->img, $x1+$radius,	$y1, 			$x2-$radius,	$y1,			$color);
						imageline($this->img, $x1+$radius,	$y2, 			$x2-$radius,	$y2,			$color);
						imageline($this->img, $x1,			$y1+$radius,	$x1,			$y2-$radius,	$color);
						imageline($this->img, $x2,			$y1+$radius,	$x2,			$y2-$radius,	$color);


					$arcs = array(
						array($x1+$radius, $y2-$radius),
						array($x1+$radius, $y1+$radius),
						array($x2-$radius, $y1+$radius),
						array($x2-$radius, $y2-$radius)
					);

						$canvas = $this->createCanvas(20*$radius, 20*$radius);

						imagesetbrush($canvas, $dot);

						imagesetstyle($canvas, $line_style);

						imageellipse($canvas, 5*$radius, 5*$radius, 5*$radius, 5*$radius, IMG_COLOR_STYLEDBRUSHED);

						imagepng($canvas);

						imagecopyresampled($this->img, $canvas, 0, 0, 0, 0, $radius, $radius, 10*$radius, 10*$radius);

				}
				else {
					imagerectangle($this->img,
							$original_border_width - $border_width/2,
							$original_border_width - $border_width/2,
							$totalwidth - $original_border_width + $border_width/2,
							$totalheight - $original_border_width + $border_width/2,
							IMG_COLOR_STYLEDBRUSHED
						);
				}
			}

			imagedestroy($dot);
			imagedestroy($brush);
		}
	}

	/**
	 * Responsible for paiting every background-xxx property
	 * FIXME background-image doesn't get clipped to border-radius (exact same bug as the one Firefox 2 had)
	 */
	private function paint_background() {
		$totalwidth = $this->getOffsetWidth();
		$totalheight = $this->getOffsetHeight();

		/**
		 * Paint background-color
		 */
		$this->allocateColor('background-color');

		if($this->css['border-radius']) {
			imagefill($this->img, 0, 0, IMG_COLOR_TRANSPARENT);

			$this->roundedrectangle(0, 0, $totalwidth, $totalheight, $this->css['border-radius'], $this->allocated_colors['background-color'], true);
		}
		else {
			imagefill($this->img, 0, 0, $this->allocated_colors['background-color']);
		}

		/**
		 * Paint background-image
		 */
		if($this->css['background-image'] and $this->css['background-image'] != 'none') {
			$background_image = imagecreatefrompng($this->css['background-image']);
			imagealphablending($background_image, false);
			imagesavealpha($background_image, true);

			$biw = imagesx($background_image);
			$bih = imagesy($background_image);

			imagecopy($this->img, $background_image, $this->css['background-position-x'], $this->css['background-position-y'], 0, 0, $biw, $bih);

			imagedestroy($background_image);
		}
	}

	public function paint() {
		if($this->img and $this->uptodate) {
			return;
		}
		else if($this->img) {
			// $this->img will be replaced
			imagedestroy($this->img);
		}

		// Create the image
		$this->img = imagecreatetruecolor($this->getOffsetWidth(), $this->getOffsetHeight());

		imagealphablending($this->img, true);
		imagesavealpha($this->img, true);

		$this->paint_background();

		$this->paint_border();

		$this->paint_text();

		$this->uptodate = true;
	}
}

?>
