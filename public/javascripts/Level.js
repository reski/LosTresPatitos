/**
 A class to represent the level
 */
function Level()
{

     this.lastX = null;
     this.lastY = null;
    /**
     Initialises this object
     */
    this.startupLevel = function(canvasWidth, canvasHeight, ships)
    {
      var multiplier = 40;
      var adder = 410;

      for(var i = 0 ; i<ships.length; i++)  {
      var ship= ships[i];
      if(ship.rotation == 0){
        switch(ship.name){
            case "ship1good":
                new VisualGameObject().startupVisualGameObject(ship.image, ((ship.x*multiplier)+adder+3),(ship.y*multiplier)+15,3);
                break;
            case "ship2good":
                new VisualGameObject().startupVisualGameObject(ship.image, ((ship.x*multiplier)+adder- 3),(ship.y*multiplier)+20,3);
                break;
            case "ship3good":
                new VisualGameObject().startupVisualGameObject(ship.image, ((ship.x*multiplier)+adder),(ship.y*multiplier),3);
                break;
            case "ship4good":
                new VisualGameObject().startupVisualGameObject(ship.image, ((ship.x*multiplier)+adder),(ship.y*multiplier)-20,3);
                break;

        }
      }else{
         switch(ship.name){
           case "ship1good":
               new VisualGameObject().startupVisualGameObject(g_ResourceManager.ship1goodr, ((ship.x*multiplier)+adder- 3),(ship.y*multiplier)+19,3);
               break;
           case "ship2good":
                new VisualGameObject().startupVisualGameObject(g_ResourceManager.ship2goodr, ((ship.x*multiplier)+adder- 1),(ship.y*multiplier)+18,3);
                break;
           case "ship3good":
                new VisualGameObject().startupVisualGameObject(g_ResourceManager.ship3goodr, ((ship.x*multiplier)+adder),(ship.y*multiplier)+20,3);
                break;
           case "ship4good":
                new VisualGameObject().startupVisualGameObject(g_ResourceManager.ship4goodr, ((ship.x*multiplier)+adder),(ship.y*multiplier)+20,3);
                break;

             }
       }


      }


        return this;
    }
    this.startUpDefault =function(){
        var ship1 = new Array(450,220, 3,410,340,3);
        var ship2 = new Array(530,180, 3);
        var ship3 = new Array(410, 0 , 3, 500,320,3);
        var ship4 = new Array(700, 260, 3);

        this.addVisualObject(g_ResourceManager.ship1good, ship1);
        this.addVisualObject(g_ResourceManager.ship2good, ship2);
        this.addVisualObject(g_ResourceManager.ship3good, ship3);
        this.addVisualObject(g_ResourceManager.ship4good, ship4);

      return this;
    }
    this.paintShot = function(shotResult,x,y,gettingShot){
       var multiplier = 40;
       var adder = 0;
       if(gettingShot === 'true'){
          adder = 410;
       }
       this.lastX = x;
       this.lastY = y;
       var x = (parseInt(x)*multiplier)+adder;
       var y = (parseInt(y)*multiplier)+20;


       new CannonBall().startUpCannonBall(x,y,shotResult);

    }

    /**
     Adds the blocks to the screen by creating VisualGameObjects
     */
     this.echo = function()
        {
        if(this.lastX != null){
         g_Socket.send(JSON.stringify({
                                    text: "",
                                    cordx : parseInt(this.lastX),
                                    cordy : parseInt(this.lastY),
                                    boats : new Array()
                                    }
                                      ));
                  }
         }



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
                           cordy : posy,
                           boats : new Array()
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