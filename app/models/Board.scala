package models

import org.specs2.internal.scalaz.Value


case class Board(tiles: Array[Array[Tile]]) {


  def shoot(x:Int, y:Int): ShootResult.Value = {

    val tile: Tile = tiles{x}{y}
    if (!tile.alreadyFired){
      tile.alreadyFired = true
      //si el tile tiene un ship, le pega, si no agua
      if (tile.ship!=Nil) tile.ship.hit else ShootResult.Missed
      //tile.ship.map{ship=> ship.hit}.getOrElse{ShootResult.Missed}

    }else{
      ShootResult.AlreadyFired
    }

  }
}

object Board{

  def defaultBoard() : Board = {
     val ship1 : Ship = Ship.smallShip()
     val ship2 : Ship = Ship.mediumShip()
     val ship3 : Ship = Ship.largeShip()
     val ship4 : Ship = Ship.xLargeShip()
     val board = Board.emptyBoard()
     board.tiles{0}{4} = Tile(ship1)
     board.tiles{1}{1} = Tile(ship2)
     board.tiles{1}{2} = Tile(ship2)
     board.tiles{4}{8} = Tile(ship3)
     board.tiles{5}{8} = Tile(ship3)
     board.tiles{6}{8} = Tile(ship3)
     board.tiles{6}{1} = Tile(ship4)
     board.tiles{6}{2} = Tile(ship4)
     board.tiles{6}{3} = Tile(ship4)
     board.tiles{6}{4} = Tile(ship4)
     board.tiles{5}{4} = Tile(ship4)

  board
  }

  def emptyBoard() :Board ={
   val board: Board = Board(Array.ofDim[Tile](10,10))
   board.tiles.map(_.map(_= Tile.emptyTile()))
   board
    /* for (i <- 0 until 9) {
      for (j <- 0 until 9) {
        board.tiles{i}{j} = Tile.emptyTile();
      }
    }*/
  }


}
  /*def createBoard: List[List[Tile]] = {
    var lists: List[List[Tile]] = List[List[Tile]]()

  }*/





