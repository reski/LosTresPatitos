package models

case class Tile(var ship: Option[Ship]) {
   var alreadyFired: Boolean = false
}

object Tile{
   def emptyTile(): Tile ={
     Tile(None)
   }

}
