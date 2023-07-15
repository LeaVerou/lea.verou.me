/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */

window.matchMedia = window.matchMedia || (function(doc, undefined){
  
  var bool,
      docElem  = doc.documentElement,
      refNode  = docElem.firstElementChild || docElem.firstChild,
      // fakeBody required for <FF4 when executed in <head>
      fakeBody = doc.createElement('body'),
      div      = doc.createElement('div');
  
  div.id = 'mq-test-1';
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.appendChild(div);
  
  return function(q){
    
    div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';
    
    docElem.insertBefore(fakeBody, refNode);
    bool = div.offsetWidth == 42;  
    docElem.removeChild(fakeBody);
    
    return { matches: bool, media: q };
  };
  
})(document);

/**
 * Get screen info
 * Author: Lea Verou
 */
(function(){

var w = screen.width,
	h = screen.height,
	d = Math.sqrt(w*w + h*h),
	diagonal, dpi;

// Find screen diagonal in inches
screen.diagonal = function() {
	if(diagonal !== undefined) {
		return diagonal;
	}
	
	return diagonal = screen.inches(d);
};

// Find pixels per inch
screen.dpi = function() {
	if(dpi !== undefined) {
		return dpi;
	}
	
	var range = [0,1000], i=0;
	
	while(range[0] + 1 < range[1]) {
		var mid = Math.round((range[0] + range[1])/2),
			matches = matchMedia('(min-resolution: ' + mid + 'dpi)').matches;
		
		range[matches? 0 : 1] = mid;
	}
	
	return dpi = range[1] === 1? NaN : range[1];
};

screen.pixels = function(inches) {
	return inches * screen.dpi();
};

screen.inches = function(pixels) {
	return Math.floor(10 * pixels / screen.dpi())/10;
};

})();
	
tv.textContent = screen.diagonal() + '"';