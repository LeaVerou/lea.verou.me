---
title: "Convert PHP serialized data to Unicode"
date: "2011-02-13"
categories: 
  - "original"
  - "tips"
tags: 
  - "latin1"
  - "php"
  - "serialized"
  - "unicode"
  - "utf8"
---

I recently had to convert a database of a large greek website from single-byte greek to Unicode (UTF-8). One of the problems I faced was the stored PHP serialized data: As PHP stores the length of the data (in bytes) inside the serialized string, the stored serialized strings could not be unserialized after the conversion.

I didn't want anyone to go through the frustration I went through while searching for a solution, so here is a little function I wrote to recount the string lengths, since I couldn't find anything on this:

function recount\_serialized\_bytes($text) {
	mb\_internal\_encoding("UTF-8");
	mb\_regex\_encoding("UTF-8");

	mb\_ereg\_search\_init($text, 's:\[0-9\]+:"');

	$offset = 0;

	while(preg\_match('/s:(\[0-9\]+):"/u', $text, $matches, PREG\_OFFSET\_CAPTURE, $offset) ||
		  preg\_match('/s:(\[0-9\]+):"/u', $text, $matches, PREG\_OFFSET\_CAPTURE, ++$offset)) {
		$number = $matches\[1\]\[0\];
		$pos = $matches\[1\]\[1\];

		$digits = strlen("$number");
		$pos\_chars = mb\_strlen(substr($text, 0, $pos)) + 2 + $digits;

		$str = mb\_substr($text, $pos\_chars, $number);

		$new\_number = strlen($str);
		$new\_digits = strlen($new\_number);

		if($number != $new\_number) {
			// Change stored number
			$text = substr\_replace($text, $new\_number, $pos, $digits);
			$pos += $new\_digits - $digits;
		}

		$offset = $pos + 2 + $new\_number;
	}

	return $text;
}

My initial approach was to do it with regular expressions, but the PHP serialized data format is not a regular language and cannot be properly parsed with regular expressions. All approaches fail on edge cases, and I had lots of edge cases in my data (I even had nested serialized strings!).

Note that this will only work when converting **from single-byte encoded data**, since it assumes the stored lengths are the string lengths in characters. Admittedly, it's not my best code, it could be optimized in many ways. It was something I had to write quickly and was only going to be used by me in a one-time conversion process. However, it works smoothly and has been tested with lots of different serialized data. I know that not many people will find it useful, but it's going to be a lifesaver for the few ones that need it.
