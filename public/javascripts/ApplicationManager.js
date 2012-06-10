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


        this.background = new VisualGameObject().startupVisualGameObject(g_ResourceManager.favicon, 0, 0, 0);
        //this.level = new Level().startupLevel(this.canvasWidth, this.canvasHeight,);




    }

    this.openMainMenu = function(){
        g_GameObjectManager.shutdownAll();
        g_GameObjectManager.xScroll = 0;
        g_GameObjectManager.yScroll = 0;
        //g_score = 0;
        this.mainMenu = new MainMenu().startupMainMenu();
    }


}