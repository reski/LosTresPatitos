


/** target frames per second
 @type Number
 */
var FPS = 0.1;
/** time between frames
 @type Number
 */
var SECONDS_BETWEEN_FRAMES = 1 / FPS;
/** A global reference to the GameObjectManager instance
 @type GameObjectManager
 */
var g_GameObjectManager = null;
/** A global reference to the ApplicationManager instance
 @type ApplicationManager
 */
var g_ApplicationManager = null;
/** A global reference to the ResourceManager instance
 @type ResourceManager
 */
var g_ResourceManager = null;
/** The players score
 @type Number
 */
var g_Socket = null;


// The entry point of the application is set to the init function
//window.onload = init;
window.onbeforeunload = leavingPage;

/**
 Application entry point
 */
function Main(){

this.init =function(socket)
{
        g_Socket = socket;

        new GameObjectManager().startupGameObjectManager(/* boatPositions /*json*/);

}
}
function leavingPage(){

}