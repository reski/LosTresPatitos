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
        //this.startLevel();
        init();

        return this;
    }

    this.startLevel = function(ships,def)
    {

        g_GameObjectManager.shutdownAll();

        g_GameObjectManager.ocean.init();
        this.grid = new Grid().startUp(0, 20);
        this.playerGrid = new Grid().startUp(410, 20);

        if(def) this.level= new Level().startUpDefault();
        else this.level = new Level().startupLevel(this.canvasWidth, this.canvasHeight,ships);




    }
    this.openEnd = function(gameOutcome){
        this.cleanSlate();
        this.endScreen = new EndScreen().startupEndScreen(gameOutcome)
    }


    this.openMainMenu = function(){
        this.cleanSlate();
        this.mainMenu = new MainMenu().startupMainMenu();
    }

    this.cleanSlate= function(){
       g_GameObjectManager.shutdownAll();
       g_GameObjectManager.xScroll = 0;
       g_GameObjectManager.yScroll = 0;
    }


}