var canvas;
var stage;
var container;
var mouseTarget;	// the display object currently under the mouse, or being dragged
var dragStarted;	// indicates whether we are currently in a drag operation
var offset = new Point();
var update = true;

function init() {
	if (window.top != window) {
		document.getElementById("header").style.display = "none";
	}
	//document.getElementById("loader").className = "loader";
	// create stage and point it to the canvas:
	canvas = document.getElementById("strategyCanvas");
	
	//check to see if we are running in a browser with touch support
	stage = new Stage(canvas);

	// enable touch interactions if supported on the current device:
	Touch.enable(stage);

	// enabled mouse over / out events
	stage.enableMouseOver(10);
	
	// load the source image:
    var grid= new Bitmap(g_ResourceManager.grid);
    grid.x = 0;
    grid.y = 20;
    grid.scale =1;
    var metal = new Bitmap(g_ResourceManager.metal);
    metal.x = 0;
    metal.y = 20;
    metal.scale =1;
	container = new Container();

    stage.addChild(metal);
    stage.addChild(grid);
    stage.addChild(container);


	var ships = new Array(g_ResourceManager.ship1good,g_ResourceManager.ship2good,g_ResourceManager.ship3good,g_ResourceManager.ship4good)
    startupShips(ships);
}

function stop() {
	Ticker.removeListener(window);
}
function startupShips(ships){
    for(var i = 0 ; i<ships.length; i++){
     bitmap = new Bitmap(ships[i]);
     	 container.addChild(bitmap);
     	 bitmap.x = 450;
     	 bitmap.y = 100;
     	 bitmap.regX = bitmap.image.width/2|0;
     	 bitmap.regY = bitmap.image.height/2|0;
         if(ships[i].name == "ship4good" || ships[i].name == "ship3good")  bitmap.offset = bitmap.image.height;


         bitmap.scale =1;
         bitmap.name = ships[i].name;


     		// wrapper function to provide scope for the event handlers:
     		(function(target) {
     			bitmap.onPress = function(evt) {
     				// bump the target in front of it's siblings:
     				container.addChild(target);
     				var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};

     				// add a handler to the event object's onMouseMove callback
     				// this will be active until the user releases the mouse button:
     				evt.onMouseMove = function(ev) {
     					target.x = ev.stageX+offset.x;
     					target.y = ev.stageY+offset.y;
     				if(target.rotation == 0){
     					if((target.x - target.regX)<0)target.x = target.regX;
     					if((target.y - target.regY)<0)target.y = target.regY;
                        if((target.y + target.regY)>420)target.y = 420-target.regY
     				}else{
     				   if((target.x - target.regY)<0)target.x = target.regY;
                       if((target.y - target.regX)<0)target.y = target.regX;
                       if((target.y + target.regX)>420)target.y = 420-target.regX
     				}

     					// indicate that the stage should be updated on the next tick:
     					update = true;
     				}
     			}
     			bitmap.onDoubleClick = function() {
                   var rot = target.rotation;
                   if(rot == 0)target.rotation = 90;
                   if(rot == 90)target.rotation = 0;
                   update = true;
                }
     			bitmap.onMouseOver = function() {
     				target.scaleX = target.scaleY = target.scale*1.2;
     				update = true;
     			}
     			bitmap.onMouseOut = function() {
     				target.scaleX = target.scaleY = target.scale;
     				update = true;
     			}
     		})(bitmap);

     }
     Ticker.addListener(window);
  }


function tick() {
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	if (update) {
		update = false; // only update once
		stage.update();
	}
}
function getChildrenPos(){
     var ships =container.children;
     parsePositions(ships);
     g_ApplicationManager.startLevel(ships);
     document.getElementById("popUpBack").style.display = "none";
     stop();
}
function parsePositions(children){
    for(var i = 0 ; i<children.length; i++){
        var ship = children[i];
     if(ship.rotation == 0){
        ship.x = Math.round((ship.x-ship.regX)/40);
        if(ship.offset) ship.y = Math.floor((ship.y-ship.regY - 40 + ship.offset)/40);
        else{ ship.y = Math.round((ship.y-ship.regY - 10 )/40);}

      }else{
        ship.y = Math.round((ship.y-ship.regX- 20)/40);
        if(ship.offset) ship.x = Math.floor((ship.x+ship.regY - ship.offset+20)/40);
        else{ ship.x = Math.round((ship.x-ship.regY - 10 )/40);}
      }


       if(ship.x < 0) ship.x =0;
       if(ship.y < 0) ship.y =0;
       if(ship.y > 9) ship.y =9;
       if(ship.x > 9) ship.x =9;

    }

}

