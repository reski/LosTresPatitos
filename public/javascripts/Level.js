/**
 A class to represent the level
 */
function Level()
{


    /**
     Initialises this object
     */
    this.startupLevel = function(canvasWidth, canvasHeight/*, Json boatPosition*/)
    {

       // this.addVisualObject(g_ResourceManager.horse, this.horse);


        return this;
    }
                           
    /**
     Adds the blocks to the screen by creating VisualGameObjects
     */
    this.addVisualObject = function(image, coordinatesArray)
    {
        for (i = 0; i < coordinatesArray.length; i = i + 3) {
            new VisualGameObject().startupVisualGameObject(image, coordinatesArray[i], coordinatesArray[i+1],
                    coordinatesArray[i+2]);
        }
    }

    /*    this.addPowerups = function(canvasWidth, canvasHeight)
     {
     for (var x = 0; x < this.blocks.length; ++x)
     {
     if (this.powerups[x])
     {
     var xPosition = x * this.blockWidth + this.blockWidth / 2;
     var yPosition = canvasHeight - this.groundHeight(x);

     switch (this.powerups[x])
     {
     case 'Gem':
     new Powerup().startupPowerup(10, g_ResourceManager.gem,
     xPosition - g_ResourceManager.gem.width / 2,
     yPosition - g_ResourceManager.gem.height, 4, 1, 1);
     break;
     case 'LevelEndPost':
     new LevelEndPost().startupLevelEndPost(g_ResourceManager.portal,
     xPosition - g_ResourceManager.portal.width / 2 / 4,
     yPosition - g_ResourceManager.portal.height, 4);
     break;
     }
     }
     }
     }*/

    /**
     @return     The block under the specified x position
     @param x    The x position to test
     */
    this.currentBlock = function(x)
    {
        return parseInt(x / this.blockWidth);
    }

    /**
     @return             The hieght of the ground under the specified block
     @param blockIndex   The block number
     */
    this.groundHeight = function(blockIndex)
    {
        if (blockIndex < 0 || blockIndex > this.blocks.length) return 0;

        return this.blocks[blockIndex] * this.blockHeight;
    }
}