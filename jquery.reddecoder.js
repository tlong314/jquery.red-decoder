/**
 * @overview A jQuery plugin for turning HTML elements into red decoder magnifying glasses and
 *   the camouflaged messages that they decode when hovered over.
 * @requires jQuery, jQuery UI
 * @author Tim Scott Long
 * @copyright Tim Scott Long 2017
 * @version 1.1.0
 * @license Available for use under the MIT License
 */
;(function(){	
	/**
	 * @description Create the decoder glass element, to be dragged over the encoded messages.
	 *	@param {Object} options - A collection of options to be applied. See documentation.
	 * @returns {Object} - The currently referenced jQuery object (returned for chaining).
	 */
	$.fn.redDecoder = function(options) {	
		// If multiple HTML elements are passed in, create a decoder glass from each one.
		if(this.length > 1) {
			return this.each(function(){
				$(this).redDecoder(options);
			});
		}

		var defaults = {
				glass: {
					element: this,
					css: {
						width: "200px",
						height: "200px",
						border: "10px solid gray",
						background: "rgba(255, 0, 0, 0.8)",
						cursor: "none"
					}
				},
				canvases: []
			},
			opts = $.extend(defaults, options);

		var $redDiv = $(opts.glass.element);
		if(!$redDiv.length) { // If no element was passed in or defined, create one.
			var $redDiv = $("<div></div>").addClass("jq-red-decoder-glass");
			$("body").append($redDiv);
		}

		$redDiv.css(opts.glass.css);
		
		if(!opts.glass.css.borderRadius && !opts.glass.css["border-radius"]) {
			$redDiv.css("border-radius", Math.ceil($redDiv.width() / 2 + parseFloat($redDiv.css("border-width").replace("px", ""), 10)) + "px");
		}

		$redDiv.draggable();
		
		var c = opts.canvases.length;
		while(c--) {
				$(opts.canvases[c].element).redEncoder(opts.canvases[c]);
		}
		
		return this;
	}; // End $.fn.redDecoder()

	/**
	 * @description Draws encoded message on the given canvas object.
	 *	@param {Object} options - A collection of options to be applied. See documentation.
	 * @returns {Object} - The currently referenced jQuery object (returned for chaining).
	 */
	$.fn.redEncoder = function(options) {
		// If multiple HTML canvases are passed in, create a camouflaged message from each one.
		if(this.length > 1) {
			return this.each(function(){
				$(this).redDecoder(options);
			});
		}

		var alphabet = [
				["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
				["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
			],
			defaults = {
				element: null,
				css: {
					width: "400px",
					height: "300px",
					background: "white",
					backgroundColor: "white"
				},
				font: "14px Times New Roman",
				messages: []
			},
			$canvas = null,
			ctx = null,
			opts = $.extend(defaults, options),
			width = parseFloat(opts.css.width.replace("px", ""), 10),
			height = parseFloat(opts.css.height.replace("px", ""), 10),
			area  = width * height;

		// If the canvas has not be identified, create one.
		if(!$(opts.element).length) {
			if(this.length) {
				$canvas = this;
			} else {
				$canvas = $("<canvas></canvas>");
				$("body").append($canvas);
			}
		} else {
			$canvas = $(opts.element);
		}

		$canvas.attr("width", width).attr("height", height).css(opts.css);
		ctx = $canvas[0].getContext("2d");
		ctx.font = opts.font;

		// Draw red spots and letters.
		ctx.fillStyle = "rgba(255,0,0,0.6)";
		var splotchNum = Math.round(area / 300);

		while(splotchNum--) {
			var x = Math.floor(Math.random() * width),
				y = Math.floor(Math.random() * height),
				w = Math.floor(Math.random() * (width / 80)),
				h = Math.floor(Math.random() * (height / 80));

			ctx.fillRect(x, y, w, h);
		}

		splotchNum = Math.round(area / 600);

		while(splotchNum--) {
			var x = Math.random() * width,
				y = Math.random() * height;
			
			ctx.fillText(alphabet[Math.floor(Math.random()*2)][Math.floor(Math.random()*26)], x, y);
		}

		// Draw pink spots and letters.
		ctx.fillStyle = "rgba(251,132,183,0.8)";
		splotchNum = Math.round(area / 40);

		while(splotchNum--) {
			var x = Math.random() * width,
				y = Math.random() * height,
				w = Math.floor(Math.random() * (width / 80)),
				h = Math.floor(Math.random() * (height / 80));
			
			ctx.fillRect(x, y, w, h);
		}

		splotchNum = Math.round(area / 240);

		while(splotchNum--) {
			var x = Math.random() * width,
				y = Math.random() * height;
			
			ctx.fillText(alphabet[Math.floor(Math.random()*1.2)][Math.floor(Math.random()*26)], x, y);
		}

		// Draw orange spots and letters.
		ctx.fillStyle = "rgba(235,165,35,0.8)";
		splotchNum = Math.round(area / 120);

		while(splotchNum--) {
			var x = Math.random() * width,
				y = Math.random() * height,
				w = Math.floor(Math.random() * (width / 80)),
				h = Math.floor(Math.random() * (height / 80));
			
			ctx.fillRect(x, y, w, h);
		}

		splotchNum = Math.round(area / 240);

		while(splotchNum--) {
			var x = Math.random() * width,
				y = Math.random() * height;
			
			ctx.fillText(alphabet[Math.floor(Math.random()*2)][Math.floor(Math.random()*26)], x, y);
		}

		// Write hidden blue message.
		ctx.fillStyle = "rgba(2,197,253,0.5)";
		var m = opts.messages.length;

		while(m--) {
			var message = opts.messages[m],
				text = message.text || "",
				position = message.position
				font = message.font || "14px Times New Roman";
			
			// Define random x-y values for the text if they have not been set.
			if(!position) {
				position = {};
			}
			
			if(!position.x) {
				position.x = Math.max(Math.random() * (width - (opts.messages[m].text.length - 1) * 14), 0); // Rough estimate to keep text on the canvas.
			}
			
			if(!position.y) {
				position.y = 20 + Math.random() * (height - 20); // Rough estimate to keep text on the canvas.
			}

			ctx.fillText(opts.messages[m].text.split("").join(" "), Math.round(position.x), Math.round(position.y));
		}
		
		return this;
	}; // End $.fn.redEncoder()
}());