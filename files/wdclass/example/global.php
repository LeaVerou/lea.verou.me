<?php
/**
 * Various things that are required in EVERY page of the site
 */

// Report all errors
error_reporting(E_ALL);

// Set Content-Type and character encoding.
// The HTTP header takes precedence over the <meta> tag, and servers
// usually send one anyway, so it's good practice to send a proper
// Content-Type header yourself. It's also a good practice to add
// the <meta> tag as well, to make the document functional outside
// the context of the server (for example, when saved locally)
header('Content-Type: text/html; charset=utf-8');

// This constant helps us distinguish between pages in templates
preg_match('#/([^/]+)\.php$#i', $_SERVER['REQUEST_URI'], $matches);
define(THIS_SCRIPT, $matches[1]);

?>
