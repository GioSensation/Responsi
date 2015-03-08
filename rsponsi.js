var rsponsi = {
	// We set viewport and dpi at the object level so they can be easily accessed outside rsponsi. It's just a helper. I know I will use them. Note: I couldn't find the browser support for devicePixelRatio, so I just throw a fallback in case that fails.
	viewport : document.documentElement.clientWidth,
	dpi : window.devicePixelRatio || 1,
	// Init fires the whole thing.
	init : function( rsponsiConfig ) {
		var viewport = this.viewport,
			dpi = this.dpi,
			rsponsiSize = 'large',
			defaultConfig = {
				phones	: 481,
				tabs	: 767,
				laps	: 1200,
				desks	: 1900
			};
		
		rsponsiConfig = typeof rsponsiConfig !== 'undefined' ? rsponsiConfig : defaultConfig;
		
		/***************** SMALL *****************/
		if (
			viewport < rsponsiConfig.phones /* 481 */ // smartphones
			||
			viewport < rsponsiConfig.tabs /* 767 */ && dpi < 1.5 // regular dpi tablets and small computers
			) {
				rsponsiSize = 'small';
			}
		
		/***************** MEDIUM *****************/
		if (
			viewport >= rsponsiConfig.phones /* 481 */ && viewport < rsponsiConfig.laps /* 1200 */ && dpi > 1.5 // hidpi tablets
			||
			viewport >= rsponsiConfig.tabs /* 767 */ && viewport < rsponsiConfig.desks /* 1900 */ && dpi < 1.5 // standard laptops & regular desktop
			) {
				rsponsiSize = 'medium';
			}
		
		/***************** LARGE *****************/
		if (
			viewport >= rsponsiConfig.laps /* 1200 */ && dpi > 1.5 // hidpi laptops
			||
			viewport >= rsponsiConfig.desks /* 1900 */ // big desktops
			) {
				rsponsiSize = 'large';
			}
		
		/***************** RSPONSI MAGIC HAPPENS HERE *****************/
		// Get the source URI.
		function getRsponsiSrc(el) {
			// If the element has the attribute of the desired size, get that size URI, otherwise try other sizes. A loop would have been more elegant, but this should be faster.
			var imgSrc = el.getAttribute('data-rsponsi-' + rsponsiSize) ||
						 el.getAttribute('data-rsponsi-large') ||
						 el.getAttribute('data-rsponsi-medium') ||
						 el.getAttribute('data-rsponsi-small');
			return imgSrc;
		}
		
		// Get rsponsi elements and loop through them, then get attributes, create the image element and append it.
		var rsponsiImgs = document.querySelectorAll('.rsponsi-img');
		[].forEach.call(rsponsiImgs, function(el) {
			if (getRsponsiSrc(el)) {
				// If the alt attribute is not defined, we will set it to an empty string.
				var imgAlt = el.getAttribute('data-rsponsi-alt') || '';
				var imgEl = new Image();
				imgEl.src = getRsponsiSrc(el);
				imgEl.alt = imgAlt;
				el.appendChild(imgEl);
			}
		});
		
		// Rsponsi logic for background images.
		var rsponsiBgImgs = document.querySelectorAll('.rsponsi-bg-img');
		[].forEach.call(rsponsiBgImgs, function(el) {
			var imgSrc = getRsponsiSrc(el);
			el.style.backgroundImage = "url(" + imgSrc + ")";
		});
	}
};