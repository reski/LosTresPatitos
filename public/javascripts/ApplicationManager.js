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


        this.backgroundOponent = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.water, 0, 20, 0,10,15);
        this.grid = new VisualGameObject().startupVisualGameObject(g_ResourceManager.grid, 0, 20, 1);
        this.backgroundPlayer = new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.water, 410, 20, 0,10,15);
        this.playerGrid = new VisualGameObject().startupVisualGameObject(g_ResourceManager.grid, 410, 20, 1);

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