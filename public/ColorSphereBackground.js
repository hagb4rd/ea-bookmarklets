/*
ColorSphereBackground({
	element: document.querySelector("footer"),
	x: 0,
	y:-100,
	width: 0,
	height: 10
});
*/

var ColorSphereBackground = function(params) {
	var that = this;
	///
	this.create = function(params) {
		params = params || {};
		var element = params.element;
		params.x = params.x || 0;
		params.y = params.y || 0;
		params.width = params.width || Math.max(window.innerWidth, element.offsetWidth);
		params.height = params.height || element.offsetHeight || window.innerHeight;
		///
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.style.cssText = "position: absolute; left: 0; top: 0; opacity: 1; z-index: 0";
		canvas.style.width = params.width + "px";
		canvas.style.height = params.height + "px";
		element.appendChild(canvas);
		///
		var theSphere;
		var px = window.innerWidth / 2.0;
		var py = window.innerHeight / 2.0;
		var onMouseMove = function(event) {
			ctx.drawImage(theSphere, 0, 0);
			if (event) {
				var coords = Event.proxy.getCoord(event);
				coords.x -= document.body.scrollLeft;
				coords.y -= document.body.scrollTop;
				px = coords.x;
				py = coords.y;
			} else { //
				var coords = { x: px, y: py };
			}
			//
			var x = Math.max(0.1,coords.x / window.innerWidth) * 255 - 127; // grab mouse pixel coords, center at midpoint
			var y = Math.max(0.4,coords.y / window.innerHeight) * 255 - 127;
			var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // get image data
			var data = imageData.data;
			for(var n = 0, length = data.length; n < length; n += 4) {
				data[n] = data[n] + x - y; // red (control left)
				data[n + 1] = data[n + 1] - x - y; // green (control right)
				data[n + 2] = data[n + 2] + y + y; // blue (control down)
			}
			ctx.putImageData(imageData, 0, 0);
		};
		//
		function getDocHeight() {
			var D = document;
			return Math.max(
				Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
				Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
				Math.max(D.body.clientHeight, D.documentElement.clientHeight)
			);
		};
		var percent = 1 - document.body.scrollTop / getDocHeight();
		ctx.drawImage(theSphere = that.sphere(params, canvas, percent), 0, 0);
		///
		Event.add(document, "mousemove", onMouseMove);
		Event.add(document, "scroll", function(e) {
			var percent = 1 - document.body.scrollTop / document.body.scrollHeight;
			ctx.drawImage(theSphere = that.sphere(params, canvas, percent), 0, 0);
			onMouseMove();
		});
		Event.add(window, "resize", function() {
			canvas.style.width = Math.max(window.innerWidth, element.offsetWidth) + "px";
			canvas.style.height = params.height + "px";
			ctx.drawImage(theSphere = that.sphere(params, canvas, percent), 0, 0)
		});
	};
	///
	this.sphere = function (params, canvas, top) { // create Sphere image, and apply to <canvas>
		var canvas1 = document.createElement("canvas");
		var ctx = canvas1.getContext("2d");
		var w = 50;
		var left = params.x - w / 2;
		var top = top * params.y - w;
		canvas.width = canvas1.width = w * window.innerWidth / window.innerHeight;
		canvas.height = canvas1.height = w;
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
		///
		var n = 360; while(n--) { // go through hues
			var x = left + w;
			var y = top + w*2;
			var g = ctx.createLinearGradient(x, parseFloat(top), x, y);
			g.addColorStop(0, "rgba(0,0,0,0)");
			g.addColorStop(.5, "hsl("+((n + 60) % 360)+",100%,50%)");
			g.addColorStop(1, "#FFF");
			ctx.beginPath(); // draw triangle
			ctx.moveTo(x, top);
			ctx.lineTo(x, y);
			ctx.lineTo(x + 2, y);
			ctx.lineTo(x + 5, top);
			ctx.fillStyle = g; // apply gradient
			ctx.fill();
			ctx.translate(x, y); // rotate + translate into position
			ctx.rotate((1 / 360) * Math.PI * 2);
			ctx.translate(-x, -y);
		}
		return canvas1;
	};
	///
	for (var n = 0; n < params.length; n ++) {
		this.create(params[n]);
	}
};
