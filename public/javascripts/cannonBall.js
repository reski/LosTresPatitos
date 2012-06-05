function CannonBall(){
//this.timer = 1.6;
this.x = 0;
this.y = 0;
this.shotResult = "Missed";

this.startUpCannonBall =function(x,y,shotResult){
    this.x = x;
    this.y = y;
    this.shotResult = shotResult;
    this.startupAnimatedGameObject(g_ResourceManager.cannonBall, x - 3, y - 5,4,22,16);
}

this.update = function (/**Number*/ dt, /**CanvasRenderingContext2D*/context, /**Number*/ xScroll,
        /**Number*/ yScroll)
 {
   //this.timer = this.timer -dt;
   if(this.currentFrame == 21){
   this.shutdownAnimatedGameObject();
   this.paintResult();
   }



 }
this.paintResult =function(){

    switch(this.shotResult)
        {
        case "miss":
          new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.miss, this.x- 12, this.y- 8,4,10,10);
          break;
        case "hit":
          new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.fire, this.x+3, this.y,4,20,15);
          break;
        default:
          new AnimatedGameObject().startupAnimatedGameObject(g_ResourceManager.explosion, this.x+ 3, this.y +5,4,14,14);
          break;
       }
}




}
CannonBall.prototype = new AnimatedGameObject;