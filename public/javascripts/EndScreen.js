function EndScreen()
{
    this.startupEndScreen = function(gameOutcome) {

        if(gameOutcome=="W"){
        this.startupVisualGameObject(g_ResourceManager.YouWin, 0, 0, 4);
        }else{
        this.startupVisualGameObject(g_ResourceManager.YouLose, 0, 0, 4);
        }

    }

    /**
     Called when a key is pressed
     @param event Event Object
     */
    this.keyUp = function(event)

    {
       //g_ApplicationManager.startLevel();

    }
    this.onmousedown = function(event)
    {
       // g_ApplicationManager.startLevel();

    }
}
EndScreen.prototype = new VisualGameObject;