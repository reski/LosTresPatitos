function Grid(){
this.x = 0;
this.y = 0;

this.startUp =function(x,y){
    this.x = x;
    this.y = y;
    this.startupVisualGameObject(g_ResourceManager.grid,x, y, 1);
    this.hidden = true
    return this;
}

this.update = function (/**Number*/ dt, /**CanvasRenderingContext2D*/context, /**Number*/ xScroll,
        /**Number*/ yScroll)
 {
   //this.timer = this.timer -dt;

 }

this.onmousemove = function(event) {
               var pos = findClick(event);

               if((pos.x> this.x && pos.x< this.x+this.image.width) && (pos.y>this.y-20 && pos.y<this.y+this.image.height)){
                     this.hidden = false;
               }else{
                    this.hidden = true;
                    }
            }



}
Grid.prototype = new VisualGameObject;