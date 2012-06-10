function GameObjectManager()
{

    this.gameObjects = new Array();
    /** An array of new game objects
     @type Array
     */
    this.addedGameObjects = new Array();
    /** An array of removed game objects
     @type Array
     */
    this.removedGameObjects = new Array();
    /** The time that the last frame was rendered
     @type Date
     */
    this.lastFrame = new Date().getTime();
    /** The global scrolling value of the x axis
     @type Number

    this.canvas = null;
    /** A reference to the 2D context of the canvas element
     @type CanvasRenderingContext2D
     */
    this.context2D = null;
    /** A reference to the in-memory canvas used as a back buffer
     @type HTMLCanvasElement
     */
    this.backBuffer = null;
    /** A reference to the backbuffer 2D context
     @type CanvasRenderingContext2D
     */
    this.backBufferContext2D = null;
    /** True if the canvas element is supported, false otherwise
     @type Boolean
     */
    this.sideBuffer = null;
    this.sideBufferContext2D = null;

    this.botBuffer = null;
    this.botBufferContext2D = null;

    this.canvasSupported = false;
    /** True if the resources supplied to the ResourceManager are all loaded, false otherwise
     @type Boolean
     */
    this.resourcesLoaded = false;
    /** The current colour of the loading screen
     @type Number
     */
    this.loadingScreenCol = 0;
    /** The direction of the changes to the loading screen colour.
     1 = colour moving towards white
     -1 = colour moving topwards balck
     @type Number
     */
    this.loadingScreenColDirection = 1;
    /** How quickly to change the loading screen colour per second
     @type Number
     */
    this.loadingScreenColSpeed = 255;

    /** The global scrolling value of the x axis
     @type Number
     */
    this.xScroll = 0;
    /** The global scrolling value of the y axis
     @type Number
     */
    this.yScroll = 0;


   this.dt = 0;

    /**
     Initialises this object

     @return A reference to the initialised object
     */
    this.startupGameObjectManager = function()
    {


        // set the global pointer to reference this object
        g_GameObjectManager = this;

        // watch for keyboard events
        document.onkeydown = function(event) {



        };
        document.onkeyup = function(event) {
            g_GameObjectManager.keyUp(event);
        }

        document.onmousedown = function(event) {
            g_GameObjectManager.onmousedown(event);




        }
        document.onmouseup = function(event) {

        }
        document.onmousemove = function(event) {

        }

        // get references to the canvas elements and their 2D contexts
        this.canvas = document.getElementById('canvas');

        // if the this.canvas.getContext function does not exist it is a safe bet that
        // the current browser does not support the canvas element.
        // in this case we don't go any further, which will save some debuggers (like
        // the IE8 debugger) from throwing up a lot of errors.
        if (this.canvas.getContext)
        {
            this.canvasSupported = true;

            this.context2D = this.canvas.getContext('2d');
            this.context2D.font = "11pt Times New Roman";


            this.backBuffer = document.createElement('canvas');
            this.backBuffer.width = this.canvas.width;
            this.backBuffer.height = this.canvas.height;
            this.backBufferContext2D = this.backBuffer.getContext('2d');
            this.backBufferContext2D.font = "11pt Times New Roman";

            //agregar buffer para contrincante
        }


        // create a new ResourceManager
        new ResourceManager().startupResourceManager(
                [
                    {name: 'favicon', src: '/assets/images/favicon.png'},
                    {name: 'main', src: '/assets/images/main.jpg'},


                ]);


        // use setInterval to call the draw function
        setInterval(function() {
            g_GameObjectManager.draw();
        }, SECONDS_BETWEEN_FRAMES);

        return this;
    }



    /**
     The render loop
     */
    this.draw = function ()
    {
        // calculate the time since the last frame
        var drawNamecount = 0;
        var thisFrame = new Date().getTime();
        this.dt = (thisFrame - this.lastFrame) / 1000;
        this.lastFrame = thisFrame;

        if (!this.resourcesLoaded)
        {
            var numLoaded = 0;
            for (i = 0; i < g_ResourceManager.imageProperties.length; ++i)
            {
                if (g_ResourceManager[g_ResourceManager.imageProperties[i]].complete)
                {
                    ++numLoaded;
                }
            }
            if (numLoaded == g_ResourceManager.imageProperties.length)
            {

                new ApplicationManager().startupApplicationManager(this.canvas.width, this.canvas.height);
                this.resourcesLoaded = true;
            }
            else
            {
                this.loadingScreenCol += this.loadingScreenColDirection * this.loadingScreenColSpeed * this.dt;
                if (this.loadingScreenCol > 255)
                {
                    this.loadingScreenCol = 255;
                    this.loadingScreenColDirection = -1;
                }
                else if (this.loadingScreenCol < 0)
                {
                    this.loadingScreenCol = 0;
                    this.loadingScreenColDirection = 1;
                }
                this.context2D.fillStyle = "rgb(" + parseInt(this.loadingScreenCol)
                        + "," + parseInt(this.loadingScreenCol) + "," + parseInt(this.loadingScreenCol) + ")";
                this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);//ver
            }
        }

        // clear the drawing contexts
        if (this.canvasSupported && this.resourcesLoaded)
        {
            this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
            //this.sideBufferContext2D.clearRect(600, 0, this.sideBuffer.width, this.sideBuffer.height);
            //this.botBufferContext2D.clearRect(0, 400, this.botBuffer.width, this.botBuffer.height);

            this.addNewGameObjects();
            this.removeOldGameObjects();

            // first update all the game objects
            for (var x = 0; x < this.gameObjects.length; ++x)
            {
                if (this.gameObjects[x].update)
                {

                    this.gameObjects[x].update(this.dt, this.backBufferContext2D, this.xScroll, this.yScroll);

                }

                if (this.gameObjects[x].updatePos) {
                    this.gameObjects[x].updatePos();
                }


            }



            // then draw the game objects
            for (var x = 0; x < this.gameObjects.length; ++x)
            {



               this.gameObjects[x].draw(this.dt, this.backBufferContext2D, this.xScroll, this.yScroll);




            }




        }


        this.context2D.drawImage(this.backBuffer, 0, 0);




    };

    this.shutdownAll = function()
    {
        for (var x = 0; x < this.gameObjects.length; ++x)
        {
            if (this.gameObjects[x].shutdown)
            {
                this.gameObjects[x].shutdown();
            }
        }

        this.removeOldGameObjects();
    }

    /**
     Adds a new GameObject to the gameObjects collection
     @param gameObject The object to add
     */
    this.addGameObject = function(gameObject)
    {
        this.addedGameObjects.push(gameObject);
    }

    this.addNewGameObjects = function()
    {
        if (this.addedGameObjects.length != 0)
        {
            for (var x = 0; x < this.addedGameObjects.length; ++x)
            {
                this.gameObjects.push(this.addedGameObjects[x]);
            }

            this.addedGameObjects = [];
            this.gameObjects.sort(function(a, b) {
                return a.zOrder - b.zOrder;
            });
        }
    };

    /**
     Removes a GameObject from the gameObjects collection
     @param gameObject The object to remove
     */
    this.removeGameObject = function(gameObject)
    {
        this.removedGameObjects.push(gameObject);
    };

    this.removeOldGameObjects = function()
    {
        if (this.removedGameObjects.length != 0)
        {
            for (var x = 0; x < this.removedGameObjects.length; ++x)
            {
                this.gameObjects.removeObject(this.removedGameObjects[x]);
            }
            this.removedGameObjects= [];
        }
    };

    this.keyDown = function(event)
    {
        if (event.keyCode == 116)
        {
            event.keyCode = 0;
            event.returnValue = false;
            return false;
        }


        for (var x = 0; x < this.gameObjects.length; ++x)
        {
            if (this.gameObjects[x].keyDown)
            {
                this.gameObjects[x].keyDown(event);
            }
        }
    };

    this.keyUp = function(event)
    {
        for (var x = 0; x < this.gameObjects.length; ++x)
        {
            if (this.gameObjects[x].keyUp)
            {
                this.gameObjects[x].keyUp(event);
            }
        }
    };
     this.onmousedown = function(event)
    {
        for (var x = 0; x < this.gameObjects.length; ++x)
        {
            if (this.gameObjects[x].onmousedown)
            {
                this.gameObjects[x].onmousedown(event);
            }
        }
    };



}