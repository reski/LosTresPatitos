/**
 A class to represent the level
 */
function Level()
{
   /*this.ship1b = new Array(200, 40, 3,280,-10,3);
   this.ship2b = new Array(155, 160, 3);
   this.ship3b = new Array(0, 220, 3, 280,100,3);
   this.ship4b = new Array(200, 300, 3);*/

   this.ship1 = new Array(450,220, 3,410,340,3);
   this.ship2 = new Array(530,180, 3);
   this.ship3 = new Array(410, 0 , 3, 500,340,3);
   this.ship4 = new Array(700, 260, 3);

    /**
     Initialises this object
     */
    this.startupLevel = function(canvasWidth, canvasHeight/*, Json boatPosition*/)
    {
/*
        this.addVisualObject(g_ResourceManager.ship1bad, this.ship1b);
        this.addVisualObject(g_ResourceManager.ship2bad, this.ship2b);
        this.addVisualObject(g_ResourceManager.ship3bad, this.ship3b);
        this.addVisualObject(g_ResourceManager.ship4bad, this.ship4b);*/

        this.addVisualObject(g_ResourceManager.ship1good, this.ship1);
        this.addVisualObject(g_ResourceManager.ship2good, this.ship2);
        this.addVisualObject(g_ResourceManager.ship3good, this.ship3);
        this.addVisualObject(g_ResourceManager.ship4good, this.ship4);



        return this;
    }
    this.paintShot = function(shotResult,x,y,gettingShot){
       var multiplier = 40;
       var adder = 0;
       if(gettingShot === 'true'){
          adder = 410;
       }
       var x = (parseInt(x)*multiplier)+adder;
       var y = (parseInt(y)*multiplier)+20;

       switch(shotResult)
        {
        case "Missed":
          new VisualGameObject().startupVisualGameObject(g_ResourceManager.missed, x, y,4);
          break;
        case "HitShip":
          new VisualGameObject().startupVisualGameObject(g_ResourceManager.hit, x, y,4);
          break;
        case "SunkShip":
          new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.explosion, x, y,4,14,14);
          break;
       }

    }

                           
    /**
     Adds the blocks to the screen by creating VisualGameObjects
     */
    this.addVisualObject = function(image, coordinatesArray)
    {
        for (i = 0; i < coordinatesArray.length; i = i + 3) {
            new VisualGameObject().startupVisualGameObject(image, coordinatesArray[i], coordinatesArray[i+1],
                    coordinatesArray[i+2]);
        }
    }
    this.parseShot = function(x,y){

          var posx = Math.floor(x/40);
          var posy = Math.floor((y-20)/40);
          if((0 <= posx)&&(posx <=9)&&(posy <=9)&&(0 <=posy)){
       //   alert('x:'+ posx + 'y '+posy)
          g_Socket.send(JSON.stringify({
                           text: "",
                           cordx : posx,
                           cordy : posy
                           }
                             ));
         }
       }
       this.mouseDown = function(event){
            var x, y;

            canoffset = $("canvas").offset();
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;

          this.parseShot(x,y);
        }


}