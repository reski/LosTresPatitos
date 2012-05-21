/**
 The ApplicationManager is used to manage the application itself.
 */


function ApplicationManager()
{
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    /**
     Initialises this object
     @param canvasWidth      The width of the canvas
     @param canvasHeight     The height of the canvas
     @return                 A reference to the initialised object

     */
    this.startupApplicationManager = function(canvasWidth, canvasHeight)
    {

        g_ApplicationManager = this;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.openMainMenu();


        return this;
    }

    this.startLevel = function(boatPosition /*json con los barcos*/)
    {

        g_GameObjectManager.shutdownAll();


        this.backgroundOponent = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.water, 0, 20, 0,10,15);
        this.grid = new VisualGameObject().startupVisualGameObject(g_ResourceManager.grid, 0, 20, 1);
        this.backgroundPlayer = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.water, 410, 20, 0,10,15);


        this.level = new Level().startupLevel(this.canvasWidth, this.canvasHeight);




    }


    this.openMainMenu = function(){
        g_GameObjectManager.shutdownAll();
        g_GameObjectManager.xScroll = 0;
        g_GameObjectManager.yScroll = 0;
        //g_score = 0;
        this.mainMenu = new MainMenu().startupMainMenu();
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