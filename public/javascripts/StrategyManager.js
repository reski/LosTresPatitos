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
        bitmap.x = 200;
        bitmap.y = 200;
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
                        if((target.y + target.regY)>420)target.y = 420-target.regY;
                        if((target.x + target.regX)>400)target.x = 400-target.regX;
                    }else{
                        if((target.x - target.regY)<0)target.x = target.regY;
                        if((target.y - target.regX)<0)target.y = target.regX;
                        if((target.y + target.regX)>420)target.y = 420-target.regX;
                        if((target.x + target.regY)>400)target.x = 400-target.regY;
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
    var newShips =parsePositions(ships);
    if(validateStrategy(newShips)){
        sendStrategy(newShips);
        g_ApplicationManager.startLevel(newShips);
        document.getElementById("popUpBack").style.display = "none";
        stop();
    } else {
        toggleAlert('alert2');
    }



}

function defaultStrategy(){
     g_Socket.send(JSON.stringify({
                text: "",
                cordx : -1,
                cordy : -1,
                boats : new Array("default"),
                default : true
            }
        ));
    g_ApplicationManager.startUpDefault();
    document.getElementById("popUpBack").style.display = "none";
    //makes sure no alerts are left
    document.getElementById("alert").style.display = "none";
    document.getElementById("alert2").style.display = "none";

}

function validateStrategy(ships){
    var posOcupied = new Array()
    for(var i = 0 ; i<ships.length; i++)  {
        var ship= ships[i];
        posOcupied.push(ship.x+""+ship.y);
        if(ship.rotation == 0){
            switch(ship.name){
                case "ship2good":
                    posOcupied.push(ship.x+""+(ship.y+1));
                    break;
                case "ship3good":
                    posOcupied.push((ship.x+1)+""+ship.y);
                    posOcupied.push((ship.x+2)+""+ship.y);
                    break;
                case "ship4good":
                    posOcupied.push((ship.x+1)+""+ship.y);
                    posOcupied.push((ship.x+2)+""+ship.y);
                    posOcupied.push((ship.x+2)+""+(ship.y -1));
                    break;
            }
        }else{
            switch(ship.name){
                case "ship2good":
                    posOcupied.push((ship.x+1)+""+ship.y);
                    break;
                case "ship3good":
                    posOcupied.push(ship.x+""+(ship.y+1));
                    posOcupied.push(ship.x+""+(ship.y+2));
                    break;
                case "ship4good":
                    posOcupied.push(ship.x+""+(ship.y+1));
                    posOcupied.push(ship.x+""+(ship.y+2));
                    posOcupied.push((ship.x+1)+""+(ship.y+2));
                    break;

            }
        }
    }
    var sorted = posOcupied.sort();
    for (var i = 0; i < sorted.length - 1; i++) {
        if (sorted[i + 1] == sorted[i]) {
            return false;
        }
    }
    return true;
}
function sendStrategy(ships){
    var ships2 = new Array();
    for(var i = 0 ; i<ships.length; i++){
        var ship = ships[i];
        newShip = {name:ship.name,x:ship.x,y:ship.y,rot:ship.rot};
        ships2[i] = newShip;
    }
    g_Socket.send(JSON.stringify({
            text: "",
            cordx : -1,
            cordy : -1,
            boats : ships2,
            default : false
        }
    ));
}




function parsePositions(children){
    var newShips = new Array();
    for(var i = 0 ; i<children.length; i++){
        var ship = children[i];
        var newShip =ship.clone();
        if(ship.rotation == 0){
            newShip.x = Math.round((ship.x-ship.regX)/40);
            if(ship.offset) newShip.y = Math.floor((ship.y-ship.regY - 40 + ship.offset)/40);
            else{ newShip.y = Math.round((ship.y-ship.regY - 10 )/40);}
            newShip.rot = false;
        }else{
            newShip.y = Math.round((ship.y-ship.regX- 20)/40);
            if(ship.offset) newShip.x = Math.floor((ship.x+ship.regY - ship.offset+20)/40);
            else{ newShip.x = Math.round((ship.x-ship.regY - 10 )/40);}
            newShip.rot = true;
        }


        if(newShip.x < 0) newShip.x =0;
        if(newShip.y < 0) newShip.y =0;
        if(newShip.y > 9) newShip.y =9;
        if(newShip.x > 9) newShip.x =9;

        newShips.push(newShip);
    }
    return newShips;

}

