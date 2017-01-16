
#redDecoder

A jQuery plugin for creating hidden messages and red decoder glasses out of webpage elements. Requires jQuery, jQuery UI, and a browser that supports HTML5 canvas (or the necessary fallback, like flashcanvas).

##Usage

Include an external script reference to the jquery.reddecoder.js file (or the jquery.reddecoder.min.js file) in your page, after referencing jQuery and jQuery UI scripts. Then in your own script for the page, you can use a page element to create a red decoder glass:

`$("#pageElementId").redDecoder();`

You can define which canvas element will hide your decoded message, by calling the redEncoder method:

`$("#messageCanvasId").redEncoder();`

By passing a "canvases" property into the options for redDecoder, you can define the canvas elements in the same call that defines the glass:

```javascript
$("#pageElementId").redDecoder({
	canvases: [
		{
			element: $("#messageCanvasId")
		}
	]
});
```

##Options

###redDecoder Options

glasses {Object | Array} - An array of objects defining the elements that will represent the red decoder glasses. Each object has the following optional properties:

element {Object | string} - An HTML element to be used as the decoder glass, or a jQuery wrapped version of the element, or a string that would identify the element (for instance, by passing the string into jQuery or into document.querySelector()). Default is $(this) (the element being passed into jQuery as it invokes redDecoder).
	
css {Object} - A collection of key-value pairs describing the optional css values to be applied to the glass element. Default is:

```javascript
{
	width: "200px",
	height: "200px",
	border: "10px solid gray",
	background: "rgba(255, 0, 0, 0.8)",
	cursor: "none"
}
```

---

canvases {Object | Array} - An array of objects defining the elements that will hold the encoded messages. Default is an empty array, []. Each object in canvases has the following optional properties:

element {Object | string} - An HTML element to be used as the camouflaging canvas, or a jQuery wrapped version of the element, or a string that would identify the element (for instance, by passing the string into jQuery or into document.querySelector()).

css {Object} - A collection of key-value pairs describing the optional css values to be applied to the canvas element. Default is:

```javascript
{
	width: "400px",
	height: "300px"
}
```

font - A starting font to be applied to all canvases (camouflaging text and hidden text) unless otherwise specified in the messages option. Default is "14px Times New Roman".

messages {Object | Array} - An array of objects defining the hidden messages within this canvas. Default is an empty array, []. Each object has the following optional properties:
	
text {string} - The message that is to be hidden.

position {Object} - An object with two properties: x, which points to the desired x-value for the message in the canvas, and y, which points to the desired y-value for the message in the canvas. If no x-value is defined, one will be defined randomly. If no y-value is defined, one will be defined randomly.

### redEncoder Options

The options object for the redEncoder method has the same optional key-value pairs as in each object from the `canvases` array defined in the redDecoder options above.

## Demo

To see a working demo, download this repository, and then be sure to copy or download jQuery and jQuery UI to the same directory. The script will then be applied when you open demo.html.

##License

redDecoder is available for use under the MIT license.
