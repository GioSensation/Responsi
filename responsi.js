/**
 * @preserve Responsi – Making responsive and retina-ready images easy, lightweight and asynchronous.
 * @version 0.1.1
 * @author Emanuele Feliziani – emanuele@gravida.pro – http://gravida.pro
 * @homepage https://github.com/GioSensation/responsi
 * @license MIT License
 */

var responsi = {
	// We set viewport and dpi at the object level so they can be easily accessed outside responsi. It's just a helper. I know I will use them. Note: I couldn't find the browser support for devicePixelRatio, so I just throw a fallback in case that fails.
	viewport : document.documentElement.clientWidth,
	dpi : window.devicePixelRatio || 1,
	// Init fires the whole thing.
	init : function( responsiConfig ) {
		var viewport = this.viewport,
			dpi = this.dpi,
			responsiSize = 'large',
			defaultConfig = {
				phones	: 480,
				tabs	: 768,
				laps	: 1200,
				desks	: 1900
			};
		
		responsiConfig = typeof responsiConfig !== 'undefined' ? responsiConfig : defaultConfig;
		
		/***************** SMALL *****************/
		if (
			viewport <= responsiConfig.phones /* 480 */ // all smartphones, regardless of dpi
			||
			viewport < responsiConfig.tabs /* 768 */ && dpi < 1.5 // up to regular dpi phablets and small tablets (no iPad)
			) {
				responsiSize = 'small';
			}
		
		/***************** MEDIUM *****************/
		if (
			viewport > responsiConfig.phones /* 480 */ && viewport < responsiConfig.laps /* 1200 */ && dpi > 1.5 // hidpi phablets, tablets and hidpi small computers (dunno whether they even exist)
			||
			viewport >= responsiConfig.tabs /* 768 */ && viewport < responsiConfig.desks /* 1900 */ && dpi < 1.5 // regular tablets, laptops & desktop
			) {
				responsiSize = 'medium';
			}
		
		/***************** LARGE *****************/
		if (
			viewport >= responsiConfig.laps /* 1200 */ && dpi > 1.5 // hidpi laptops
			||
			viewport >= responsiConfig.desks /* 1900 */ // big desktops
			) {
				responsiSize = 'large';
			}
		
		/***************** RSPONSI MAGIC HAPPENS HERE *****************/
		// Get the source URI.
		function getResponsiSrc(el) {
			// If the element has the attribute of the desired size, get that size URI, otherwise try other sizes. A loop would have been more elegant, but this should be faster.
			var imgSrc = el.getAttribute('data-responsi-' + responsiSize) ||
						 el.getAttribute('data-responsi-large') ||
						 el.getAttribute('data-responsi-medium') ||
						 el.getAttribute('data-responsi-small');
			return imgSrc;
		}
		
		function getResponsiAlt(el) {
			var altValue;
			if (el.hasAttribute('data-responsi-alt')) {
				altValue = el.getAttribute('data-responsi-alt');
			} else {
				altValue = document.title;
			}
			return altValue;
		}
		
		// Get responsi elements and loop through them, then get attributes, create the image element and append it.
		var responsiImgs = document.querySelectorAll('.responsi-img');
		[].forEach.call(responsiImgs, function(el) {
			if (getResponsiSrc(el)) {
				// If the alt attribute is not defined, we will set it to an empty string.
				var imgEl = new Image();
				imgEl.src = getResponsiSrc(el);
				imgEl.alt = getResponsiAlt(el);
				el.appendChild(imgEl);
				// Removing the responsi class allows us to call the function again after the first call, for example if we want to create responsi elements dynamically.
				el.classList.remove('responsi-img');
			}
		});
		
		// Responsi logic for background images.
		var responsiBgImgs = document.querySelectorAll('.responsi-bg-img');
		[].forEach.call(responsiBgImgs, function(el) {
			var imgSrc = getResponsiSrc(el);
			el.style.backgroundImage = "url(" + imgSrc + ")";
			// Removing the responsi class allows us to call the function again after the first call, for example if we want to create responsi elements dynamically.
			el.classList.remove('responsi-bg-img');
		});
	}
};