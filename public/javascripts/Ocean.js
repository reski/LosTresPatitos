function Ocean(img_src){
	var draw = false;
	var still = 0;
	var doRain = false;
	var img = new Image,
		img_data,
		delay = 30,
		width,
		height, 
		half_width, 
		half_height,
		riprad = 5,
		oldind,
		newind,
		mapind,
		
		size,
		ripplemap = [],
		last_map = [],
		ripple,
		ripple_data,
		texture,
		texture_data,
		is_running = true,
		is_disturbed = false,
		timer_id,
		canvas = g_GameObjectManager.canvas,
		//canvas = document.createElement('canvas'),
		/** @type {CanvasRenderingContext2D} */
		ctx;
		
	function initwater() {
		width = img.width;
		height = img.height;
		
		half_width = width >> 1;
		half_height = height >> 1;
		
		size = width * (height + 2) * 5;
		
		oldind = width;
		newind = width * (height + 3);
		
		/** @type {CanvasRenderingContext2D} */
		ctx = g_GameObjectManager.backBufferContext2D;
		//container.appendChild(canvas);
		
	    ctx.drawImage(img, 0, 0, width, height);

		//ctx.draw
		for (var i = 0; i < size; i++) {
			last_map[i] = ripplemap[i] = 0;
		}
		
		texture = ctx.getImageData(0, 0, width, height);
		texture_data = texture.data;
		ripple = ctx.getImageData(0, 0, width, height);
		ripple_data = ripple.data;
		
		canvas.addEventListener('mousemove', function( evt) {
			disturb(evt.offsetX || evt.layerX, evt.offsetY || evt.layerY);
		}, false);
		/*canvas.addEventListener('mousedown',click(evt), false);*/
		
		start();
	}
	function click(x, y) {
    		            riprad =25;
            			disturb(x, y);
            		    riprad = 5;
            		}
	
	function stop() {
		g_GameObjectManager.ocean.draw =false;
	}
	function makeItRain(){
	   if(doRain){doRain= false;
	   }else{ doRain= true;}
	}
	
	function start() {
	    draw = true;
	}
	function rain(){
	    disturb(Math.round(Math.random()*width),Math.round(Math.random()*width))
	    newframe(width,height)
	    ctx.putImageData(ripple,0,0)
	}
	function moving(){

        for(var i = 0; i<10 ; i++){
	    var x =Math.round(Math.random()*width);
	    for (var y = 0; y< height; y = y+50){
	     disturb(x,y)
        }
         newframe(width,height)
         ctx.putImageData(ripple,0,0)

        }
	}
	
	function update() {
		if(draw){
		   if(doRain){
		    rain();
		   }
		    ctx.drawImage(img, 0, 0, width, height)
		    if (is_disturbed) {
			    newframe(width, height);
			    ctx.putImageData(ripple, 0, 0);

       }
	}
	}
	function disturb(dx, dy) {
		dx <<= 0;
		dy <<= 0;
		is_disturbed = true;
		
		for (var j = dy - riprad; j < dy + riprad; j++) {
			for (var k = dx - riprad; k < dx + riprad; k++) {
				ripplemap[oldind + (j * width) + k] += 512;
			}
		}
		
//		newframe(width, height);
//		ctx.putImageData(ripple, 0, 0);
	}


	
	function newframe() {
		var i, a, b, data, cur_pixel, new_pixel, old_data;
		
		i = oldind;
		oldind = newind;
		newind = i;
		
		i = 0;
		mapind = oldind;
		
		
		var _width = width,
			_height = height,
			_ripplemap = ripplemap,
			_mapind = mapind,
			_newind = newind,
			_last_map = last_map,
			_rd = ripple.data,
			_td = texture.data,
			_half_width = half_width,
			_half_height = half_height,
			_is_disturbed = false;
		
		for (var y = 0; y < _height; y++) {
			for (var x = 0; x < _width; x++) {
				data = (
					_ripplemap[_mapind - _width] + 
					_ripplemap[_mapind + _width] + 
					_ripplemap[_mapind - 1] + 
					_ripplemap[_mapind + 1]) >> 1;
					
				data -= _ripplemap[_newind + i];
				data -= data >> 5;
				
				_ripplemap[_newind + i] = data;

				//where data=0 then still, where data>0 then wave
				data = 1024 - data;
				
				old_data = _last_map[i];
				_last_map[i] = data;
				
				if (old_data != data) {
					//offsets
					_is_disturbed = true;
					a = (((x - _half_width) * data / 1024) << 0) + _half_width;
					b = (((y - _half_height) * data / 1024) << 0) + _half_height;
	
					//bounds check
					if (a >= _width) a = _width - 1;
					if (a < 0) a = 0;
					if (b >= _height) b = _height - 1;
					if (b < 0) b = 0;
	
					new_pixel = (a + (b * _width)) * 4;
					cur_pixel = i * 4;
					
					_rd[cur_pixel] = _td[new_pixel];
					_rd[cur_pixel + 1] = _td[new_pixel + 1];
					_rd[cur_pixel + 2] = _td[new_pixel + 2];
    				_rd[cur_pixel + 3] = _td[new_pixel + 3];
				}
				
				++_mapind;
				++i;
			}
		}
		
		mapind = _mapind;
		is_disturbed = _is_disturbed;
	}
	
	img.src = img_src;
	
	return {
	    init : initwater,
		start: start,
		stop: stop,
		bomb: click,
		makeItRain: makeItRain,
		update: update,
		disturb: disturb
	}
};