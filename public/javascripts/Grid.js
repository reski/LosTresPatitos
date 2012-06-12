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
               var ex, ey;
               canoffset = $("canvas").offset();
               ex = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
               ey = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;

               if((ex> this.x && ex< this.x+this.image.width) && (ey>this.y && ey<this.y+this.image.height)){
                     this.hidden = false;
               }else{
                    this.hidden = true;
                    }
            }



}
Grid.prototype = new VisualGameObject;