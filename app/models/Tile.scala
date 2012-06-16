package models

case class Tile(var ship: Ship) {
   var alreadyFired: Boolean = false
}

object Tile{
   def emptyTile(): Tile ={
     Tile(null)
   }


}
