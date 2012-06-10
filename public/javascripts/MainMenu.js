/**
 The main menu screen
 */
function MainMenu()
{
    this.startupMainMenu = function() {


            this.startupVisualGameObject(g_ResourceManager.main, 0, 0, 4);


    }

    /**
     Called when a key is pressed
     @param event Event Object
     */
    this.keyUp = function(event)

    {
        g_ApplicationManager.startLevel();

    }
    this.onmousedown = function(event)
    {
        g_ApplicationManager.startLevel();

    }
}
MainMenu.prototype = new VisualGameObject;