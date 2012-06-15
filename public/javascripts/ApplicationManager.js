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


        this.backgroundOponent = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.water, 0, 0, 0,10,15);
        this.grid = new VisualGameObject().startupVisualGameObject(g_ResourceManager.grid, 0, 0, 1);
        this.backgroundPlayer = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.water, 410, 0, 0,10,15);


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
         alert("x: "+ Math.floor(x/40));
         alert("y: "+ Math.floor(y/40));


    }


}